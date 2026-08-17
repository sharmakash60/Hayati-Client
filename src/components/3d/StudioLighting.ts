import * as THREE from "three";

export class StudioLighting {
  public group: THREE.Group;
  public keyLight!: THREE.DirectionalLight;
  public fillLight!: THREE.PointLight;
  public rimLight!: THREE.SpotLight;
  public ambientLight!: THREE.AmbientLight;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = "studio-lighting-rig";
    this.initLights();
  }

  private initLights() {
    // 1. Soft Ambient Light for shadow floor
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.group.add(this.ambientLight);

    // 2. Primary Key Directional Light (Warm Studio White)
    this.keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    this.keyLight.position.set(4, 6, 5);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 1024;
    this.keyLight.shadow.mapSize.height = 1024;
    this.keyLight.shadow.bias = -0.0001;
    this.group.add(this.keyLight);

    // 3. Secondary Fill Light with Brand Lime Green Specular Tint
    this.fillLight = new THREE.PointLight(0xa3e635, 4.0, 12, 1.5);
    this.fillLight.position.set(-4, -1, 3);
    this.group.add(this.fillLight);

    // 4. Kicker / Rim Backlight (creating crisp edge sheen on aluminum rims)
    this.rimLight = new THREE.SpotLight(0x38bdf8, 5.0, 15, Math.PI / 4, 0.4, 1.2);
    this.rimLight.position.set(0, 5, -4);
    this.rimLight.target.position.set(0, 0, 0);
    this.group.add(this.rimLight);
    this.group.add(this.rimLight.target);
  }

  public setAccentColor(hexColor: string) {
    this.fillLight.color.set(hexColor);
  }
}
