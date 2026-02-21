"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    XCircle,
    ChevronRight,
    Lightbulb,
    Trophy,
    RotateCcw,
    Target,
    Zap,
    AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { sdpData, MCQuestion } from "@/data/sdp-questions";

type View = "topics" | "learn" | "quiz" | "results";

const difficultyColor: Record<string, string> = {
    Easy: "text-green-400 bg-green-500/10 border-green-500/20",
    Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    Hard: "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function SDPSubjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const subject = sdpData[slug];

    const [view, setView] = useState<View>("topics");
    const [activeTopic, setActiveTopic] = useState(0);
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [answers, setAnswers] = useState<(number | null)[]>([]);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);

    const topic = subject?.topics?.[activeTopic];
    const questions = topic?.questions ?? [];
    const question: MCQuestion | undefined = questions[currentQ];

    // Reset quiz state when topic changes
    useEffect(() => {
        setCurrentQ(0);
        setSelected(null);
        setAnswers([]);
        setShowExplanation(false);
        setScore(0);
    }, [activeTopic]);

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

    function handleSelectTopic(idx: number) {
        setActiveTopic(idx);
        setView("learn");
    }

    function handleStartQuiz() {
        setCurrentQ(0);
        setSelected(null);
        setAnswers(new Array(questions.length).fill(null));
        setShowExplanation(false);
        setScore(0);
        setView("quiz");
    }

    function handleSelectAnswer(idx: number) {
        const q = questions[currentQ];
        if (selected !== null || !q) return; // already answered or no question
        setSelected(idx);
        setShowExplanation(true);
        if (idx === q.answer) {
            setScore(s => s + 1);
        }
        const updated = [...answers];
        updated[currentQ] = idx;
        setAnswers(updated);
    }

    function handleNext() {
        if (currentQ + 1 >= questions.length) {
            setView("results");
        } else {
            setCurrentQ(q => q + 1);
            setSelected(null);
            setShowExplanation(false);
        }
    }

    function handleRetry() {
        setCurrentQ(0);
        setSelected(null);
        setAnswers(new Array(questions.length).fill(null));
        setShowExplanation(false);
        setScore(0);
        setView("quiz");
    }

    const progress = questions.length > 0 ? ((currentQ) / questions.length) * 100 : 0;
    const finalScore = answers.filter((a, i) => a === questions[i]?.answer).length;

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 space-y-8">

                {/* Header */}
                <div className="space-y-3">
                    <Link href="/subjects/sessional" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors text-sm">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sessional
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${subject.border} ${subject.bg} ${subject.color}`}>
                            {subject.short}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{subject.name}</h1>
                    </div>
                </div>

                {/* ── TOPIC SELECTOR ── */}
                {view === "topics" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <p className="text-zinc-400 text-sm">Choose a topic to study and practice MCQs.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {subject.topics.map((t, i) => (
                                <motion.button
                                    key={t.slug}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07 }}
                                    onClick={() => handleSelectTopic(i)}
                                    className={`group relative overflow-hidden text-left p-5 rounded-2xl border ${subject.border} bg-zinc-900/30 hover:bg-zinc-900/70 transition-all`}
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />
                                    <div className="flex items-start justify-between mb-3">
                                        <span className={`text-2xl`}>{t.icon}</span>
                                        <span className="text-[10px] text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">
                                            {t.questions.length} MCQs
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-zinc-100 mb-1">{t.name}</h3>
                                    <p className="text-xs text-zinc-500 mb-3">
                                        {t.steps.length} key concepts to learn
                                    </p>
                                    <div className={`flex items-center text-xs font-semibold ${subject.color}`}>
                                        Start Learning <ChevronRight className="ml-1 h-3 w-3" />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── LEARN STEPS ── */}
                {view === "learn" && topic && (
                    <motion.div
                        key="learn"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm">
                            <button onClick={() => setView("topics")} className="text-zinc-500 hover:text-white transition-colors">Topics</button>
                            <ChevronRight className="h-3 w-3 text-zinc-700" />
                            <span className={`font-semibold ${subject.color}`}>{topic.name}</span>
                        </div>

                        {/* Topic card - Learn steps */}
                        <div className={`p-6 rounded-2xl border ${subject.border} ${subject.bg}`}>
                            <div className="flex items-center gap-2 mb-4">
                                <Lightbulb className={`h-5 w-5 ${subject.color}`} />
                                <h2 className={`text-lg font-bold ${subject.color}`}>Key Concepts — {topic.name}</h2>
                            </div>
                            <ol className="space-y-3">
                                {topic.steps.map((step, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black border ${subject.border} ${subject.bg} ${subject.color}`}>
                                            {i + 1}
                                        </span>
                                        <span className="text-zinc-200 text-sm leading-relaxed font-mono bg-zinc-900/40 px-3 py-1.5 rounded-lg border border-zinc-800 flex-1">
                                            {step}
                                        </span>
                                    </motion.li>
                                ))}
                            </ol>
                        </div>

                        {/* Preview question count */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                <Target className="h-4 w-4" />
                                <span>{topic.questions.length} Practice MCQs ({topic.questions.filter(q => q.difficulty === "Easy").length} Easy, {topic.questions.filter(q => q.difficulty === "Medium").length} Medium, {topic.questions.filter(q => q.difficulty === "Hard").length} Hard)</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleStartQuiz}
                            className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all border ${subject.border} ${subject.bg} ${subject.color} hover:brightness-125`}
                        >
                            <Zap className="h-5 w-5" /> Start MCQ Practice
                        </motion.button>
                    </motion.div>
                )}

                {/* ── QUIZ VIEW ── */}
                {view === "quiz" && question && (
                    <motion.div
                        key={`quiz-${currentQ}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Breadcrumb + progress */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <button onClick={() => setView("topics")} className="text-zinc-500 hover:text-white transition-colors">Topics</button>
                                <ChevronRight className="h-3 w-3 text-zinc-700" />
                                <button onClick={() => setView("learn")} className={`${subject.color} hover:brightness-125 transition-colors`}>{topic.name}</button>
                                <ChevronRight className="h-3 w-3 text-zinc-700" />
                                <span className="text-zinc-400">Q{currentQ + 1}/{questions.length}</span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full rounded-full ${subject.bg.replace('/10', '/80')}`}
                                    style={{ background: subject.color.includes('orange') ? '#f97316' : subject.color.includes('violet') ? '#8b5cf6' : '#06b6d4' }}
                                    initial={{ width: `${progress}%` }}
                                    animate={{ width: `${((currentQ) / questions.length) * 100}%` }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                        </div>

                        {/* Question card */}
                        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-5">
                            <div className="flex items-start justify-between gap-3">
                                <p className="text-zinc-100 font-medium text-base leading-relaxed flex-1">{question.question}</p>
                                <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${difficultyColor[question.difficulty]}`}>
                                    {question.difficulty}
                                </span>
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {question.options.map((opt, i) => {
                                    const isSelected = selected === i;
                                    const isCorrect = question && i === question.answer;
                                    const showResult = selected !== null;
                                    let cls = "border border-zinc-700 bg-zinc-800/40 text-zinc-300 hover:bg-zinc-800/80 hover:border-zinc-600";
                                    if (showResult) {
                                        if (isCorrect) cls = "border-green-500/60 bg-green-500/10 text-green-300";
                                        else if (isSelected && !isCorrect) cls = "border-red-500/10 bg-red-500/10 text-red-300";
                                        else cls = "border-zinc-800 bg-zinc-900/30 text-zinc-500";
                                    }

                                    return (
                                        <motion.button
                                            key={i}
                                            whileHover={selected === null ? { scale: 1.01 } : {}}
                                            whileTap={selected === null ? { scale: 0.99 } : {}}
                                            onClick={() => handleSelectAnswer(i)}
                                            disabled={selected !== null}
                                            className={`relative flex items-center gap-3 p-4 rounded-xl text-left text-sm transition-all ${cls} disabled:cursor-default`}
                                        >
                                            <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-bold ${showResult && isCorrect ? 'border-green-500 text-green-400' : showResult && isSelected ? 'border-red-500 text-red-400' : 'border-zinc-600 text-zinc-500'}`}>
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            <span className="flex-1">{opt}</span>
                                            {showResult && isCorrect && <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />}
                                            {showResult && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Explanation */}
                        <AnimatePresence>
                            {showExplanation && question && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={`p-5 rounded-2xl border ${question && selected === question.answer ? 'border-green-500/30 bg-green-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}
                                >
                                    <div className={`flex items-center gap-2 mb-2 text-sm font-bold ${question && selected === question.answer ? 'text-green-400' : 'text-amber-400'}`}>
                                        {question && selected === question.answer
                                            ? <><CheckCircle2 className="h-4 w-4" /> Correct! Well done</>
                                            : <><XCircle className="h-4 w-4" /> Incorrect — here's why</>
                                        }
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed">{question?.explanation}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Next button */}
                        {showExplanation && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={handleNext}
                                className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border ${subject.border} ${subject.bg} ${subject.color} hover:brightness-125 transition-all`}
                            >
                                {currentQ + 1 >= questions.length ? <><Trophy className="h-4 w-4" /> View Results</> : <>Next Question <ChevronRight className="h-4 w-4" /></>}
                            </motion.button>
                        )}
                    </motion.div>
                )}

                {/* ── RESULTS VIEW ── */}
                {view === "results" && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        {/* Score card */}
                        <div className={`p-8 rounded-3xl border ${subject.border} ${subject.bg} text-center space-y-3`}>
                            <Trophy className={`h-12 w-12 mx-auto ${subject.color}`} />
                            <h2 className="text-2xl font-black text-white">Quiz Complete!</h2>
                            <p className={`text-5xl font-black ${subject.color}`}>{finalScore}/{questions.length}</p>
                            <p className="text-zinc-400 text-sm">
                                {finalScore === questions.length ? "🎉 Perfect score! Outstanding!" :
                                    finalScore >= questions.length * 0.7 ? "👏 Great job! Keep it up!" :
                                        finalScore >= questions.length * 0.4 ? "💪 Good effort! Review the concepts." :
                                            "📚 Keep practising! Read the learn steps again."}
                            </p>
                        </div>

                        {/* Per-question review */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Answer Review</h3>
                            {questions.map((q, i) => {
                                const userAns = answers[i];
                                const correct = userAns === q.answer;
                                return (
                                    <div key={q.id} className={`p-4 rounded-xl border ${correct ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                                        <div className="flex items-start gap-3">
                                            <span className="shrink-0">
                                                {correct ? <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5" /> : <XCircle className="h-4 w-4 text-red-400 mt-0.5" />}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-zinc-300 text-sm font-medium mb-1">Q{i + 1}: {q.question}</p>
                                                {!correct && (
                                                    <div className="space-y-1">
                                                        <p className="text-red-400 text-xs">Your answer: {userAns !== null ? q.options[userAns] : "Not answered"}</p>
                                                        <p className="text-green-400 text-xs">Correct: {q.options[q.answer]}</p>
                                                        <p className="text-zinc-500 text-xs mt-1">{q.explanation}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleRetry}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-700 bg-zinc-800/40 text-zinc-300 hover:bg-zinc-800/80 text-sm font-semibold transition-all"
                            >
                                <RotateCcw className="h-4 w-4" /> Retry Quiz
                            </button>
                            <button
                                onClick={() => setView("topics")}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border ${subject.border} ${subject.bg} ${subject.color} text-sm font-semibold hover:brightness-125 transition-all`}
                            >
                                <BookOpen className="h-4 w-4" /> New Topic
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
