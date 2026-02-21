"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Calculator,
    Sparkles,
    GraduationCap,
    Layers,
    BookOpen,
    Landmark,
    Globe2,
    PenLine,
    MessageSquare,
    Newspaper,
    TrendingUp,
    ArrowRight,
    Lightbulb,
    Dumbbell,
    Star,
    Languages,
    Search
} from "lucide-react";
import Link from "next/link";

type Tab = "esp" | "sdp" | "others";

// ─── ESP Subjects ────────────────────────────────────────────
const espSubjects = [
    {
        name: "History",
        slug: "history",
        icon: BookOpen,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        description: "Indian history from ancient sources to Vedic civilizations.",
        chapters: [
            "Sources of Indian History",
            "The Harappan Civilization",
            "Vedic Civilization"
        ]
    },
    {
        name: "Polity",
        slug: "polity",
        icon: Landmark,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        description: "Indian Constitution, governance, rights, and fundamental duties.",
        chapters: [
            "Making of Constitution",
            "Preamble",
            "Fundamental Rights and DPSP",
            "Fundamental Duties"
        ]
    },
    {
        name: "Economics",
        slug: "economics",
        icon: TrendingUp,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        description: "Basic economic concepts, national income, and socio-economic issues.",
        chapters: [
            "Basic Concept of Economics",
            "National Income",
            "Unemployment and Poverty"
        ]
    },
    {
        name: "Geography",
        slug: "geography",
        icon: Globe2,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        description: "Political and physiographic divisions of India.",
        chapters: [
            "Political Division of India",
            "Physiographic Division of India"
        ]
    },
    {
        name: "Objective English",
        slug: "objective-english",
        icon: PenLine,
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        description: "Grammar, vocabulary, comprehension, and professional writing formats.",
        chapters: [
            "Verbs: Application & Subject-Verb Agreement",
            "Non-Finites (Infinitives, Gerunds & Participles)",
            "Application of Tense",
            "Basic Application of Vocabulary (Synonyms & Antonyms)",
            "Reading Comprehension",
            "Official Letter / Application Writing"
        ],
        special: true
    },
    {
        name: "Verbal English",
        slug: "verbal-english",
        icon: MessageSquare,
        color: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/20",
        description: "Verbal reasoning, sentence skills, and comprehension strategies.",
        chapters: [
            "Sentence Correction & Error Spotting",
            "Analogies & Word Relations",
            "Para Jumbles (Sentence Rearrangement)",
            "Logical Connectives & Discourse",
            "Word Usage in Context"
        ]
    },
    {
        name: "Current Affairs",
        slug: "current-affairs",
        icon: Newspaper,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        description: "Contemporary events of national and international relevance.",
        chapters: [
            "National Events & Governance",
            "International Affairs & Diplomacy",
            "Science & Technology",
            "Economy & Business",
            "Sports & Awards",
            "Environment & Climate"
        ]
    }
];

// ─── SDP Subjects ────────────────────────────────────────────
const sdpSubjects = [
    {
        name: "Quantitative Aptitude",
        short: "Quants",
        slug: "quants",
        icon: Calculator,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        description: "Number-crunching skills covering percentages, profit & loss, ratios, averages, and time-work problems.",
        topics: ["Percentage", "Profit & Loss", "Ratio & Proportion", "Average", "Time & Work", "Simplification"]
    },
    {
        name: "Logical Reasoning",
        short: "LR",
        slug: "logical-reasoning",
        icon: Sparkles,
        color: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/20",
        description: "Pattern recognition and deductive reasoning covering coding, directions, syllogisms, blood relations, and seating arrangements.",
        topics: ["Coding–Decoding", "Direction Test", "Syllogism", "Blood Relations", "Seating Arrangement"]
    },
    {
        name: "Data Interpretation",
        short: "DI",
        slug: "data-interpretation",
        icon: TrendingUp,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        description: "Analyse and draw conclusions from visual data including pie charts, bar graphs, and tabular DI sets.",
        topics: ["Pie Charts", "Table DI", "Bar Graphs", "Line Graphs"]
    }
];

