"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import SubjectCard from "@/components/SubjectCard";

export default function CoreSubjectsPage() {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await fetch("/api/subjects");
                const data = await res.json();
                // Filter for Core, Basic Science, and Humanities
                const coreSubjects = data.filter((s: any) =>
                    s.category === "Core" ||
                    s.category === "Basic Science" ||
                    s.category === "Humanities"
                );
                setSubjects(coreSubjects);
            } catch (error) {
                console.error("Failed to fetch subjects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubjects();
    }, []);

    const filteredSubjects = subjects.filter((s: any) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <Link href="/dashboard" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                        </Link>
                        <div className="flex items-center gap-2 text-blue-400">
                            <BookOpen className="h-5 w-5" />
                            <span className="text-sm font-medium uppercase tracking-wider">Academic Resources</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                            Core <span className="text-blue-400">Subjects</span>
                        </h1>
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search subjects..."
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-48 rounded-xl bg-zinc-900/50 animate-pulse border border-zinc-800" />
                        ))}
                    </div>
                ) : filteredSubjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSubjects.map((subject, index) => (
                            <SubjectCard
                                key={subject._id}
                                id={subject._id}
                                name={subject.name}
                                code={subject.code}
                                category={subject.category}
                                delay={index * 0.05}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
                        <p className="text-zinc-500">No subjects found matching your search.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
