"use client";

import React, { useEffect, useRef, useState } from "react";
import { SceneManager } from "./SceneManager";
import { getGSAP } from "@/lib/motion/gsap";
import { Sparkles, RefreshCw } from "lucide-react";

interface Hayati3DCanvasProps {
  className?: string;
}

export function Hayati3DCanvas({ className = "" }: Hayati3DCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<SceneManager | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const gl = canvasRef.current.getContext("webgl2") || canvasRef.current.getContext("webgl");
      if (!gl) {
        setIsWebGLSupported(false);
        return;
      }
    } catch {
      setIsWebGLSupported(false);
      return;
    }

    // Initialize 3D Scene Manager
    const manager = new SceneManager(canvasRef.current);
    managerRef.current = manager;
    if (typeof window !== "undefined") {
      (window as unknown as { __hayatiSceneManager?: SceneManager }).__hayatiSceneManager = manager;
    }
    setIsLoaded(true);

    // GSAP ScrollTrigger Integration for Continuous Scroll Choreography
    const { gsap, ScrollTrigger } = getGSAP();

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isReduced) {
      // Global Page Scroll Synchronization
      ScrollTrigger.create({
        trigger: "#main-content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          if (managerRef.current) {
            managerRef.current.updateScrollProgress(self.progress);
          }
        },
      });

      // Section-specific checkpoints
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        onEnter: () => managerRef.current?.setFormation("HERO_SINGLE", 0),
        onEnterBack: () => managerRef.current?.setFormation("HERO_SINGLE", 0),
      });

      ScrollTrigger.create({
        trigger: "#variants",
        start: "top 60%",
        end: "bottom 30%",
        onEnter: () => managerRef.current?.setFormation("LINEUP_FAN_OUT", 0),
        onEnterBack: () => managerRef.current?.setFormation("LINEUP_FAN_OUT", 0),
      });

      ScrollTrigger.create({
        trigger: "#benefits",
        start: "top 60%",
        end: "bottom 30%",
        onEnter: () => managerRef.current?.setFormation("MACRO_INSPECT", 0),
        onEnterBack: () => managerRef.current?.setFormation("MACRO_INSPECT", 0),
      });
    }

    return () => {
      if (managerRef.current) {
        managerRef.current.dispose();
        managerRef.current = null;
      }
    };
  }, []);

  if (!isWebGLSupported) {
    return null; // Gracefully degradable on devices without WebGL
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-10 overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}

/**
 * Hook to access and trigger 3D formations from UI buttons / selectors
 */
export function useHayati3D() {
  const switchFormation = (mode: "HERO_SINGLE" | "LINEUP_FAN_OUT" | "CAROUSEL" | "MACRO_INSPECT", index: number = 0) => {
    const manager = (window as unknown as { __hayatiSceneManager?: SceneManager }).__hayatiSceneManager;
    if (manager) {
      manager.setFormation(mode, index);
    }
  };

  const setAccentColor = (hexColor: string) => {
    const manager = (window as unknown as { __hayatiSceneManager?: SceneManager }).__hayatiSceneManager;
    if (manager) {
      manager.setAccentColor(hexColor);
    }
  };

  return { switchFormation, setAccentColor };
}
