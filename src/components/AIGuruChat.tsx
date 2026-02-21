"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageSquare, Bot, User, Loader2, Clock } from "lucide-react";
import { Button } from "./Button";

interface Message {
    role: "user" | "model";
    parts: { text: string }[];
}

interface AIGuruChatProps {
    subjectId: string;
    subjectName: string;
}

export default function AIGuruChat({ subjectId, subjectName }: AIGuruChatProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [rateLimitCountdown, setRateLimitCountdown] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const pendingMessageRef = useRef<string>("");

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, rateLimitCountdown]);

    // Countdown: auto-retry when it hits 0
    useEffect(() => {
        if (rateLimitCountdown <= 0) return;
        countdownRef.current = setInterval(() => {
            setRateLimitCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownRef.current!);
                    // Auto-retry with the pending message
                    if (pendingMessageRef.current) sendMessage(pendingMessageRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(countdownRef.current!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rateLimitCountdown > 0]);

    const sendMessage = async (text: string) => {
        clearInterval(countdownRef.current!);
        setRateLimitCountdown(0);
        setIsLoading(true);

        const userMsg: Message = { role: "user", parts: [{ text }] };
        setMessages(prev => [...prev, userMsg]);
        const history = messages; // snapshot before adding userMsg

        try {
            const res = await fetch("/api/ai-guru", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, subjectId, history }),
            });

            const data = await res.json();

            if (res.status === 429 && data.error === "RATE_LIMITED") {
                // Remove the just-added user message, save it for retry
                setMessages(prev => prev.slice(0, -1));
                pendingMessageRef.current = text;
                setRateLimitCountdown(data.retryAfter ?? 60);
                return;
            }

            if (data.text) {
                setMessages(prev => [...prev, { role: "model", parts: [{ text: data.text }] }]);
                pendingMessageRef.current = "";
                // Track interaction
                fetch("/api/progress", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ type: "AI_INTERACTION" }),
                }).catch(e => console.error("Track AI error:", e));
            } else {
                setMessages(prev => [...prev, {
                    role: "model",
                    parts: [{ text: "Sorry, I couldn't generate a response. Please try again." }]
                }]);
            }
        } catch (error) {
            console.error("AI Guru Error:", error);
            setMessages(prev => [...prev, {
                role: "model",
                parts: [{ text: "Network error. Please check your connection and try again." }]
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = () => {
        if (!input.trim() || isLoading || rateLimitCountdown > 0) return;
        const text = input.trim();
        setInput("");
        sendMessage(text);
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-[60]"
                    >
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="h-14 w-14 rounded-full p-0 bg-zinc-900 hover:bg-zinc-800 shadow-xl shadow-indigo-500/10 flex items-center justify-center group border-2 border-white/10 overflow-hidden"
                        >
                            <div className="relative h-full w-full">
                                <img
                                    src="/guru-logo.jpeg"
                                    alt="AI Guru"
                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                                />
                            </div>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-black border-l border-zinc-800 z-[55] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center text-indigo-400 border border-zinc-700 overflow-hidden">
                                    <img src="/guru-logo.jpeg" alt="Guru" className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white tracking-tight">AI Guru</h3>
                                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Expert Help: {subjectName}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-zinc-800">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-24"
                        >
                            {messages.length === 0 && rateLimitCountdown === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-6">
                                    <div className="h-16 w-16 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 mb-2">
                                        <MessageSquare className="h-8 w-8 text-zinc-700" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white tracking-tighter">Tell me where u are stuck</h4>
                                    <p className="text-sm text-zinc-500 leading-relaxed italic">
                                        &ldquo;Ask me to explain any question from the previous papers, or clarify a concept you&apos;re struggling with.&rdquo;
                                    </p>
                                </div>
                            ) : (
                                messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`h-8 w-8 rounded-lg shrink-0 flex items-center justify-center border ${msg.role === 'user'
                                            ? 'bg-zinc-900 border-zinc-800 text-zinc-400'
                                            : 'bg-indigo-500/20 border-indigo-500/20 text-indigo-400'
                                            }`}>
                                            {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                        </div>
                                        <div className="max-w-[85%] space-y-2">
                                            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-zinc-900 border border-zinc-800 text-white rounded-tr-none'
                                                : 'bg-indigo-500/5 text-zinc-300 border border-indigo-500/10 rounded-tl-none prose prose-invert'
                                                }`}>
                                                {msg.parts[0].text}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                            {/* Loading indicator */}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-indigo-500/20 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    </div>
                                    <div className="bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                    className="h-1.5 w-1.5 bg-indigo-400 rounded-full"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Rate limit countdown bubble */}
                            {rateLimitCountdown > 0 && !isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3"
                                >
                                    <div className="h-8 w-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                                        <Clock className="h-4 w-4" />
                                    </div>
                                    <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                                        <p className="text-amber-400 font-semibold text-sm">API Rate Limit Hit</p>
                                        <p className="text-zinc-400 text-xs mt-1">
                                            Auto-retrying your message in{" "}
                                            <span className="text-amber-400 font-bold text-sm">{rateLimitCountdown}s</span>
                                            …
                                        </p>
                                        <button
                                            onClick={() => {
                                                clearInterval(countdownRef.current!);
                                                if (pendingMessageRef.current) sendMessage(pendingMessageRef.current);
                                            }}
                                            className="mt-2 text-xs text-amber-400 hover:text-amber-300 underline transition-colors"
                                        >
                                            Retry now
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-zinc-800 bg-zinc-900/30 backdrop-blur-xl absolute bottom-0 inset-x-0">
                            {rateLimitCountdown > 0 && (
                                <div className="flex items-center gap-2 mb-3 px-1">
                                    <div className="relative w-5 h-5">
                                        <div className="absolute inset-0 rounded-full border-2 border-amber-500/30" />
                                        <div
                                            className="absolute inset-0 rounded-full border-2 border-amber-400 border-t-transparent animate-spin"
                                            style={{ animationDuration: '1s' }}
                                        />
                                        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-amber-400">
                                            {rateLimitCountdown}
                                        </span>
                                    </div>
                                    <p className="text-xs text-amber-400/80">
                                        Rate limited — retrying in {rateLimitCountdown}s
                                    </p>
                                </div>
                            )}
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="relative group"
                            >
                                <input
                                    type="text"
                                    placeholder={rateLimitCountdown > 0 ? `Retrying in ${rateLimitCountdown}s…` : "Type your question..."}
                                    className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600 disabled:opacity-50"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={rateLimitCountdown > 0}
                                />
                                <Button
                                    type="submit"
                                    disabled={!input.trim() || isLoading || rateLimitCountdown > 0}
                                    size="icon"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-800 disabled:text-zinc-600"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
