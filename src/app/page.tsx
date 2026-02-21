"use client";
import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import { BookOpen, Calculator, Trophy, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const featuresRef = useRef<HTMLElement>(null);
  const yearSectionRef = useRef<HTMLElement>(null);
  const featuresTitleRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: BookOpen,
      title: "PYQ Smart Study",
      description: "Access structured Previous Year Questions aimed at your syllabus.",
    },
    {
      icon: Calculator,
      title: "AI Sessional Generator",
      description: "Generate mock sessional papers with AI insights for your upcoming exams.",
    },
    {
      icon: Users,
      title: "Viva Prep Tool (For Practicals)",
      description: "Practice answering common viva questions to boost your confidence.",
    },
    {
      icon: Trophy,
      title: "Exam Readiness Tracker",
      description: "Track your preparation level with our smart progress system.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── FEATURES SECTION TITLE REVEAL ───────────────────────────────
      if (featuresTitleRef.current) {
        const title = featuresTitleRef.current.querySelector("h2");
        const subtitle = featuresTitleRef.current.querySelector("p");
        const divider = featuresTitleRef.current.querySelector(".divider");

        gsap.fromTo([title, subtitle, divider],
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.9, stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuresTitleRef.current,
              start: "top 80%",
              once: true,
            }
          }
        );
      }

      // ─── FEATURE CARDS STAGGER ────────────────────────────────────────
      const cards = document.querySelectorAll(".feature-card");
      gsap.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, stagger: 0.12,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 85%",
            once: true,
          }
        }
      );

      // ─── YEAR SECTION SLIDE IN ─────────────────────────────────────────
      if (yearSectionRef.current) {
        const titleEl = yearSectionRef.current.querySelector("h2");
        const bodyEl = yearSectionRef.current.querySelector("p");
        const cards = yearSectionRef.current.querySelectorAll(".year-card");

        gsap.fromTo([titleEl, bodyEl],
          { opacity: 0, x: -50 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: yearSectionRef.current, start: "top 80%", once: true }
          }
        );

        gsap.fromTo(cards,
          { opacity: 0, scale: 0.85, y: 30 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.7, stagger: 0.1, ease: "back.out(1.6)",
            scrollTrigger: { trigger: cards[0], start: "top 85%", once: true }
          }
        );

        // Hover effect on 1st year card
        const firstYearCard = yearSectionRef.current.querySelector(".year-card-active");
        if (firstYearCard) {
          firstYearCard.addEventListener("mouseenter", () => {
            gsap.to(firstYearCard, { scale: 1.06, duration: 0.3, ease: "power2.out" });
          });
          firstYearCard.addEventListener("mouseleave", () => {
            gsap.to(firstYearCard, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
          });
        }
      }

      // ─── HORIZONTAL SCROLL PARALLAX on BG ───────────────────────────
      gsap.to(".parallax-blob", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: { scrub: true },
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Parallax radial blobs */}
      <div className="parallax-blob fixed top-1/3 left-0 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none -z-10" />
      <div className="parallax-blob fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-pink-600/5 blur-[100px] pointer-events-none -z-10" />

      <Hero />

      {/* ── FEATURES SECTION ── */}
      <section ref={featuresRef} className="container px-4 md:px-6 mx-auto py-24" id="features">
        <div ref={featuresTitleRef} className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 opacity-0">
            Everything You Need <br /> To Pass The Ni<span className="inline-block text-purple-500 italic rotate-6">g</span>ht Before
          </h2>
          <p className="mt-4 text-zinc-400 max-w-[600px] mx-auto opacity-0">
            Focus on what matters. Our App filters the noise and gives you the high-yield topics.
          </p>
          <div className="divider mt-12 flex items-center justify-center gap-4 opacity-0">
            <div className="h-px w-8 bg-zinc-800" />
            <h3 className="text-xs font-black tracking-[0.3em] text-zinc-500 uppercase">Features</h3>
            <div className="h-px w-8 bg-zinc-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      {/* ── YEAR SELECTION SECTION ── */}
      <section ref={yearSectionRef} className="container px-4 md:px-6 mx-auto py-24 border-t border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 opacity-0">Select Your Year</h2>
            <p className="text-zinc-400 mb-6 opacity-0">Currently supporting 1st Year Engineering students of UEM Kolkata.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div
              className="year-card year-card-active p-6 rounded-xl border border-purple-500/50 bg-purple-500/10 cursor-pointer hover:bg-purple-500/20 transition-colors text-center opacity-0"
            >
              <div className="text-2xl font-bold text-white mb-1">1st Year</div>
              <div className="text-sm text-purple-300">Available Now</div>
            </div>
            {['2nd', '3rd', '4th'].map((year) => (
              <div
                key={year}
                className="year-card p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 opacity-0 cursor-not-allowed text-center"
              >
                <div className="text-2xl font-bold text-zinc-500 mb-1">{year} Year</div>
                <div className="text-sm text-zinc-600">Coming Soon</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
