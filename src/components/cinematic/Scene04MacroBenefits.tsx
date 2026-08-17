"use client";

import React, { useState } from "react";
import { getSiteContent } from "@/lib/content/loader";
import { useMaster3D } from "@/components/3d/Master3DExperience";
import { Sparkles, Check, X, ShieldCheck, ArrowRight } from "lucide-react";

export function Scene04MacroBenefits() {
  const content = getSiteContent();
  const steps = content.benefits.steps;
  const [activeStep, setActiveStep] = useState(0);
  const { setActiveFlavor } = useMaster3D();

  const current = steps[activeStep] || steps[0];

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    setActiveFlavor(idx % 6);
  };

  return (
    <section
      id="benefits-scene"
      className="relative min-h-[130vh] flex items-center px-6 sm:px-12 lg:px-20 py-28 z-20 overflow-hidden"
    >
      {/* Background Subtle Shading */}
      <div className="pointer-events-none absolute inset-0 bg-neutral-950/50 backdrop-blur-[2px] z-0" />

      {/* Left Column Stage — Structured so 3D Macro Push-in is visible on the Right */}
      <div className="relative z-20 max-w-xl lg:max-w-2xl text-left">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>04 / THE BOTANICAL PROMISE</span>
        </div>

        {/* Section Headline */}
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] mb-6">
          Striking Out Compromise.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-accent-cyan">
            Pioneering Pure Function.
          </span>
        </h2>

        {/* Step Selector Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => handleStepClick(idx)}
              className={`px-3.5 py-1.5 rounded-pill text-xs font-mono font-bold transition-all ${
                activeStep === idx
                  ? "bg-brand-400 text-black shadow-glow-brand scale-105"
                  : "bg-neutral-900 border border-border-subtle text-text-secondary hover:text-white"
              }`}
            >
              <span>0{s.stepNumber} // {s.title}</span>
            </button>
          ))}
        </div>

        {/* Claim-Swap Dynamic Card */}
        <div className="glass-card p-6 sm:p-8 border-border-subtle bg-neutral-950/80 backdrop-blur-xl rounded-2xl space-y-6">
          {/* Old/Negative Claim (Struck Through) */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 flex items-start gap-3">
            <div className="p-1.5 rounded-full bg-red-500/20 text-red-400 shrink-0 mt-0.5">
              <X className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
                Standard Industry Reality
              </span>
              <p className="text-sm sm:text-base text-neutral-400 line-through decoration-red-500/80 decoration-2">
                {current.claimSwap?.standardReality ?? "Generic commercial formula with sugar spikes"}
              </p>
            </div>
          </div>

          {/* New Positive Innovation */}
          <div className="p-4 rounded-xl bg-brand-950/20 border border-brand-500/30 flex items-start gap-3">
            <div className="p-1.5 rounded-full bg-brand-400/20 text-brand-400 shrink-0 mt-0.5">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-400 font-bold block mb-1">
                The Hayati Standard / Innovation
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                {current.claimSwap?.canInnovation ?? current.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {current.description}
              </p>
            </div>
          </div>

          {/* Proof Stat Pill */}
          <div className="flex items-center gap-2 pt-2 text-xs font-mono text-text-muted">
            <ShieldCheck className="h-4 w-4 text-brand-400" />
            <span>FSSAI Certified Formulation • 100% Non-GMO • Lab Tested</span>
          </div>
        </div>
      </div>
    </section>
  );
}
