
"use client";

import { useState, useRef, use, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Upload, Sparkles, BookOpen, Landmark, TrendingUp,
    Globe2, PenLine, MessageSquare, Newspaper, Loader2, ChevronDown,
    ChevronUp, RotateCcw, FileText, Lightbulb, GraduationCap,
    CheckCircle2, XCircle, Mail, Megaphone, ClipboardList, Edit3, Clock, File
} from "lucide-react";
import Link from "next/link";


// ─── Subject Data ────────────────────────────────────────────────────────────
const subjects: Record<string, {
    name: string;
    color: string;
    bg: string;
    border: string;
    ring: string;
    icon: React.ElementType;
    chapters: string[];
    special?: boolean;
}> = {
    "history": {
        name: "History",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        ring: "ring-amber-500/40",
        icon: BookOpen,
        chapters: [
            "Sources of Indian History",
            "The Harappan Civilization",
            "Vedic Civilization"
        ]
    },
    "polity": {
        name: "Polity",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        ring: "ring-blue-500/40",
        icon: Landmark,
        chapters: [
            "Making of Constitution",
            "Preamble",
            "Fundamental Rights and DPSP",
            "Fundamental Duties"
        ]
    },
    "economics": {
        name: "Economics",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        ring: "ring-emerald-500/40",
        icon: TrendingUp,
        chapters: [
            "Basic Concept of Economics",
            "National Income",
            "Unemployment and Poverty"
        ]
    },
    "geography": {
        name: "Geography",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
        ring: "ring-cyan-500/40",
        icon: Globe2,
        chapters: [
            "Political Division of India",
            "Physiographic Division of India"
        ]
    },
    "objective-english": {
        name: "Objective English",
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/30",
        ring: "ring-rose-500/40",
        icon: PenLine,
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
    "verbal-english": {
        name: "Verbal English",
        color: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/30",
        ring: "ring-violet-500/40",
        icon: MessageSquare,
        chapters: [
            "Sentence Correction & Error Spotting",
            "Analogies & Word Relations",
            "Para Jumbles (Sentence Rearrangement)",
            "Logical Connectives & Discourse",
            "Word Usage in Context"
        ]
    },
    "current-affairs": {
        name: "Current Affairs",
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        ring: "ring-orange-500/40",
        icon: Newspaper,
        chapters: [
            "National Events & Governance",
            "International Affairs & Diplomacy",
            "Science & Technology",
            "Economy & Business",
            "Sports & Awards",
            "Environment & Climate"
        ]
    },
    "design-thinking": {
        name: "Design Thinking",
        color: "text-fuchsia-400",
        bg: "bg-fuchsia-500/10",
        border: "border-fuchsia-500/30",
        ring: "ring-fuchsia-500/40",
        icon: Lightbulb,
        chapters: [
            "Introduction to Design Thinking",
            "Creative Process & Biomimicry",
            "Research & Research Ethics",
            "Product Innovation",
            "SCAMPER Technique",
            "IPR & Patent Filing"
        ]
    },
    "finance": {
        name: "Finance",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        ring: "ring-emerald-500/40",
        icon: TrendingUp,
        chapters: [
            "Overview of Engineering Economics",
            "Market Analysis",
            "Consumer & Producer Behaviour",
            "Entrepreneurship Skill Development",
            "Introduction to Financial Economics",
            "Financial Analysis",
            "Proposing a Sustainable Business",
            "Solution Demo, Sales & Branding"
        ]
    }
};

// ─── Writing Formats Data ─────────────────────────────────────────────────────
const writingFormats = [
    {
        type: "Notice",
        icon: Megaphone,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        description: "An official announcement addressed to a group of people.",
        structure: ["Heading: NOTICE", "Institution Name & Date", "Title of Notice", "Body (purpose, details, action required)", "Signature & Designation"],
        example: `NOTICE

University of Engineering & Management, Kolkata
Date: 21 February 2026

ANNUAL SPORTS MEET

All students of 1st Year B.Tech are hereby informed that the Annual Sports Meet will be held on 5th March 2026 at the University Sports Ground. Students wishing to participate must register their names with their respective Class Representatives by 28th February 2026.

All are encouraged to participate enthusiastically.

Dr. A. Sharma
Dean, Student Affairs`
    },
    {
        type: "Email",
        icon: Mail,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        description: "A formal digital letter for official communication.",
        structure: ["To:", "Subject:", "Salutation (Dear Sir/Ma'am)", "Opening (purpose)", "Body (details)", "Closing (request/action)", "Signature"],
        example: `To: hod.cse@uem.edu.in
Subject: Request for Extension of Assignment Submission Deadline

Dear Professor Roy,

I am Sagnik Das, a student of 1st Year B.Tech CSE (Roll No: 01234567890). I am writing to respectfully request an extension of two days for the submission of the Data Structures assignment due on 25th February 2026.

Due to my participation in the inter-college technical fest, I was unable to devote sufficient time to complete the assignment. I assure you that I will submit it by 27th February 2026.

I hope you will consider my request. I am grateful for your understanding.

Thanking you,
Yours faithfully,
Sagnik Das
Roll No: 01234567890`
    },
    {
        type: "Report",
        icon: ClipboardList,
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        description: "A structured document presenting facts about an event or finding.",
        structure: ["Title of Report", "By (Name & Designation)", "Date", "Introduction", "Observations / Findings (sequenced)", "Conclusion / Recommendations", "Signature"],
        example: `REPORT ON ANNUAL SCIENCE EXHIBITION

By Sagnik Das, Student Representative
Date: 21 February 2026

Introduction:
An Annual Science Exhibition was organised by the Department of CSE at UEM Kolkata on 20th February 2026. The event aimed at encouraging innovation among students.

Observations:
- Over 45 projects were displayed covering domains of AI, IoT, and Robotics.
- The exhibition was inaugurated by the Vice Chancellor at 10 AM.
- Best Project Award was won by Team Innovate (3rd Year CSE) for their Smart Waste Classifier.
- Industry experts from TCS and Wipro were present as judges.
- Footfall exceeded 600 students from all departments.

Conclusion:
The exhibition was a grand success and inspired students to take up research-oriented projects. It is recommended that such events be held bi-annually.

Sagnik Das
Student Representative, 1st Year CSE`
    },
    {
        type: "Letter",
        icon: Edit3,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        description: "A formal letter for official requests, complaints, or applications.",
        structure: ["Sender's Address", "Date", "Receiver's Address", "Subject", "Salutation", "Body (3 paragraphs)", "Complimentary Close", "Signature & Name"],
        example: `Sagnik Das
12/A, Lake Town
Kolkata – 700089

21 February 2026

The Principal
University of Engineering & Management
Kolkata – 700160

Subject: Application for Issuance of Bonafide Certificate

Respected Sir,

I am Sagnik Das, a student of 1st Year B.Tech Computer Science and Engineering (Roll No: 01234567890) at your esteemed institution. I am writing to request the issuance of a Bonafide Certificate for the purpose of opening a student bank account.

The certificate is required as proof of my current enrolment at your institution. I request you to kindly issue the same at the earliest convenience.

I shall be highly obliged for your kind assistance.

Yours faithfully,
Sagnik Das
Roll No: 01234567890`
    },
    {
        type: "Memo",
        icon: FileText,
        color: "text-teal-400",
        bg: "bg-teal-500/10",
        border: "border-teal-500/20",
        description: "An internal communication sent within an organisation to inform or instruct.",
        structure: ["MEMORANDUM heading", "To: (recipient)", "From: (sender)", "Date:", "Subject:", "Body (purpose, details, action)", "Signature (optional)"],
        example: `MEMORANDUM

To:   All Faculty Members, Department of CSE
From: Dr. R. Banerjee, Head of Department
Date: 21 February 2026
Sub:  Submission of Internal Assessment Marks

This memo is to inform all faculty members that the Internal Assessment (IA) marks for the ongoing semester must be submitted to the Academic Section by 28th February 2026.

All marks should be entered in the Online Faculty Portal under the "IA Submission" tab. Marks submitted after the deadline will not be accepted, and the responsibility will rest with the concerned faculty.

Kindly ensure compliance.

Dr. R. Banerjee
Head of Department, CSE`
    },
    {
        type: "CV / Résumé",
        icon: GraduationCap,
        color: "text-pink-400",
        bg: "bg-pink-500/10",
        border: "border-pink-500/20",
        description: "A document summarising a person's education, skills, and experience for a job application.",
        structure: ["Personal Details (Name, Contact, Email)", "Career Objective (2–3 lines)", "Educational Qualifications (table or list)", "Technical Skills", "Projects / Internships", "Co-curricular / Extra-curricular Activities", "Declaration + Date + Signature"],
        example: `CURRICULUM VITAE

SAGNIK DAS
12/A, Lake Town, Kolkata – 700089
Email: sagnik.das@email.com | Phone: 9876543210

CAREER OBJECTIVE
A motivated 1st Year B.Tech (CSE) student at UEM Kolkata seeking an internship opportunity to apply my programming skills and contribute to real-world software development projects.

EDUCATIONAL QUALIFICATIONS
┌──────────────────────────┬────────────────┬──────┬────────┐
│ Qualification            │ Board/Univ.    │ Year │ %/CGPA │
├──────────────────────────┼────────────────┼──────┼────────┤
│ B.Tech (CSE) – Pursuing  │ UEM Kolkata    │ 2028 │ 8.5    │
│ Class XII (Science)      │ WBCHSE         │ 2024 │ 89.4%  │
│ Class X                  │ WBBSE          │ 2022 │ 92.0%  │
└──────────────────────────┴────────────────┴──────┴────────┘

TECHNICAL SKILLS
• Programming: Python, C, Java
• Web: HTML, CSS, JavaScript, Next.js
• Tools: Git, VS Code, Linux

PROJECTS
• ExamZen (2026) – AI-powered exam prep web app for engineering students using Next.js and Gemini AI.

EXTRA-CURRICULAR ACTIVITIES
• Member, UEM Coding Club
• Participated in Techniche 2025 (IIT Guwahati)

DECLARATION
I hereby declare that the information provided above is true and correct to the best of my knowledge.

Date: 21 February 2026
Place: Kolkata

Sagnik Das`
    }
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Question { question: string; marks: number; type: string; }
interface ModelAnswer { question: string; answer: string; keyPoints: string[]; }
interface Flashcard { front: string; back: string; }
interface AIResult {
    expectedQuestions: Question[];
    modelAnswers: ModelAnswer[];
    flashcards: Flashcard[];
}

type ContentTab = "chapters" | "writing-formats";

// ─── Component ────────────────────────────────────────────────────────────────
export default function ESPSubjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const subject = subjects[slug];

    const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
    const [noteContent, setNoteContent] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiResult, setAiResult] = useState<AIResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeAITab, setActiveAITab] = useState<"questions" | "answers" | "flashcards">("questions");
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
    const [expandedAnswers, setExpandedAnswers] = useState<Set<number>>(new Set());
    const [contentTab, setContentTab] = useState<ContentTab>("chapters");
    const [rateLimitCountdown, setRateLimitCountdown] = useState<number>(0);
    const [isParsing, setIsParsing] = useState(false);
    const [parsedPages, setParsedPages] = useState(0);
    const fileRef = useRef<HTMLInputElement>(null);
    const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Countdown timer for rate limiting
    useEffect(() => {
        if (rateLimitCountdown <= 0) return;
        countdownRef.current = setInterval(() => {
            setRateLimitCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownRef.current!);
                    // Auto-retry when countdown hits 0
                    handleGenerate();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(countdownRef.current!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rateLimitCountdown > 0]);

    if (!subject) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-zinc-400 mb-4">Subject not found.</p>
                    <Link href="/subjects/sessional" className="text-purple-400 hover:underline">← Back</Link>
                </div>
            </main>
        );
    }

    const Icon = subject.icon;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setNoteContent("");
        setParsedPages(0);

        if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
            // ── PDF: extract text client-side with pdfjs-dist ──
            setIsParsing(true);
            try {
                const pdfjsLib = await import("pdfjs-dist");
                // Use worker served from Next.js public folder (copied from node_modules at build time)
                pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                const totalPages = pdf.numPages;
                let fullText = "";

                for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const content = await page.getTextContent();
                    const pageText = content.items
                        .map((item: any) => item.str)
                        .join(" ")
                        .replace(/\s+/g, " ")
                        .trim();
                    fullText += pageText + "\n\n";
                    setParsedPages(pageNum);
                }

                const trimmed = fullText.trim();
                if (!trimmed) {
                    setNoteContent("");
                    setFileName("");
                    setError("This PDF appears to have no selectable text (it may be a scanned image). Please use a text-based PDF.");
                } else {
                    // Trim to ~12,000 chars to stay within Gemini token limits
                    setNoteContent(trimmed.substring(0, 12000));
                }
            } catch (err) {
                console.error("PDF parse error:", err);
                setError("Failed to read PDF. Please try a different file or paste your notes as text.");
                setFileName("");
            } finally {
                setIsParsing(false);
            }
        } else {
            // ── Plain text file ──
            const reader = new FileReader();
            reader.onload = (ev) => setNoteContent((ev.target?.result as string) || "");
            reader.readAsText(file);
        }
    };

    const handleGenerate = async () => {
        if (!selectedChapter) return;
        clearInterval(countdownRef.current!);
        setRateLimitCountdown(0);
        setIsGenerating(true);
        setAiResult(null);
        setError(null);
        setFlippedCards(new Set());
        setExpandedAnswers(new Set());

        try {
            const res = await fetch('/api/esp-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject: subject.name, chapter: selectedChapter, noteContent })
            });
            const data = await res.json();
            if (res.status === 429 && data.error === 'RATE_LIMITED') {
                // Start countdown and auto-retry
                setRateLimitCountdown(data.retryAfter ?? 60);
                return;
            }
            if (!res.ok) throw new Error(data.error || 'Generation failed');
            setAiResult(data);
            setActiveAITab("questions");
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsGenerating(false);
        }
    };

    const toggleCard = (i: number) => {
        setFlippedCards(prev => {
            const s = new Set(prev);
            s.has(i) ? s.delete(i) : s.add(i);
            return s;
        });
    };

    const toggleAnswer = (i: number) => {
        setExpandedAnswers(prev => {
            const s = new Set(prev);
            s.has(i) ? s.delete(i) : s.add(i);
            return s;
        });
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8">

                {/* ── Header ── */}
                <div className="space-y-4">
                    <Link href="/subjects/sessional" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors text-sm">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sessional Subjects
                    </Link>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${subject.bg} border ${subject.border} text-xs font-semibold uppercase tracking-wider ${subject.color}`}>
                        <GraduationCap className="h-3.5 w-3.5" /> ESP Subject
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        <Icon className={`inline h-10 w-10 mr-3 ${subject.color}`} />
                        {subject.name}
                    </h1>
                </div>

                {/* ── Content Tab Bar (for Objective English only) ── */}
                {subject.special && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setContentTab("chapters")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${contentTab === "chapters" ? `${subject.bg} ${subject.color} ${subject.border} ring-2 ${subject.ring}` : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"}`}
                        >
                            <BookOpen className="h-4 w-4" /> Chapters & AI
                        </button>
                        <button
                            onClick={() => setContentTab("writing-formats")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${contentTab === "writing-formats" ? "bg-rose-500/10 text-rose-400 border-rose-500/30 ring-2 ring-rose-500/40" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"}`}
                        >
                            <Edit3 className="h-4 w-4" /> Writing Formats
                            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold">✦ Special</span>
                        </button>
                    </div>
                )}

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* WRITING FORMATS TAB (Objective English only)                    */}
                {/* ─────────────────────────────────────────────────────────────── */}
                {subject.special && contentTab === "writing-formats" && (
                    <div className="space-y-6">
                        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-sm text-rose-200/70">
                            <p className="font-semibold text-rose-400 mb-1 flex items-center gap-2">
                                <Sparkles className="h-4 w-4" /> Writing Formats for Exam
                            </p>
                            <p>Learn the structure and see full examples of Notice, Email, Report, and Letter — the four official writing formats tested in your Objective English exam.</p>
                        </div>

                        {writingFormats.map((fmt, i) => (
                            <motion.div
                                key={fmt.type}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.07 }}
                                className={`rounded-2xl border ${fmt.border} ${fmt.bg} overflow-hidden`}
                            >
                                {/* Format Header */}
                                <div className="p-5 flex items-start gap-4">
                                    <div className={`p-2.5 rounded-xl ${fmt.bg} border ${fmt.border}`}>
                                        <fmt.icon className={`h-5 w-5 ${fmt.color}`} />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold ${fmt.color}`}>{fmt.type}</h3>
                                        <p className="text-zinc-400 text-sm mt-0.5">{fmt.description}</p>
                                    </div>
                                </div>

                                <div className="px-5 pb-5 grid md:grid-cols-2 gap-4">
                                    {/* Structure */}
                                    <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Structure</h4>
                                        <ol className="space-y-2">
                                            {fmt.structure.map((step, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-zinc-300">
                                                    <span className={`shrink-0 w-5 h-5 rounded-full ${fmt.bg} border ${fmt.border} ${fmt.color} text-[10px] font-bold flex items-center justify-center mt-0.5`}>{j + 1}</span>
                                                    {step}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>

                                    {/* Example */}
                                    <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Full Example</h4>
                                        <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed overflow-auto max-h-64">{fmt.example}</pre>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* ─────────────────────────────────────────────────────────────── */}
                {/* CHAPTERS + AI TAB                                               */}
                {/* ─────────────────────────────────────────────────────────────── */}
                {(!subject.special || contentTab === "chapters") && (
                    <div className="grid lg:grid-cols-5 gap-6">

                        {/* ── LEFT: Chapters + Notes ── */}
                        <div className="lg:col-span-2 space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Chapters</h2>
                            <div className="space-y-2">
                                {subject.chapters.map((chapter, i) => (
                                    <motion.button
                                        key={i}
                                        onClick={() => { setSelectedChapter(chapter); setAiResult(null); setError(null); setNoteContent(""); setFileName(""); }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium ${selectedChapter === chapter
                                            ? `${subject.bg} ${subject.color} ${subject.border} ring-2 ${subject.ring}`
                                            : "bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-700"}`}
                                    >
                                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold mr-2.5 ${selectedChapter === chapter ? `${subject.bg} ${subject.color}` : "bg-zinc-800 text-zinc-500"}`}>{i + 1}</span>
                                        {chapter}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Note upload */}
                            {selectedChapter && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3"
                                >
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                        <Upload className="h-3.5 w-3.5" /> Upload Notes (Optional)
                                    </h3>
                                    <p className="text-zinc-500 text-xs">Upload your <strong className="text-zinc-400">.pdf</strong> or <strong className="text-zinc-400">.txt</strong> notes — the AI will use them to generate more personalised questions.</p>
                                    <button
                                        onClick={() => fileRef.current?.click()}
                                        disabled={isParsing}
                                        className="w-full py-3 rounded-xl border-2 border-dashed border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50 transition-all text-zinc-400 hover:text-zinc-300 text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isParsing ? (
                                            <><Loader2 className="h-4 w-4 animate-spin" /> Reading PDF… page {parsedPages}</>
                                        ) : (
                                            <><File className="h-4 w-4" /> {fileName || "Click to choose PDF or .txt"}</>
                                        )}
                                    </button>
                                    <input ref={fileRef} type="file" accept=".pdf,.txt,.md" className="hidden" onChange={handleFileUpload} />
                                    {fileName && !isParsing && (
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                                            <span className="truncate">
                                                {fileName.toLowerCase().endsWith(".pdf")
                                                    ? `${fileName} · ${Math.round(noteContent.length / 100) / 10}k chars extracted`
                                                    : `${fileName} loaded`}
                                            </span>
                                            <button onClick={() => { setNoteContent(""); setFileName(""); }} className="ml-auto shrink-0 hover:text-red-400 transition-colors">
                                                <XCircle className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    )}

                                    {/* Generate Button */}
                                    <motion.button
                                        onClick={handleGenerate}
                                        disabled={isGenerating || isParsing}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${subject.bg} ${subject.color} border ${subject.border} hover:brightness-125 disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {isGenerating
                                            ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</>
                                            : <><Sparkles className="h-4 w-4" /> Generate with AI</>
                                        }
                                    </motion.button>
                                </motion.div>
                            )}

                            {!selectedChapter && (
                                <div className="rounded-2xl border border-dashed border-zinc-800 p-6 text-center">
                                    <Lightbulb className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
                                    <p className="text-zinc-500 text-sm">Select a chapter to get AI-generated study material.</p>
                                </div>
                            )}
                        </div>

                        {/* ── RIGHT: AI Results Panel ── */}
                        <div className="lg:col-span-3">
                            {!aiResult && !isGenerating && !error && (
                                <div className="h-full min-h-[300px] rounded-2xl border border-dashed border-zinc-800 flex flex-col items-center justify-center gap-3 text-center p-8">
                                    <div className={`p-4 rounded-2xl ${subject.bg} border ${subject.border}`}>
                                        <Sparkles className={`h-8 w-8 ${subject.color}`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-zinc-300">AI Study Assistant</h3>
                                    <p className="text-zinc-500 text-sm max-w-xs">Select a chapter and click "Generate with AI" to get expected questions, model answers, and flashcards.</p>
                                </div>
                            )}

                            {isGenerating && (
                                <div className="h-full min-h-[300px] rounded-2xl border border-zinc-800 bg-zinc-900/30 flex flex-col items-center justify-center gap-4 p-8">
                                    <div className={`p-4 rounded-2xl ${subject.bg} border ${subject.border} animate-pulse`}>
                                        <Sparkles className={`h-8 w-8 ${subject.color}`} />
                                    </div>
                                    <div className="text-center">
                                        <p className={`font-semibold ${subject.color}`}>Analysing Chapter…</p>
                                        <p className="text-zinc-500 text-sm mt-1">Generating questions, answers & flashcards</p>
                                    </div>
                                    <Loader2 className={`h-6 w-6 ${subject.color} animate-spin`} />
                                </div>
                            )}

                            {/* Rate limit countdown UI */}
                            {rateLimitCountdown > 0 && !isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 flex flex-col items-center gap-4 text-center"
                                >
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full border-4 border-amber-500/30 flex items-center justify-center">
                                            <div
                                                className="absolute inset-0 rounded-full border-4 border-amber-400 border-t-transparent animate-spin"
                                                style={{ animationDuration: '1s' }}
                                            />
                                            <span className="text-2xl font-bold text-amber-400">{rateLimitCountdown}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-amber-400 flex items-center justify-center gap-2">
                                            <Clock className="h-4 w-4" /> API Rate Limit Hit
                                        </p>
                                        <p className="text-zinc-400 text-sm mt-1">
                                            Gemini's free tier limit reached. Auto-retrying in <span className="text-amber-400 font-bold">{rateLimitCountdown}s</span>…
                                        </p>
                                        <p className="text-zinc-600 text-xs mt-2">The server already retried once. Please wait a moment.</p>
                                    </div>
                                    <button
                                        onClick={() => { clearInterval(countdownRef.current!); setRateLimitCountdown(0); handleGenerate(); }}
                                        className="text-xs text-amber-400 hover:text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        Retry Now
                                    </button>
                                </motion.div>
                            )}

                            {error && rateLimitCountdown === 0 && (
                                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 flex items-start gap-3">
                                    <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-red-400">Generation Failed</p>
                                        <p className="text-zinc-400 text-sm mt-1">{error}</p>
                                        <button onClick={handleGenerate} className="mt-3 text-sm text-red-400 hover:text-red-300 flex items-center gap-1">
                                            <RotateCcw className="h-3.5 w-3.5" /> Try Again
                                        </button>
                                    </div>
                                </div>
                            )}

                            {aiResult && (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        {/* Chapter label */}
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${subject.bg} border ${subject.border} text-xs font-semibold ${subject.color}`}>
                                            <BookOpen className="h-3 w-3" /> {selectedChapter}
                                        </div>

                                        {/* AI result tabs */}
                                        <div className="flex gap-2 flex-wrap">
                                            {(["questions", "answers", "flashcards"] as const).map((tab) => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setActiveAITab(tab)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${activeAITab === tab
                                                        ? `${subject.bg} ${subject.color} ${subject.border}`
                                                        : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300"}`}
                                                >
                                                    {tab === "questions" ? "📝 Expected Questions" : tab === "answers" ? "💡 Model Answers" : "🃏 Flashcards"}
                                                </button>
                                            ))}
                                        </div>

                                        {/* ── Expected Questions ── */}
                                        {activeAITab === "questions" && (
                                            <div className="space-y-3">
                                                {aiResult.expectedQuestions.map((q, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.07 }}
                                                        className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <span className={`shrink-0 w-6 h-6 rounded-full ${subject.bg} ${subject.color} text-xs font-bold flex items-center justify-center mt-0.5`}>{i + 1}</span>
                                                            <div className="flex-1">
                                                                <p className="text-zinc-200 text-sm leading-relaxed">{q.question}</p>
                                                                <div className="flex gap-2 mt-2">
                                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${subject.border} ${subject.bg} ${subject.color} font-bold`}>{q.marks} marks</span>
                                                                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400 font-bold capitalize">{q.type} answer</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}

                                        {/* ── Model Answers ── */}
                                        {activeAITab === "answers" && (
                                            <div className="space-y-3">
                                                {aiResult.modelAnswers.map((a, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden"
                                                    >
                                                        <button
                                                            onClick={() => toggleAnswer(i)}
                                                            className="w-full flex items-start gap-3 p-4 text-left hover:bg-zinc-900/60 transition-colors"
                                                        >
                                                            <Lightbulb className={`h-4 w-4 ${subject.color} shrink-0 mt-0.5`} />
                                                            <p className="text-zinc-200 text-sm flex-1">{a.question}</p>
                                                            {expandedAnswers.has(i)
                                                                ? <ChevronUp className="h-4 w-4 text-zinc-500 shrink-0" />
                                                                : <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0" />
                                                            }
                                                        </button>
                                                        <AnimatePresence>
                                                            {expandedAnswers.has(i) && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                    className="border-t border-zinc-800 overflow-hidden"
                                                                >
                                                                    <div className="p-4 space-y-3">
                                                                        <p className="text-zinc-300 text-sm leading-relaxed">{a.answer}</p>
                                                                        <div>
                                                                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Key Points</p>
                                                                            <ul className="space-y-1.5">
                                                                                {a.keyPoints.map((kp, j) => (
                                                                                    <li key={j} className="flex items-start gap-2 text-xs text-zinc-400">
                                                                                        <CheckCircle2 className={`h-3.5 w-3.5 ${subject.color} shrink-0 mt-0.5`} />
                                                                                        {kp}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}

                                        {/* ── Flashcards ── */}
                                        {activeAITab === "flashcards" && (
                                            <div>
                                                <p className="text-zinc-500 text-xs mb-3">Click any card to flip it.</p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {aiResult.flashcards.map((fc, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: i * 0.07 }}
                                                            onClick={() => toggleCard(i)}
                                                            className="cursor-pointer"
                                                            style={{ perspective: "600px" }}
                                                        >
                                                            <motion.div
                                                                animate={{ rotateY: flippedCards.has(i) ? 180 : 0 }}
                                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                                style={{ transformStyle: "preserve-3d", position: "relative", minHeight: "120px" }}
                                                            >
                                                                {/* Front */}
                                                                <div className={`absolute inset-0 rounded-xl border ${subject.border} ${subject.bg} p-4 flex items-center justify-center text-center backface-hidden`}
                                                                    style={{ backfaceVisibility: "hidden" }}>
                                                                    <p className={`text-sm font-semibold ${subject.color}`}>{fc.front}</p>
                                                                </div>
                                                                {/* Back */}
                                                                <div className="absolute inset-0 rounded-xl border border-zinc-700 bg-zinc-800 p-4 flex items-center justify-center text-center"
                                                                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                                                                    <p className="text-sm text-zinc-200 leading-relaxed">{fc.back}</p>
                                                                </div>
                                                            </motion.div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => setFlippedCards(new Set())}
                                                    className="mt-4 text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
                                                >
                                                    <RotateCcw className="h-3 w-3" /> Reset all cards
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
