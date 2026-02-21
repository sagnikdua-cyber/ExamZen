"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    Star,
    Send,
    Sparkles,
    ArrowLeft,
    User as UserIcon,
    Clock,
    Quote
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";

interface FeedbackItem {
    _id: string;
    username: string;
    message: string;
    rating: number;
    createdAt: string;
}

export default function FeedbackPage() {
    const { data: session } = useSession();
    const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hoveredRating, setHoveredRating] = useState(0);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const res = await fetch("/api/feedback");
            const data = await res.json();
            setFeedbacks(data);
        } catch (error) {
            console.error("Failed to fetch feedback:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, rating }),
            });

            if (res.ok) {
                setMessage("");
                setRating(5);
                fetchFeedbacks();
            }
        } catch (error) {
            console.error("Failed to submit feedback:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white pb-20">
            {/* Nav Space */}
            <div className="h-16 border-b border-zinc-900 bg-black/50 backdrop-blur-md sticky top-0 z-50 flex items-center px-6 justify-between">
                <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Dashboard</span>
                </Link>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    ExamZen
                </span>
                <div className="w-20" /> {/* Spacer */}
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
                {/* Header Section */}
                <div className="text-center space-y-4 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-2"
                    >
                        <Sparkles className="h-3 w-3" />
                        Community Board
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black tracking-tighter"
                    >
                        Help Us <span className="text-purple-500">Improve.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-lg max-w-2xl mx-auto"
                    >
                        Your feedback drives our updates. Share your thoughts, report issues, or suggest features to make ExamZen better for everyone.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Submission Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl sticky top-24">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-purple-500" />
                                Your Review
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-3">
                                        Satisfaction Rating
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                onClick={() => setRating(star)}
                                                className="transition-transform active:scale-90"
                                            >
                                                <Star
                                                    className={`h-8 w-8 transition-colors ${(hoveredRating || rating) >= star
                                                        ? "text-yellow-400 fill-yellow-400"
                                                        : "text-zinc-700 hover:text-zinc-500"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-3">
                                        Your Thoughts
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="What feature should we add next? Any specific topic you want more PYQs for?"
                                        className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !message.trim()}
                                    className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Post Review
                                            <Send className="h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Feedback List */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Quote className="h-5 w-5 text-purple-500" />
                                Student Voices
                            </h2>
                            <span className="text-xs text-zinc-500 font-medium">
                                {feedbacks.length} Reviews
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <div className="h-8 w-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase">Loading Reviews...</p>
                            </div>
                        ) : feedbacks.length === 0 ? (
                            <div className="text-center py-20 border border-zinc-800 rounded-3xl bg-zinc-900/10">
                                <p className="text-zinc-500 italic">No reviews yet. Be the first to share your experience!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AnimatePresence mode="popLayout">
                                    {feedbacks.map((fb, idx) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            key={fb._id}
                                            className="p-6 rounded-3xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all flex flex-col justify-between"
                                        >
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-3 w-3 ${i < fb.rating ? "text-yellow-400 fill-yellow-400" : "text-zinc-800"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-tight">
                                                        <Clock className="h-3 w-3" />
                                                        {new Date(fb.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <p className="text-zinc-300 text-sm leading-relaxed italic">
                                                    "{fb.message}"
                                                </p>
                                            </div>

                                            <div className="mt-6 flex items-center gap-3 pt-6 border-t border-zinc-800/50">
                                                <div className="h-8 w-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                                    <UserIcon className="h-4 w-4 text-purple-400" />
                                                </div>
                                                <div className="text-xs font-bold text-white tracking-tight">
                                                    {fb.username}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
