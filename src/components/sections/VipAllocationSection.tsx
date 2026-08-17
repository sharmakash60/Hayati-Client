"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Check, ShieldCheck, Gift, Clock, Flame } from "lucide-react";

export function VipAllocationSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <section id="vip" className="relative py-28 px-6 sm:px-10 lg:px-16 bg-neutral-950 border-t border-neutral-900 overflow-hidden">
      {/* Ambient Radial Accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-[160px] z-0" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-pill bg-brand-950/60 border border-brand-500/30">
          <Sparkles className="h-3.5 w-3.5" />
          <span>05 // FOUNDER DROP VIP ALLOCATION</span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
          Join the Batch 001 Allocation
        </h2>

        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Unlock <strong className="text-white">15% off your first order</strong>, priority dispatch
          on limited seasonal runs, and invitations to secret botanical drops.
        </p>

        {/* Live Allocation Scarcity Meter */}
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-brand-400 font-bold flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>Batch 001 Allocation</span>
            </span>
            <span className="text-white font-bold">78% Reserved (5,420 Cases Left)</span>
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-400 to-accent-cyan w-[78%] rounded-full" />
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-md mx-auto pt-2">
          {status === "success" ? (
            <div className="glass-card p-6 rounded-3xl border border-brand-500/40 bg-neutral-900/80 backdrop-blur-xl text-center space-y-2">
              <div className="inline-flex p-2 rounded-full bg-brand-400/20 text-brand-400 mb-1">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">VIP Allocation Confirmed!</h3>
              <p className="text-xs text-neutral-300">
                Check your inbox for your 15% founder welcome code and batch dispatch updates.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for 15% off..."
                  required
                  className="flex-1 px-5 py-3.5 rounded-pill bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-brand-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-6 py-3.5 rounded-pill text-xs font-bold bg-brand-400 text-black hover:scale-105 transition-transform shadow-glow-brand shrink-0 cursor-pointer flex items-center justify-center gap-2 font-mono uppercase"
                >
                  <span>{status === "submitting" ? "Claiming..." : "Claim 15% Off"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {status === "error" && (
                <p className="text-xs text-red-400 font-mono text-left pl-3">{errorMessage}</p>
              )}
              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-400 pt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-400" />
                <span>Zero spam. Direct dispatch alerts only. Unsubscribe anytime.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
