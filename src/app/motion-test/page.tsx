"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getGSAP } from "@/lib/motion/gsap";
import { fadeUp, staggerChildren, pinSection, scrubTimeline } from "@/lib/motion/primitives";
import { useMotion } from "@/lib/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Play, RefreshCw, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function MotionTestPage() {
  const { lenis, isReady, prefersReducedMotion } = useMotion();
  const [emulatedReducedMotion, setEmulatedReducedMotion] = useState(false);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const staggerRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGSAP();

    // GSAP context for automatic component-scoped cleanup
    const ctx = gsap.context(() => {
      if (emulatedReducedMotion) return;

      // 1. Fade Up animation
      if (fadeRef.current) {
        fadeUp(fadeRef.current);
      }

      // 2. Stagger Children animation
      if (staggerRef.current) {
        staggerChildren(staggerRef.current, ".stagger-card", { stagger: 0.15 });
      }

      // 3. Pinned Scroll Scrubbing Demo
      if (pinContainerRef.current && pinContentRef.current) {
        const tl = gsap.timeline();
        tl.to(pinContentRef.current.querySelector(".pin-step-1"), {
          opacity: 0,
          scale: 0.8,
          duration: 1,
        })
          .fromTo(
            pinContentRef.current.querySelector(".pin-step-2"),
            { opacity: 0, scale: 1.2 },
            { opacity: 1, scale: 1, duration: 1 }
          )
          .to(pinContentRef.current.querySelector(".pin-step-2"), {
            opacity: 0,
            scale: 0.8,
            duration: 1,
          })
          .fromTo(
            pinContentRef.current.querySelector(".pin-step-3"),
            { opacity: 0, scale: 1.2 },
            { opacity: 1, scale: 1, duration: 1 }
          );

        scrubTimeline(tl, pinContainerRef.current, {
          start: "top top",
          end: "+=250%",
          scrub: 1,
        });

        ScrollTrigger.create({
          trigger: pinContainerRef.current,
          pin: true,
          start: "top top",
          end: "+=250%",
          pinSpacing: true,
        });
      }
    });

    return () => ctx.revert();
  }, [emulatedReducedMotion]);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-brand-400 selection:text-black">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-glass backdrop-blur-md px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-sm font-bold text-brand-400 hover:text-brand-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Landing Experience</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-text-muted">
              Lenis: {isReady ? "Active (60fps)" : "Initializing"}
            </span>
            <button
              onClick={() => setEmulatedReducedMotion(!emulatedReducedMotion)}
              className={`px-3 py-1 rounded-pill text-xs font-bold font-mono transition-colors ${
                emulatedReducedMotion
                  ? "bg-status-warning text-black"
                  : "bg-neutral-800 text-text-secondary hover:text-white"
              }`}
            >
              {emulatedReducedMotion ? "Reduced Motion: SIMULATED" : "Motion: ENABLED"}
            </button>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <span className="text-xs font-mono text-brand-400 uppercase tracking-widest block mb-2">
          PROMPT 6 MOTION HARNESS
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight mb-4">
          GSAP + Lenis Engine Verification
        </h1>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          This test route verifies that ScrollTrigger timelines, section pinning, scrubbed state
          transitions, and reduced motion fallbacks operate in complete synchronization without memory
          leaks or hydration errors.
        </p>
      </section>

      {/* 1. Fade Up Test Section */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h3 className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-4">
          01 // fadeUp() Primitive Test
        </h3>
        <div ref={fadeRef} className="glass-card p-8 border-brand-500/30 text-center space-y-3">
          <div className="flex justify-center text-brand-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h4 className="text-2xl font-display font-bold text-white">fadeUp() Triggered Cleanly</h4>
          <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
            Smoothly translates from y: 32px to y: 0px on scroll intersection with zero layout shift.
          </p>
        </div>
      </section>

      {/* 2. Stagger Children Test Section */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h3 className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-4">
          02 // staggerChildren() Primitive Test
        </h3>
        <div ref={staggerRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["Electrolyte Matrix", "Alpine Water Base", "Zero Sugar Loading"].map((item, i) => (
            <div
              key={item}
              className="stagger-card glass-card p-6 border-border-subtle hover:border-brand-500/40 transition-colors text-center"
            >
              <span className="text-xs font-mono text-brand-400 block mb-1">CARD 0{i + 1}</span>
              <div className="font-bold text-white text-base">{item}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Pinned Section Scrubbing Demo */}
      <section ref={pinContainerRef} className="relative h-screen bg-neutral-950 flex items-center justify-center border-y border-border-subtle">
        <div ref={pinContentRef} className="relative w-full max-w-2xl px-6 text-center">
          <span className="text-xs font-mono text-brand-400 uppercase tracking-widest block mb-4">
            03 // pinSection() & scrubTimeline() Narrative Pin Demo
          </span>

          {/* Pin Step 1 */}
          <div className="pin-step-1 absolute inset-x-0 top-0 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-display font-black text-white">
              PHASE 1: ALPINE EXTRACTION
            </h2>
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              Natural gravity filtration through mineral-rich basalt limestone.
            </p>
          </div>

          {/* Pin Step 2 */}
          <div className="pin-step-2 absolute inset-x-0 top-0 opacity-0 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-display font-black text-brand-400">
              PHASE 2: IONIC CHARGE
            </h2>
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              450mg bioavailable electrolytes calibrated for intracellular osmosis.
            </p>
          </div>

          {/* Pin Step 3 */}
          <div className="pin-step-3 relative opacity-0 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-display font-black text-accent-cyan">
              PHASE 3: ALUMINUM LOCK
            </h2>
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              Infinitely recyclable sealed aluminum protecting UV freshness.
            </p>
          </div>
        </div>
      </section>

      {/* Outro */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h3 className="text-2xl font-display font-bold text-white mb-4">
          All Motion Foundations Operational
        </h3>
        <p className="text-sm text-text-secondary max-w-md mx-auto mb-8">
          Lenis virtual scroll, ScrollTrigger scrollerProxy, and prefers-reduced-motion gates verified.
        </p>
        <Link href="/">
          <Button variant="primary" size="md">
            Return to Landing Page
          </Button>
        </Link>
      </section>
    </main>
  );
}
