import * as THREE from "three";
import { CanModel } from "./CanModel";
import { SIX_FLAVORS, FORMATIONS, CanFormationTransform } from "@/lib/motion/3dConfig";
import { gsap } from "gsap";

export type FormationMode = "HERO_SINGLE" | "LINEUP_FAN_OUT" | "CAROUSEL" | "MACRO_INSPECT";

export class CanGroup {
  public group: THREE.Group;
  public cans: CanModel[] = [];
  public currentMode: FormationMode = "HERO_SINGLE";
  public activeFlavorIndex: number = 0;
  public isMobile: boolean = false;

  private targetTransforms: CanFormationTransform[] = [];
  private timeOffset: number = 0;

  constructor(isMobile: boolean = false) {
    this.isMobile = isMobile;
    this.group = new THREE.Group();
    this.group.name = "hayati-6-flavor-can-group";

    this.initCans();
    this.setFormation("HERO_SINGLE", 0, true);
  }

  private initCans() {
    SIX_FLAVORS.forEach((flavor) => {
      const can = new CanModel(flavor);
      this.cans.push(can);
      this.group.add(can.mesh);
    });
  }

  public setFormation(mode: FormationMode, activeIndex: number = 0, instant: boolean = false) {
    this.currentMode = mode;
    this.activeFlavorIndex = activeIndex;

    this.cans.forEach((can, i) => {
      let t: CanFormationTransform;

      if (mode === "HERO_SINGLE") {
        t = FORMATIONS.HERO_SINGLE(i);
      } else if (mode === "LINEUP_FAN_OUT") {
        t = FORMATIONS.LINEUP_FAN_OUT(i, this.isMobile);
      } else if (mode === "CAROUSEL") {
        t = FORMATIONS.CAROUSEL(i, this.activeFlavorIndex);
      } else {
        t = FORMATIONS.MACRO_INSPECT(i, this.activeFlavorIndex);
      }

      this.targetTransforms[i] = t;

      if (instant) {
        can.mesh.position.copy(t.position);
        can.mesh.rotation.copy(t.rotation);
        can.mesh.scale.setScalar(t.scale);
        can.mesh.visible = t.opacity > 0.01;
      } else {
        gsap.to(can.mesh.position, {
          x: t.position.x,
          y: t.position.y,
          z: t.position.z,
          duration: 1.2,
          ease: "power3.out",
        });

        gsap.to(can.mesh.rotation, {
          x: t.rotation.x,
          y: t.rotation.y,
          z: t.rotation.z,
          duration: 1.2,
          ease: "power3.out",
        });

        gsap.to(can.mesh.scale, {
          x: t.scale,
          y: t.scale,
          z: t.scale,
          duration: 1.2,
          ease: "power3.out",
          onStart: () => {
            if (t.opacity > 0.01) can.mesh.visible = true;
          },
          onComplete: () => {
            can.mesh.visible = t.opacity > 0.01;
          },
        });
      }
    });
  }

  /**
   * Continuous scroll progress interpolation (0.0 -> 1.0)
   * 0.0 - 0.25: Hero Single Can -> 6 Cans Fan Out
   * 0.25 - 0.65: 6 Cans Fan Out / Carousel revolving
   * 0.65 - 0.90: Macro Inspection of active can
   * 0.90 - 1.00: Convergence to CTA
   */
  public updateScrollProgress(progress: number) {
    if (progress < 0.2) {
      const p = progress / 0.2;
      this.interpolateBetween("HERO_SINGLE", "LINEUP_FAN_OUT", p);
    } else if (progress < 0.65) {
      const p = (progress - 0.2) / 0.45;
      this.interpolateCarousel(p);
    } else if (progress < 0.88) {
      const p = (progress - 0.65) / 0.23;
      this.interpolateBetween("LINEUP_FAN_OUT", "MACRO_INSPECT", p);
    } else {
      const p = (progress - 0.88) / 0.12;
      this.interpolateBetween("MACRO_INSPECT", "HERO_SINGLE", p);
    }
  }

