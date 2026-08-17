import * as THREE from "three";

export interface CanTransformState {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  opacity: number;
}

export interface CameraState {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
}

export interface LightingState {
  keyIntensity: number;
  fillIntensity: number;
  rimIntensity: number;
  ambientIntensity: number;
  fillColorHex: string;
}

export interface Master3DState {
  cans: CanTransformState[];
  camera: CameraState;
  lighting: LightingState;
  activeFlavorIndex: number;
}

/**
 * Art-Directed 3D Keyframe Coordinates:
 * Designed specifically so 3D objects NEVER collide or overlap with DOM typography.
 *
 * S1 (0.00 - 0.18): Hero Centerpiece - Centered between top headline and bottom CTAs
 * S2 (0.18 - 0.38): Velocity Flight - Right half (x: 2.4), left column has text
 * S3 (0.38 - 0.62): 6-Flavor Constellation - Middle stage between top tabs and bottom card
 * S4 (0.62 - 0.85): Macro Inspection - Right half (x: 2.3), left column has claim card
 * S5 (0.85 - 1.00): Pack Landing - Floating high above title (y: 1.6, z: -2.0, scale: 0.55)
 */
export class Master3DTimeline {
  public static sample(
    progress: number,
    activeFlavor: number = 0,
    isMobile: boolean = false
  ): Master3DState {
    const clamped = Math.max(0, Math.min(1, progress));

    const canStates: CanTransformState[] = [];
    const cameraState: CameraState = {
      position: new THREE.Vector3(0, 0, 6.0),
      target: new THREE.Vector3(0, 0, 0),
      fov: isMobile ? 54 : 42,
    };
    const lightingState: LightingState = {
      keyIntensity: 3.5,
      fillIntensity: 3.2,
      rimIntensity: 4.5,
      ambientIntensity: 1.2,
      fillColorHex: "#a3e635",
    };

    // Calculate 6 Can Transforms based on scroll progress
    for (let i = 0; i < 6; i++) {
      canStates.push(this.computeCanTransform(i, clamped, activeFlavor, isMobile));
    }

    // Camera and Lighting trajectory across scroll
    if (clamped < 0.18) {
      // Scene 01: Hero Centerpiece
      const p = clamped / 0.18;
      cameraState.position.set(0, 0, 6.0 - p * 0.3);
      cameraState.target.set(0, 0, 0);
      cameraState.fov = isMobile ? 54 : 42;
      lightingState.fillColorHex = "#a3e635";
    } else if (clamped < 0.38) {
      // Scene 02: Story & Velocity Flight to Right
      const p = (clamped - 0.18) / 0.2;
      const eased = this.easeInOutCubic(p);

      cameraState.position.set(
        THREE.MathUtils.lerp(0, isMobile ? 0 : 0.8, eased),
        0,
        THREE.MathUtils.lerp(5.7, 5.2, eased)
      );
      cameraState.target.set(
        THREE.MathUtils.lerp(0, isMobile ? 0 : 1.2, eased),
        0,
        0
      );
      cameraState.fov = isMobile ? 54 : 40;
      lightingState.fillColorHex = "#06b6d4";
    } else if (clamped < 0.62) {
      // Scene 03: 6-Flavor Constellation / Carousel
      const p = (clamped - 0.38) / 0.24;
      const eased = this.easeInOutCubic(p);

      cameraState.position.set(
        THREE.MathUtils.lerp(isMobile ? 0 : 0.8, 0, eased),
        0,
        THREE.MathUtils.lerp(5.2, 6.4, eased)
      );
      cameraState.target.set(0, 0, 0);
      cameraState.fov = isMobile ? 56 : 44;
      lightingState.fillColorHex = "#a855f7";
    } else if (clamped < 0.85) {
      // Scene 04: Macro Anatomy Inspection
      const p = (clamped - 0.62) / 0.23;
      const eased = this.easeInOutCubic(p);

      cameraState.position.set(
        THREE.MathUtils.lerp(0, isMobile ? 0.3 : 1.4, eased),
        THREE.MathUtils.lerp(0, 0.2, eased),
        THREE.MathUtils.lerp(6.4, 3.2, eased)
      );
      cameraState.target.set(
        THREE.MathUtils.lerp(0, isMobile ? 0.2 : 1.2, eased),
        0.1,
        0
      );
      cameraState.fov = isMobile ? 40 : 30; // Telephoto close-up
      lightingState.rimIntensity = 6.5;
      lightingState.fillColorHex = "#f59e0b";
    } else {
      // Scene 05: Pack Landing & CTA
      const p = (clamped - 0.85) / 0.15;
      const eased = this.easeInOutCubic(p);

      cameraState.position.set(
        THREE.MathUtils.lerp(isMobile ? 0.3 : 1.4, 0, eased),
        0,
        THREE.MathUtils.lerp(3.2, 6.2, eased)
      );
      cameraState.target.set(0, 0.8, 0);
      cameraState.fov = isMobile ? 54 : 42;
      lightingState.fillColorHex = "#a3e635";
    }

    return {
      cans: canStates,
      camera: cameraState,
      lighting: lightingState,
      activeFlavorIndex: activeFlavor,
    };
  }

