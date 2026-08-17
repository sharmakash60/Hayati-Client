"use client";

import React, { useRef, useEffect } from "react";
import { Sparkles, Zap, Shield, Recycle } from "lucide-react";
import { getGSAP } from "@/lib/motion/gsap";

export function Scene02Story() {
  const storyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGSAP();
    if (!storyRef.current) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: storyRef.current,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => {
          gsap.fromTo(
            ".story-element",
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
          );
        },
      });
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={storyRef}
      id="story-scene"
      className="relative min-h-[140vh] flex items-center px-6 sm:px-12 lg:px-24 py-28 z-20 overflow-hidden"
    >
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] z-0" />

      {/* Left Column Content — Designed to give 3D Can full clearance on the Right */}
      <div className="relative z-20 max-w-xl lg:max-w-2xl text-left">
        {/* Section Badge */}
        <div className="story-element inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>02 / THE FORMULATION ENGINE</span>
        </div>

        {/* Display Headline */}
        <h2 className="story-element font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] mb-6">
          Born from Alpine Purity.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-accent-cyan">
            Zero Compromise.
          </span>
        </h2>

        {/* Story Body */}
        <p className="story-element text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed mb-8">
          Every can of Hayati is precision-crafted to energise, hydrate, and sharpen focus. We
          eliminate artificial sweeteners, synthetic dyes, and proprietary chemical blends in
          favor of bioavailable botanical extracts and pure ionic salts.
        </p>

        {/* 3 Key Pillars Grid */}
        <div className="space-y-4">
          {[
            {
              icon: <Zap className="h-5 w-5 text-brand-400" />,
              title: "450mg Bioavailable Electrolytes",
              desc: "Optimized ionic ratio of Magnesium, Potassium, and Himalayan Pink Salt for cellular absorption.",
            },
            {
              icon: <Shield className="h-5 w-5 text-accent-cyan" />,
              title: "0g Sugar • Zero Glycemic Crash",
              desc: "Pure botanical sweetness without synthetic sucralose, aspartame, or high fructose corn syrup.",
            },
            {
              icon: <Recycle className="h-5 w-5 text-brand-300" />,
              title: "100% Endlessly Recyclable Aluminum",
              desc: "Canned at the source using renewable energy in infinitely recyclable aluminum.",
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="story-element glass-card p-4.5 border-border-subtle bg-neutral-950/70 backdrop-blur-md flex items-start gap-4 hover:border-brand-500/30 transition-colors"
            >
              <div className="p-2 rounded-xl bg-neutral-900 border border-border-subtle shrink-0">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