  private interpolateBetween(fromMode: FormationMode, toMode: FormationMode, alpha: number) {
    const eased = gsap.parseEase("power2.inOut")(Math.max(0, Math.min(1, alpha)));

    this.cans.forEach((can, i) => {
      let fromT: CanFormationTransform;
      let toT: CanFormationTransform;

      if (fromMode === "HERO_SINGLE") fromT = FORMATIONS.HERO_SINGLE(i);
      else if (fromMode === "LINEUP_FAN_OUT") fromT = FORMATIONS.LINEUP_FAN_OUT(i, this.isMobile);
      else if (fromMode === "CAROUSEL") fromT = FORMATIONS.CAROUSEL(i, this.activeFlavorIndex);
      else fromT = FORMATIONS.MACRO_INSPECT(i, this.activeFlavorIndex);

      if (toMode === "HERO_SINGLE") toT = FORMATIONS.HERO_SINGLE(i);
      else if (toMode === "LINEUP_FAN_OUT") toT = FORMATIONS.LINEUP_FAN_OUT(i, this.isMobile);
      else if (toMode === "CAROUSEL") toT = FORMATIONS.CAROUSEL(i, this.activeFlavorIndex);
      else toT = FORMATIONS.MACRO_INSPECT(i, this.activeFlavorIndex);

      can.mesh.position.lerpVectors(fromT.position, toT.position, eased);

      can.mesh.rotation.x = THREE.MathUtils.lerp(fromT.rotation.x, toT.rotation.x, eased);
      can.mesh.rotation.y = THREE.MathUtils.lerp(fromT.rotation.y, toT.rotation.y, eased);
      can.mesh.rotation.z = THREE.MathUtils.lerp(fromT.rotation.z, toT.rotation.z, eased);

      const s = THREE.MathUtils.lerp(fromT.scale, toT.scale, eased);
      can.mesh.scale.setScalar(s);

      const op = THREE.MathUtils.lerp(fromT.opacity, toT.opacity, eased);
      can.mesh.visible = op > 0.02;
    });
  }

  private interpolateCarousel(progress: number) {
    const totalRotation = progress * Math.PI * 2 * 1.5;
    this.cans.forEach((can, i) => {
      const angle = (i / 6) * Math.PI * 2 + totalRotation;
      const radius = this.isMobile ? 2.2 : 3.6;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * (radius * 0.7) - 1.0;
      const y = -0.15 + Math.sin(angle * 2) * 0.12;

      can.mesh.position.set(x, y, z);
      can.mesh.rotation.set(0.08, -angle + Math.PI, 0);

      const isFront = (Math.cos(angle) + 1) / 2;
      const scale = THREE.MathUtils.lerp(0.55, 1.05, isFront);
      can.mesh.scale.setScalar(scale);
      can.mesh.visible = true;
    });
  }

  /**
   * Continuous Idle Float + Mouse Parallax
   */
  public update(deltaTime: number, mouseNorm: THREE.Vector2) {
    this.timeOffset += deltaTime;

    // Subtle group-level mouse tilt lerp
    this.group.rotation.y = THREE.MathUtils.lerp(
      this.group.rotation.y,
      mouseNorm.x * 0.25,
      0.08
    );
    this.group.rotation.x = THREE.MathUtils.lerp(
      this.group.rotation.x,
      -mouseNorm.y * 0.18,
      0.08
    );

    // Micro idle floating wave on each can
    this.cans.forEach((can, i) => {
      if (can.mesh.visible) {
        const floatY = Math.sin(this.timeOffset * 1.8 + i * 1.05) * 0.04;
        const floatRot = Math.cos(this.timeOffset * 1.4 + i * 0.9) * 0.015;
        can.mesh.position.y += floatY * deltaTime * 3;
        can.mesh.rotation.z += floatRot * deltaTime * 2;
      }
    });
  }

  public setMobile(isMobile: boolean) {
    this.isMobile = isMobile;
  }

  public dispose() {
    this.cans.forEach((can) => can.dispose());
  }
}
