import * as THREE from "three";
import { FlavorConfig } from "@/lib/motion/3dConfig";

/**
 * Generates ultra-crisp high-resolution (2048x1024) 3D UV textures
 * for aluminum can labels with authentic metallic background, brand stamping,
 * typography, botanical icons, and ingredient badges.
 */
export class LabelTextureGenerator {
  private static cache: Map<string, THREE.CanvasTexture> = new Map();

  public static createTextureForFlavor(flavor: FlavorConfig): THREE.CanvasTexture {
    if (this.cache.has(flavor.id)) {
      return this.cache.get(flavor.id)!;
    }

    if (typeof document === "undefined") {
      // Server-side stub
      const dummyCanvas = {} as HTMLCanvasElement;
      return new THREE.CanvasTexture(dummyCanvas);
    }

    const width = 2048;
    const height = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    // 1. Background Metallic Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, "#0a0a0c");
    bgGradient.addColorStop(0.25, flavor.secondaryColor);
    bgGradient.addColorStop(0.5, flavor.accentColor);
    bgGradient.addColorStop(0.75, flavor.secondaryColor);
    bgGradient.addColorStop(1, "#0a0a0c");

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Micro-Pattern Grid / Metallic Carbon Grain
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    for (let x = 0; x < width; x += 32) {
      ctx.fillRect(x, 0, 1, height);
    }
    for (let y = 0; y < height; y += 32) {
      ctx.fillRect(0, y, width, 1);
    }

    // 3. Central Brand Name Vertical Stamping (repeating around can perimeter)
    const renderCanFace = (centerX: number) => {
      // Background Glow Arc
      const glow = ctx.createRadialGradient(centerX, height * 0.45, 50, centerX, height * 0.45, 450);
      glow.addColorStop(0, "rgba(255, 255, 255, 0.25)");
      glow.addColorStop(0.5, "rgba(0, 0, 0, 0.1)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0.6)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(centerX, height * 0.45, 450, 0, Math.PI * 2);
      ctx.fill();

      // Category Top Badge
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px monospace";
      ctx.textAlign = "center";
      ctx.letterSpacing = "6px";
      ctx.fillText(flavor.collection.toUpperCase(), centerX, 160);

      // Accent Line
      ctx.strokeStyle = flavor.accentColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX - 180, 190);
      ctx.lineTo(centerX + 180, 190);
      ctx.stroke();

      // Main Brand Logo: "HAYATI"
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 130px sans-serif";
      ctx.textAlign = "center";
      ctx.letterSpacing = "14px";
      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 8;
      ctx.fillText("HAYATI", centerX, 330);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Flavor Name
      ctx.fillStyle = flavor.accentColor;
      ctx.font = "900 48px sans-serif";
      ctx.letterSpacing = "8px";
      ctx.fillText(flavor.name.toUpperCase(), centerX, 410);

      // Subtitle / Botanical Notes
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = "bold 28px monospace";
      ctx.letterSpacing = "4px";
      ctx.fillText(flavor.subname.toUpperCase(), centerX, 470);

      // Central Decorative Emblem / Shield Circle
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, 620, 100, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = flavor.accentColor;
      ctx.font = "bold 20px monospace";
      ctx.fillText("LIQUID PRECISION", centerX, 615);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px monospace";
      ctx.fillText("EST. 2026", centerX, 645);

      // Pill Feature Badge
      ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
      ctx.beginPath();
      ctx.roundRect(centerX - 240, 780, 480, 60, 30);
      ctx.fill();
      ctx.strokeStyle = flavor.accentColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px monospace";
      ctx.letterSpacing = "2px";
      ctx.fillText(flavor.badge, centerX, 818);

      // Bottom Volume & Specs
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "bold 20px monospace";
      ctx.fillText("355 ML • 100% RECYCLABLE ALUMINUM • ZERO ARTIFICIAL", centerX, 920);
    };

    // Render 2 faces for 360 degree cylindrical wrapping (Front & Back)
    renderCanFace(width * 0.25);
    renderCanFace(width * 0.75);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    this.cache.set(flavor.id, texture);
    return texture;
  }
}
