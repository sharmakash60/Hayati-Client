"use client";

import React, { useEffect, createContext, useContext, useState } from "react";
import Lenis from "lenis";
import { getGSAP, cleanupScrollTriggers } from "./gsap";

interface MotionContextValue {
  lenis: Lenis | null;
  isReady: boolean;
  prefersReducedMotion: boolean;
}

const MotionContext = createContext<MotionContextValue>({
  lenis: null,
  isReady: false,
  prefersReducedMotion: false,
});

export const useMotion = () => useContext(MotionContext);

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    // 2. Initialize GSAP & ScrollTrigger
    const { gsap, ScrollTrigger } = getGSAP();

    // 3. Debounced resize handler for ScrollTrigger refresh
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    // 4. Refresh ScrollTrigger once fonts are fully ready
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // 5. If reduced motion is active, skip Lenis virtual scroller
    if (mediaQuery.matches) {
      setIsReady(true);
      return () => {
        mediaQuery.removeEventListener("change", handleMediaChange);
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimer);
        cleanupScrollTriggers();
      };
    }

    // 6. Initialize Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    setLenis(lenisInstance);

    // 7. Synchronize Lenis with ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    setIsReady(true);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      gsap.ticker.remove(tickerCallback);
      cleanupScrollTriggers();
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <MotionContext.Provider value={{ lenis, isReady, prefersReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}
