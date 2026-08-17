import * as THREE from "three";

export interface FlavorConfig {
  id: string;
  name: string;
  subname: string;
  collection: string;
  accentColor: string;
  secondaryColor: string;
  glowColor: string;
  badge: string;
  imageFallback: string;
}

export const SIX_FLAVORS: FlavorConfig[] = [
  {
    id: "alder-apple",
    name: "ALDER APPLE",
    subname: "CRISP ALPINE BOTANICAL",
    collection: "Alder Series",
    accentColor: "#a3e635", // Lime Green
    secondaryColor: "#15803d",
    glowColor: "rgba(163, 230, 53, 0.4)",
    badge: "0g SUGAR • 450mg ELECTROLYTES",
    imageFallback: "/media/products/Alder_Apple.webp",
  },
  {
    id: "alder-lime",
    name: "ALDER LIME",
    subname: "ZESTY CITRUS INFUSION",
    collection: "Alder Series",
    accentColor: "#22c55e", // Green
    secondaryColor: "#166534",
    glowColor: "rgba(34, 197, 94, 0.4)",
    badge: "ALPINE PURITY • IONIC SALTS",
    imageFallback: "/media/products/Alder_Lime.webp",
  },
  {
    id: "hopp-ginger-lime",
    name: "HOPP GINGER LIME",
    subname: "ADAPTOGENIC SPARKLING",
    collection: "HOPP Series",
    accentColor: "#f59e0b", // Amber/Gold
    secondaryColor: "#b45309",
    glowColor: "rgba(245, 158, 11, 0.4)",
    badge: "PROBIOTIC BLEND • ZERO SUGAR",
    imageFallback: "/media/products/HOPP_Ginger_Lime.webp",
  },
  {
    id: "hopp-strawberry",
    name: "HOPP STRAWBERRY",
    subname: "WILD BERRY BOTANICAL",
    collection: "HOPP Series",
    accentColor: "#f43f5e", // Rose Pink
    secondaryColor: "#9f1239",
    glowColor: "rgba(244, 63, 94, 0.4)",
    badge: "ORGANIC ESSENCES • NO CAFFEINE",
    imageFallback: "/media/products/HOPP_Strawberry.webp",
  },
  {
    id: "signature-blue-lagoon",
    name: "SIGNATURE BLUE LAGOON",
    subname: "ISLAND BLUE BOTANICAL",
    collection: "Signature Botanicals",
    accentColor: "#06b6d4", // Cyan
    secondaryColor: "#0e7490",
    glowColor: "rgba(6, 182, 212, 0.4)",
    badge: "VITAMIN C ENRICHED • BIOAVAILABLE",
    imageFallback: "/media/products/Blue_Lagoon.webp",
  },
  {
    id: "fruit-splash-grape-ape",
    name: "FRUIT SPLASH GRAPE",
    subname: "20% REAL FRUIT JUICE",
    collection: "Fruit Splash",
    accentColor: "#a855f7", // Purple
    secondaryColor: "#6b21a8",
    glowColor: "rgba(168, 85, 247, 0.4)",
    badge: "20% FRUIT JUICE • ANTIOXIDANT",
    imageFallback: "/media/products/Grape_Ape.webp",
  },
];

export interface CanFormationTransform {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  opacity: number;
}

// 3D Animation Formations for 6 Cans
export const FORMATIONS = {
  // 1. Hero Single Can Center
  HERO_SINGLE: (index: number): CanFormationTransform => {
    if (index === 0) {
      return {
        position: new THREE.Vector3(0, -0.2, 0),
        rotation: new THREE.Euler(0.08, -0.15, -0.05),
        scale: 1.0,
        opacity: 1.0,
      };
    }
    // Other 5 cans hidden behind in depth
    const angle = (index / 5) * Math.PI * 2;
    return {
      position: new THREE.Vector3(Math.cos(angle) * 3, Math.sin(angle) * 2, -6),
      rotation: new THREE.Euler(0, angle, 0),
      scale: 0.4,
      opacity: 0.0,
    };
  },

  // 2. Cinematic Fan-Out Lineup (All 6 Cans displayed simultaneously in a 3D arc)
  LINEUP_FAN_OUT: (index: number, isMobile: boolean = false): CanFormationTransform => {
    if (isMobile) {
      // Mobile: Vertical/staggered arc
      const offset = index - 2.5;
      return {
        position: new THREE.Vector3(offset * 0.9, -offset * 0.35 - 0.2, -Math.abs(offset) * 0.6 - 1.2),
        rotation: new THREE.Euler(0.1, -offset * 0.25, -offset * 0.08),
        scale: 0.65,
        opacity: 1.0,
      };
    }
    // Desktop: Broad dramatic 3D parabolic arc
    const xOffsets = [-4.2, -2.5, -0.9, 0.9, 2.5, 4.2];
    const yOffsets = [-0.4, -0.15, 0.1, 0.1, -0.15, -0.4];
    const zOffsets = [-2.2, -1.1, 0.1, 0.1, -1.1, -2.2];
    const rotY = [0.5, 0.3, 0.08, -0.08, -0.3, -0.5];
    const rotZ = [0.08, 0.04, 0.0, 0.0, -0.04, -0.08];

    return {
      position: new THREE.Vector3(xOffsets[index], yOffsets[index] - 0.1, zOffsets[index]),
      rotation: new THREE.Euler(0.08, rotY[index], rotZ[index]),
      scale: 0.85,
      opacity: 1.0,
    };
  },

  // 3. Carousel Formation (Cans arranged in 3D circle revolving around center)
  CAROUSEL: (index: number, activeIndex: number = 0, radius: number = 3.2): CanFormationTransform => {
    const angle = ((index - activeIndex) / 6) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius - radius + 0.2;
    const isFront = Math.cos(angle) > 0.85;

    return {
      position: new THREE.Vector3(x, isFront ? 0 : -0.2, z),
      rotation: new THREE.Euler(0.05, -angle + Math.PI, 0),
      scale: isFront ? 1.0 : 0.65 + Math.cos(angle) * 0.2,
      opacity: Math.max(0.3, (Math.cos(angle) + 1) / 2),
    };
  },

  // 4. Macro Inspection Shot (Focuses on 1 can close-up for Benefits Section)
  MACRO_INSPECT: (index: number, activeIndex: number = 0): CanFormationTransform => {
    if (index === activeIndex) {
      return {
        position: new THREE.Vector3(1.1, -0.4, 1.4),
        rotation: new THREE.Euler(0.35, -0.65, 0.12),
        scale: 1.45,
        opacity: 1.0,
      };
    }
    return {
      position: new THREE.Vector3(-4 - index, 0, -5),
      rotation: new THREE.Euler(0, 0, 0),
      scale: 0.3,
      opacity: 0.0,
    };
  },
};

export const THREE_CONFIG = {
  camera: {
    fov: 42,
    near: 0.1,
    far: 100,
    defaultPosition: new THREE.Vector3(0, 0, 6.2),
  },
  can: {
    radius: 0.72,
    height: 2.5,
    radialSegments: 64,
    heightSegments: 32,
    neckHeight: 0.28,
    neckTaper: 0.84,
    rimHeight: 0.06,
    rimRadius: 0.73,
    bottomInset: 0.15,
  },
  materials: {
    bodyMetalness: 0.45,
    bodyRoughness: 0.18,
    bodyClearcoat: 0.85,
    bodyClearcoatRoughness: 0.08,
    lidMetalness: 0.95,
    lidRoughness: 0.22,
    tabMetalness: 0.9,
    tabRoughness: 0.15,
  },
};
