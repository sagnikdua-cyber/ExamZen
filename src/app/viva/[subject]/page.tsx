"use client";

import { useState, use, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    ArrowLeft,
    ChevronDown,
    BookOpen,
    FlaskConical,
    MessageSquare,
    Lightbulb,
    ListOrdered,
    Sparkles,
} from "lucide-react";

import physicsViva from "@/data/viva/physics";
import chemistryViva from "@/data/viva/chemistry";
import electronicsViva from "@/data/viva/electronics";
import electricalViva from "@/data/viva/electrical";
import engineeringDrawingViva from "@/data/viva/engineering-drawing";
import mechanicalWorkshopViva from "@/data/viva/mechanical-workshop";
import type { VivaSubject, VivaExperiment } from "@/data/viva/physics";

const allSubjects: VivaSubject[] = [
    physicsViva,
    chemistryViva,
    electronicsViva,
    electricalViva,
    engineeringDrawingViva,
    mechanicalWorkshopViva,
];

type SectionTab = "theory" | "procedure" | "viva";

function ExperimentCard({
    experiment,
    color,
    bg,
    border,
}: {
    experiment: VivaExperiment;
    color: string;
    bg: string;
    border: string;
}) {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<SectionTab>("theory");
    const [expandedQ, setExpandedQ] = useState<number | null>(null);

    const tabs: { id: SectionTab; label: string; icon: React.ReactNode }[] = [
        { id: "theory", label: "Theory", icon: <BookOpen className="h-3.5 w-3.5" /> },
        { id: "procedure", label: "Procedure", icon: <ListOrdered className="h-3.5 w-3.5" /> },
        { id: "viva", label: `Viva Q&A (${experiment.vivaQuestions.length})`, icon: <MessageSquare className="h-3.5 w-3.5" /> },
    ];

    return (
        <div className={`rounded-2xl border ${border} bg-zinc-900/40 overflow-hidden`}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-800/30 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className={`flex-shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold ${bg} ${color} border ${border}`}>
                        {experiment.id}
                    </span>
                    <span className="font-semibold text-white text-sm leading-snug">{experiment.name}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-zinc-500 flex-shrink-0 ml-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-zinc-800">
                            {/* Tab bar */}
                            <div className="flex border-b border-zinc-800 bg-zinc-900/50">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium transition-colors border-b-2 ${activeTab === tab.id
                                            ? `${color} border-current`
                                            : "text-zinc-500 border-transparent hover:text-zinc-300"
                                            }`}
                                    >
                                        {tab.icon}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-5">
                                {activeTab === "theory" && (
                                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                                        {experiment.theory.formulas.length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
                                                    <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-wide">Key Formulas</h4>
                                                </div>
                                                <div className="space-y-2">
                                                    {experiment.theory.formulas.map((f, i) => (
                                                        <div key={i} className="bg-zinc-800/60 border border-zinc-700/40 rounded-lg px-4 py-2.5 font-mono text-xs text-amber-300 leading-relaxed">
                                                            {f}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {experiment.theory.importantTopics.length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                                                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wide">Important Topics</h4>
                                                </div>
                                                <ul className="space-y-2">
                                                    {experiment.theory.importantTopics.map((t, i) => (
                                                        <li key={i} className="flex gap-2.5 text-sm text-zinc-300 leading-relaxed">
                                                            <span className="text-blue-400 mt-1 flex-shrink-0">▸</span>
                                                            <span>{t}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {experiment.theory.usefulPoints.length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Lightbulb className="h-3.5 w-3.5 text-green-400" />
                                                    <h4 className="text-xs font-bold text-green-400 uppercase tracking-wide">Useful Tips</h4>
                                                </div>
                                                <ul className="space-y-2">
                                                    {experiment.theory.usefulPoints.map((u, i) => (
                                                        <li key={i} className="flex gap-2.5 text-sm text-zinc-300 leading-relaxed">
                                                            <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                                                            <span>{u}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === "procedure" && (
                                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                                        <ol className="space-y-3">
                                            {experiment.procedure.map((step, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-400 mt-0.5">
                                                        {i + 1}
                                                    </span>
                                                    <p className="text-sm text-zinc-300 leading-relaxed">{step}</p>
                                                </li>
                                            ))}
                                        </ol>
                                    </motion.div>
                                )}

                                {activeTab === "viva" && (
                                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                        {experiment.vivaQuestions.map((qa, i) => (
                                            <div key={i} className={`rounded-xl border ${border} overflow-hidden`}>
                                                <button
                                                    onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                                                    className="w-full flex items-start justify-between p-4 text-left hover:bg-zinc-800/20 transition-colors gap-3"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <span className={`flex-shrink-0 text-xs font-bold ${color} mt-0.5`}>Q{i + 1}.</span>
                                                        <span className="text-sm font-medium text-white leading-snug">{qa.q}</span>
                                                    </div>
                                                    <ChevronDown className={`h-4 w-4 text-zinc-500 flex-shrink-0 transition-transform duration-200 ${expandedQ === i ? "rotate-180" : ""}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {expandedQ === i && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className={`px-4 pb-4 border-t ${border} pt-3 ${bg}`}>
                                                                <p className="text-sm text-zinc-200 leading-relaxed">{qa.a}</p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function VivaSubjectPage({ params }: { params: Promise<{ subject: string }> }) {
    const { subject: slug } = use(params);
    const subject = allSubjects.find((s) => s.slug === slug);

    useEffect(() => {
        if (subject) {
            fetch("/api/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "VIVA_USAGE", metadata: { subjectSlug: slug } }),
            }).catch(e => console.error("Track Viva error:", e));
        }
    }, [subject, slug]);

    if (!subject) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-4">
                <p className="text-zinc-400 text-lg">Subject not found: <span className="text-red-400 font-mono">{slug}</span></p>
                <Link href="/viva" className="text-purple-400 underline">← Back to Viva Prep</Link>
            </div>
        );
    }

    const totalQAs = subject.experiments.reduce((acc, e) => acc + e.vivaQuestions.length, 0);

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Header */}
            <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/viva" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Viva Prep</span>
                    </Link>
                    <div className="h-4 w-px bg-zinc-700" />
                    <span className={`text-sm font-semibold ${subject.color}`}>{subject.icon} {subject.name}</span>
                </div>
            </div>

            {/* Subject hero */}
            <div className="max-w-3xl mx-auto px-4 pt-10 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl border ${subject.border} ${subject.bg} p-6 mb-8`}
                >
                    <div className="text-5xl mb-3">{subject.icon}</div>
                    <h1 className={`text-2xl font-bold ${subject.color} mb-1`}>{subject.name}</h1>
                    <p className="text-zinc-400 text-sm mb-4">Complete viva preparation — theory, procedure, and Q&amp;A</p>
                    <div className="flex flex-wrap gap-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${subject.bg} ${subject.color} border ${subject.border}`}>
                            <FlaskConical className="h-3 w-3" />
                            {subject.experiments.length} experiments
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-800/60 text-zinc-400 border border-zinc-700/30">
                            <MessageSquare className="h-3 w-3" />
                            {totalQAs} viva Q&amp;As
                        </span>
                    </div>
                </motion.div>

                {/* Experiments list */}
                <div className="space-y-3">
                    {subject.experiments.map((experiment, index) => (
                        <motion.div
                            key={experiment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04 }}
                        >
                            <ExperimentCard
                                experiment={experiment}
                                color={subject.color}
                                bg={subject.bg}
                                border={subject.border}
                            />
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-zinc-600 text-sm mt-10"
                >
                    Click any experiment to expand theory · procedure · viva Q&amp;As
                </motion.p>
            </div>
        </div>
    );
}
