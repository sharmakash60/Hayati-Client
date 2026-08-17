import * as THREE from "three";

export class ParticleField {
  public points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private count: number;

  constructor(count: number = 180) {
    this.count = count;
    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
      scales[i] = Math.random() * 0.04 + 0.015;
    }

    this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    this.material = new THREE.PointsMaterial({
      color: 0xa3e635,
      size: 0.045,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.name = "ambient-particles";
  }

  public update(deltaTime: number) {
    const positions = this.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < this.count; i++) {
      // Gentle rising particle motion
      positions[i * 3 + 1] += deltaTime * 0.25;
      if (positions[i * 3 + 1] > 5) {
        positions[i * 3 + 1] = -5;
      }
    }
    this.geometry.attributes.position.needsUpdate = true;
  }

  public setAccentColor(hexColor: string) {
    this.material.color.set(hexColor);
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
