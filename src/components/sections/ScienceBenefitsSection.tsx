"use client";

import React from "react";
import { Sparkles, Droplets, Zap, ShieldCheck, Recycle } from "lucide-react";

export function ScienceBenefitsSection() {
  const pillars = [
    {
      icon: <Droplets className="h-6 w-6 text-accent-cyan" />,
      tag: "PURITY AT THE SOURCE",
      title: "Alpine & Himalayan Spring Water",
      desc: "Harvested directly from protected mountain aquifers, naturally filtered through mineral-rich strata for optimal cellular hydration and neutral pH.",
    },
    {
      icon: <Zap className="h-6 w-6 text-brand-400" />,
      tag: "BIOAVAILABLE ABSORPTION",
      title: "450mg Ionic Electrolyte Matrix",
      desc: "Precision clinical ratio of Magnesium Glycinate, Potassium Citrate, and Himalayan Pink Salt designed to rapidly replenish intracellular fluid balance.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
      tag: "ZERO GLYCEMIC CRASH",
      title: "Botanical Sweetness & Adaptogens",
      desc: "Sweetened naturally with cold-pressed botanical essences and adaptogenic herbs like Ashwagandha and Rhodiola. Zero synthetic sweeteners.",
    },
    {
      icon: <Recycle className="h-6 w-6 text-brand-300" />,
      tag: "CIRCULAR PACKAGING",
      title: "100% Infinitely Recyclable Aluminum",
      desc: "Canned at the source using renewable energy in infinitely recyclable aluminum canisters. 100% BPA-free, microplastic-free, and ocean-safe.",
    },
  ];

  return (
    <section id="science" className="relative py-28 px-6 sm:px-10 lg:px-16 bg-neutral-950 border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-pill bg-brand-950/60 border border-brand-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>03 // THE FORMULATION SCIENCE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Engineered for Vitality. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-accent-cyan">
              Zero Artificial Shortcuts.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            We focus strictly on high-performance functional nutrition. Every ingredient in Hayati
            serves a physiological purpose — hydrating deeper, sharpening mental clarity, and
            sustaining clean daily energy.
          </p>
        </div>

        {/* 4 Science Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="glass-card rounded-3xl border border-neutral-800/80 bg-neutral-900/30 p-8 flex flex-col justify-between hover:border-brand-500/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-brand-400 group-hover:scale-110 transition-transform">
                    {p.icon}
                  </div>
                  <span className="text-[11px] font-mono text-brand-400 font-bold uppercase tracking-widest">
                    {p.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
