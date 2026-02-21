"use client";
import { useEffect, useState } from "react";
import { motion as fm, AnimatePresence } from "framer-motion";
import { Trophy, AlertCircle, Lightbulb, ArrowRight, Zap } from "lucide-react";
import { ReadinessSkeleton } from "./Skeleton";

interface ProgressData {
    readiness: number;
    weakSubjects: string[];
    suggestions: string[];
    stats: {
        pyqs: number;
        ai: number;
        viva: number;
        flashcards: number;
    };
}

export default function ReadinessTracker() {
    const [data, setData] = useState<ProgressData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showResetPopup, setShowResetPopup] = useState(false);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await fetch("/api/progress");
                const json = await res.json();
                setData(json);
                if (json.wasReset) {
                    setShowResetPopup(true);
                }
            } catch (error) {
                console.error("Failed to fetch progress:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProgress();
    }, []);

    if (loading) return <ReadinessSkeleton />;

    const readinessScore = data?.readiness || 0;

    // Circular Progress Params
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (readinessScore / 100) * circumference;

    return (
        <div className="space-y-6">
            {/* Reset Notification Popup */}
            <AnimatePresence>
                {showResetPopup && (
                    <fm.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <fm.div
                            className="bg-zinc-900 border border-purple-500/50 p-8 rounded-3xl max-w-sm w-full text-center shadow-[0_0_50px_-12px_rgba(168,85,247,0.4)] relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

                            <div className="h-20 w-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
                                <Zap className="h-10 w-10 text-purple-400 fill-current" />
                            </div>

                            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">New Exam Season Begins 🚀</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                                Your progress has been reset for the new cycle.
                                <br />
                                <span className="text-purple-400/80 font-medium">Start fresh and aim higher!</span>
                            </p>

                            <button
                                onClick={() => setShowResetPopup(false)}
                                className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-purple-900/20 active:scale-95"
                            >
                                Let's Get Started
                            </button>
                        </fm.div>
                    </fm.div>
                )}
            </AnimatePresence>
            <fm.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 relative overflow-hidden group"
            >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-purple-600/10 transition-colors pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    {/* Circular Scale */}
                    <div className="relative h-40 w-40 flex items-center justify-center shrink-0">
                        <svg className="h-full w-full transform -rotate-90">
                            <circle
                                cx="80"
                                cy="80"
                                r={radius}
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="8"
                                className="text-zinc-800"
                            />
                            <fm.circle
                                cx="80"
                                cy="80"
                                r={radius}
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeDasharray={circumference}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="text-purple-500"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-white tracking-tighter">{readinessScore}%</span>
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Ready</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <div className="flex items-center gap-2 text-purple-400 mb-2">
                                <Trophy className="h-5 w-5" />
                                <h2 className="text-xl font-bold text-white tracking-tight">Exam Readiness System</h2>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                                Your overall preparation status across all modules. {readinessScore < 30 ? "Let's start your journey!" : readinessScore < 70 ? "Good progress, keep going!" : "You're doing great, almost there!"}
                            </p>
                        </div>

                        {/* Stats mini-grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: "PYQs", val: data?.stats.pyqs || 0, color: "text-blue-400" },
                                { label: "AI Guru", val: data?.stats.ai || 0, color: "text-purple-400" },
                                { label: "Viva", val: data?.stats.viva || 0, color: "text-pink-400" },
                                { label: "Cards", val: data?.stats.flashcards || 0, color: "text-emerald-400" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3">
                                    <div className={`text-lg font-bold ${stat.color} leading-none mb-1`}>{stat.val}</div>
                                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Insights Footer */}
                <div className="mt-8 pt-8 border-t border-zinc-800/50 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Weak Subjects */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-amber-500">
                            <AlertCircle className="h-4 w-4" />
                            <h3 className="text-xs font-black uppercase tracking-widest">Attention Required</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {data?.weakSubjects && data.weakSubjects.length > 0 ? (
                                data.weakSubjects.map((sub, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs font-semibold">
                                        {sub}
                                    </span>
                                ))
                            ) : (
                                <span className="text-zinc-500 text-xs italic">All subjects are being covered well!</span>
                            )}
                        </div>
                    </div>

                    {/* Suggestions */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-blue-400">
                            <Lightbulb className="h-4 w-4" />
                            <h3 className="text-xs font-black uppercase tracking-widest">Recommended Actions</h3>
                        </div>
                        <ul className="space-y-2">
                            {data?.suggestions.map((sug, i) => (
                                <fm.li
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    key={i}
                                    className="flex gap-2 text-xs text-zinc-400 leading-relaxed group/item"
                                >
                                    <Zap className="h-3 w-3 mt-0.5 text-blue-500 shrink-0 group-hover/item:scale-125 transition-transform" />
                                    <span>{sug}</span>
                                </fm.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </fm.div>
        </div>
    );
}
