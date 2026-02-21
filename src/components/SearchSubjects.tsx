"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchSubjectsProps {
    onSearch: (query: string) => void;
}

export default function SearchSubjects({ onSearch }: SearchSubjectsProps) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300); // Debounce search
        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <div className="relative max-w-md w-full mb-10 mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500" />
            </div>
            <input
                type="text"
                placeholder="Search subjects by name or code..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all text-sm shadow-2xl backdrop-blur-sm"
            />
            {query && (
                <button
                    onClick={() => setQuery("")}
                    className="absolute inset-y-0 right-4 flex items-center text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-tighter"
                >
                    Clear
                </button>
            )}
        </div>
    );
}
