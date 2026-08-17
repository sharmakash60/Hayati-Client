import * as THREE from "three";
import { FlavorConfig, THREE_CONFIG } from "@/lib/motion/3dConfig";
import { LabelTextureGenerator } from "./LabelTextureGenerator";

/**
 * Creates high-detail procedural brushed aluminum textures
 * for realistic metallic anisotropic sheen on the can lid and pull-tab.
 */
function createBrushedAluminumTexture(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture({} as HTMLCanvasElement);
  }
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Base silver gradient
  const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 256);
  grad.addColorStop(0, "#f4f4f5");
  grad.addColorStop(0.5, "#d4d4d8");
  grad.addColorStop(0.85, "#a1a1aa");
  grad.addColorStop(1, "#71717a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Anisotropic circular brushed grooves
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  for (let r = 20; r < 250; r += 3) {
    ctx.beginPath();
    ctx.arc(256, 256, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Generates subtle condensation micro-droplet bump map
 */
function createCondensationBumpMap(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture({} as HTMLCanvasElement);
  }
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 512, 512);

  // Micro droplets
  for (let i = 0; i < 180; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = Math.random() * 3.5 + 1.2;

    const droplet = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0.5, x, y, r);
    droplet.addColorStop(0, "#ffffff");
    droplet.addColorStop(0.7, "#a0a0a0");
    droplet.addColorStop(1, "#808080");

    ctx.fillStyle = droplet;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 8);
  return texture;
}

export class CanModel {
  public mesh: THREE.Group;
  public bodyMesh!: THREE.Mesh;
  public lidMesh!: THREE.Mesh;
  public rimMesh!: THREE.Mesh;
  public tabMesh!: THREE.Mesh;
  public baseMesh!: THREE.Mesh;

  private bodyMaterial!: THREE.MeshPhysicalMaterial;
  private aluminumMaterial!: THREE.MeshStandardMaterial;
  private tabMaterial!: THREE.MeshStandardMaterial;

  public flavor: FlavorConfig;

  private static brushedTexture: THREE.CanvasTexture | null = null;
  private static bumpTexture: THREE.CanvasTexture | null = null;

  constructor(flavor: FlavorConfig) {
    this.flavor = flavor;
    this.mesh = new THREE.Group();
    this.mesh.name = `can-${flavor.id}`;

    if (!CanModel.brushedTexture) {
      CanModel.brushedTexture = createBrushedAluminumTexture();
    }
    if (!CanModel.bumpTexture) {
      CanModel.bumpTexture = createCondensationBumpMap();
    }

    this.initMaterials();
    this.buildGeometry();
  }

