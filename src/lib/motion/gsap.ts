import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function getGSAP() {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
  return { gsap, ScrollTrigger };
}

export function cleanupScrollTriggers() {
  if (typeof window !== "undefined") {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    ScrollTrigger.clearMatchMedia();
  }
}
