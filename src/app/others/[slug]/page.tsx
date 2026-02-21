"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, BookOpen, HelpCircle, ChevronDown, ChevronUp,
    CheckCircle2, XCircle, Trophy, RotateCcw, AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { othersData, StudySection, SampleQuestion } from "@/data/others-content";

type Tab = "study" | "questions";

// ── Markdown-lite renderer ────────────────────────────────────────────────────
function renderContent(raw: string): React.ReactNode[] {
    const lines = raw.split("\n");
    const nodes: React.ReactNode[] = [];
    let tableLines: string[] = [];
    let inTable = false;

    function flushTable() {
        if (!tableLines.length) return;
        const allRows = tableLines.map(l => l.split("|").filter((_, i, a) => i > 0 && i < a.length - 1).map(c => c.trim()));
        const header = allRows[0];
        const body = allRows.slice(2); // skip separator row
        nodes.push(
            <div key={`table-${nodes.length}`} className="overflow-x-auto my-4">
                <table className="min-w-full text-xs border-collapse">
                    <thead>
                        <tr className="bg-zinc-800/60">
                            {header.map((h, i) => <th key={i} className="px-3 py-2 text-left text-zinc-300 font-bold border border-zinc-700">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {body.map((row, ri) => (
                            <tr key={ri} className={ri % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/20"}>
                                {row.map((cell, ci) => <td key={ci} className="px-3 py-2 text-zinc-400 border border-zinc-800">{cell}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
        tableLines = [];
        inTable = false;
    }

    lines.forEach((line, i) => {
        if (line.startsWith("|")) {
            inTable = true;
            tableLines.push(line);
            return;
        }
        if (inTable) flushTable();

        if (!line.trim()) { nodes.push(<div key={i} className="h-2" />); return; }
        if (line.startsWith("**") && line.endsWith("**") && !line.slice(2, -2).includes("**")) {
            nodes.push(<p key={i} className="font-bold text-zinc-100 mt-3 mb-1">{line.slice(2, -2)}</p>); return;
        }
        if (line.startsWith("• ")) {
            // parse inline bold
            const parts = line.slice(2).split(/(\*\*[^*]+\*\*)/g);
            nodes.push(
                <li key={i} className="ml-4 text-zinc-400 text-sm list-disc list-outside">
                    {parts.map((p, pi) => p.startsWith("**") ? <strong key={pi} className="text-zinc-200">{p.slice(2, -2)}</strong> : p)}
                </li>
            );
            return;
        }
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        nodes.push(
            <p key={i} className="text-zinc-400 text-sm leading-relaxed">
                {parts.map((p, pi) => p.startsWith("**") ? <strong key={pi} className="text-zinc-200">{p.slice(2, -2)}</strong> : p)}
            </p>
        );
    });
    if (inTable) flushTable();
    return nodes;
}

// ── Study Section Accordion ───────────────────────────────────────────────────
function SectionCard({ section, color, border, bg, index }: { section: StudySection; color: string; border: string; bg: string; index: number }) {
    const [open, setOpen] = useState(index === 0);
    return (
        <div className={`rounded-2xl border ${border} overflow-hidden`}>
            <button
                onClick={() => setOpen(o => !o)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left ${open ? bg : "bg-zinc-900/30 hover:bg-zinc-900/50"} transition-all`}
            >
                <span className={`font-bold text-sm ${open ? color : "text-zinc-300"}`}>{section.title}</span>
                {open ? <ChevronUp className={`h-4 w-4 ${color}`} /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`px-5 py-4 border-t ${border} bg-zinc-900/20`}
                    >
                        <div className="space-y-1">{renderContent(section.content)}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ── Quiz Component ────────────────────────────────────────────────────────────
function QuizView({ questions, color, border, bg }: { questions: SampleQuestion[]; color: string; border: string; bg: string }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
    const [view, setView] = useState<"quiz" | "results">("quiz");

    const q = questions[current];

    function pick(i: number) {
        if (selected !== null) return;
        setSelected(i);
        const updated = [...answers]; updated[current] = i; setAnswers(updated);
    }

    function next() {
        if (current + 1 >= questions.length) { setView("results"); return; }
        setCurrent(c => c + 1); setSelected(null);
    }

    function retry() {
        setCurrent(0); setSelected(null);
        setAnswers(new Array(questions.length).fill(null));
        setView("quiz");
    }

    const finalScore = answers.filter((a, i) => a === questions[i]?.answer).length;

    if (view === "results") {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div className={`p-8 rounded-3xl border ${border} ${bg} text-center space-y-3`}>
                    <Trophy className={`h-12 w-12 mx-auto ${color}`} />
                    <h2 className="text-2xl font-black text-white">Quiz Complete!</h2>
                    <p className={`text-5xl font-black ${color}`}>{finalScore}/{questions.length}</p>
                    <p className="text-zinc-400 text-sm">
                        {finalScore === questions.length ? "🎉 Perfect score!" :
                            finalScore >= questions.length * 0.7 ? "👏 Great job!" :
                                finalScore >= questions.length * 0.4 ? "💪 Good effort — keep revising!" :
                                    "📚 Read the study material again!"}
                    </p>
                </div>
                <div className="space-y-3">
                    {questions.map((qs, i) => {
                        const ua = answers[i]; const correct = ua === qs.answer;
                        return (
                            <div key={qs.id} className={`p-4 rounded-xl border ${correct ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"}`}>
                                <div className="flex gap-3">
                                    {correct ? <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" /> : <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />}
                                    <div>
                                        <p className="text-zinc-200 text-sm font-medium mb-1">Q{i + 1}: {qs.question}</p>
                                        {!correct && (
                                            <div className="space-y-1">
                                                <p className="text-red-400 text-xs">Your answer: {ua !== null ? qs.options[ua] : "Not answered"}</p>
                                                <p className="text-green-400 text-xs">Correct: {qs.options[qs.answer]}</p>
                                                <p className="text-zinc-500 text-xs mt-1">{qs.explanation}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button onClick={retry} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-700 bg-zinc-800/40 text-zinc-300 hover:bg-zinc-800/70 text-sm font-semibold transition-all">
                    <RotateCcw className="h-4 w-4" /> Try Again
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div key={`q-${current}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            {/* Progress */}
            <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-500">
                    <span>Question {current + 1} of {questions.length}</span>
                    <span className={`font-semibold ${color}`}>{q.topic}</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full">
                    <div className={`h-full rounded-full transition-all duration-500 ${bg.replace('/10', '/70')}`} style={{ width: `${((current) / questions.length) * 100}%` }} />
                </div>
            </div>

            {/* Question */}
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <p className="text-zinc-100 font-medium text-sm leading-relaxed mb-4">{q.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, i) => {
                        const isSelected = selected === i; const isCorrect = i === q.answer;
                        const showResult = selected !== null;
                        let cls = "border border-zinc-700 bg-zinc-800/40 text-zinc-300 hover:bg-zinc-800/70";
                        if (showResult) {
                            if (isCorrect) cls = "border-green-500/60 bg-green-500/10 text-green-300";
                            else if (isSelected) cls = "border-red-500/60 bg-red-500/10 text-red-300";
                            else cls = "border-zinc-800 bg-zinc-900/20 text-zinc-600";
                        }
                        return (
                            <button key={i} onClick={() => pick(i)} disabled={selected !== null}
                                className={`flex items-center gap-2.5 p-3.5 rounded-xl text-left text-sm transition-all ${cls} disabled:cursor-default`}>
                                <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-bold ${showResult && isCorrect ? "border-green-500 text-green-400" : showResult && isSelected ? "border-red-500 text-red-400" : "border-zinc-600 text-zinc-500"}`}>
                                    {String.fromCharCode(65 + i)}
                                </span>
                                <span className="flex-1">{opt}</span>
                                {showResult && isCorrect && <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />}
                                {showResult && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Explanation + Next */}
            <AnimatePresence>
                {selected !== null && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl border ${selected === q.answer ? "border-green-500/30 bg-green-500/5" : "border-amber-500/30 bg-amber-500/5"}`}>
                        <p className={`text-xs font-bold mb-1 ${selected === q.answer ? "text-green-400" : "text-amber-400"}`}>
                            {selected === q.answer ? "✓ Correct!" : "✗ Incorrect"}
                        </p>
                        <p className="text-zinc-300 text-sm leading-relaxed">{q.explanation}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {selected !== null && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={next}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border ${border} ${bg} ${color} hover:brightness-125 transition-all`}>
                    {current + 1 >= questions.length ? <><Trophy className="h-4 w-4" /> View Results</> : <>Next Question →</>}
                </motion.button>
            )}
        </motion.div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function OthersSubjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const subject = othersData[slug];
    const [tab, setTab] = useState<Tab>("study");

    if (!subject) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
                    <p className="text-zinc-400">Subject not found.</p>
                    <Link href="/subjects/sessional" className="text-violet-400 hover:underline mt-2 block">← Back</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 space-y-6">

                {/* Header */}
                <div className="space-y-3">
                    <Link href="/subjects/sessional" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors text-sm">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sessional
                    </Link>
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${subject.border} ${subject.bg} ${subject.color}`}>
                            {subject.short}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{subject.name}</h1>
                    </div>
                    <p className="text-zinc-500 text-sm">{subject.description}</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-3">
                    <button
                        onClick={() => setTab("study")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all border ${tab === "study" ? `${subject.border} ${subject.bg} ${subject.color}` : "border-zinc-700 bg-zinc-900/30 text-zinc-400 hover:text-white hover:bg-zinc-800/50"}`}
                    >
                        <BookOpen className="h-4 w-4" /> Study Material
                    </button>
                    <button
                        onClick={() => setTab("questions")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all border ${tab === "questions" ? `${subject.border} ${subject.bg} ${subject.color}` : "border-zinc-700 bg-zinc-900/30 text-zinc-400 hover:text-white hover:bg-zinc-800/50"}`}
                    >
                        <HelpCircle className="h-4 w-4" /> Sample Questions
                    </button>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {tab === "study" && (
                        <motion.div key="study" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                                {subject.studyMaterial.length} Study Units
                            </p>
                            {subject.studyMaterial.map((section, i) => (
                                <SectionCard
                                    key={section.title}
                                    section={section}
                                    color={subject.color}
                                    border={subject.border}
                                    bg={subject.bg}
                                    index={i}
                                />
                            ))}
                        </motion.div>
                    )}
                    {tab === "questions" && (
                        <motion.div key="questions" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-4">
                                {subject.sampleQuestions.length} Sample Questions
                            </p>
                            <QuizView
                                questions={subject.sampleQuestions}
                                color={subject.color}
                                border={subject.border}
                                bg={subject.bg}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
