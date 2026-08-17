"use client";

import React from "react";
import { getSiteContent } from "@/lib/content/loader";
import { useBenefitsTimeline } from "@/lib/hooks/useBenefitsTimeline";
import { Check, X, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export function BenefitsSwap() {
  const content = getSiteContent();
  const steps = content.benefits.steps;

  const {
    containerRef,
    activeStepIndex,
    isReducedMotion,
    jumpToStep,
  } = useBenefitsTimeline({
    totalSteps: steps.length,
  });

  const currentStep = steps[activeStepIndex] || steps[0];

  return (
    <section
      ref={containerRef}
      id="benefits"
      className="relative min-h-screen py-24 flex flex-col justify-center border-t border-border-subtle bg-bg-primary overflow-hidden"
    >
      {/* Deep Link Anchor Targets for Direct Navigation */}
      <div className="sr-only">
        {steps.map((step) => (
          <div key={step.id} id={step.id} tabIndex={-1} aria-hidden="true" />
        ))}
      </div>

      {/* Dynamic Ambient Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-brand-1 opacity-40 z-0" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-[130px] z-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{content.benefits.sectionHeader.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">
            {content.benefits.sectionHeader.headline}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            {content.benefits.sectionHeader.subheadline}
          </p>
        </div>

        {/* 4-Step Pill Toggle Bar */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.id}
                onClick={() => jumpToStep(step.stepNumber)}
                className={`px-4 sm:px-5 py-2.5 rounded-pill text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-brand-400 text-black shadow-glow-brand scale-105"
                    : "bg-neutral-900/90 text-text-secondary hover:text-white border border-border-subtle hover:border-brand-500/30"
                }`}
              >
                <span>0{step.stepNumber}</span>
                <span className="hidden sm:inline">// {step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Pinned Claim-Swap Showcase Card */}
        <div className="glass-card p-6 sm:p-10 lg:p-12 max-w-5xl mx-auto border-brand-500/40 shadow-2xl transition-all duration-500 relative overflow-hidden bg-neutral-950/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span>
                    STAGE 0{currentStep.stepNumber} // {currentStep.subtitle}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
                  {currentStep.title}
                </h3>
              </div>

              {/* Parallel Claim Swap Box (Zero Layout Shift) */}
              <div className="space-y-3 pt-2">
                {/* Legacy Reality Strikethrough Claim */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-status-error/30 flex items-start gap-3.5 transition-all duration-300">
                  <div className="p-1 rounded-full bg-status-error/20 text-status-error shrink-0 mt-0.5">
                    <X className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono uppercase text-status-error font-bold tracking-wider mb-1">
                      Legacy Industry Compromise
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary line-through decoration-status-error/70 decoration-2">
                      {currentStep.claimSwap.standardReality}
                    </p>
                  </div>
                </div>

                {/* Hayati Engineered Innovation Claim */}
                <div className="p-4 sm:p-5 rounded-2xl bg-brand-950/90 border border-brand-400/60 flex items-start gap-3.5 shadow-glow-brand/20 transition-all duration-300 ring-1 ring-brand-400/40">
                  <div className="p-1 rounded-full bg-brand-400 text-black shrink-0 mt-0.5">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono uppercase text-brand-400 font-bold tracking-wider mb-1">
                      Hayati Engineered Standard
                    </div>
                    <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                      {currentStep.claimSwap.canInnovation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Supporting Science Text */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-1">
                {currentStep.description}
              </p>
            </div>

            {/* Right Metric Counter Column */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-neutral-900/90 border border-border-subtle text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-400 to-accent-cyan" />

              <span className="text-5xl sm:text-6xl lg:text-7xl font-mono font-black text-brand-400 mb-2 tracking-tight transition-transform duration-300">
                {currentStep.metric.value}
              </span>
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider font-semibold">
                {currentStep.metric.label}
              </span>

              <div className="w-full mt-8 pt-6 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-secondary">
                <span>SCIENTIFIC_VALIDATION</span>
                <span className="text-status-success font-bold">100% PURE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar at Bottom of Section */}
        <div className="mt-8 max-w-5xl mx-auto flex items-center justify-between font-mono text-[11px] text-text-muted">
          <span>PROGRESS: STEP 0{activeStepIndex + 1} / 0{steps.length}</span>
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                  activeStepIndex === i ? "bg-brand-400 w-10" : "bg-neutral-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
