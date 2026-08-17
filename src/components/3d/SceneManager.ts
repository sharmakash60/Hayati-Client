import * as THREE from "three";
import { CanGroup, FormationMode } from "./CanGroup";
import { StudioLighting } from "./StudioLighting";
import { ParticleField } from "./ParticleField";
import { THREE_CONFIG } from "@/lib/motion/3dConfig";

export class SceneManager {
  public canvas: HTMLCanvasElement;
  public renderer!: THREE.WebGLRenderer;
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public canGroup!: CanGroup;
  public lighting!: StudioLighting;
  public particles!: ParticleField;

  public mouseNorm: THREE.Vector2 = new THREE.Vector2(0, 0);
  private isDestroyed: boolean = false;
  private animationFrameId: number | null = null;
  private clock: THREE.Clock = new THREE.Clock();
  private isVisible: boolean = true;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.init();
  }

  private init() {
    const width = this.canvas.clientWidth || this.canvas.parentElement?.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || this.canvas.parentElement?.clientHeight || 480;
    const isMobile = width < 768;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(
      THREE_CONFIG.camera.fov,
      width / height,
      THREE_CONFIG.camera.near,
      THREE_CONFIG.camera.far
    );
    this.camera.position.copy(THREE_CONFIG.camera.defaultPosition);

    // 3. WebGL Renderer with High-Fidelity PBR Configuration
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Lighting Rig
    this.lighting = new StudioLighting();
    this.scene.add(this.lighting.group);

    // 5. 6-Flavor Can Group
    this.canGroup = new CanGroup(isMobile);
    this.scene.add(this.canGroup.group);

    // 6. Atmospheric Particle Field
    this.particles = new ParticleField(isMobile ? 80 : 160);
    this.scene.add(this.particles.points);

    // 7. Event Listeners
    this.setupListeners();

    // 8. Start Render Loop
    this.clock.start();
    this.render();
  }

  private setupListeners() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("pointermove", this.onPointerMove);

    // Pause RAF when document is hidden
    document.addEventListener("visibilitychange", this.onVisibilityChange);
  }

  private onResize = () => {
    if (this.isDestroyed || !this.canvas) return;
    const width = this.canvas.clientWidth || this.canvas.parentElement?.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || this.canvas.parentElement?.clientHeight || 480;
    const isMobile = width < 768;

    this.camera.aspect = width / height;
    this.camera.fov = isMobile ? 52 : THREE_CONFIG.camera.fov;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.canGroup.setMobile(isMobile);
  };

  private onPointerMove = (e: PointerEvent) => {
    // Normalize coordinates between -1 and 1
    this.mouseNorm.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseNorm.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  private onVisibilityChange = () => {
    this.isVisible = document.visibilityState === "visible";
    if (this.isVisible) {
      this.clock.start();
    }
  };

  public setFormation(mode: FormationMode, activeIndex: number = 0) {
    this.canGroup.setFormation(mode, activeIndex);
  }

  public updateScrollProgress(progress: number) {
    this.canGroup.updateScrollProgress(progress);
  }

  public setAccentColor(hexColor: string) {
    this.lighting.setAccentColor(hexColor);
    this.particles.setAccentColor(hexColor);
  }

  private render = () => {
    if (this.isDestroyed) return;

    if (this.isVisible) {
      const delta = Math.min(this.clock.getDelta(), 0.1);

      this.canGroup.update(delta, this.mouseNorm);
      this.particles.update(delta);

      this.renderer.render(this.scene, this.camera);
    }

    this.animationFrameId = requestAnimationFrame(this.render);
  };

  public dispose() {
    this.isDestroyed = true;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);

    this.canGroup.dispose();
    this.particles.dispose();
    this.renderer.dispose();
  }
}
