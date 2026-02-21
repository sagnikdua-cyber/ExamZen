"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
    BookOpen,
    Calculator,
    MessageSquare,
    History,
    HelpCircle,
    Lock,
    ArrowRight,
    Sparkles,
    Zap,
    Target,
    Cpu,
    Layers,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import ReadinessTracker from "@/components/ReadinessTracker";
import { Button } from "@/components/Button";
import SearchSubjects from "@/components/SearchSubjects";

const activeModules = [
    {
        title: "Core Subjects",
        description: "Study PYQs and notes for your main university exams.",
        icon: BookOpen,
        link: "/subjects/core",
        color: "text-blue-400",
        bg: "bg-blue-500/10"
    },
    {
        title: "Sessional Subjects",
        description: "Focus on internal assessments and lab-based subjects.",
        icon: Calculator,
        link: "/subjects/sessional",
        color: "text-purple-400",
        bg: "bg-purple-500/10"
    },
    {
        title: "Viva Prep",
        description: "AI-generated viva questions and preparation notes (for practicals).",
        icon: MessageSquare,
        link: "/viva",
        color: "text-pink-400",
        bg: "bg-pink-500/10"
    },
    {
        title: "Help Us Improve",
        description: "Suggest features or report issues to make ExamZen better.",
        icon: HelpCircle,
        link: "/feedback",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10"
    }
];

const comingSoonYears = [
    { year: "2nd Year", batch: "Batch 2024-28" },
    { year: "3rd Year", batch: "Batch 2023-27" },
    { year: "4th Year", batch: "Batch 2022-26" }
];

export default function DashboardPage() {
    const { data: session } = useSession();
    const username = session?.user?.name || "Student";

    return (
        <main className="min-h-screen bg-black text-white pb-20">
            {/* Nav Space */}
            <div className="h-16 border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50 flex items-center px-6">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    ExamZen
                </span>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8 space-y-12">
                {/* Welcome Section */}
                <section className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-purple-400"
                    >
                        <Sparkles className="h-5 w-5" />
                        <span className="text-sm font-medium uppercase tracking-wider">Dashboard Overview</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold tracking-tighter"
                    >
                        Welcome Back, <span className="text-purple-400">{username}</span>!
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 text-lg md:text-xl max-w-[600px]"
                    >
                        Your first year journey is well underway. Let's get you prepared for the next battle.
                    </motion.p>
                </section>

                {/* Readiness Section */}
                <ReadinessTracker />

                <div className="max-w-2xl mx-auto w-full">
                    <SearchSubjects onSearch={() => { }} />
                </div>

                {/* Main Modules Grid */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4">1st Year Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeModules.map((module, index) => (
                            <Link href={module.link} key={index}>
                                <motion.div
                                    whileHover={{ scale: 1.02, translateY: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="h-full p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all group"
                                >
                                    <div className={`p-2 sm:p-3 rounded-xl w-fit ${module.bg} ${module.color} mb-4`}>
                                        <module.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                                        {module.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                                        {module.description}
                                    </p>
                                    <div className="flex items-center text-sm font-medium text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* How to use ExamZen */}
                <section className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
                        <div>
                            <div className="flex items-center gap-2 text-purple-400 mb-2">
                                <Zap className="h-5 w-5 fill-current" />
                                <span className="text-sm font-black uppercase tracking-[0.2em]">Master Strategy</span>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-white">How to Ace Exams with <span className="text-purple-400">ExamZen</span></h2>
                        </div>
                        <div className="px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-sm font-medium">
                            First Year Student Edition
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {[
                            {
                                icon: Target,
                                title: "Solve High-Yield PYQs",
                                desc: "Master exam patterns that repeat every year. Focus on questions marked 'Important' to save time and score high.",
                                color: "text-blue-400"
                            },
                            {
                                icon: Cpu,
                                title: "Consult AI Guru",
                                desc: "Don't get stuck on dry textbooks. Ask AI Guru for plain-English explanations and real-world examples of any topic.",
                                color: "text-purple-400"
                            },
                            {
                                icon: MessageSquare,
                                title: "Ace Your Vivas",
                                desc: "Lab exams are 50% viva. Use our specialized section to prep theory and AI-predicted questions specifically for practicals.",
                                color: "text-pink-400"
                            },
                            {
                                icon: Layers,
                                title: "Daily Flashcard Revisions",
                                desc: "Spending 5 minutes daily on flashcards builds long-term memory. Perfect for retaining complex formulas and definitions.",
                                color: "text-emerald-400"
                            },
                            {
                                icon: CheckCircle2,
                                title: "Aim for 90% Readiness",
                                desc: "Keep track of your preparation with our Readiness system. If the circular scale is in the green, you're ready to win!",
                                color: "text-amber-400"
                            }
                        ].map((step, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                key={i}
                                className="space-y-4"
                            >
                                <div className={`h-12 w-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center ${step.color} shadow-inner`}>
                                    <step.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-1">{step.title}</h4>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Gradient Accent */}
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full -mb-32 -mr-32 pointer-events-none" />
                </section>

                {/* Coming Soon Section */}
                <section className="space-y-6 pt-8">
                    <h2 className="text-2xl font-semibold text-zinc-500 border-l-4 border-zinc-800 pl-4">Future Academics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
                        {comingSoonYears.map((item, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/50 flex items-center justify-between relative overflow-hidden group cursor-not-allowed"
                            >
                                <div>
                                    <h3 className="text-zinc-400 font-bold">{item.year}</h3>
                                    <p className="text-zinc-600 text-xs mt-1">{item.batch}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-zinc-900 text-zinc-500">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400">
                                    COMING SOON
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
