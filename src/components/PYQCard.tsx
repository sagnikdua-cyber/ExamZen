import { Download, FileText, Star, Repeat, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { Button } from "./Button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PYQCardProps {
    id: string;
    year: number;
    subject: string;
    difficulty: "Easy" | "Medium" | "Hard";
    topics: string[];
    fileUrl?: string;
    repetitionCount?: number;
    isImportant?: boolean;
    isSolved?: boolean;
    solveMode?: boolean;
    extractedContent?: {
        questions: string[];
    };
}

export default function PYQCard({ id, year, subject, difficulty, topics, fileUrl, repetitionCount = 0, isImportant: initialImportant = false, isSolved: initialSolved = false, solveMode = false, extractedContent }: PYQCardProps) {

    const [userMarkedImportant, setUserMarkedImportant] = useState(false);
    const [solved, setSolved] = useState(initialSolved);
    const isActuallyImportant = initialImportant || userMarkedImportant;
    const [showQuestions, setShowQuestions] = useState(false);

    const difficultyColor = {
        Easy: "text-green-400 bg-green-400/10 border-green-400/20",
        Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
        Hard: "text-red-400 bg-red-400/10 border-red-400/20",
    }[difficulty];

    const toggleImportant = () => setUserMarkedImportant(!userMarkedImportant);

    const markSolved = async () => {
        if (solved) return;
        setSolved(true);
        try {
            await fetch("/api/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "PYQ_SOLVED", id }),
            });
        } catch (error) {
            console.error("Failed to track progress:", error);
        }
    };

    return (
        <div className="space-y-2">
            <div className={`rounded-xl border ${solved ? 'border-green-500/40 bg-green-500/5' : isActuallyImportant ? 'border-yellow-500/40 bg-yellow-500/5 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-zinc-800 bg-zinc-900/30'} p-5 transition-all hover:bg-zinc-900 flex justify-between items-center group relative overflow-hidden`}>
                {repetitionCount > 1 && (
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1">
                        <Repeat className="h-2.5 w-2.5" /> REPEATED {repetitionCount}X
                    </div>
                )}

                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-black tracking-tighter text-white opacity-80">{year}</span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${difficultyColor}`}>
                            {difficulty}
                        </span>
                        {solved && (
                            <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-md font-bold uppercase flex items-center gap-1">
                                <CheckCircle className="h-2.5 w-2.5" /> Solved
                            </span>
                        )}
                        {solveMode && !solved && (
                            <span className="text-[10px] bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-md font-bold uppercase">
                                Solve Mode Active
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {topics.map((topic) => (
                            <span key={topic} className="text-[10px] border border-zinc-800 bg-zinc-800/50 text-zinc-400 px-2 py-0.5 rounded transition-colors group-hover:border-zinc-700">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {!solved && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-[10px] h-8 border-green-500/50 text-green-500 hover:bg-green-500/10 gap-1.5"
                            onClick={markSolved}
                        >
                            <CheckCircle className="h-3 w-3" /> Mark Solved
                        </Button>
                    )}
                    {extractedContent?.questions && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-[10px] text-zinc-500 hover:text-white"
                            onClick={() => setShowQuestions(!showQuestions)}
                        >
                            {showQuestions ? 'Hide Questions' : 'View Questions'}
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleImportant}
                        className={`h-9 w-9 rounded-full transition-all ${isActuallyImportant ? 'bg-yellow-500/20 text-yellow-500' : 'text-zinc-600 hover:text-yellow-500 hover:bg-yellow-500/10'}`}
                    >
                        <Star className={`h-4 w-4 ${isActuallyImportant ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 h-9 border-zinc-700 hover:border-zinc-500 text-xs font-bold"
                        onClick={() => fileUrl && window.open(fileUrl, '_blank')}
                        disabled={!fileUrl}
                    >
                        <FileText className="h-3.5 w-3.5" /> {fileUrl ? 'Open Paper' : 'Paper Missing'}
                    </Button>
                </div>
            </div>

            {/* ... rest of the component (extracted content) */}

            {showQuestions && extractedContent?.questions && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 overflow-hidden"
                >
                    <div className="space-y-3">
                        {extractedContent.questions.map((q, i) => (
                            <div key={i} className="flex gap-3 text-sm">
                                <span className="text-indigo-500 font-bold shrink-0">Q{i + 1}.</span>
                                <p className="text-zinc-300 leading-relaxed italic">{q}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
