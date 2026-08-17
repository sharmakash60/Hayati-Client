"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";
import { CanModel } from "@/components/3d/CanModel";
import { StudioLighting } from "@/components/3d/StudioLighting";
import { ParticleField } from "@/components/3d/ParticleField";
import { SIX_FLAVORS } from "@/lib/motion/3dConfig";
import { StoryTimelineEngine } from "./storyTimeline";

export interface StoryCanvasHandle {
  setScrollProgress: (progress: number) => void;
  setActiveFlavor: (index: number) => void;
}

export const StoryCanvas = forwardRef<StoryCanvasHandle, { className?: string }>(
  function StoryCanvas({ className = "" }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const progressRef = useRef(0);
    const activeFlavorRef = useRef(0);

    useImperativeHandle(ref, () => ({
      setScrollProgress: (p: number) => {
        progressRef.current = p;
      },
      setActiveFlavor: (idx: number) => {
        activeFlavorRef.current = idx;
      },
    }));

    useEffect(() => {
      if (!canvasRef.current) return;

      let isDestroyed = false;
      let animationFrameId: number;
      const clock = new THREE.Clock();
      const mouseNorm = new THREE.Vector2(0, 0);

      const width = canvasRef.current.clientWidth || window.innerWidth;
      const height = canvasRef.current.clientHeight || window.innerHeight;
      const isMobile = window.innerWidth < 768;

      // 1. Scene & Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(isMobile ? 50 : 40, width / height, 0.1, 100);
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

      // 3. Studio Lighting Rig
      const lighting = new StudioLighting();
      scene.add(lighting.group);

      // 4. Particle Field
      const particles = new ParticleField(isMobile ? 60 : 120);
      scene.add(particles.points);

      // 5. Cans: 6 Cans representing each flavor
      const cans: CanModel[] = SIX_FLAVORS.map((f) => {
        const can = new CanModel(f);
        scene.add(can.mesh);
        return can;
      });

      setIsLoaded(true);

      // Mouse Parallax Listener
      const onPointerMove = (e: PointerEvent) => {
        mouseNorm.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseNorm.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointerMove);

      // Resize Listener
      const onResize = () => {
        if (isDestroyed || !canvasRef.current) return;
        const w = canvasRef.current.clientWidth || window.innerWidth;
        const h = canvasRef.current.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      };
      window.addEventListener("resize", onResize);

      // Render Loop
      clock.start();
      const render = () => {
        if (isDestroyed) return;

        const delta = Math.min(clock.getDelta(), 0.1);
        const mobile = window.innerWidth < 768;

        const frame = StoryTimelineEngine.evaluate(
          progressRef.current,
          activeFlavorRef.current,
          mobile
        );

        // Smooth camera lerp
        camera.position.lerp(frame.cameraPosition, 0.08);
        if (!mobile) {
          camera.position.x += (mouseNorm.x * 0.25 - (camera.position.x - frame.cameraPosition.x)) * 0.04;
          camera.position.y += (-mouseNorm.y * 0.18 - (camera.position.y - frame.cameraPosition.y)) * 0.04;
        }
        camera.lookAt(frame.cameraTarget);

        if (Math.abs(camera.fov - frame.cameraFov) > 0.1) {
          camera.fov = THREE.MathUtils.lerp(camera.fov, frame.cameraFov, 0.08);
          camera.updateProjectionMatrix();
        }

        // Lighting Color Update
        lighting.setAccentColor(frame.accentColor);
        particles.setAccentColor(frame.accentColor);

        // Update All 6 Cans from the computed frame transforms
        cans.forEach((c, idx) => {
          const t = frame.cans[idx];
          if (t) {
            c.mesh.position.lerp(t.position, 0.1);
            c.mesh.rotation.x = THREE.MathUtils.lerp(c.mesh.rotation.x, t.rotation.x, 0.1);
            c.mesh.rotation.y = THREE.MathUtils.lerp(c.mesh.rotation.y, t.rotation.y, 0.1);
            c.mesh.rotation.z = THREE.MathUtils.lerp(c.mesh.rotation.z, t.rotation.z, 0.1);
            c.mesh.scale.setScalar(THREE.MathUtils.lerp(c.mesh.scale.x, t.scale, 0.1));
            c.mesh.visible = t.opacity > 0.02;
          } else {
            c.mesh.visible = false;
          }
        });

        // Update particles
        particles.update(delta);

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(render);
      };
      render();

      return () => {
        isDestroyed = true;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", onResize);

        cans.forEach((c) => c.dispose());
        particles.dispose();
        renderer.dispose();
      };
    }, []);

    return (
      <div
        className={`pointer-events-none w-full h-full relative overflow-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="w-full h-full block touch-none" />
      </div>
    );
  }
);
