"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const message = searchParams.get("message");
        if (message) {
            setSuccess(message);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError(res.error);
            } else {
                const session = await getSession();
                if (session?.user && (session.user as any).onboardingSeen) {
                    router.push("/dashboard");
                } else {
                    router.push("/onboarding");
                }
            }
        } catch (err) {
            setError("An unexpected error occurred.");
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
                        <Sparkles className="h-6 w-6 text-purple-400" />
                    </motion.div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                    <p className="text-zinc-400 mt-2">Log in to continue your preparation</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-4 rounded-xl border bg-green-500/10 border-green-500/30 text-green-400 text-sm text-center"
                            >
                                {success}
                            </motion.div>
                        )}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`p-4 rounded-xl border ${error.includes("No user found")
                                    ? "bg-purple-500/10 border-purple-500/30 text-purple-200"
                                    : "bg-red-500/10 border-red-500/20 text-red-500"
                                    } text-sm text-center`}
                            >
                                {error.includes("No user found") ? (
                                    <div className="flex flex-col gap-2">
                                        <p>You don&apos;t have an account yet!</p>
                                        <Link href="/auth/signup" className="text-purple-400 font-bold hover:underline">
                                            Sign Up First →
                                        </Link>
                                    </div>
                                ) : (
                                    error
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-4">
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
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading ? "Logging in..." : "Login"} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </form>

                <p className="text-center text-zinc-500 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </main>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <LoginForm />
        </Suspense>
    );
}
