"use client";

import { useState, useEffect } from "react";

export function useScrollSpy(
  sectionIds: string[],
  options: { rootMargin?: string; threshold?: number | number[] } = {}
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "");

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const {
      rootMargin = "-20% 0px -50% 0px", // Focus on central viewport region
      threshold = 0.1,
    } = options;

    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (!id) return;

          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        // Find section with highest visibility ratio among currently visible
        let bestId = activeId;
        let maxRatio = -1;

        visibleSections.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestId = id;
          }
        });

        if (bestId && bestId !== activeId) {
          setActiveId(bestId);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    sectionIds.forEach((id) => {
      const cleanId = id.replace("#", "");
      const element = document.getElementById(cleanId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, options, activeId]);

  return activeId;
}
