"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Sparkles, ArrowRight, User as UserIcon } from "lucide-react";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            router.push("/auth/login?message=Account created successfully. Please login.");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-background px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl"
            >
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="inline-flex p-3 rounded-xl bg-purple-500/20 border border-purple-500/30 mb-4"
                    >
                        <UserIcon className="h-6 w-6 text-purple-400" />
                    </motion.div>
                    <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
                    <p className="text-zinc-400 mt-2">Join the future of exam preparation</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-zinc-300 ml-1">Username</label>
                            <input
                                type="text"
                                required
                                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                                placeholder="exam_warrior_01"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                                placeholder="you@uem.edu.in"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                                placeholder="Choose a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading ? "Creating Account..." : "Sign Up"} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </form>

                <p className="text-center text-zinc-500 text-sm">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                        Log in
                    </Link>
                </p>
            </motion.div>
        </main>
    );
}
