import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function initLenis(options = {}): Lenis | null {
  if (typeof window === "undefined") return null;

  if (!lenisInstance) {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      ...options,
    });
  }

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function smoothScrollTo(
  target: string | HTMLElement | number,
  options: { offset?: number; duration?: number; immediate?: boolean } = {}
) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: options.offset ?? -72,
      duration: options.duration ?? 1.2,
      immediate: options.immediate ?? false,
    });
  } else if (typeof window !== "undefined") {
    if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  }
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
