"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

interface Card {
    title: string;
    definition: string;
    formula?: string;
    keyPoints?: string[];
}

interface FlashcardProps {
    cards: Card[];
}

export default function Flashcard({ cards }: FlashcardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const nextCard = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    const prevCard = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const currentCard = cards[currentIndex];

    const handleFlip = () => {
        const nextState = !isFlipped;
        setIsFlipped(nextState);
        if (nextState) {
            // Track view when revealed
            fetch("/api/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "FLASHCARD_VIEW", id: currentCard.title }),
            }).catch(e => console.error("Track Flashcard error:", e));
        }
    };

    // Offline Caching logic
    useEffect(() => {
        if (cards && cards.length > 0) {
            localStorage.setItem(`flashcards_cache_${cards[0].title.substring(0, 10)}`, JSON.stringify(cards));
        }
    }, [cards]);

    if (!cards.length) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Info className="h-4 w-4" /> Fast Revision Card {currentIndex + 1}/{cards.length}
                </h3>
                <div className="flex gap-2">
                    <button onClick={prevCard} className="p-2 rounded-full hover:bg-zinc-800 transition-colors text-zinc-400">
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button onClick={nextCard} className="p-2 rounded-full hover:bg-zinc-800 transition-colors text-zinc-400">
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div
                className="relative h-64 w-full cursor-pointer perspective-1000"
                onClick={handleFlip}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d transition-all duration-500"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-2xl">
                        <div className="bg-indigo-500/10 text-indigo-400 p-3 rounded-xl mb-4">
                            <span className="text-4xl font-black">?</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">{currentCard.title}</h2>
                        <p className="mt-4 text-zinc-500 text-sm">Click to reveal definition & formula</p>
                    </div>

                    {/* Back */}
                    <div
                        className="absolute inset-0 backface-hidden bg-zinc-900 border border-indigo-500/30 rounded-2xl p-8 shadow-2xl overflow-y-auto"
                        style={{ transform: "rotateY(180deg)" }}
                    >
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-indigo-400 tracking-tighter">Definition</label>
                                <p className="text-zinc-200 text-sm leading-relaxed">{currentCard.definition}</p>
                            </div>

                            {currentCard.formula && (
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-emerald-400 tracking-tighter">Formula / Key Eq</label>
                                    <div className="bg-black/40 border border-zinc-800 p-3 rounded-lg text-emerald-400 font-mono text-center">
                                        {currentCard.formula}
                                    </div>
                                </div>
                            )}

                            {currentCard.keyPoints && currentCard.keyPoints.length > 0 && (
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-amber-400 tracking-tighter">Key Points</label>
                                    <ul className="list-disc list-inside text-zinc-400 text-xs space-y-1 mt-1">
                                        {currentCard.keyPoints.map((point: string, i: number) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
