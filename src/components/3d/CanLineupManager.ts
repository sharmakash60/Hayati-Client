import * as THREE from "three";
import { CanModel } from "./CanModel";
import { StudioLighting } from "./StudioLighting";
import { ParticleField } from "./ParticleField";
import { SIX_FLAVORS, THREE_CONFIG } from "@/lib/motion/3dConfig";
import { Master3DTimeline, Master3DState } from "@/lib/motion/3dMasterTimeline";

export class CanLineupManager {
  public group: THREE.Group;
  public cans: CanModel[] = [];
  public lighting: StudioLighting;
  public particles: ParticleField;

  public activeFlavorIndex: number = 0;
  public isMobile: boolean = false;
  public scrollProgress: number = 0;

  private timeOffset: number = 0;

  constructor(isMobile: boolean = false) {
    this.isMobile = isMobile;
    this.group = new THREE.Group();
    this.group.name = "hayati-lineup-manager";

    this.lighting = new StudioLighting();
    this.group.add(this.lighting.group);

    this.particles = new ParticleField(isMobile ? 70 : 150);
    this.group.add(this.particles.points);

    this.initCans();
  }

  private initCans() {
    SIX_FLAVORS.forEach((flavor) => {
      const can = new CanModel(flavor);
      this.cans.push(can);
      this.group.add(can.mesh);
    });

    // Apply initial state (progress = 0)
    this.applyState(Master3DTimeline.sample(0, 0, this.isMobile));
  }

  public setScrollProgress(progress: number) {
    this.scrollProgress = progress;
  }

  public setActiveFlavor(index: number) {
    this.activeFlavorIndex = Math.max(0, Math.min(5, index));
  }

  public setMobile(isMobile: boolean) {
    this.isMobile = isMobile;
  }

  public applyState(state: Master3DState) {
    state.cans.forEach((t, i) => {
      const can = this.cans[i];
      if (!can) return;

      can.mesh.position.copy(t.position);
      can.mesh.rotation.copy(t.rotation);
      can.mesh.scale.setScalar(t.scale);
      can.mesh.visible = t.opacity > 0.01;
    });

    this.lighting.fillLight.intensity = state.lighting.fillIntensity;
    this.lighting.rimLight.intensity = state.lighting.rimIntensity;
    this.lighting.keyLight.intensity = state.lighting.keyIntensity;
    this.lighting.setAccentColor(state.lighting.fillColorHex);
    this.particles.setAccentColor(state.lighting.fillColorHex);
  }

  public update(deltaTime: number, mouseNorm: THREE.Vector2, camera: THREE.PerspectiveCamera) {
    this.timeOffset += deltaTime;

    // 1. Sample current state from Master Timeline
    const targetState = Master3DTimeline.sample(
      this.scrollProgress,
      this.activeFlavorIndex,
      this.isMobile
    );

    // 2. Smoothly lerp camera position, target, and FOV
    camera.position.lerp(targetState.camera.position, 0.08);

    // Add subtle desktop mouse parallax to camera position
    if (!this.isMobile) {
      camera.position.x += (mouseNorm.x * 0.35 - (camera.position.x - targetState.camera.position.x)) * 0.05;
      camera.position.y += (-mouseNorm.y * 0.25 - (camera.position.y - targetState.camera.position.y)) * 0.05;
    }

    camera.lookAt(targetState.camera.target);

    if (Math.abs(camera.fov - targetState.camera.fov) > 0.1) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetState.camera.fov, 0.08);
      camera.updateProjectionMatrix();
    }

    // 3. Smoothly lerp each can transform
    targetState.cans.forEach((t, i) => {
      const can = this.cans[i];
      if (!can) return;

      can.mesh.position.lerp(t.position, 0.1);

      can.mesh.rotation.x = THREE.MathUtils.lerp(can.mesh.rotation.x, t.rotation.x, 0.1);
      can.mesh.rotation.y = THREE.MathUtils.lerp(can.mesh.rotation.y, t.rotation.y, 0.1);
      can.mesh.rotation.z = THREE.MathUtils.lerp(can.mesh.rotation.z, t.rotation.z, 0.1);

      const curScale = can.mesh.scale.x;
      const targetScale = THREE.MathUtils.lerp(curScale, t.scale, 0.1);
      can.mesh.scale.setScalar(targetScale);

      can.mesh.visible = t.opacity > 0.02;

      // Micro idle float wave on visible cans
      if (can.mesh.visible) {
        const floatY = Math.sin(this.timeOffset * 1.6 + i * 0.95) * 0.025;
        can.mesh.position.y += floatY * deltaTime * 2;
      }
    });

    // 4. Update particles
    this.particles.update(deltaTime);
  }

  public dispose() {
    this.cans.forEach((can) => can.dispose());
    this.particles.dispose();
  }
}
