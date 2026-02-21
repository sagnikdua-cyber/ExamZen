"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    delay?: number;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // 3D tilt on mouse move (Dora.run style)
        const handleMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            gsap.to(card, {
                rotationY: dx * 12,
                rotationX: -dy * 12,
                scale: 1.03,
                duration: 0.4,
                ease: "power2.out",
                transformPerspective: 600,
            });
            // Highlight glare follows mouse
            const glare = card.querySelector<HTMLElement>(".card-glare");
            if (glare) {
                gsap.to(glare, {
                    opacity: 0.15,
                    x: dx * 30,
                    y: dy * 30,
                    duration: 0.4,
                });
            }
        };

        const handleLeave = () => {
            gsap.to(card, {
                rotationY: 0, rotationX: 0, scale: 1,
                duration: 0.6, ease: "elastic.out(1, 0.5)",
                transformPerspective: 600,
            });
            const glare = card.querySelector<HTMLElement>(".card-glare");
            if (glare) gsap.to(glare, { opacity: 0, duration: 0.4 });
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);
        return () => {
            card.removeEventListener("mousemove", handleMove);
            card.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="feature-card group relative p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors cursor-pointer will-change-transform opacity-0"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Purple gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Mouse glare */}
            <div className="card-glare absolute inset-0 rounded-2xl bg-gradient-radial from-white/20 to-transparent opacity-0 pointer-events-none" />

            <div className="relative z-10">
                <div className="mb-4 inline-flex p-3 rounded-lg bg-zinc-800 text-purple-400 group-hover:text-purple-300 group-hover:bg-zinc-700 transition-colors">
                    <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-zinc-100">{title}</h3>
                <p className="text-zinc-400">{description}</p>
            </div>
        </div>
    );
}
