"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Mail,
    ClipboardList,
    PenLine,
    ChevronDown,
    ChevronUp,
    Copy,
    Check,
    BookOpen
} from "lucide-react";

interface WritingFormat {
    name: string;
    icon: any;
    color: string;
    bg: string;
    border: string;
    structure: string[];
    rules: string[];
    example: string;
}

const writingFormats: WritingFormat[] = [
    {
        name: "Notice",
        icon: ClipboardList,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        structure: [
            "Name of the Institution / Organization",
            "NOTICE",
            "Date:",
            "Heading (Subject of the Notice)",
            "Body (What, When, Where, Who, Why)",
            "Signature, Name, Designation"
        ],
        rules: [
            "Keep within 50 words (body)",
            "Use a box/border format",
            "Must include date & heading",
            "Write in third person",
            "Formal tone only",
            "Mention target audience clearly"
        ],
        example: `                    ABC ENGINEERING COLLEGE
                            NOTICE
Date: 14th February 2026

            ANNUAL CULTURAL FEST — "TECHNOVANZA 2026"

All students of the first year are hereby informed that the Annual
Cultural Fest "Technovanza 2026" will be held on 25th–27th March
2026 in the college auditorium. Interested students are requested
to register their names with their respective class representatives
by 10th March 2026.

For further details, contact the Cultural Committee.

                                                    Sd/-
                                            Rahul Sharma
                                    Secretary, Cultural Committee`
    },
    {
        name: "Email",
        icon: Mail,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        structure: [
            "To: (recipient's email)",
            "Cc / Bcc: (if applicable)",
            "Subject: (clear & concise)",
            "Salutation (Dear Sir/Madam,)",
            "Body — Introduction, Details, Closing",
            "Complimentary Close (Regards, / Sincerely,)",
            "Name & Designation"
        ],
        rules: [
            "Subject line should be specific",
            "Keep paragraphs short (3-4 lines max)",
            "Use formal language",
            "Avoid abbreviations and emojis",
            "Proofread before sending",
            "Include a clear call-to-action"
        ],
        example: `To: principal@abcengineering.edu.in
Subject: Request for Permission to Organize Workshop

Dear Sir/Madam,

I am writing to request your kind permission to organize a one-day
workshop on "Introduction to Machine Learning" for first-year
students on 15th March 2026 in the Computer Lab.

The workshop will be conducted by Prof. Anil Gupta from the CS
Department and will cover basic concepts, hands-on coding, and
real-world applications. We expect approximately 60 participants.

Kindly grant us the necessary permission and arrange for the
required infrastructure.

Thanking you.

Yours sincerely,
Priya Mehta
President, Tech Club`
    },
    {
        name: "Report",
        icon: FileText,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        structure: [
            "Title / Heading",
            "By — Reporter Name",
            "Date & Place",
            "Introduction (What happened & overview)",
            "Body (Detailed account — who, what, when, where)",
            "Conclusion (Outcome / Recommendations)"
        ],
        rules: [
            "Write in past tense",
            "Use third person narration",
            "Be factual and objective",
            "Include quotes if applicable",
            "Maintain chronological order",
            "Keep language formal and impersonal"
        ],
        example: `            REPORT ON ANNUAL SPORTS DAY 2026

By: Ankit Das | Date: 5th February 2026 | Place: ABC Engineering College

The Annual Sports Day of ABC Engineering College was held on 5th
February 2026 at the college sports ground. The event was inaugurated
by the Chief Guest, Mr. Rajesh Verma, a former national athlete.

Over 300 students from all departments participated in various events
including 100m sprint, relay race, long jump, shot put, and cricket.
The highlight of the day was the inter-department relay race, won by
the CSE Department.

"Sports build character and discipline," said the Chief Guest in his
address. Prizes were distributed by the Principal, Dr. S. K. Roy.

The event concluded with the National Anthem. The Sports Committee
was lauded for the excellent organization.`
    },
    {
        name: "Letter",
        icon: PenLine,
        color: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/20",
        structure: [
            "Sender's Address",
            "Date",
            "Receiver's Address",
            "Subject:",
            "Salutation (Dear Sir/Madam,)",
            "Body — Introduction, Main Content, Conclusion",
            "Complimentary Close (Yours faithfully,)",
            "Signature & Name"
        ],
        rules: [
            "Follow formal letter format strictly",
            "Be clear and to the point",
            "Use polite and respectful language",
            "Mention references if replying",
            "State purpose in the first paragraph",
            "End with a clear request or thank you"
        ],
        example: `Room No. 204, Boys' Hostel
ABC Engineering College
Kolkata — 700156

Date: 14th February 2026

The Warden
Boys' Hostel
ABC Engineering College
Kolkata — 700156

Subject: Request for Room Change

Dear Sir,

I am Sagnik Roy, a first-year student of the CSE Department,
Roll No. UEMK2401234, currently residing in Room No. 204 of
the Boys' Hostel.

I am facing persistent issues with the plumbing in my current
room, which has been reported multiple times but remains
unresolved. Due to this, my studies and daily routine are being
affected.

I kindly request you to allot me a different room at your
earliest convenience. I shall be grateful for your prompt action.

Thanking you.

Yours faithfully,
Sagnik Roy
Roll No. UEMK2401234`
    }
];

function FormatCard({ format, index }: { format: WritingFormat; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyExample = () => {
        navigator.clipboard.writeText(format.example);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`rounded-2xl border ${format.border} bg-zinc-900/30 overflow-hidden`}
        >
            {/* Header */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full p-6 flex items-center justify-between hover:bg-zinc-900/60 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${format.bg} ${format.color}`}>
                        <format.icon className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-lg font-bold text-zinc-100">{format.name} Writing</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">{format.structure.length} sections • {format.rules.length} key rules</p>
                    </div>
                </div>
                {expanded ? (
                    <ChevronUp className="h-5 w-5 text-zinc-500" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-zinc-500" />
                )}
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 space-y-6">
                            {/* Structure */}
                            <div>
                                <h4 className={`text-xs font-bold uppercase tracking-wider ${format.color} mb-3`}>Format Structure</h4>
                                <div className="space-y-2">
                                    {format.structure.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <span className={`text-[10px] font-bold ${format.bg} ${format.color} px-2 py-0.5 rounded-md min-w-[24px] text-center mt-0.5`}>
                                                {i + 1}
                                            </span>
                                            <span className="text-sm text-zinc-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Rules */}
                            <div>
                                <h4 className={`text-xs font-bold uppercase tracking-wider ${format.color} mb-3`}>Key Rules</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {format.rules.map((rule, i) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                                            <span className={`${format.color} mt-1 text-xs`}>✓</span>
                                            {rule}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Example */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className={`text-xs font-bold uppercase tracking-wider ${format.color}`}>Example</h4>
                                    <button
                                        onClick={copyExample}
                                        className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1 rounded-lg hover:bg-zinc-800"
                                    >
                                        {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                                        {copied ? "Copied!" : "Copy"}
                                    </button>
                                </div>
                                <pre className={`text-sm text-zinc-300 bg-black/40 border ${format.border} rounded-xl p-5 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed`}>
                                    {format.example}
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function WritingFormats() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                    <BookOpen className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-zinc-100">Writing Formats</h3>
                    <p className="text-xs text-zinc-500">Master the 4 essential formats for your English exam</p>
                </div>
            </div>

            {writingFormats.map((format, index) => (
                <FormatCard key={format.name} format={format} index={index} />
            ))}
        </div>
    );
}
