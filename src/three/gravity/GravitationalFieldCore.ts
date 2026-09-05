import * as THREE from "three";

export type QualityTier = "low" | "medium" | "high";

export interface GravitationalConfig {
  quality: QualityTier;
  colorPrimary: string; // Nexovate Navy / Deep Void
  colorTeal: string;    // Nexovate Teal
  colorBlue: string;    // Nexovate Blue
  colorGold: string;    // Restrained Logo Gold
  baseOpacity: number;
}

const DEFAULT_CONFIG: GravitationalConfig = {
  quality: "high",
  colorPrimary: "#0D1127", // Deep Void Navy
  colorTeal: "#119E9D",    // Nexovate Teal
  colorBlue: "#6366F1",    // Nexovate Indigo/Blue
  colorGold: "#EFAF32",    // Nexovate Gold Accent
  baseOpacity: 0.7,
};

/**
 * GravitationalFieldCore
 *
 * Physics-Inspired Timeless Gravitational / Singularity Field:
 * - Mathematical coordinate geodesics distorted by a gravitational singularity.
 * - Relativistic curvature: space bends inward (depth funnel) with tangential orbital deflection.
 * - Dual-gravity interaction: The mouse acts as a second mass with physical spring inertia.
 * - Soft dark central void with faint luminous accretion boundary.
 * - Multi-frequency harmonic modulation for infinite, organic evolution.
 * - GPU-friendly, fully leak-free with clean WebGL resource disposal.
 */
export class GravitationalFieldCore {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private config: GravitationalConfig;

  // Animation lifecycle
  private animFrameId: number | null = null;
  private clock: THREE.Clock;
  private isDisposed = false;
  private isPaused = false;

  // Subsystems
  private fieldGroup: THREE.Group;
  private singularityMesh: THREE.Mesh | null = null;
  private geodesicGeometries: THREE.BufferGeometry[] = [];
  private geodesicBasePositions: Float32Array[] = [];
  private particlePoints: THREE.Points | null = null;
  private particleData: {
    radius: number;
    angle: number;
    speed: number;
    elevation: number;
    color: THREE.Color;
  }[] = [];

  // Physics States
  // Singularity organic position in 3D space (placed slightly right of center, behind the composition)
  private singularityPos = new THREE.Vector3(2.4, -0.2, -1.8);
  private singularityBasePos = new THREE.Vector3(2.4, -0.2, -1.8);

  // Mouse as a second gravitational body with spring inertia
  private targetMouse = new THREE.Vector2(0, 0);
  private currentMouse = new THREE.Vector2(0, 0);
  private mouseMassVelocity = new THREE.Vector2(0, 0);
  private mouse3D = new THREE.Vector3(0, 0, 1.5);
  private scrollProgress = 0;

