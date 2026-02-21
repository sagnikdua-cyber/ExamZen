"use client";
import { Button } from "@/components/Button";
import { ArrowLeft, Brain, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AIPredictionPage() {
    return (
        <div className="min-h-screen bg-background p-6 md:p-12 flex items-center justify-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-2xl mx-auto text-center relative z-10">
                <Link href="/dashboard" className="absolute left-0 -top-12 inline-flex items-center text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
                </Link>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300"
                >
                    <Brain className="h-12 w-12" />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-6"
                >
                    AI Exam Predictions
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-zinc-400 mb-8"
                >
                    Our AI analyzes past 10 years of question papers to predict the most likely questions for your upcoming exam.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 mb-8"
                >
                    <div className="flex items-center justify-center gap-2 text-zinc-400 mb-2">
                        <Lock className="h-4 w-4" />
                        <span className="text-sm">Premium Feature</span>
                    </div>
                    <p className="text-zinc-500 text-sm">Unlock to see the top 50 predicted questions for <b>Basic Electronics Engineering</b>.</p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-4 justify-center"
                >
                    <Button variant="premium" size="lg" className="w-full sm:w-auto">
                        <Sparkles className="mr-2 h-4 w-4" /> Unlock Predictions
                    </Button>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        View Sample
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
