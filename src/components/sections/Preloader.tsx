"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getSiteContent } from "@/lib/content/loader";
import { useAssetPreload } from "@/lib/hooks/useAssetPreload";
import { getGSAP } from "@/lib/motion/gsap";
import { EASE_EXPO } from "@/lib/motion/primitives";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const content = getSiteContent();
  const { progress, isComplete, shouldSkip } = useAssetPreload({
    criticalImages: ["/logo.webp"],
    minHoldTimeMs: 900,
    maxWaitFallbackMs: 3800,
    sessionStorageKey: "hayati_preloader_seen",
  });

  const overlayRef = useRef<HTMLDivElement>(null);
  const counterNumberRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isExited, setIsExited] = useState(false);
  const animatedValueRef = useRef({ val: 0 });

  // Rotate status phrases smoothly
  const phrases = content.preloader.statusPhrases;
  useEffect(() => {
    if (phrases.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 700);
    return () => clearInterval(interval);
  }, [phrases.length]);

  // Smooth numeric tween to target progress using GSAP
  useEffect(() => {
    const { gsap } = getGSAP();
    if (!counterNumberRef.current) return;

    gsap.to(animatedValueRef.current, {
      val: progress,
      duration: 0.45,
      ease: "power1.out",
      onUpdate: () => {
        if (counterNumberRef.current) {
          counterNumberRef.current.innerText = Math.round(animatedValueRef.current.val).toString();
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${animatedValueRef.current.val}%`;
        }
      },
    });
  }, [progress]);

  // Handle exit animation when loading is complete
  useEffect(() => {
    if (!isComplete) return;
    if (shouldSkip) {
      setIsExited(true);
      if (onComplete) onComplete();
      return;
    }

    const { gsap } = getGSAP();
    const overlay = overlayRef.current;
    if (!overlay) {
      setIsExited(true);
      if (onComplete) onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsExited(true);
        if (onComplete) onComplete();
      },
    });

    // Exit wipe-up reveal
    tl.to(".preloader-content", {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
    }).to(
      overlay,
      {
        yPercent: -100,
        duration: 0.75,
        ease: EASE_EXPO,
      },
      "-=0.1"
    );

    return () => {
      tl.kill();
    };
  }, [isComplete, shouldSkip, onComplete]);

  // Skip or removed from DOM completely
  if (isExited || shouldSkip) {
    return null;
  }

  return (
    <aside
      ref={overlayRef}
      id="site-preloader"
      aria-label="Loading site assets"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-neutral-950 px-6 py-12 text-white selection:bg-transparent"
    >
      {/* Top Brand Tag */}
      <div className="preloader-content flex w-full max-w-5xl items-center justify-between font-mono text-xs text-text-muted">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-400 animate-ping" />
          SYSTEM_BOOT // {content.brand.name.toUpperCase()}
        </span>
        <span>EDITION 2026</span>
      </div>

      {/* Center Cinematic Mark & Counter */}
      <div className="preloader-content flex flex-col items-center justify-center text-center my-auto space-y-8">
        {/* Hayati Logo Visual */}
        <div className="relative flex items-center justify-center p-4">
          <div className="absolute -inset-6 rounded-full bg-brand-400/20 blur-2xl animate-pulse" />
          <Image
            src="/logo.webp"
            alt={`${content.brand.name} Logo`}
            width={240}
            height={80}
            priority
            className="relative h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          />
        </div>

        {/* Large Numeric Percentage Tween */}
        <div className="flex items-baseline justify-center font-display text-6xl sm:text-8xl font-black tracking-tighter text-white">
          <span ref={counterNumberRef}>0</span>
          <span className="text-3xl sm:text-4xl text-brand-400 font-mono ml-1">%</span>
        </div>

        {/* Dynamic Telemetry Status Phrase */}
        <div
          ref={phraseRef}
          className="h-6 font-mono text-xs sm:text-sm text-text-secondary tracking-wider uppercase transition-opacity duration-300"
        >
          {phrases[currentPhraseIndex] || "Calibrating systems..."}
        </div>
      </div>

      {/* Bottom Track Progress Bar */}
      <div className="preloader-content w-full max-w-md space-y-2">
        <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-900 border border-border-subtle">
          <div
            ref={progressBarRef}
            className="h-full w-0 rounded-full bg-gradient-to-r from-brand-400 to-accent-orange transition-all duration-100 ease-out"
          />
        </div>
        <div className="flex justify-between font-mono text-[10px] text-text-muted">
          <span>PRECISION_HYDRATION</span>
          <span>EST_WAIT: READY</span>
        </div>
      </div>
    </aside>
  );
}
