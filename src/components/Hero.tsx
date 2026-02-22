"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";

gsap.registerPlugin(TextPlugin);

const ACADEMIC_PARTICLES = [
    "∫", "Σ", "∂", "√", "π", "∞", "α", "β", "γ", "δ",
    "λ", "μ", "∇", "≡", "±", "⟨⟩", "F=ma", "E=mc²",
    "PYQ", "∈", "⊂", "⊗", "∀", "∃", "∧", "∨",
];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const cursorBlobRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const magneticRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ─── PARTICLE SYSTEM ────────────────────────────────────────────
            const container = particlesRef.current;
            if (container) {
                // Triple the density for "more numerous" elements
                const particleCount = ACADEMIC_PARTICLES.length * 3;

                for (let i = 0; i < particleCount; i++) {
                    const sym = ACADEMIC_PARTICLES[i % ACADEMIC_PARTICLES.length];
                    const el = document.createElement("div");
                    el.textContent = sym;

                    // Larger sizes: text-sm to text-2xl for better prominence
                    const sizes = ["text-sm", "text-md", "text-lg", "text-xl", "text-2xl"];
                    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

                    el.className = `particle absolute ${randomSize} font-mono font-black pointer-events-none select-none will-change-transform`;

                    // Higher opacity (0.15 - 0.35) for "better visibility"
                    const baseOpacity = 0.15 + Math.random() * 0.2;
                    el.style.cssText = `
                        color: rgba(168,85,247,${baseOpacity});
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                        text-shadow: 0 0 10px rgba(168,85,247,0.1);
                    `;
                    container.appendChild(el);

                    gsap.set(el, { scale: 0, opacity: 0 });
                    gsap.to(el, {
                        scale: 1 + Math.random() * 0.5,
                        opacity: 1,
                        delay: (i % ACADEMIC_PARTICLES.length) * 0.05,
                        duration: 1,
                        ease: "back.out(1.5)",
                    });

                    // Continuous float
                    gsap.to(el, {
                        y: -40 - Math.random() * 80,
                        x: (Math.random() - 0.5) * 50,
                        rotation: (Math.random() - 0.5) * 45,
                        repeat: -1,
                        yoyo: true,
                        duration: 5 + Math.random() * 5,
                        ease: "sine.inOut",
                        delay: Math.random() * 5,
                    });
                }
            }

            // ─── LOGO ENTRANCE ───────────────────────────────────────────────
            gsap.fromTo(logoRef.current,
                { scale: 0.3, opacity: 0, rotation: -15 },
                { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.5)", delay: 0.2 }
            );
            // Pulse glow loop
            gsap.to(logoRef.current?.querySelector(".logo-glow") as Element, {
                scale: 1.3, opacity: 0.6, repeat: -1, yoyo: true,
                duration: 2, ease: "sine.inOut",
            });

            // ─── HEADLINE SCRAMBLE REVEAL ─────────────────────────────────────
            if (headlineRef.current) {
                const tl = gsap.timeline({ delay: 0.5 });
                const words = headlineRef.current.querySelectorAll(".word");
                tl.fromTo(words,
                    { opacity: 0, y: 60, rotationX: -90, transformOrigin: "0% 50% -50" },
                    {
                        opacity: 1, y: 0, rotationX: 0,
                        duration: 0.8, stagger: 0.1,
                        ease: "back.out(2)"
                    }
                );
            }

            // ─── SUBTITLE SLIDE ───────────────────────────────────────────────
            gsap.fromTo(subRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.9, delay: 1.1, ease: "power3.out" }
            );

            // ─── CTA BUTTONS ──────────────────────────────────────────────────
            gsap.fromTo(ctaRef.current,
                { opacity: 0, y: 20, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 1.3, ease: "back.out(1.5)" }
            );

        }, sectionRef);

        // ─── CUSTOM CURSOR ────────────────────────────────────────────────────
        const blob = cursorBlobRef.current;
        const dot = cursorDotRef.current;
        let mouseX = 0, mouseY = 0;
        let blobX = 0, blobY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            gsap.to(dot, { x: mouseX - 4, y: mouseY - 4, duration: 0.1 });
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Blob lags behind cursor (Dora.run style)
        const ticker = gsap.ticker.add(() => {
            blobX += (mouseX - blobX) * 0.08;
            blobY += (mouseY - blobY) * 0.08;
            gsap.set(blob, { x: blobX - 200, y: blobY - 200 });
        });

        // ─── MAGNETIC BUTTONS ─────────────────────────────────────────────────
        const handleMagnet = (e: MouseEvent, el: HTMLDivElement) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            gsap.to(el, { x: dx * 0.3, y: dy * 0.3, duration: 0.3, ease: "power2.out" });
        };
        const handleMagnetLeave = (el: HTMLDivElement) => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
        };

        magneticRefs.current.forEach(el => {
            if (!el) return;
            el.addEventListener("mousemove", (e) => handleMagnet(e, el));
            el.addEventListener("mouseleave", () => handleMagnetLeave(el));
        });

        return () => {
            ctx.revert();
            window.removeEventListener("mousemove", handleMouseMove);
            gsap.ticker.remove(ticker);
        };
    }, []);

    // Split headline into individual words for stagger
    const line1Words = ["Ace", "Your", "Exams", "Even"];
    const line2Words = ["The", "Night", "Before"];

    return (
        <>
            {/* Custom cursor blob */}
            <div ref={cursorBlobRef} className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform hidden md:block">
                <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/15 blur-[80px]" />
            </div>
            <div ref={cursorDotRef} className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full bg-purple-400 mix-blend-screen hidden md:block" />

            <section ref={sectionRef} className="relative overflow-hidden pt-20 pb-32 md:pt-32">
                {/* Floating academic particles */}
                <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden />

                {/* Grid background pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                />

                {/* Radial gradient glow - top center */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-25 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-[120px] rounded-full mix-blend-screen" />
                </div>

                <div className="container px-4 md:px-6 mx-auto relative z-10">
                    <div className="flex flex-col items-center text-center space-y-8">

                        {/* Logo */}
                        <div ref={logoRef} className="mb-8 cursor-default opacity-0">
                            <div className="relative w-48 h-48 mx-auto">
                                <div className="logo-glow absolute inset-0 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-full blur-2xl" />
                                <div className="relative w-full h-full rounded-full border-2 border-purple-500/50 p-2 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src="/logo.jpg"
                                        alt="ExamZen Logo"
                                        width={180}
                                        height={180}
                                        className="object-contain rounded-full"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Headline with word-level 3D stagger */}
                        <h1
                            ref={headlineRef}
                            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl perspective-[600px]"
                            style={{ perspective: "600px" }}
                        >
                            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-300">
                                {line1Words.map((w, i) => (
                                    <span key={i} className="word inline-block opacity-0">{w}</span>
                                ))}
                            </div>
                            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-purple-400 mt-1">
                                {line2Words.map((w, i) => (
                                    <span key={i} className={`word inline-block opacity-0 ${w === "Night" ? "italic" : ""}`}>
                                        {w === "Night" ? (
                                            <>Ni<span className="inline-block text-purple-500 italic rotate-12">g</span>ht</>
                                        ) : w}
                                    </span>
                                ))}
                            </div>
                        </h1>

                        {/* Subtitle */}
                        <p
                            ref={subRef}
                            className="max-w-[700px] text-zinc-400 md:text-2xl font-serif italic text-purple-200/80 opacity-0"
                        >
                            "Get Ready for Tomorrow's Battle"
                        </p>

                        {/* CTA Buttons (magnetic) */}
                        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 min-w-[300px] justify-center opacity-0">
                            <div ref={el => { if (el) magneticRefs.current[0] = el; }}>
                                <Link href="/auth/login">
                                    <Button size="lg" variant="premium" className="w-full sm:w-auto group">
                                        Login <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>
                            <div ref={el => { if (el) magneticRefs.current[1] = el; }}>
                                <Link href="/auth/signup">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
