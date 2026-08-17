"use client";

import React, { useEffect, useRef, useState } from "react";
import { SceneManager } from "./SceneManager";
import { SIX_FLAVORS } from "@/lib/motion/3dConfig";
import { Layers, RotateCw, Eye } from "lucide-react";

interface Hero3DStageProps {
  className?: string;
  onFlavorChange?: (index: number) => void;
}

export function Hero3DStage({ className = "", onFlavorChange }: Hero3DStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<SceneManager | null>(null);

  const [active3DMode, setActive3DMode] = useState<"LINEUP_FAN_OUT" | "CAROUSEL" | "HERO_SINGLE">("LINEUP_FAN_OUT");
  const [activeFlavorIdx, setActiveFlavorIdx] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

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

    const manager = new SceneManager(canvasRef.current);
    managerRef.current = manager;
    manager.setFormation("LINEUP_FAN_OUT", 0);
    setIsLoaded(true);

    return () => {
      if (managerRef.current) {
        managerRef.current.dispose();
        managerRef.current = null;
      }
    };
  }, []);

  const handleModeSwitch = (mode: "LINEUP_FAN_OUT" | "CAROUSEL" | "HERO_SINGLE", index: number = activeFlavorIdx) => {
    setActive3DMode(mode);
    setActiveFlavorIdx(index);
    if (managerRef.current) {
      managerRef.current.setFormation(mode, index);
      managerRef.current.setAccentColor(SIX_FLAVORS[index].accentColor);
    }
    if (onFlavorChange) {
      onFlavorChange(index);
    }
  };

  const handleFlavorSelect = (index: number) => {
    setActiveFlavorIdx(index);
    if (managerRef.current) {
      managerRef.current.setFormation(active3DMode, index);
      managerRef.current.setAccentColor(SIX_FLAVORS[index].accentColor);
    }
    if (onFlavorChange) {
      onFlavorChange(index);
    }
  };

  if (!isWebGLSupported) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-5xl h-[380px] sm:h-[460px] md:h-[500px] flex flex-col items-center justify-center my-4 overflow-hidden rounded-3xl ${className}`}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block touch-none transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Floating 3D Lineup Mode Controller Bar */}
      <div className="absolute bottom-3 z-30 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-pill bg-neutral-950/85 backdrop-blur-xl border border-border-subtle shadow-2xl">
        <button
          onClick={() => handleModeSwitch("LINEUP_FAN_OUT")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill text-xs font-mono font-bold transition-all ${
            active3DMode === "LINEUP_FAN_OUT"
              ? "bg-brand-400 text-black shadow-md scale-105"
              : "text-text-secondary hover:text-white"
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>6 Flavors 3D Lineup</span>
        </button>

        <button
          onClick={() => handleModeSwitch("CAROUSEL")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill text-xs font-mono font-bold transition-all ${
            active3DMode === "CAROUSEL"
              ? "bg-brand-400 text-black shadow-md scale-105"
              : "text-text-secondary hover:text-white"
          }`}
        >
          <RotateCw className="h-3.5 w-3.5" />
          <span>3D Carousel</span>
        </button>

        <button
          onClick={() => handleModeSwitch("HERO_SINGLE", 0)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill text-xs font-mono font-bold transition-all ${
            active3DMode === "HERO_SINGLE"
              ? "bg-brand-400 text-black shadow-md scale-105"
              : "text-text-secondary hover:text-white"
          }`}
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Master Can</span>
        </button>
      </div>

      {/* 6 Flavor Selection Pills at Top of Stage */}
      <div className="absolute top-2 z-30 flex flex-wrap items-center justify-center gap-1.5 max-w-2xl px-2">
        {SIX_FLAVORS.map((flavor, idx) => (
          <button
            key={flavor.id}
            onClick={() => handleFlavorSelect(idx)}
            className={`px-3 py-1 rounded-pill text-[10px] font-mono font-bold uppercase transition-all duration-300 border ${
              activeFlavorIdx === idx
                ? "scale-105 shadow-lg text-black font-black"
                : "bg-neutral-950/80 backdrop-blur-md border-border-subtle text-text-secondary hover:text-white"
            }`}
            style={
              activeFlavorIdx === idx
                ? { backgroundColor: flavor.accentColor, borderColor: flavor.accentColor }
                : {}
            }
          >
            {flavor.name}
          </button>
        ))}
      </div>
    </div>
  );
}
