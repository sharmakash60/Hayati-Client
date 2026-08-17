"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { Sparkles, ArrowRight, Check, ShieldCheck, Mail } from "lucide-react";

export function Scene05Cta() {
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
    <div id="cta-scene" className="relative z-20">
      {/* Pre-Order VIP Allocation Section */}
      <section className="relative px-6 py-24 flex flex-col items-center text-center">
        {/* Top 3D Clearance Spacing (The 3D can settles here) */}
        <div className="h-[220px] sm:h-[260px] w-full pointer-events-none" aria-hidden="true" />

        <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>05 / BATCH 001 ALLOCATION</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none mb-4">
            Claim Priority Access
          </h2>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8 max-w-lg">
            Our inaugural canning run is strictly capped at 25,000 cases. Register your email for
            priority dispatch, founder pricing, and secret drop access.
          </p>

          {/* Allocation Input Form */}
          <div className="w-full max-w-md">
            {status === "success" ? (
              <div className="glass-card p-6 border-brand-500/40 bg-neutral-950/80 backdrop-blur-xl rounded-2xl text-center space-y-2">
                <div className="inline-flex p-2 rounded-full bg-brand-400/20 text-brand-400 mb-1">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Allocation Confirmed</h3>
                <p className="text-xs text-text-secondary">
                  You are registered for Batch 001 Priority Dispatch. Watch your inbox for private
                  credentials.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 px-5 py-3 rounded-pill bg-neutral-900/90 border border-border-subtle text-white placeholder-text-muted text-sm focus:outline-none focus:border-brand-400 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="px-6 py-3 rounded-pill text-sm font-bold bg-brand-400 text-black hover:scale-105 transition-transform shadow-glow-brand shrink-0 flex items-center justify-center gap-2"
                  >
                    <span>{status === "submitting" ? "Reserving..." : "Reserve Allocation"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-400 font-mono text-left pl-2">{errorMessage}</p>
                )}
                <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-text-muted">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-400" />
                  <span>No spam. Opt-out anytime. View Privacy Policy.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
}
