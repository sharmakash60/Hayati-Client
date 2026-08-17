"use client";

import React, { useState } from "react";
import { getFaqs } from "@/lib/content/loader";
import { AccordionItem } from "./AccordionItem";
import { HelpCircle } from "lucide-react";

export function FAQAccordion() {
  const allFaqs = getFaqs();
  const [openId, setOpenId] = useState<string | null>(allFaqs[0]?.id || null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Ingredients", "Sustainability", "Performance", "Orders & Shipping"];

  const filteredFaqs =
    activeFilter === "All"
      ? allFaqs
      : allFaqs.filter((f) => f.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="faq" className="relative py-28 border-t border-border-subtle bg-bg-primary overflow-hidden">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-[140px] z-0" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-brand-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <HelpCircle className="h-4 w-4" />
            <span>04 / FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
            Pure Clarity
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-md mx-auto">
            Everything you need to know about our sourcing, formulation, and infinitely recyclable packaging.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-pill text-xs font-mono font-bold transition-all ${
                activeFilter === cat
                  ? "bg-brand-400 text-black shadow-glow-brand/30"
                  : "bg-neutral-900 text-text-secondary hover:text-white border border-border-subtle hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Animated Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              category={faq.category}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        {/* Direct Contact Support Cue */}
        <div className="mt-12 text-center border-t border-border-subtle/50 pt-8">
          <p className="text-xs font-mono text-text-muted">
            HAVE A SPECIFIC SCIENTIFIC OR DIETARY QUESTION?{" "}
            <a
              href="mailto:concierge@hayati-beverages.com"
              className="text-brand-400 hover:underline font-bold"
            >
              TALK TO OUR CONCIERGE →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