// ─── Other Subjects ──────────────────────────────────────────
// href: for DT and Finance reuse the ESP page; rest go to /others/[slug]
const otherSubjects = [
    {
        name: "Design Thinking",
        short: "DT",
        slug: "design-thinking",
        href: "/esp/design-thinking",
        icon: Lightbulb,
        color: "text-fuchsia-400",
        bg: "bg-fuchsia-500/10",
        border: "border-fuchsia-500/20",
        description: "Empathy mapping, ideation, biomimicry, prototyping, SCAMPER, and IPR essentials.",
        topics: ["Intro to DT", "Creative Process", "Research Ethics", "Product Innovation", "SCAMPER", "IPR & Patents"],
        badge: "PDF → AI"
    },
    {
        name: "Finance",
        short: "FIN",
        slug: "finance",
        href: "/esp/finance",
        icon: TrendingUp,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        description: "Engineering economics, market analysis, entrepreneurship, financial analysis, and startups.",
        topics: ["Engg. Economics", "Market Analysis", "Entrepreneurship", "Financial Analysis", "Business Model"],
        badge: "PDF → AI"
    },
    {
        name: "Physical Education",
        short: "PE",
        slug: "physical-education",
        href: "/others/physical-education",
        icon: Dumbbell,
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        description: "Yoga (Asanas, Pranayama & Meditation) and Karate-Do (Kihon techniques & competition rules).",
        topics: ["Yoga Theory", "Asanas", "Pranayama", "Karate-Do Theory", "Kihon Techniques"],
        badge: null
    },
    {
        name: "Soft Skills",
        short: "SS",
        slug: "soft-skills",
        href: "/others/soft-skills",
        icon: Star,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        description: "Communication, emotional intelligence, life skills, and corporate skills for professional success.",
        topics: ["Communication", "Body Language", "Life Skills", "Corporate Skills"],
        badge: null
    },
    {
        name: "Foreign Language",
        short: "FL",
        slug: "foreign-language",
        href: null, // special — two sub-options
        icon: Languages,
        color: "text-sky-400",
        bg: "bg-sky-500/10",
        border: "border-sky-500/20",
        description: "Beginner Japanese (Hiragana, greetings, numbers) or French (pronunciation, grammar, phrases).",
        topics: ["Japanese", "French"],
        badge: null
    }
];

const tabConfigs = {
    esp: {
        label: "ESP",
        fullName: "Essential Studies for Professionals",
        icon: GraduationCap,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        ring: "ring-amber-500/50",
        description: "Career readiness, communication, and professional aptitude development."
    },
    sdp: {
        label: "SDP",
        fullName: "Skill Development Programme",
        icon: Calculator,
        color: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/30",
        ring: "ring-violet-500/50",
        description: "Aptitude, reasoning, and data interpretation — core skills for placements and competitive exams."
    },
    others: {
        label: "Others",
        fullName: "Other Sessional Subjects",
        icon: Layers,
        color: "text-sky-400",
        bg: "bg-sky-500/10",
        border: "border-sky-500/30",
        ring: "ring-sky-500/50",
        description: "Design Thinking, Finance (PDF→AI), Physical Education, Soft Skills, and Foreign Languages."
    }
};

