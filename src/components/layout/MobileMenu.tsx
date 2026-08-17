"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getLenis } from "@/lib/motion/lenis";
import { Button } from "@/components/ui/Button";
import { X, ArrowRight, Sparkles, ExternalLink } from "lucide-react";

interface NavLinkItem {
  label: string;
  href: string;
  isBadge?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLinkItem[];
  activeAnchor: string;
  cta: { label: string; href: string };
  brandName: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  activeAnchor,
  cta,
  brandName,
}: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 1. Lock body scroll with scrollbar width compensation
  useEffect(() => {
    if (!isOpen) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalPaddingRight = document.body.style.paddingRight;
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Auto-focus the close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // 2. Handle Escape key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // 3. Focus trap within drawer
      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAnchorClick = (href: string) => {
    onClose();
    if (href.startsWith("#")) {
      const lenis = getLenis();
      const targetEl = document.querySelector(href);
      if (targetEl && lenis) {
        lenis.scrollTo(targetEl as HTMLElement, { offset: -70, duration: 1.2 });
      } else if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-neutral-950/98 backdrop-blur-2xl px-6 py-6 transition-all duration-300 md:hidden animate-in fade-in"
    >
      {/* Top Header inside Drawer */}
      <div className="flex items-center justify-between border-b border-border-subtle/50 pb-5">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2 font-display text-2xl font-black text-white"
        >
          <Image
            src="/logo.webp"
            alt={`${brandName} Logo`}
            width={110}
            height={34}
            className="h-8 w-auto object-contain"
          />
        </Link>

        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close Navigation Menu"
          className="p-2 rounded-pill bg-neutral-900 border border-border-subtle text-white hover:text-brand-400 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Nav Links with Staggered Visual Feel */}
      <nav role="navigation" className="flex flex-col gap-3 py-8 overflow-y-auto">
        {navLinks.map((link, index) => {
          const isActive = activeAnchor === link.href;
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith("#")) {
                  e.preventDefault();
                  handleAnchorClick(link.href);
                } else {
                  onClose();
                }
              }}
              aria-current={isActive ? "location" : undefined}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-lg font-display font-bold uppercase tracking-tight transition-all duration-200 ${
                isActive
                  ? "bg-brand-950 text-brand-400 border border-brand-800/80"
                  : "text-text-secondary hover:text-white hover:bg-neutral-900/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-text-muted">0{index + 1}</span>
                <span>{link.label}</span>
              </div>
              {link.isBadge ? (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-pill bg-brand-400 text-black">
                  SPEC
                </span>
              ) : (
                <ArrowRight
                  className={`h-4 w-4 transition-transform ${
                    isActive ? "text-brand-400 translate-x-1" : "text-text-muted"
                  }`}
                />
              )}
            </a>
          );
        })}
      </nav>

      {/* Bottom Action Area */}
      <div className="border-t border-border-subtle/50 pt-6 space-y-4">
        <a
          href={cta.href}
          onClick={(e) => {
            if (cta.href.startsWith("#")) {
              e.preventDefault();
              handleAnchorClick(cta.href);
            } else {
              onClose();
            }
          }}
          className="block w-full"
        >
          <Button variant="primary" size="lg" className="w-full">
            {cta.label}
          </Button>
        </a>

        <div className="flex items-center justify-between text-xs font-mono text-text-muted pt-2">
          <span>100% RECYCLABLE ALUMINUM</span>
          <span className="text-brand-400">450MG SALTS</span>
        </div>
      </div>
    </div>
  );
}
