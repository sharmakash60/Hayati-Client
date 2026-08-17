"use client";

import React from "react";
import { Plus } from "lucide-react";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({
  id,
  question,
  answer,
  category,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const triggerId = `faq-trigger-${id}`;
  const panelId = `faq-panel-${id}`;

  return (
    <div
      className={`glass-card transition-all duration-300 overflow-hidden border ${
        isOpen
          ? "border-brand-400/60 bg-neutral-900/90 shadow-lg"
          : "border-border-subtle hover:border-white/20 bg-neutral-900/60"
      }`}
    >
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-inset cursor-pointer group"
      >
        <div className="flex-1 pr-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-400 font-bold block mb-1">
            {category}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
            {question}
          </h3>
        </div>

        {/* Animated Rotating Toggle Indicator */}
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
            isOpen
              ? "bg-brand-400 text-black border-brand-400 rotate-45 shadow-glow-brand"
              : "bg-neutral-800 text-white border-border-subtle group-hover:border-brand-400/50"
          }`}
          aria-hidden="true"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
        </div>
      </button>

      {/* Zero Layout-Jump CSS Grid Row Expansion */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-text-secondary leading-relaxed border-t border-border-subtle/40 mt-1">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
