import * as THREE from "three";
import { SIX_FLAVORS } from "@/lib/motion/3dConfig";

export interface Can3DTransform {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  opacity: number;
}

export interface Story3DFrame {
  cans: Can3DTransform[];
  cameraPosition: THREE.Vector3;
  cameraTarget: THREE.Vector3;
  cameraFov: number;
  accentColor: string;
}

/**
 * Senior UI/UX Refined 3D Coordinate Engine:
 * 
 * Safe Zone Architecture:
 * - Canvas is hosted in Right Column (w-[52%]). Local X: 0 is the center of the right half.
 * - Local X bounds: -1.35 to +1.35.
 * - This guarantees that all 6 cans remain 100% inside the right visual stage and NEVER bleed into the left text column.
 * - Mobile (< 768px): Cans are placed in the upper stage (Y: 0.1 to 0.4), scaled gracefully (0.38 - 0.48).
 */
export class StoryTimelineEngine {
  public static evaluate(
    progress: number,
    activeFlavorIdx: number = 0,
    isMobile: boolean = false
  ): Story3DFrame {
    const p = Math.max(0, Math.min(1, progress));
    const activeFlavor = SIX_FLAVORS[activeFlavorIdx] || SIX_FLAVORS[0];

    const cameraPos = new THREE.Vector3(0, 0, 5.6);
    const cameraTarget = new THREE.Vector3(0, 0, 0);
    let cameraFov = isMobile ? 52 : 38;

    const canStates: Can3DTransform[] = [];

    if (p < 0.25) {
      // CHAPTER 1: INTRO (All 6 Signature Flavor Cans in a 3D Fan-Out Lineup)
      const sub = p / 0.25;
      cameraFov = isMobile ? 54 : 38;

      // Arc layout for 6 cans contained cleanly within the right-column stage
      const xOffsets = isMobile
        ? [-1.3, -0.75, -0.25, 0.25, 0.75, 1.3]
        : [-1.35, -0.8, -0.25, 0.25, 0.8, 1.35];
      const zOffsets = isMobile
        ? [-0.8, -0.3, 0.1, 0.1, -0.3, -0.8]
        : [-0.9, -0.4, 0.1, 0.1, -0.4, -0.9];
      const yOffsets = isMobile
        ? [0.15, 0.1, 0.05, 0.05, 0.1, 0.15]
        : [0.08, 0.02, -0.04, -0.04, 0.02, 0.08];
      const rotY = [-0.35, -0.2, -0.06, 0.06, 0.2, 0.35];

      for (let i = 0; i < 6; i++) {
        const isSelected = i === activeFlavorIdx;
        canStates.push({
          position: new THREE.Vector3(
            xOffsets[i],
            yOffsets[i] + (isSelected ? 0.06 : 0),
            zOffsets[i] + (isSelected ? 0.25 : 0)
          ),
          rotation: new THREE.Euler(0.06, rotY[i] + sub * 0.15, -0.02),
          scale: isMobile ? (isSelected ? 0.44 : 0.36) : (isSelected ? 0.62 : 0.48),
          opacity: isSelected ? 1.0 : 0.88,
        });
      }
    } else if (p < 0.55) {
      // CHAPTER 2: 6-FLAVOR 3D REVOLVING CAROUSEL
      const sub = (p - 0.25) / 0.3;
      cameraFov = isMobile ? 50 : 38;

      const baseAngle = sub * Math.PI * 2 * 0.75;
      const radiusX = isMobile ? 1.1 : 1.4;
      const radiusZ = isMobile ? 0.8 : 1.1;

      for (let i = 0; i < 6; i++) {
        const angle = ((i - activeFlavorIdx) / 6) * Math.PI * 2 + baseAngle;
        const x = Math.sin(angle) * radiusX;
        const z = Math.cos(angle) * radiusZ - 0.5;
        const y = -0.02 + Math.sin(angle * 2) * 0.05;
        const isFront = Math.cos(angle) > 0.65;

        canStates.push({
          position: new THREE.Vector3(x, y, z),
          rotation: new THREE.Euler(0.06, -angle + Math.PI, 0),
          scale: isMobile ? (isFront ? 0.48 : 0.32) : (isFront ? 0.66 : 0.44),
          opacity: Math.max(0.4, (Math.cos(angle) + 1) / 2),
        });
      }
    } else if (p < 0.80) {
      // CHAPTER 3: BOTANICAL BENEFITS / MACRO INSPECTION
      const sub = (p - 0.55) / 0.25;
      cameraFov = isMobile ? 38 : 28; // Telephoto macro push-in
      cameraPos.set(0, 0, 4.4);

      for (let i = 0; i < 6; i++) {
        if (i === activeFlavorIdx) {
          canStates.push({
            position: new THREE.Vector3(0, 0.05, 0.4),
            rotation: new THREE.Euler(0.38, -0.55 + sub * 0.5, 0.06), // Highlights the brushed aluminum lid & pull-tab
            scale: isMobile ? 0.65 : 0.82,
            opacity: 1.0,
          });
        } else {
          canStates.push({
            position: new THREE.Vector3((i - 2.5) * 3, -4, -8),
            rotation: new THREE.Euler(0, 0, 0),
            scale: 0.1,
            opacity: 0.0,
          });
        }
      }
    } else {
      // CHAPTER 4: BATCH ALLOCATION & FADE
      const sub = (p - 0.80) / 0.2;
      cameraFov = isMobile ? 48 : 38;
      cameraPos.set(0, 0, 5.6);

      for (let i = 0; i < 6; i++) {
        if (i === activeFlavorIdx) {
          canStates.push({
            position: new THREE.Vector3(
              0,
              THREE.MathUtils.lerp(0.05, 0.6, sub),
              THREE.MathUtils.lerp(0.4, -1.4, sub)
            ),
            rotation: new THREE.Euler(0.06, sub * 0.5, 0),
            scale: THREE.MathUtils.lerp(isMobile ? 0.65 : 0.82, 0.42, sub),
            opacity: Math.max(0, 1.0 - sub * 1.8),
          });
        } else {
          canStates.push({
            position: new THREE.Vector3(0, 6, -10),
            rotation: new THREE.Euler(0, 0, 0),
            scale: 0.1,
            opacity: 0.0,
          });
        }
      }
    }

    return {
      cans: canStates,
      cameraPosition: cameraPos,
      cameraTarget,
      cameraFov,
      accentColor: activeFlavor.accentColor,
    };
  }
}