  private initMaterials() {
    const labelTexture = LabelTextureGenerator.createTextureForFlavor(this.flavor);

    // 1. Can Body High-Fidelity PBR Material
    this.bodyMaterial = new THREE.MeshPhysicalMaterial({
      map: labelTexture,
      bumpMap: CanModel.bumpTexture || undefined,
      bumpScale: 0.008,
      color: new THREE.Color(0xffffff),
      metalness: THREE_CONFIG.materials.bodyMetalness,
      roughness: THREE_CONFIG.materials.bodyRoughness,
      clearcoat: THREE_CONFIG.materials.bodyClearcoat,
      clearcoatRoughness: THREE_CONFIG.materials.bodyClearcoatRoughness,
      reflectivity: 0.9,
    });

    // 2. Brushed Aluminum Rim & Lid Material
    this.aluminumMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xd4d4d8),
      map: CanModel.brushedTexture || undefined,
      metalness: THREE_CONFIG.materials.lidMetalness,
      roughness: THREE_CONFIG.materials.lidRoughness,
    });

    // 3. Stamped Pull-Tab Material
    this.tabMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xe4e4e7),
      metalness: THREE_CONFIG.materials.tabMetalness,
      roughness: THREE_CONFIG.materials.tabRoughness,
    });
  }

  private buildGeometry() {
    const { radius, height, neckHeight, neckTaper, rimHeight, rimRadius, radialSegments } =
      THREE_CONFIG.can;

    const bodyHeight = height - neckHeight;

    // --- 1. Main Body Cylinder ---
    const bodyGeometry = new THREE.CylinderGeometry(
      radius,
      radius * 0.985,
      bodyHeight,
      radialSegments,
      16,
      true
    );
    this.bodyMesh = new THREE.Mesh(bodyGeometry, this.bodyMaterial);
    this.bodyMesh.position.y = -neckHeight / 2;
    this.bodyMesh.castShadow = true;
    this.bodyMesh.receiveShadow = true;
    this.mesh.add(this.bodyMesh);

    // --- 2. Tapered Neck ---
    const neckGeometry = new THREE.CylinderGeometry(
      radius * neckTaper,
      radius,
      neckHeight,
      radialSegments,
      8,
      true
    );
    const neckMesh = new THREE.Mesh(neckGeometry, this.aluminumMaterial);
    neckMesh.position.y = bodyHeight / 2;
    neckMesh.castShadow = true;
    this.mesh.add(neckMesh);

    // --- 3. Top Double-Seam Lip / Rim ---
    const rimGeometry = new THREE.TorusGeometry(
      rimRadius * neckTaper,
      rimHeight / 2,
      16,
      radialSegments
    );
    rimGeometry.rotateX(Math.PI / 2);
    this.rimMesh = new THREE.Mesh(rimGeometry, this.aluminumMaterial);
    this.rimMesh.position.y = bodyHeight / 2 + neckHeight / 2;
    this.mesh.add(this.rimMesh);

    // --- 4. Recessed Lid Surface ---
    const lidGeometry = new THREE.CircleGeometry(radius * neckTaper * 0.96, radialSegments);
    lidGeometry.rotateX(-Math.PI / 2);
    this.lidMesh = new THREE.Mesh(lidGeometry, this.aluminumMaterial);
    this.lidMesh.position.y = bodyHeight / 2 + neckHeight / 2 - 0.02;
    this.mesh.add(this.lidMesh);

    // --- 5. Stamped Pull-Tab Geometry ---
    const tabShape = new THREE.Shape();
    const tabWidth = 0.22;
    const tabLength = 0.45;
    tabShape.moveTo(-tabWidth / 2, 0);
    tabShape.lineTo(-tabWidth / 2, tabLength * 0.7);
    tabShape.quadraticCurveTo(-tabWidth / 2, tabLength, 0, tabLength);
    tabShape.quadraticCurveTo(tabWidth / 2, tabLength, tabWidth / 2, tabLength * 0.7);
    tabShape.lineTo(tabWidth / 2, 0);
    tabShape.quadraticCurveTo(tabWidth / 2, -0.08, 0, -0.08);
    tabShape.quadraticCurveTo(-tabWidth / 2, -0.08, -tabWidth / 2, 0);

    const holePath = new THREE.Path();
    holePath.absarc(0, tabLength * 0.55, 0.06, 0, Math.PI * 2, true);
    tabShape.holes.push(holePath);

    const extrudeSettings = {
      depth: 0.015,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.005,
      bevelThickness: 0.005,
    };
    const tabGeometry = new THREE.ExtrudeGeometry(tabShape, extrudeSettings);
    tabGeometry.rotateX(-Math.PI / 2);
    tabGeometry.scale(0.9, 0.9, 0.9);

    this.tabMesh = new THREE.Mesh(tabGeometry, this.tabMaterial);
    this.tabMesh.position.set(0, bodyHeight / 2 + neckHeight / 2 - 0.01, -0.05);
    this.mesh.add(this.tabMesh);

    // --- 6. Center Rivet ---
    const rivetGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16);
    const rivetMesh = new THREE.Mesh(rivetGeometry, this.aluminumMaterial);
    rivetMesh.position.set(0, bodyHeight / 2 + neckHeight / 2, 0.04);
    this.mesh.add(rivetMesh);

    // --- 7. Concave Bottom Dome / Chime ---
    const baseGeometry = new THREE.CylinderGeometry(
      radius * 0.985,
      radius * 0.88,
      0.12,
      radialSegments,
      1
    );
    this.baseMesh = new THREE.Mesh(baseGeometry, this.aluminumMaterial);
    this.baseMesh.position.y = -bodyHeight / 2 - neckHeight / 2 - 0.04;
    this.mesh.add(this.baseMesh);
  }

  public updateFlavor(newFlavor: FlavorConfig) {
    this.flavor = newFlavor;
    const newTexture = LabelTextureGenerator.createTextureForFlavor(newFlavor);
    this.bodyMaterial.map = newTexture;
    this.bodyMaterial.needsUpdate = true;
  }

  public dispose() {
    this.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }
}
