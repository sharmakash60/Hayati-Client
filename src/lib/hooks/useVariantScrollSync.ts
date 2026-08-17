"use client";

import { useEffect, useState, useRef } from "react";
import { getGSAP } from "@/lib/motion/gsap";

interface VariantScrollSyncOptions {
  variantCount: number;
  mobileBreakpoint?: number;
}

export function useVariantScrollSync(options: VariantScrollSyncOptions) {
  const { variantCount, mobileBreakpoint = 768 } = options;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      const mobile = window.innerWidth < mobileBreakpoint;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGSAP();
    if (!sectionRef.current || !trackRef.current) return;
    if (isMobile || variantCount <= 1) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        return track.scrollWidth - window.innerWidth + 80;
      };

      const scrollDistance = Math.max(0, getScrollDistance());

      const pinTrigger = ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: "top top",
        end: () => `+=${Math.max(scrollDistance * 1.2, window.innerHeight * 1.5)}`,
        scrub: 0.8,
        snap: variantCount > 1 ? 1 / (variantCount - 1) : undefined,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -scrollDistance,
          ease: "none",
        }),
        onUpdate: (self) => {
          const rawIndex = Math.round(self.progress * (variantCount - 1));
          const clampedIndex = Math.max(0, Math.min(variantCount - 1, rawIndex));
          setActiveIndex(clampedIndex);
        },
      });

      return () => {
        pinTrigger.kill();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, [isMobile, variantCount]);

  return {
    sectionRef,
    trackRef,
    activeIndex,
    setActiveIndex,
    isMobile,
  };
}
