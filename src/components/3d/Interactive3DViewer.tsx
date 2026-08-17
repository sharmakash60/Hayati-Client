"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CanModel } from "./CanModel";
import { StudioLighting } from "./StudioLighting";
import { FlavorConfig, SIX_FLAVORS, THREE_CONFIG } from "@/lib/motion/3dConfig";
import { Rotate3D, Sparkles, RefreshCw } from "lucide-react";

interface Interactive3DViewerProps {
  flavorId: string;
  accentColor?: string;
  className?: string;
}

export function Interactive3DViewer({
  flavorId,
  accentColor = "#a3e635",
  className = "",
}: Interactive3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRotating, setIsRotating] = useState(true);

  const matchedFlavor =
    SIX_FLAVORS.find((f) => f.id === flavorId) || {
      id: flavorId,
      name: flavorId.replace(/-/g, " ").toUpperCase(),
      subname: "FUNCTIONAL HYDRATION",
      collection: "Hayati Collection",
      accentColor: accentColor,
      secondaryColor: "#0f172a",
      glowColor: `${accentColor}66`,
      badge: "0g SUGAR • 450mg ELECTROLYTES",
      imageFallback: "/media/products/HAYATI.webp",
    };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let isDestroyed = false;
    let animationFrameId: number;

    const width = containerRef.current.clientWidth || 400;
    const height = containerRef.current.clientHeight || 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.8);

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

    // 3. Lighting Rig
    const lighting = new StudioLighting();
    lighting.setAccentColor(matchedFlavor.accentColor);
    scene.add(lighting.group);

    // 4. Can Model
    const can = new CanModel(matchedFlavor);
    can.mesh.position.set(0, -0.15, 0);
    can.mesh.rotation.set(0.08, -0.2, 0);
    scene.add(can.mesh);

    // 5. Interactive Drag-to-Rotate Mechanics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = -0.2;
    let targetRotationX = 0.08;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsRotating(false);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(-0.4, Math.min(0.4, targetRotationX));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const canvasElement = canvasRef.current;
    canvasElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 6. Window Resize Listener
    const onResize = () => {
      if (isDestroyed || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener("resize", onResize);

    // 7. Render Loop
    let clock = new THREE.Clock();
    const render = () => {
      if (isDestroyed) return;
      const delta = clock.getDelta();

      if (!isDragging && isRotating) {
        targetRotationY += delta * 0.45; // Smooth auto-rotation
      }

      can.mesh.rotation.y = THREE.MathUtils.lerp(can.mesh.rotation.y, targetRotationY, 0.1);
      can.mesh.rotation.x = THREE.MathUtils.lerp(can.mesh.rotation.x, targetRotationX, 0.1);

      // Subtle float
      can.mesh.position.y = -0.15 + Math.sin(clock.getElapsedTime() * 1.5) * 0.03;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      canvasElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);

      can.dispose();
      renderer.dispose();
    };
  }, [flavorId, matchedFlavor, isRotating]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[400px] sm:h-[480px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
    >
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />

      {/* 3D Controls Badge */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-pill text-[11px] font-mono font-bold bg-neutral-950/85 backdrop-blur-md border border-border-subtle text-white shadow-lg pointer-events-none">
        <Rotate3D className="h-3.5 w-3.5 text-brand-400 animate-spin" style={{ animationDuration: "6s" }} />
        <span>3D MODEL • DRAG TO ROTATE 360°</span>
      </div>

      {/* Reset view button */}
      <button
        onClick={() => setIsRotating((prev) => !prev)}
        className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-mono font-bold bg-neutral-900/90 hover:bg-neutral-800 border border-border-subtle text-text-secondary hover:text-white transition-colors"
      >
        <RefreshCw className="h-3 w-3" />
        <span>{isRotating ? "Pause Auto-Rotate" : "Auto-Rotate"}</span>
      </button>
    </div>
  );
}
