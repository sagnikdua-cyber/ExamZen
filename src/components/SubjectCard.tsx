"use client";
import { motion } from "framer-motion";
import {
    Book,
    Zap,
    Calculator,
    Code2,
    FlaskConical,
    Atom,
    Settings,
    MessageSquare,
    FileCode2,
    DraftingCompass,
    Dna,
    BarChart3,
    Infinity,
    Languages,
    Type,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";

interface SubjectCardProps {
    id: string;
    name: string;
    code: string;
    category: string;
    delay?: number;
}

const getSubjectTheme = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("electronics")) return { icon: Zap, color: "text-rose-400", bg: "bg-rose-500/10", border: "group-hover:border-rose-500/50" };
    if (n.includes("calculus")) return { icon: Infinity, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "group-hover:border-indigo-500/50" };
    if (n.includes("statistics")) return { icon: BarChart3, color: "text-blue-400", bg: "bg-blue-500/10", border: "group-hover:border-blue-500/50" };
    if (n.includes("programming language c") || n.includes("language c")) return { icon: Code2, color: "text-amber-400", bg: "bg-amber-500/10", border: "group-hover:border-amber-500/50" };
    if (n.includes("chemistry")) return { icon: FlaskConical, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "group-hover:border-emerald-500/50" };
    if (n.includes("physics")) return { icon: Atom, color: "text-violet-400", bg: "bg-violet-500/10", border: "group-hover:border-violet-500/50" };
    if (n.includes("mechanics")) return { icon: Settings, color: "text-orange-400", bg: "bg-orange-500/10", border: "group-hover:border-orange-500/50" };
    if (n.includes("electrical")) return { icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "group-hover:border-yellow-500/50" };
    if (n.includes("english")) return { icon: Type, color: "text-sky-400", bg: "bg-sky-500/10", border: "group-hover:border-sky-500/50" };
    if (n.includes("python")) return { icon: FileCode2, color: "text-teal-400", bg: "bg-teal-500/10", border: "group-hover:border-teal-500/50" };
    if (n.includes("biology")) return { icon: Dna, color: "text-pink-400", bg: "bg-pink-500/10", border: "group-hover:border-pink-500/50" };
    return { icon: Book, color: "text-zinc-400", bg: "bg-zinc-500/10", border: "group-hover:border-zinc-500/50" };
};

export default function SubjectCard({ id, name, code, category, delay = 0 }: SubjectCardProps) {
    const { icon: Icon, color, bg, border } = getSubjectTheme(name);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay }}
            className={`group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 hover:bg-zinc-900/80 transition-all ${border}`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${bg} ${color} group-hover:brightness-125 transition-all`}>
                    <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                    {category}
                </span>
            </div>

            <h3 className="text-lg font-bold text-zinc-100 mb-1 line-clamp-1" title={name}>{name}</h3>
            <p className="text-sm text-zinc-500 mb-4">{code}</p>

            <Link href={`/subject/${id}`}>
                <Button variant="outline" size="sm" className={`w-full group-hover:text-white transition-colors text-xs`}>
                    View Materials <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
            </Link>
        </motion.div>
    );
}