  private static computeCanTransform(
    index: number,
    progress: number,
    activeFlavor: number,
    isMobile: boolean
  ): CanTransformState {
    const isMasterCan = index === activeFlavor;

    if (progress < 0.18) {
      // Scene 01: Hero Centerpiece (Floats cleanly in the middle hero window)
      if (isMasterCan) {
        return {
          position: new THREE.Vector3(0, -0.05, 0),
          rotation: new THREE.Euler(0.06, -0.2 + progress * 0.6, -0.02),
          scale: isMobile ? 0.65 : 0.75,
          opacity: 1.0,
        };
      }
      // Surrounding 5 cans hidden far behind in depth
      const angle = (index / 5) * Math.PI * 2;
      return {
        position: new THREE.Vector3(Math.cos(angle) * 4, Math.sin(angle) * 3, -10),
        rotation: new THREE.Euler(0, angle, 0),
        scale: 0.2,
        opacity: 0.0,
      };
    } else if (progress < 0.38) {
      // Scene 02: Story & Velocity Flight to Right (Leaving Left 50% for DOM text)
      const p = (progress - 0.18) / 0.2;
      const eased = this.easeInOutCubic(p);

      if (isMasterCan) {
        const startX = 0;
        const endX = isMobile ? 0 : 2.5;
        const startY = -0.05;
        const endY = isMobile ? -0.8 : 0;
        const startZ = 0;
        const endZ = isMobile ? -1.5 : -0.8;

        return {
          position: new THREE.Vector3(
            THREE.MathUtils.lerp(startX, endX, eased),
            THREE.MathUtils.lerp(startY, endY, eased),
            THREE.MathUtils.lerp(startZ, endZ, eased)
          ),
          rotation: new THREE.Euler(
            THREE.MathUtils.lerp(0.06, 0.18, eased),
            THREE.MathUtils.lerp(-0.08, 1.2, eased),
            THREE.MathUtils.lerp(-0.02, -0.15, eased) // 45-deg bank
          ),
          scale: isMobile ? 0.55 : 0.78,
          opacity: 1.0,
        };
      }
      return {
        position: new THREE.Vector3(0, -6, -10),
        rotation: new THREE.Euler(0, 0, 0),
        scale: 0.2,
        opacity: 0.0,
      };
    } else if (progress < 0.62) {
      // Scene 03: 6-Flavor 3D Constellation / Carousel (Floats in dedicated center stage)
      const p = (progress - 0.38) / 0.24;
      const orbitSpeed = p * Math.PI * 2 * 1.2;
      const angle = (index / 6) * Math.PI * 2 + orbitSpeed;
      const radiusX = isMobile ? 1.8 : 3.2;
      const radiusZ = isMobile ? 1.2 : 2.2;

      const x = Math.sin(angle) * radiusX;
      const z = Math.cos(angle) * radiusZ - 1.2;
      const y = 0.0 + Math.sin(angle * 2) * 0.1;

      const depthRatio = (Math.cos(angle) + 1) / 2;
      const scale = isMobile
        ? THREE.MathUtils.lerp(0.35, 0.6, depthRatio)
        : THREE.MathUtils.lerp(0.5, 0.78, depthRatio);

      return {
        position: new THREE.Vector3(x, y, z),
        rotation: new THREE.Euler(0.06, -angle + Math.PI, 0),
        scale: scale,
        opacity: Math.max(0.3, depthRatio),
      };
    } else if (progress < 0.85) {
      // Scene 04: Macro Anatomy Inspection (Positioned cleanly on the Right)
      const p = (progress - 0.62) / 0.23;
      const eased = this.easeInOutCubic(p);

      if (isMasterCan) {
        return {
          position: new THREE.Vector3(
            THREE.MathUtils.lerp(0, isMobile ? 0 : 2.4, eased),
            THREE.MathUtils.lerp(0, 0.1, eased),
            THREE.MathUtils.lerp(0, 0.8, eased)
          ),
          rotation: new THREE.Euler(
            THREE.MathUtils.lerp(0.06, 0.45, eased), // Tilts back to highlight aluminum lid
            THREE.MathUtils.lerp(0, -0.75 + p * 1.1, eased),
            THREE.MathUtils.lerp(0, 0.1, eased)
          ),
          scale: isMobile ? 0.75 : 1.05,
          opacity: 1.0,
        };
      }
      return {
        position: new THREE.Vector3(-10 - index, 0, -10),
        rotation: new THREE.Euler(0, 0, 0),
        scale: 0.1,
        opacity: 0.0,
      };
    } else {
      // Scene 05: Pack Landing & CTA (Floats high above the title)
      const p = (progress - 0.85) / 0.15;
      const eased = this.easeInOutCubic(p);

      if (isMasterCan) {
        return {
          position: new THREE.Vector3(
            THREE.MathUtils.lerp(isMobile ? 0 : 2.4, 0, eased),
            THREE.MathUtils.lerp(0.1, 1.4, eased),
            THREE.MathUtils.lerp(0.8, -1.8, eased)
          ),
          rotation: new THREE.Euler(
            THREE.MathUtils.lerp(0.45, 0.06, eased),
            THREE.MathUtils.lerp(0.3, -0.15 + p * 0.5, eased),
            0
          ),
          scale: isMobile ? 0.45 : 0.6,
          opacity: 1.0,
        };
      }
      return {
        position: new THREE.Vector3(0, 8, -12),
        rotation: new THREE.Euler(0, 0, 0),
        scale: 0.1,
        opacity: 0.0,
      };
    }
  }

  private static easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
}
