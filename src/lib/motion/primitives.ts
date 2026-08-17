import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getGSAP } from "./gsap";

export const EASE = "power2.out";
export const EASE_SMOOTH = "power3.out";
export const EASE_EXPO = "expo.out";
export const EASE_SPRING = "elastic.out(1, 0.75)";

interface AnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  onComplete?: () => void;
}

/**
 * Checks if user prefers reduced motion on client
 */
function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Standard Fade Up animation for cards, paragraphs, and elements
 */
export function fadeUp(
  target: gsap.DOMTarget,
  options: AnimationOptions = {}
): gsap.core.Tween | null {
  const { gsap, ScrollTrigger } = getGSAP();
  if (typeof window === "undefined") return null;

  if (isReducedMotion()) {
    return gsap.set(target, { opacity: 1, y: 0 });
  }

  const {
    duration = 0.8,
    delay = 0,
    ease = EASE_SMOOTH,
    trigger = target,
    start = "top 85%",
    onComplete,
  } = options;

  gsap.set(target, { opacity: 0, y: 32 });

  return gsap.to(target, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: trigger as gsap.DOMTarget,
      start,
      toggleActions: "play none none none",
    },
    onComplete,
  });
}

/**
 * Staggered Entrance Animation for lists, cards, and navigation grids
 */
export function staggerChildren(
  container: gsap.DOMTarget,
  childSelector: string,
  options: AnimationOptions & { stagger?: number } = {}
): gsap.core.Tween | null {
  const { gsap, ScrollTrigger } = getGSAP();
  if (typeof window === "undefined") return null;

  const {
    duration = 0.7,
    stagger = 0.1,
    ease = EASE_SMOOTH,
    trigger = container,
    start = "top 80%",
    onComplete,
  } = options;

  const elements = gsap.utils.toArray(
    typeof container === "string" ? `${container} ${childSelector}` : childSelector,
    typeof container !== "string" ? (container as HTMLElement) : undefined
  );

  if (isReducedMotion()) {
    return gsap.set(elements, { opacity: 1, y: 0 });
  }

  gsap.set(elements, { opacity: 0, y: 24 });

  return gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger: trigger as gsap.DOMTarget,
      start,
      toggleActions: "play none none none",
    },
    onComplete,
  });
}

/**
 * Pinned section helper with GSAP ScrollTrigger
 */
export function pinSection(
  trigger: string | HTMLElement,
  options: {
    pin?: boolean | string | HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pinSpacing?: boolean;
    onUpdate?: (self: ScrollTrigger) => void;
  } = {}
): ScrollTrigger | null {
  const { ScrollTrigger } = getGSAP();
  if (typeof window === "undefined") return null;

  if (isReducedMotion()) {
    return null; // Skip pinning for reduced motion users
  }

  const {
    pin = true,
    start = "top top",
    end = "+=200%",
    scrub = 1,
    pinSpacing = true,
    onUpdate,
  } = options;

  return ScrollTrigger.create({
    trigger,
    pin,
    start,
    end,
    scrub,
    pinSpacing,
    onUpdate,
  });
}

/**
 * Timeline scrubber connected to scroll position
 */
export function scrubTimeline(
  timeline: gsap.core.Timeline,
  trigger: string | HTMLElement,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
  } = {}
): ScrollTrigger | null {
  const { ScrollTrigger } = getGSAP();
  if (typeof window === "undefined") return null;

  if (isReducedMotion()) {
    timeline.progress(1);
    return null;
  }

  const { start = "top top", end = "+=150%", scrub = 1, markers = false } = options;

  return ScrollTrigger.create({
    animation: timeline,
    trigger,
    start,
    end,
    scrub,
    markers,
  });
}

/**
 * Subtle Scale In Reveal
 */
export function scaleIn(
  target: gsap.DOMTarget,
  options: AnimationOptions & { fromScale?: number } = {}
): gsap.core.Tween | null {
  const { gsap } = getGSAP();
  if (typeof window === "undefined") return null;

  if (isReducedMotion()) {
    return gsap.set(target, { opacity: 1, scale: 1 });
  }

  const {
    duration = 0.9,
    delay = 0,
    fromScale = 0.92,
    ease = EASE_SMOOTH,
    trigger = target,
    start = "top 85%",
  } = options;

  gsap.set(target, { opacity: 0, scale: fromScale });

  return gsap.to(target, {
    opacity: 1,
    scale: 1,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: trigger as gsap.DOMTarget,
      start,
      toggleActions: "play none none none",
    },
  });
}
