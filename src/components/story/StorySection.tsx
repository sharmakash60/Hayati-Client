"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { StoryCanvas, StoryCanvasHandle } from "./StoryCanvas";
import { SIX_FLAVORS } from "@/lib/motion/3dConfig";
import { getSiteContent } from "@/lib/content/loader";
import { useCartStore } from "@/lib/store/cartStore";
import { getGSAP } from "@/lib/motion/gsap";
import { getLenis } from "@/lib/motion/lenis";
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Check,
  X,
  ShieldCheck,
  Layers,
  RotateCw,
  Eye,
} from "lucide-react";

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHandleRef = useRef<StoryCanvasHandle>(null);

  const content = getSiteContent();
  const addItem = useCartStore((s) => s.addItem);

  const [activeFlavorIdx, setActiveFlavorIdx] = useState(0);
  const [activeBenefitStep, setActiveBenefitStep] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [added, setAdded] = useState(false);

  // Email Allocation Form State
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const activeFlavor = SIX_FLAVORS[activeFlavorIdx] || SIX_FLAVORS[0];
  const benefitSteps = content.benefits.steps;
  const activeBenefit = benefitSteps[activeBenefitStep] || benefitSteps[0];

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGSAP();
    if (!containerRef.current) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;

          if (canvasHandleRef.current) {
            canvasHandleRef.current.setScrollProgress(progress);
          }

          if (progress < 0.25) {
            setCurrentChapter(1);
          } else if (progress < 0.55) {
            setCurrentChapter(2);
          } else if (progress < 0.80) {
            setCurrentChapter(3);
          } else {
            setCurrentChapter(4);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleFlavorSelect = (idx: number) => {
    setActiveFlavorIdx(idx);
    if (canvasHandleRef.current) {
      canvasHandleRef.current.setActiveFlavor(idx);
    }
  };

  const jumpToChapter = (chapterNum: number) => {
    const lenis = getLenis();
    if (!containerRef.current) return;

    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targets = [0, 0.12, 0.40, 0.68, 0.90];
    const targetScroll = containerRef.current.offsetTop + totalHeight * targets[chapterNum];

    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const handleAddToCart = () => {
    const pricePaise =
      activeFlavor.collection === "Signature Botanicals"
        ? 21900
        : activeFlavor.collection === "Fruit Splash"
        ? 16900
        : 18900;

    addItem({
      id: activeFlavor.id,
      name: `Hayati ${activeFlavor.name}`,
      collection: activeFlavor.collection,
      flavor: activeFlavor.subname,
      price: pricePaise,
      canImage: activeFlavor.imageFallback,
      accentColor: activeFlavor.accentColor,
      inStock: true,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setFormStatus("error");
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
        setFormError("Something went wrong. Please try again.");
      }
    } catch {
      setFormStatus("error");
      setFormError("Network error. Please try again.");
    }
  };

  return (
    <section ref={containerRef} id="story-track" className="relative w-full h-[400vh] z-20">
      {/* Sticky Fullscreen Story Viewport */}
      <div className="sticky top-0 w-full h-screen flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 pt-20 pb-6 overflow-hidden">
        {/* Ambient Radial Accent Lighting */}
        <div
          className="pointer-events-none absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 transition-colors duration-1000 z-0"
          style={{ backgroundColor: activeFlavor.accentColor }}
        />

        {/* ─────────────────────────────────────────────────────────────
            LEFT COLUMN: Content Safe Zone (46% Width on Desktop)
            Strictly segregated from 3D Product — Zero Text Collision
           ───────────────────────────────────────────────────────────── */}
        <div className="relative z-30 w-full md:w-[46%] max-w-xl flex flex-col justify-center text-left py-4 sm:py-8">
          {/* CHAPTER 1: INTRO */}
          <div
            className={`transition-all duration-500 ${
              currentChapter === 1
                ? "opacity-100 translate-y-0 relative pointer-events-auto"
                : "opacity-0 -translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest px-3 py-1 rounded-pill bg-brand-950/70 border border-brand-500/30">
                <Sparkles className="h-3.5 w-3.5" />
                <span>01 // PRECISION HYDRATION</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.04]">
                REFRESH YOUR ENGINE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-accent-cyan">
                  WITH LIQUID PRECISION.
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed max-w-lg">
                Crafted for high performers. Pure alpine mountain water charged with 450mg
                bioavailable ionic electrolytes and organic botanical adaptogens.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 px-5 py-3 rounded-pill text-xs sm:text-sm font-bold bg-brand-400 text-black hover:scale-105 transition-transform shadow-glow-brand"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>{added ? "Added to Cart" : "Claim First Drop • ₹189"}</span>
                </button>

                <button
                  onClick={() => jumpToChapter(2)}
                  className="px-5 py-3 rounded-pill text-xs sm:text-sm font-bold bg-neutral-900 border border-border-subtle text-white hover:text-brand-400 hover:border-brand-500/40 transition-colors"
                >
                  Explore 6 Flavors
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border-subtle">
                <div className="text-left">
                  <div className="text-xs font-bold text-white">0g Sugar</div>
                  <div className="text-[10px] font-mono text-brand-400">Zero Crash</div>
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">450mg</div>
                  <div className="text-[10px] font-mono text-brand-400">Electrolytes</div>
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">100% Recyclable</div>
                  <div className="text-[10px] font-mono text-brand-400">Aluminum</div>
                </div>
              </div>
            </div>
          </div>

          {/* CHAPTER 2: 6 SIGNATURE FLAVORS */}
          <div
            className={`transition-all duration-500 ${
              currentChapter === 2
                ? "opacity-100 translate-y-0 relative pointer-events-auto"
                : "opacity-0 -translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            <div className="space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest px-3 py-1 rounded-pill bg-brand-950/70 border border-brand-500/30">
                <Layers className="h-3.5 w-3.5" />
                <span>02 // 6 SIGNATURE FORMULAS</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Crafted for Every <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-accent-cyan">
                  Taste Profile.
                </span>
              </h2>

              {/* 6 Flavor Selection Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SIX_FLAVORS.map((f, idx) => (
                  <button
                    key={f.id}
                    onClick={() => handleFlavorSelect(idx)}
                    className={`px-3 py-1.5 rounded-pill text-[11px] font-mono font-bold uppercase transition-all duration-300 ${
                      activeFlavorIdx === idx
                        ? "shadow-lg text-black scale-105 font-black"
                        : "bg-neutral-900 border border-border-subtle text-text-secondary hover:text-white"
                    }`}
                    style={activeFlavorIdx === idx ? { backgroundColor: f.accentColor } : {}}
                  >
                    {f.name}
                  </button>
                ))}
              </div>

              {/* Active Flavor Spec Card */}
              <div className="glass-card p-4 sm:p-5 border-border-subtle bg-neutral-950/85 backdrop-blur-xl rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="text-[11px] font-mono uppercase tracking-widest font-bold block"
                      style={{ color: activeFlavor.accentColor }}
                    >
                      {activeFlavor.collection}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{activeFlavor.name}</h3>
                  </div>
                  <span className="text-base font-black text-white font-mono">₹189</span>
                </div>
                <p className="text-xs text-text-secondary font-mono">{activeFlavor.badge}</p>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-pill text-xs font-bold bg-brand-400 text-black hover:scale-105 transition-transform"
                  >
                    {added ? <Check className="h-3.5 w-3.5" /> : <ShoppingBag className="h-3.5 w-3.5" />}
                    <span>{added ? "Added to Cart" : "Add to Cart"}</span>
                  </button>

                  <Link
                    href={`/products/${activeFlavor.id}`}
                    className="px-4 py-2.5 rounded-pill text-xs font-bold bg-neutral-900 border border-border-subtle text-white hover:text-brand-400 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CHAPTER 3: BOTANICAL BENEFITS / CLAIM-SWAP */}
          <div
            className={`transition-all duration-500 ${
              currentChapter === 3
                ? "opacity-100 translate-y-0 relative pointer-events-auto"
                : "opacity-0 -translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            <div className="space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest px-3 py-1 rounded-pill bg-brand-950/70 border border-brand-500/30">
                <Sparkles className="h-3.5 w-3.5" />
                <span>03 // THE BOTANICAL PROMISE</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Striking Out Compromise. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-accent-cyan">
                  Pioneering Pure Function.
                </span>
              </h2>

              {/* 4 Step Selector Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {benefitSteps.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveBenefitStep(idx);
                      handleFlavorSelect(idx % 6);
                    }}
                    className={`px-3 py-1 rounded-pill text-[10px] font-mono font-bold transition-all ${
                      activeBenefitStep === idx
                        ? "bg-brand-400 text-black shadow-glow-brand scale-105"
                        : "bg-neutral-900 border border-border-subtle text-text-secondary hover:text-white"
                    }`}
                  >
                    0{s.stepNumber} // {s.title}
                  </button>
                ))}
              </div>

              {/* Claim-Swap Dynamic Card */}
              <div className="glass-card p-4 sm:p-5 border-border-subtle bg-neutral-950/85 backdrop-blur-xl rounded-2xl space-y-3">
                <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 flex items-start gap-2.5">
                  <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-red-400 font-bold block mb-0.5">
                      Standard Industry Reality
                    </span>
                    <p className="text-xs text-neutral-400 line-through decoration-red-500/80">
                      {activeBenefit.claimSwap?.standardReality ?? "Generic commercial formula with sugar spikes"}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-950/20 border border-brand-500/30 flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-brand-400 font-bold block mb-0.5">
                      The Hayati Innovation
                    </span>
                    <h4 className="text-sm font-bold text-white mb-0.5">
                      {activeBenefit.claimSwap?.canInnovation ?? activeBenefit.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {activeBenefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CHAPTER 4: BATCH 001 ALLOCATION */}
          <div
            className={`transition-all duration-500 ${
              currentChapter === 4
                ? "opacity-100 translate-y-0 relative pointer-events-auto"
                : "opacity-0 -translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            <div className="space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest px-3 py-1 rounded-pill bg-brand-950/70 border border-brand-500/30">
                <Sparkles className="h-3.5 w-3.5" />
                <span>04 // BATCH 001 ALLOCATION</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Claim Priority Access.
              </h2>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-lg">
                Strictly capped at 25,000 cases. Reserve your email for priority allocation, founder
                pricing, and secret drop access.
              </p>

              {formStatus === "success" ? (
                <div className="glass-card p-5 border-brand-500/40 bg-neutral-950/80 backdrop-blur-xl rounded-2xl text-center space-y-2">
                  <Check className="h-6 w-6 text-brand-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Allocation Confirmed</h4>
                  <p className="text-xs text-text-secondary">
                    You are registered for Batch 001 Priority Dispatch. Watch your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="flex-1 px-4 py-3 rounded-pill bg-neutral-900 border border-border-subtle text-white text-xs placeholder-text-muted focus:outline-none focus:border-brand-400"
                    />
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="px-5 py-3 rounded-pill text-xs font-bold bg-brand-400 text-black hover:scale-105 transition-transform shrink-0"
                    >
                      {formStatus === "submitting" ? "Reserving..." : "Reserve Allocation"}
                    </button>
                  </div>
                  {formStatus === "error" && (
                    <p className="text-[11px] text-red-400 font-mono">{formError}</p>
                  )}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand-400" />
                    <span>Zero spam. Direct dispatch alerts only.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Chapter Quick Jump Indicators */}
          <div className="flex items-center gap-2 pt-6">
            {[
              { num: 1, label: "Intro" },
              { num: 2, label: "Flavors" },
              { num: 3, label: "Science" },
              { num: 4, label: "Access" },
            ].map((ch) => (
              <button
                key={ch.num}
                onClick={() => jumpToChapter(ch.num)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-pill text-[10px] font-mono transition-all ${
                  currentChapter === ch.num
                    ? "bg-brand-400/20 border border-brand-400/50 text-brand-300 font-bold"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentChapter === ch.num ? "w-4 bg-brand-400" : "w-1.5 bg-neutral-700"
                  }`}
                />
                <span>0{ch.num}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT COLUMN: 3D Visual Safe Zone (54% Width on Desktop)
            All 6 Cans live strictly in this zone — Zero Text Interference
           ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full md:w-[54%] h-[320px] sm:h-[420px] md:h-full flex items-center justify-center pointer-events-none">
          <StoryCanvas ref={canvasHandleRef} className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}
