"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  category?: string;
}

export function AccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
  category,
}: AccordionItemProps) {
  return (
    <div className="glass-card overflow-hidden border border-border-subtle hover:border-brand-500/40 transition-colors">
      <button
        id={`faq-btn-${id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
        onClick={onToggle}
        className="w-full p-6 text-left flex items-start justify-between gap-4 font-bold text-base md:text-lg text-white hover:text-brand-300 transition-colors focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
      >
        <div className="space-y-1">
          {category && (
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-400 block">
              {category}
            </span>
          )}
          <span>{question}</span>
        </div>
        <ChevronDown
          className={twMerge(
            clsx(
              "h-5 w-5 text-brand-400 shrink-0 transition-transform duration-300",
              isOpen && "rotate-180 text-white"
            )
          )}
        />
      </button>

      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        className={twMerge(
          clsx(
            "grid transition-all duration-300 ease-in-out px-6 text-sm md:text-base text-text-secondary leading-relaxed",
            isOpen
              ? "grid-rows-[1fr] pb-6 pt-2 border-t border-border-subtle/40 opacity-100"
              : "grid-rows-[0fr] pb-0 pt-0 opacity-0 pointer-events-none"
          )
        )}
      >
        <div className="overflow-hidden">{answer}</div>
      </div>
    </div>
  );
}
