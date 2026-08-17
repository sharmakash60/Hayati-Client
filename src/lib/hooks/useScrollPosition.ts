"use client";

import { useState, useEffect } from "react";

interface ScrollPositionState {
  scrollY: number;
  scrollX: number;
  direction: "up" | "down" | "none";
  isScrolled: boolean;
  scrollProgress: number; // 0 to 1
}

export function useScrollPosition(threshold = 40): ScrollPositionState {
  const [scrollState, setScrollState] = useState<ScrollPositionState>({
    scrollY: 0,
    scrollX: 0,
    direction: "none",
    isScrolled: false,
    scrollProgress: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(currentScrollY / maxScroll, 0), 1) : 0;

      const direction: "up" | "down" | "none" =
        currentScrollY > lastScrollY ? "down" : currentScrollY < lastScrollY ? "up" : "none";

      setScrollState({
        scrollY: currentScrollY,
        scrollX: currentScrollX,
        direction,
        isScrolled: currentScrollY > threshold,
        scrollProgress: progress,
      });

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    // Initial check
    updateScrollPosition();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrollState;
}
