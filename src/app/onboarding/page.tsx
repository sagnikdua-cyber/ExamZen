"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import {
    BookOpen,
    Brain,
    MessageSquare,
    Calculator,
    Trophy,
    CheckCircle2,
    Sparkles,
    Lightbulb,
    ArrowRight
} from "lucide-react";

const steps = [
    {
        title: "Step 1: Solve PYQs subject-wise",
        description: "Master the most important topics from previous years.",
        icon: BookOpen,
        color: "text-blue-400",
        bg: "bg-blue-500/10"
    },
    {
        title: "Step 2: Use AI Predicted Questions",
        description: "Get smarter with our AI-powered probable questions.",
        icon: Brain,
        color: "text-purple-400",
        bg: "bg-purple-500/10"
    },
    {
        title: "Step 3: Practice Viva Questions",
        description: "Be ready for practical assessments and viva voce.",
        icon: MessageSquare,
        color: "text-pink-400",
        bg: "bg-pink-500/10"
    },
    {
        title: "Step 4: Use Sessional AI tools",
        description: "Ace your sessional exams with targeted preparation.",
        icon: Calculator,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10"
    },
    {
        title: "Step 5: Track Exam Readiness Score",
        description: "Know exactly how prepared you are for the real deal.",
        icon: Trophy,
        color: "text-green-400",
        bg: "bg-green-500/10"
    }
];

const tips = [
    "Use 7 days before exam",
    "Focus on repeated PYQs",
    "Revise flashcards daily"
];

export default function OnboardingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleStart = async () => {
        setLoading(true);
        try {
            await fetch("/api/user/onboarding", { method: "POST" });
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            router.push("/dashboard");
        }
    };

    return (
        <main className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header */}
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex p-3 rounded-full bg-purple-500/20 border border-purple-500/30"
                    >
                        <Sparkles className="h-8 w-8 text-purple-400" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-tighter"
                    >
                        How to Become <span className="text-purple-400 italic">Exam Ready</span> <br />
                        Using This App
                    </motion.h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Steps Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <CheckCircle2 className="text-purple-400" />
                            The Roadmap to Success
                        </h2>
                        <div className="space-y-4">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors"
                                >
                                    <div className={`p-3 rounded-xl ${step.bg} ${step.color}`}>
                                        <step.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{step.title}</h3>
                                        <p className="text-zinc-400 text-sm mt-1">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Tips & CTA Section */}
                    <div className="space-y-8">
                        {/* Tips Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="p-6 rounded-2xl border border-purple-500/30 bg-purple-500/5 space-y-4 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Lightbulb className="h-12 w-12" />
                            </div>
                            <h3 className="font-bold text-xl flex items-center gap-2">
                                <Lightbulb className="h-5 w-5 text-yellow-400" />
                                Expert Tips
                            </h3>
                            <ul className="space-y-3">
                                {tips.map((tip, index) => (
                                    <li key={index} className="flex items-center gap-2 text-zinc-300">
                                        <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Button
                                size="lg"
                                variant="premium"
                                className="w-full py-8 text-xl group relative overflow-hidden"
                                onClick={handleStart}
                                disabled={loading}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {loading ? "Initializing..." : "Start Preparing Now"}
                                    {!loading && <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
