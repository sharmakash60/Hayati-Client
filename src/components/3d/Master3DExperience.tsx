"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CanLineupManager } from "./CanLineupManager";
import { getGSAP } from "@/lib/motion/gsap";

export function Master3DExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<CanLineupManager | null>(null);
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

    let isDestroyed = false;
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const mouseNorm = new THREE.Vector2(0, 0);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(isMobile ? 52 : 44, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 3. Lineup Manager
    const manager = new CanLineupManager(isMobile);
    managerRef.current = manager;
    scene.add(manager.group);

    if (typeof window !== "undefined") {
      (window as unknown as { __master3DManager?: CanLineupManager }).__master3DManager = manager;
    }
    setIsLoaded(true);

    // 4. Mouse Tracking for Parallax Lerp
    const onPointerMove = (e: PointerEvent) => {
      mouseNorm.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNorm.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    // 5. Window Resize Handler
    const onResize = () => {
      if (isDestroyed) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      manager.setMobile(mobile);
    };
    window.addEventListener("resize", onResize);

    // 6. GSAP ScrollTrigger Master Timeline Scrub
    const { gsap, ScrollTrigger } = getGSAP();
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isReduced) {
      ScrollTrigger.create({
        trigger: "#main-scroll-track",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.0,
        onUpdate: (self) => {
          manager.setScrollProgress(self.progress);
        },
      });
    }

    // 7. Render Loop
    clock.start();
    const render = () => {
      if (isDestroyed) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      manager.update(delta, mouseNorm, camera);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);

      manager.dispose();
      renderer.dispose();
      managerRef.current = null;
    };
  }, []);

  if (!isWebGLSupported) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-10 overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />
    </div>
  );
}

export function useMaster3D() {
  const setActiveFlavor = (index: number) => {
    const manager = (window as unknown as { __master3DManager?: CanLineupManager }).__master3DManager;
    if (manager) {
      manager.setActiveFlavor(index);
    }
  };

  return { setActiveFlavor };
}
