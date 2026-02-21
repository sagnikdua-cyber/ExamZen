"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FlaskConical } from "lucide-react";

import physicsViva from "@/data/viva/physics";
import chemistryViva from "@/data/viva/chemistry";
import electronicsViva from "@/data/viva/electronics";
import electricalViva from "@/data/viva/electrical";
import engineeringDrawingViva from "@/data/viva/engineering-drawing";
import mechanicalWorkshopViva from "@/data/viva/mechanical-workshop";

const subjects = [
    physicsViva,
    chemistryViva,
    electronicsViva,
    electricalViva,
    engineeringDrawingViva,
    mechanicalWorkshopViva,
];

export default function VivaPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Header */}
            <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back</span>
                    </Link>
                    <div className="h-4 w-px bg-zinc-700" />
                    <div className="flex items-center gap-2">
                        <FlaskConical className="h-5 w-5 text-purple-400" />
                        <span className="font-semibold text-white">Viva Prep</span>
                        <span className="text-zinc-500 text-sm ml-1">— for practicals</span>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <div className="max-w-5xl mx-auto px-4 pt-12 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-6">
                        <span>🎓</span>
                        <span>6 subjects · Complete practical theory &amp; Q&amp;A</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Practical Viva{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            Preparation
                        </span>
                    </h1>
                    <p className="text-zinc-400 text-base max-w-xl mx-auto">
                        Theory, formulas, procedure, and expected viva questions for every experiment.
                        Crack your practical exams with confidence.
                    </p>
                </motion.div>
            </div>

            {/* Subject Grid */}
            <div className="max-w-5xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subjects.map((subject, index) => (
                        <motion.div
                            key={subject.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.07 }}
                        >
                            <Link
                                href={`/viva/${subject.slug}`}
                                className={`group block relative overflow-hidden rounded-2xl border ${subject.border} ${subject.bg} hover:bg-zinc-900/60 transition-all duration-300 p-6 h-full`}
                            >
                                {/* Icon */}
                                <div className="text-4xl mb-3">{subject.icon}</div>

                                {/* Name */}
                                <h2 className={`text-lg font-bold ${subject.color} mb-1`}>
                                    {subject.name}
                                </h2>
                                <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">
                                    {subject.short}
                                </p>

                                {/* Experiment count pills */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${subject.bg} ${subject.color} border ${subject.border}`}>
                                        📋 {subject.experiments.length}{" "}
                                        {subject.slug === "mechanical-workshop" || subject.slug === "electronics"
                                            ? "modules"
                                            : "experiments"}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/30">
                                        💬{" "}
                                        {subject.experiments.reduce(
                                            (acc, e) => acc + e.vivaQuestions.length,
                                            0
                                        )}{" "}
                                        Q&amp;As
                                    </span>
                                </div>

                                {/* Arrow */}
                                <div
                                    className={`flex items-center text-xs font-semibold ${subject.color} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                                >
                                    Open Viva Prep{" "}
                                    <ArrowRight className="ml-1.5 h-3 w-3" />
                                </div>

                                {/* Animated gradient hover */}
                                <div
                                    className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent pointer-events-none`}
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Footer hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-zinc-600 text-sm mt-10"
                >
                    Click any subject to browse experiments &amp; start preparing for your viva.
                </motion.p>
            </div>
        </div>
    );
}
