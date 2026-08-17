"use client";

import React, { useState } from "react";
import { getFaqs } from "@/lib/content/loader";
import { ChevronDown, Sparkles } from "lucide-react";

export function FAQSection() {
  const allFaqs = getFaqs();
  const [openFaqId, setOpenFaqId] = useState<string | null>(allFaqs[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Ingredients", "Sustainability", "Performance", "Orders & Shipping"];

  const filteredFaqs =
    activeCategory === "All"
      ? allFaqs
      : allFaqs.filter((f) => f.category.toLowerCase() === activeCategory.toLowerCase());

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-28 px-6 sm:px-10 lg:px-16 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-pill bg-brand-950/60 border border-brand-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>06 // FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Clear Facts & Transparency
          </h2>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            Everything you need to know about our electrolyte formulations, botanical sourcing, and delivery.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-pill text-xs font-mono font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-brand-400 text-black shadow-md font-black"
                  : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-brand-500/40 bg-neutral-900/80 shadow-xl"
                    : "border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700"
                }`}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-brand-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
