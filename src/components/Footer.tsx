"use client";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-zinc-900 bg-black py-12">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                            Exam Prep App
                        </h3>
                        <p className="text-zinc-400 max-w-xs">
                            Built for UEM Kolkata students to hack their exam preparation with AI.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-zinc-100 mb-4">Platform</h4>
                        <ul className="space-y-2 text-zinc-400">
                            <li>
                                <Link href="#" className="hover:text-purple-400 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400 transition-colors">
                                    Feedback
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400 transition-colors">
                                    Future Updates
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-zinc-100 mb-4">Legal</h4>
                        <ul className="space-y-2 text-zinc-400">
                            <li>
                                <Link href="#" className="hover:text-purple-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-purple-400 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} Exam Prep App. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            <Github className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