export default function SessionalSubjectsPage() {
    const [activeTab, setActiveTab] = useState<Tab>("esp");
    const [searchQuery, setSearchQuery] = useState("");
    const currentConfig = tabConfigs[activeTab];

    const filterSubject = (s: any) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());

    const filteredEsp = espSubjects.filter(filterSubject);
    const filteredSdp = sdpSubjects.filter(filterSubject);
    const filteredOthers = otherSubjects.filter(filterSubject);

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <Link href="/dashboard" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                        </Link>
                        <div className="flex items-center gap-2 text-purple-400">
                            <Calculator className="h-5 w-5" />
                            <span className="text-sm font-medium uppercase tracking-wider">Internal Assessments</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                            Sessional <span className="text-purple-400">Subjects</span>
                        </h1>
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search sessional..."
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tab Bar */}
                <div className="flex flex-wrap gap-3">
                    {(Object.keys(tabConfigs) as Tab[]).map((tab) => {
                        const config = tabConfigs[tab];
                        const isActive = activeTab === tab;
                        const TabIcon = config.icon;

                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all
                                    ${isActive
                                        ? `${config.bg} ${config.color} border ${config.border} ring-2 ${config.ring} shadow-lg`
                                        : 'bg-zinc-900/40 text-zinc-500 border border-zinc-800 hover:bg-zinc-900/60 hover:text-zinc-300 hover:border-zinc-700'
                                    }
                                `}
                            >
                                <TabIcon className="h-4 w-4" />
                                <span>{config.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full ${config.color.replace('text-', 'bg-')}`}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Tab Header */}
                        <div className={`p-5 rounded-2xl border ${currentConfig.border} ${currentConfig.bg} mb-6`}>
                            <div className="flex items-start gap-3">
                                <currentConfig.icon className={`h-5 w-5 ${currentConfig.color} mt-0.5 shrink-0`} />
                                <div>
                                    <h2 className={`text-lg font-bold ${currentConfig.color}`}>{currentConfig.fullName}</h2>
                                    <p className="text-zinc-400 text-sm mt-1">{currentConfig.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* === ESP TAB === */}
                        {activeTab === "esp" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredEsp.length > 0 ? filteredEsp.map((subject, index) => (
                                    <Link key={subject.slug} href={`/esp/${subject.slug}`}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.06 }}
                                            className={`group relative overflow-hidden rounded-2xl border ${subject.border} bg-zinc-900/30 hover:bg-zinc-900/60 transition-all cursor-pointer h-full`}
                                        >
                                            {/* Top glow */}
                                            <div className={`absolute top-0 left-0 w-full h-1 ${subject.bg.replace('/10', '/50')} opacity-0 group-hover:opacity-100 transition-opacity`} />

                                            {subject.special && (
                                                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-[9px] font-bold text-rose-400 uppercase tracking-wider">
                                                    ✦ Writing Formats
                                                </div>
                                            )}

                                            <div className="p-6">
                                                <div className={`p-3 rounded-xl ${subject.bg} ${subject.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                                                    <subject.icon className="h-6 w-6" />
                                                </div>

                                                <h3 className="text-lg font-bold text-zinc-100 mb-1">{subject.name}</h3>
                                                <p className="text-sm text-zinc-500 leading-relaxed mb-4">{subject.description}</p>

                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    {subject.chapters.slice(0, 3).map(ch => (
                                                        <span key={ch} className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800/60 text-zinc-500 border border-zinc-800">
                                                            {ch}
                                                        </span>
                                                    ))}
                                                    {subject.chapters.length > 3 && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800/60 text-zinc-600">
                                                            +{subject.chapters.length - 3} more
                                                        </span>
                                                    )}
                                                </div>

                                                <div className={`flex items-center text-xs font-semibold ${subject.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                                    Open Subject <ArrowRight className="ml-2 h-3 w-3" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                )) : (
                                    <div className="col-span-full py-12 text-center border border-dashed border-zinc-800 rounded-2xl">
                                        <p className="text-zinc-500">No ESP subjects found.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* === SDP TAB === */}
                        {activeTab === "sdp" && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {filteredSdp.length > 0 ? filteredSdp.map((subject, index) => (
                                    <Link key={subject.slug} href={`/sdp/${subject.slug}`}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.08 }}
                                            className={`group relative overflow-hidden rounded-2xl border ${subject.border} bg-zinc-900/30 hover:bg-zinc-900/60 transition-all p-6 cursor-pointer h-full`}
                                        >
                                            {/* Top accent line */}
                                            <div className={`absolute top-0 left-0 w-full h-1 ${subject.bg.replace('/10', '/60')} opacity-0 group-hover:opacity-100 transition-opacity`} />

                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-3 rounded-xl ${subject.bg} group-hover:scale-110 transition-transform`}>
                                                    <subject.icon className={`h-6 w-6 ${subject.color}`} />
                                                </div>
                                                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${subject.border} ${subject.bg} ${subject.color} uppercase tracking-wider`}>
                                                    {subject.short}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-zinc-100 mb-1">{subject.name}</h3>
                                            <p className="text-sm text-zinc-500 leading-relaxed mb-4">{subject.description}</p>

                                            <div className="flex flex-wrap gap-1.5">
                                                {subject.topics.map(t => (
                                                    <span key={t} className={`text-[11px] px-2.5 py-1 rounded-lg border ${subject.border} ${subject.bg} ${subject.color} font-medium`}>{t}</span>
                                                ))}
                                            </div>

                                            <div className={`mt-4 flex items-center text-xs font-semibold ${subject.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                                Open <ArrowRight className="ml-1.5 h-3 w-3" />
                                            </div>
                                        </motion.div>
                                    </Link>
                                )) : (
                                    <div className="col-span-full py-12 text-center border border-dashed border-zinc-800 rounded-2xl">
                                        <p className="text-zinc-500">No SDP subjects found.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* === OTHERS TAB === */}
                        {activeTab === "others" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredOthers.length > 0 ? filteredOthers.map((subject, index) => {
                                    const isForeignLang = subject.slug === "foreign-language";
                                    const cardContent = (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.07 }}
                                            className={`group relative overflow-hidden rounded-2xl border ${subject.border} bg-zinc-900/30 ${!isForeignLang ? "hover:bg-zinc-900/60 cursor-pointer" : ""} transition-all p-6 h-full flex flex-col`}
                                        >
                                            {/* Top accent */}
                                            <div className={`absolute top-0 left-0 w-full h-1 ${subject.bg.replace('/10', '/60')} opacity-0 group-hover:opacity-100 transition-opacity`} />

                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-3 rounded-xl ${subject.bg} group-hover:scale-110 transition-transform`}>
                                                    <subject.icon className={`h-6 w-6 ${subject.color}`} />
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${subject.border} ${subject.bg} ${subject.color} uppercase tracking-wider`}>
                                                        {subject.short}
                                                    </span>
                                                    {subject.badge && (
                                                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/25 text-fuchsia-400 uppercase tracking-wider">
                                                            {subject.badge}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-bold text-zinc-100 mb-1">{subject.name}</h3>
                                            <p className="text-sm text-zinc-500 leading-relaxed mb-4 flex-1">{subject.description}</p>

                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {subject.topics.map(t => (
                                                    <span key={t} className={`text-[11px] px-2.5 py-1 rounded-lg border ${subject.border} ${subject.bg} ${subject.color} font-medium`}>{t}</span>
                                                ))}
                                            </div>

                                            {/* Foreign Language: two sub-buttons */}
                                            {isForeignLang ? (
                                                <div className="flex gap-2">
                                                    <Link href="/others/japanese" onClick={e => e.stopPropagation()}
                                                        className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold border border-red-500/30 bg-red-500/10 text-red-400 hover:brightness-125 transition-all`}>
                                                        🇯🇵 Japanese
                                                    </Link>
                                                    <Link href="/others/french" onClick={e => e.stopPropagation()}
                                                        className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:brightness-125 transition-all`}>
                                                        🇫🇷 French
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className={`flex items-center text-xs font-semibold ${subject.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                                    Open <ArrowRight className="ml-1.5 h-3 w-3" />
                                                </div>
                                            )}
                                        </motion.div>
                                    );

                                    if (isForeignLang) return <div key={subject.slug}>{cardContent}</div>;
                                    return (
                                        <Link key={subject.slug} href={subject.href!} className="h-full">
                                            {cardContent}
                                        </Link>
                                    );
                                }) : (
                                    <div className="col-span-full py-12 text-center border border-dashed border-zinc-800 rounded-2xl">
                                        <p className="text-zinc-500">No other subjects found.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Info Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20 text-zinc-400 text-sm flex items-start gap-3"
                >
                    <Sparkles className="h-5 w-5 text-purple-400 mt-0.5 shrink-0" />
                    <div>
                        <p className="font-semibold text-purple-400 mb-1">About Sessional Subjects</p>
                        <p>
                            These subjects are evaluated internally through assignments, presentations, lab records, and viva.
                            They do not have end-semester theory exams but contribute significantly to your overall SGPA.
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
