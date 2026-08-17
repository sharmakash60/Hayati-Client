"use client";

import { useEffect, useRef, useState } from "react";
import { getGSAP } from "@/lib/motion/gsap";
import { getLenis } from "@/lib/motion/lenis";

interface UseBenefitsTimelineOptions {
  totalSteps: number;
}

export function useBenefitsTimeline({ totalSteps }: UseBenefitsTimelineOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(reduced);
    if (reduced) return;

    const { gsap, ScrollTrigger } = getGSAP();
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
      });

      // Add labels for all steps
      for (let i = 0; i < totalSteps; i++) {
        tl.addLabel(`step-${i + 1}`, i);
      }

      const st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${window.innerHeight * totalSteps * 1.1}`,
        pin: true,
        scrub: 0.6,
        snap: {
          snapTo: 1 / (totalSteps - 1),
          duration: { min: 0.2, max: 0.6 },
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const raw = Math.round(self.progress * (totalSteps - 1));
          const clamped = Math.max(0, Math.min(totalSteps - 1, raw));
          setActiveStepIndex(clamped);
        },
      });

      // Handle deep linking from URL hash (e.g. /#benefits-3)
      const handleHashNav = () => {
        const hash = window.location.hash;
        if (hash && hash.startsWith("#benefits-")) {
          const stepNum = parseInt(hash.replace("#benefits-", ""), 10);
          if (!isNaN(stepNum) && stepNum >= 1 && stepNum <= totalSteps) {
            const targetProgress = (stepNum - 1) / (totalSteps - 1);
            const scrollY = st.start + targetProgress * (st.end - st.start);
            const lenis = getLenis();
            if (lenis) {
              lenis.scrollTo(scrollY, { duration: 1.2 });
            } else {
              window.scrollTo({ top: scrollY, behavior: "smooth" });
            }
          }
        }
      };

      // Delay check slightly for ScrollTrigger.refresh()
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        handleHashNav();
      }, 150);

      window.addEventListener("hashchange", handleHashNav);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("hashchange", handleHashNav);
        st.kill();
        tl.kill();
      };
    }, container);

    return () => {
      ctx.revert();
    };
  }, [totalSteps]);

  const jumpToStep = (stepNumber: number) => {
    const { ScrollTrigger } = getGSAP();
    const container = containerRef.current;
    if (!container || isReducedMotion) {
      setActiveStepIndex(stepNumber - 1);
      return;
    }

    const st = ScrollTrigger.getById(container.id) || ScrollTrigger.getAll().find((t) => t.trigger === container);
    if (st) {
      const targetProgress = (stepNumber - 1) / (totalSteps - 1);
      const scrollY = st.start + targetProgress * (st.end - st.start);
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(scrollY, { duration: 1.0 });
      } else {
        window.scrollTo({ top: scrollY, behavior: "smooth" });
      }
    } else {
      setActiveStepIndex(stepNumber - 1);
    }
  };

  return {
    containerRef,
    activeStepIndex,
    isReducedMotion,
    jumpToStep,
  };
}
