"use client";

import React, { useState } from "react";
import { Hero3DStage } from "@/components/3d/Hero3DStage";
import { useCartStore } from "@/lib/store/cartStore";
import { SIX_FLAVORS } from "@/lib/motion/3dConfig";
import { Sparkles, ShoppingBag, ArrowRight, Check, ShieldCheck, Zap, Droplets, Award } from "lucide-react";

export function HeroSection() {
  const [activeFlavorIdx, setActiveFlavorIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const flavor = SIX_FLAVORS[activeFlavorIdx] || SIX_FLAVORS[0];

  const handleAddToCart = () => {
    const pricePaise =
      flavor.collection === "Signature Botanicals"
        ? 21900
        : flavor.collection === "Fruit Splash"
        ? 16900
        : 18900;

    addItem({
      id: flavor.id,
      name: `Hayati ${flavor.name}`,
      collection: flavor.collection,
      flavor: flavor.subname,
      price: pricePaise,
      canImage: flavor.imageFallback,
      accentColor: flavor.accentColor,
      inStock: true,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 transition-colors duration-1000 z-0"
        style={{ backgroundColor: flavor.accentColor }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10 flex-1 my-auto">
        {/* ─────────────────────────────────────────────────────────────
            LEFT COLUMN: Benefit-Driven Value Proposition & Pricing
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
          {/* Eyebrow Series & Batch Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-pill bg-brand-950/70 border border-brand-500/30 w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            <span>01 // FUNCTIONAL BOTANICAL HYDRATION</span>
          </div>

          {/* H1 Display Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.02]">
            REFRESH YOUR ENGINE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-accent-cyan">
              WITH LIQUID PRECISION.
            </span>
          </h1>

          {/* Benefit-First Subheadline */}
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
            <strong className="text-white">Instant hydration, sharper focus, zero sugar crash.</strong>{" "}
            Crafted with pure mountain spring water and charged with 450mg of bioavailable Himalayan
            electrolytes and organic botanicals.
          </p>

          {/* Transparent Price Callout */}
          <div className="flex flex-wrap items-center gap-4 py-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">₹189</span>
              <span className="text-xs text-neutral-400 font-mono">/ can (₹2,199 for 12-pack)</span>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-pill bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>In Stock • Ships in 24h</span>
            </span>
          </div>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-7 py-3.5 rounded-pill text-sm font-bold bg-brand-400 text-black hover:scale-105 transition-transform shadow-glow-brand cursor-pointer font-mono uppercase"
            >
              {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
              <span>{added ? `Added ${flavor.name}!` : `Add ${flavor.name} • ₹189`}</span>
            </button>

            <a
              href="#flavors"
              className="px-6 py-3.5 rounded-pill text-sm font-bold bg-neutral-900 border border-neutral-800 text-white hover:text-brand-400 hover:border-brand-500/40 transition-colors font-mono uppercase"
            >
              View 6 Flavors
            </a>
          </div>

          {/* Quick Trust Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-neutral-800/80 max-w-lg">
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-brand-400" />
                <span>450mg</span>
              </div>
              <div className="text-[11px] text-neutral-400 font-mono">Electrolytes</div>
            </div>

            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-accent-cyan" />
                <span>0g Sugar</span>
              </div>
              <div className="text-[11px] text-neutral-400 font-mono">Zero Crash</div>
            </div>

            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-emerald-400" />
                <span>FSSAI Certified</span>
              </div>
              <div className="text-[11px] text-neutral-400 font-mono">Lab Tested</div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT COLUMN: 6-Flavor 3D Interactive Stage
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <Hero3DStage onFlavorChange={setActiveFlavorIdx} className="w-full" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STICKY TRUST TICKER BAR (Hero Bottom)
         ───────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-7xl mx-auto mt-8 pt-4 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 text-accent-cyan" />
          <span>Pure Mountain Spring Water</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-brand-400" />
          <span>Magnesium + Potassium + Himalayan Salt</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>FSSAI Lic. 10020043003412</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-brand-300 font-bold">Free Shipping on Orders Above ₹1,499</span>
        </div>
      </div>
    </section>
  );
}