  constructor(container: HTMLElement, config: Partial<GravitationalConfig> = {}) {
    this.container = container;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.clock = new THREE.Clock();

    // 1. Scene & Atmospheric Fog
    this.scene = new THREE.Scene();
    // Warm off-white fog dissolves far coordinate boundaries gracefully
    this.scene.fog = new THREE.FogExp2(0xfafbfc, 0.024);

    // 2. Camera Setup (subtle downward perspective)
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    this.camera.position.set(0, 1.0, 11);
    this.camera.lookAt(0, 0, 0);

    // 3. Renderer with high performance & battery care
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      depth: true,
    });
    this.renderer.setSize(width, height);
    this.setDPRByQuality();
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    this.fieldGroup = new THREE.Group();
    this.scene.add(this.fieldGroup);

    // 4. Construct Elements
    this.buildSingularity();
    this.buildGravitationalGeodesics();
    this.buildAccretionParticles();

    // 5. Start animation loop
    this.start();
  }

  private setDPRByQuality(): void {
    const nativeDPR = window.devicePixelRatio || 1;
    if (this.config.quality === "low") {
      this.renderer.setPixelRatio(Math.min(1.0, nativeDPR));
    } else if (this.config.quality === "medium") {
      this.renderer.setPixelRatio(Math.min(1.5, nativeDPR));
    } else {
      this.renderer.setPixelRatio(Math.min(2.0, nativeDPR));
    }
  }

  /**
   * 1. Singularity: Dark central void with soft gravitational falloff & faint luminous edge
   */
  private buildSingularity(): void {
    // Disc facing camera representing the gravitational event horizon / shadow
    const radius = this.config.quality === "low" ? 1.3 : 1.6;
    const geometry = new THREE.CircleGeometry(radius, 48);

    // Custom shader material for soft gravitational shadow & faint teal/gold edge
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColorVoid: { value: new THREE.Color(0x0a0e27) }, // Deepest navy void
        uColorEdge: { value: new THREE.Color(this.config.colorTeal) },
        uColorGold: { value: new THREE.Color(this.config.colorGold) },
        uTime: { value: 0 },
        uOpacity: { value: 0.65 * this.config.baseOpacity },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorVoid;
        uniform vec3 uColorEdge;
        uniform vec3 uColorGold;
        uniform float uTime;
        uniform float uOpacity;
        varying vec2 vUv;

        void main() {
          vec2 center = vUv - vec2(0.5);
          float dist = length(center) * 2.0; // 0 at center, 1 at boundary
          if (dist > 1.0) discard;

          // Event horizon falloff
          float voidAlpha = smoothstep(1.0, 0.25, dist);
          
          // Subtle luminous edge ring
          float edge = smoothstep(0.75, 0.95, dist) * smoothstep(1.0, 0.92, dist);
          vec3 edgeColor = mix(uColorEdge, uColorGold, sin(uTime * 0.4) * 0.5 + 0.5);

          vec3 finalColor = mix(uColorVoid, edgeColor, edge * 0.85);
          float alpha = (voidAlpha * 0.55 + edge * 0.7) * uOpacity;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    this.singularityMesh = new THREE.Mesh(geometry, material);
    this.singularityMesh.position.copy(this.singularityPos);
    this.scene.add(this.singularityMesh);
  }

  /**
   * 2. Gravitational Geodesics: Spatial coordinate lines bent by the singularity
   */
  private buildGravitationalGeodesics(): void {
    const numRadial = this.config.quality === "low" ? 18 : this.config.quality === "medium" ? 28 : 38;
    const numRings = this.config.quality === "low" ? 12 : this.config.quality === "medium" ? 20 : 28;
    const pointsPerCurve = 64;

    const teal = new THREE.Color(this.config.colorTeal);
    const blue = new THREE.Color(this.config.colorBlue);
    const gold = new THREE.Color(this.config.colorGold);

    // A. Radial Geodesic Curves (Spacetime grid lines streaming inward)
    for (let i = 0; i < numRadial; i++) {
      const angle = (i / numRadial) * Math.PI * 2;
      const positions = new Float32Array(pointsPerCurve * 3);
      const colors = new Float32Array(pointsPerCurve * 3);

      for (let j = 0; j < pointsPerCurve; j++) {
        const t = j / (pointsPerCurve - 1); // 0 (outer) to 1 (near singularity)
        const r = 1.4 + (1 - t) * 8.5;

        // Tangential spiral deflection (Kerr metric simulation)
        const spiralAngle = angle + t * 1.8;
        const x = Math.cos(spiralAngle) * r;
        const y = Math.sin(spiralAngle) * r * 0.45; // slight flattened coordinate plane
        const z = -t * 2.8; // Funnel into depth

        const idx = j * 3;
        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;

        // Color transition
        const c = new THREE.Color();
        if (i % 6 === 0) {
          c.lerpColors(gold, blue, t);
        } else {
          c.lerpColors(teal, blue, t);
        }
        colors[idx] = c.r;
        colors[idx + 1] = c.g;
        colors[idx + 2] = c.b;
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      this.geodesicBasePositions.push(new Float32Array(positions));
      this.geodesicGeometries.push(geom);

      const mat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: (i % 4 === 0 ? 0.32 : 0.18) * this.config.baseOpacity,
        depthWrite: false,
      });

      const line = new THREE.Line(geom, mat);
      this.fieldGroup.add(line);
    }

    // B. Concentric Orbital Geodesics (Equipotential coordinate rings)
    for (let i = 0; i < numRings; i++) {
      const ringRadius = 1.6 + i * 0.32;
      const positions = new Float32Array(pointsPerCurve * 3);
      const colors = new Float32Array(pointsPerCurve * 3);

      for (let j = 0; j < pointsPerCurve; j++) {
        const theta = (j / (pointsPerCurve - 1)) * Math.PI * 2;
        const x = Math.cos(theta) * ringRadius;
        const y = Math.sin(theta) * ringRadius * 0.45;
        const z = -Math.pow(1.6 / ringRadius, 1.4) * 2.2;

        const idx = j * 3;
        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;

        const c = new THREE.Color().lerpColors(teal, blue, (i / numRings));
        colors[idx] = c.r;
        colors[idx + 1] = c.g;
        colors[idx + 2] = c.b;
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      this.geodesicBasePositions.push(new Float32Array(positions));
      this.geodesicGeometries.push(geom);

      const mat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: (i % 3 === 0 ? 0.26 : 0.14) * this.config.baseOpacity,
        depthWrite: false,
      });

      const line = new THREE.LineLoop(geom, mat);
      this.fieldGroup.add(line);
    }

    this.fieldGroup.position.copy(this.singularityPos);
  }

  /**
   * 3. Accretion Particles: Matter and light orbiting the gravitational well
   */
  private buildAccretionParticles(): void {
    const count = this.config.quality === "low" ? 40 : this.config.quality === "medium" ? 80 : 130;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const teal = new THREE.Color(this.config.colorTeal);
    const blue = new THREE.Color(this.config.colorBlue);
    const gold = new THREE.Color(this.config.colorGold);

    for (let i = 0; i < count; i++) {
      const radius = 1.7 + Math.pow(Math.random(), 1.6) * 7.5;
      const angle = Math.random() * Math.PI * 2;
      // Keplerian orbital speed: v ~ 1 / sqrt(r)
      const speed = (0.28 / Math.sqrt(radius)) * (Math.random() * 0.3 + 0.85);
      const elevation = (Math.random() - 0.5) * 0.4;

      const pColor = i % 7 === 0 ? gold : i % 2 === 0 ? teal : blue;

      this.particleData.push({
        radius,
        angle,
        speed,
        elevation,
        color: pColor,
      });

      const x = this.singularityPos.x + Math.cos(angle) * radius;
      const y = this.singularityPos.y + Math.sin(angle) * radius * 0.45 + elevation;
      const z = this.singularityPos.z - Math.pow(1.6 / radius, 1.2) * 2.0;

      const idx = i * 3;
      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      colors[idx] = pColor.r;
      colors[idx + 1] = pColor.g;
      colors[idx + 2] = pColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: this.config.quality === "low" ? 0.08 : 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.55 * this.config.baseOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particlePoints = new THREE.Points(geometry, material);
    this.scene.add(this.particlePoints);
  }

  /**
   * Set normalized mouse coordinates [-1, 1]
   */
  public setMouse(nx: number, ny: number): void {
    this.targetMouse.set(nx, ny);
  }

  /**
   * Update scroll progress [0, 1]
   */
  public setScrollProgress(progress: number): void {
    this.scrollProgress = progress;
  }

  /**
   * Main Gravitational Physics Loop
   */
  private animate = (): void => {
    if (this.isDisposed || this.isPaused) return;

    const delta = Math.min(0.05, this.clock.getDelta());
    const time = this.clock.getElapsedTime();

    // 1. Mouse Gravity Interpolation (Physical Spring Inertia)
    const springDamping = 3.8 * delta;
    const prevMx = this.currentMouse.x;
    const prevMy = this.currentMouse.y;

    this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * springDamping;
    this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * springDamping;

    this.mouseMassVelocity.x = (this.currentMouse.x - prevMx) / delta;
    this.mouseMassVelocity.y = (this.currentMouse.y - prevMy) / delta;

    // Convert mouse NDC to 3D world plane coordinates
    this.mouse3D.set(
      this.currentMouse.x * 5.5,
      -this.currentMouse.y * 3.8,
      0.5
    );

    // 2. Subtle Singularity Drift & Scroll Elevation
    // Multi-frequency harmonic motion (0.09, 0.14, 0.21 rad/s)
    const driftX = Math.sin(time * 0.09) * 0.35 + Math.cos(time * 0.14) * 0.15;
    const driftY = Math.cos(time * 0.11) * 0.25 - this.scrollProgress * 2.2;
    
    // Very small secondary attraction of the singularity toward the mouse mass
    const mouseAttractionX = (this.mouse3D.x - this.singularityBasePos.x) * 0.08;
    const mouseAttractionY = (this.mouse3D.y - this.singularityBasePos.y) * 0.08;

    this.singularityPos.x = this.singularityBasePos.x + driftX + mouseAttractionX;
    this.singularityPos.y = this.singularityBasePos.y + driftY + mouseAttractionY;
    this.singularityPos.z = this.singularityBasePos.z + Math.sin(time * 0.07) * 0.2;

    if (this.singularityMesh) {
      this.singularityMesh.position.copy(this.singularityPos);
      const mat = this.singularityMesh.material as THREE.ShaderMaterial;
      if (mat.uniforms) mat.uniforms.uTime.value = time;
    }

    this.fieldGroup.position.copy(this.singularityPos);

    // 3. Camera Parallax (Quiet, restrained)
    const targetCamX = this.currentMouse.x * 0.4;
    const targetCamY = -this.currentMouse.y * 0.3 + 1.0 - this.scrollProgress * 1.2;
    this.camera.position.x += (targetCamX - this.camera.position.x) * (2.2 * delta);
    this.camera.position.y += (targetCamY - this.camera.position.y) * (2.2 * delta);
    this.camera.lookAt(0, -this.scrollProgress * 0.6, 0);

    // 4. Mathematical Geodesic Distortion (Dual-Gravity Field)
    const fieldOriginX = this.singularityPos.x;
    const fieldOriginY = this.singularityPos.y;
    const fieldOriginZ = this.singularityPos.z;

    const rotSpeed = 0.022;
    this.fieldGroup.rotation.z = time * rotSpeed;

    for (let i = 0; i < this.geodesicGeometries.length; i++) {
      const geom = this.geodesicGeometries[i];
      const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      const basePositions = this.geodesicBasePositions[i];
      const count = positions.length / 3;

      for (let j = 0; j < count; j++) {
        const idx = j * 3;
        const bx = basePositions[idx];
        const by = basePositions[idx + 1];
        const bz = basePositions[idx + 2];

        // Global position in world space
        const wx = fieldOriginX + bx;
        const wy = fieldOriginY + by;
        const wz = fieldOriginZ + bz;

        // Dual Gravity Interaction: Secondary Mouse Mass Pull
        const mdx = wx - this.mouse3D.x;
        const mdy = wy - this.mouse3D.y;
        const distSqToMouse = mdx * mdx + mdy * mdy;

        // Gravitational lens deflection
        const mouseGravityForce = 0.65 / (1.0 + distSqToMouse * 0.45);

        // Displace position subtly along vector toward mouse
        positions[idx] = bx - mdx * mouseGravityForce * 0.22;
        positions[idx + 1] = by - mdy * mouseGravityForce * 0.22;
        positions[idx + 2] = bz + mouseGravityForce * 0.35;
      }

      posAttr.needsUpdate = true;
    }

    // 5. Update Accretion Particles along relativistic trajectories
    if (this.particlePoints) {
      const pAttr = this.particlePoints.geometry.getAttribute("position") as THREE.BufferAttribute;
      const pPos = pAttr.array as Float32Array;

      for (let i = 0; i < this.particleData.length; i++) {
        const p = this.particleData[i];
        p.angle += p.speed * delta;

        // Radial oscillation (orbit breathing)
        const currentR = p.radius + Math.sin(time * 0.3 + i) * 0.08;

        const px = this.singularityPos.x + Math.cos(p.angle) * currentR;
        const py = this.singularityPos.y + Math.sin(p.angle) * currentR * 0.45 + p.elevation;
        const pz = this.singularityPos.z - Math.pow(1.6 / currentR, 1.2) * 2.0;

        // Mouse gravitational attraction
        const mdx = px - this.mouse3D.x;
        const mdy = py - this.mouse3D.y;
        const distSqM = mdx * mdx + mdy * mdy;
        const mousePull = 0.45 / (1.0 + distSqM * 0.5);

        const idx = i * 3;
        pPos[idx] = px - mdx * mousePull * 0.18;
        pPos[idx + 1] = py - mdy * mousePull * 0.18;
        pPos[idx + 2] = pz + mousePull * 0.25;
      }

      pAttr.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
    this.animFrameId = requestAnimationFrame(this.animate);
  };

  public start(): void {
    if (this.animFrameId === null && !this.isDisposed) {
      this.isPaused = false;
      this.animFrameId = requestAnimationFrame(this.animate);
    }
  }

  public pause(): void {
    this.isPaused = true;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  public resize(): void {
    if (!this.container || this.isDisposed) return;
    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.setDPRByQuality();
  }

  public setQuality(quality: QualityTier): void {
    this.config.quality = quality;
    this.setDPRByQuality();
  }

  /**
   * Full teardown and WebGL resource disposal
   */
  public dispose(): void {
    this.isDisposed = true;
    this.pause();

    // Dispose Geometries
    this.geodesicGeometries.forEach((g) => g.dispose());
    this.geodesicGeometries = [];
    this.geodesicBasePositions = [];

    // Dispose Field Lines
    while (this.fieldGroup.children.length > 0) {
      const obj = this.fieldGroup.children[0] as THREE.Line;
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
      this.fieldGroup.remove(obj);
    }
    this.scene.remove(this.fieldGroup);

    // Dispose Singularity
    if (this.singularityMesh) {
      this.singularityMesh.geometry.dispose();
      (this.singularityMesh.material as THREE.Material).dispose();
      this.scene.remove(this.singularityMesh);
      this.singularityMesh = null;
    }

    // Dispose Particles
    if (this.particlePoints) {
      this.particlePoints.geometry.dispose();
      (this.particlePoints.material as THREE.Material).dispose();
      this.scene.remove(this.particlePoints);
      this.particlePoints = null;
    }

    // Dispose Renderer & Canvas
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
