import * as THREE from "three";

export type QualityTier = "low" | "medium" | "high";

export interface DimensionalConfig {
  quality: QualityTier;
  colorPrimary: string;
  colorAccent: string;
  colorGold: string;
  baseOpacity: number;
}

const DEFAULT_CONFIG: DimensionalConfig = {
  quality: "high",
  colorPrimary: "#6366F1", // Nexovate Indigo/Blue
  colorAccent: "#119E9D",  // Nexovate Teal
  colorGold: "#EFAF32",    // Nexovate Gold
  baseOpacity: 0.65,
};

/**
 * DimensionalSpaceCore
 *
 * Procedural Physics-Inspired Higher-Dimensional Manifold Space:
 * - NOT a literal tesseract wireframe box.
 * - Conceptual higher-dimensional manifold: curved coordinate fields, fine spatial lines,
 *   faint orbital trajectories, depth fog, and soft particle traces.
 * - Multi-frequency harmonic wave formulation (4 incommensurable frequencies) for non-repeating organic breathing.
 * - Gravitational cursor distortion with inverse-square falloff and spring damping.
 * - 3 distinct depth strata for differential parallax.
 * - Comprehensive GPU resource cleanup and lifecycle management.
 */
export class DimensionalSpaceCore {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private config: DimensionalConfig;

  // Animation & Rendering
  private animFrameId: number | null = null;
  private clock: THREE.Clock;
  private isDisposed = false;
  private isPaused = false;

  // Depth Layers & Manifolds
  private lineGroup: THREE.Group;
  private particlePoints: THREE.Points | null = null;
  private backgroundGrid: THREE.GridHelper | null = null;

  // Geometry references for dynamic procedural updates
  private manifoldGeometries: THREE.BufferGeometry[] = [];
  private manifoldBasePositions: Float32Array[] = [];
  private particlePositions: Float32Array | null = null;
  private particleVelocities: Float32Array | null = null;

  // Mouse & Spatial Gravitational Distortion
  private targetMouse = new THREE.Vector2(0, 0);
  private currentMouse = new THREE.Vector2(0, 0);
  private mouseVelocity = new THREE.Vector2(0, 0);
  private scrollProgress = 0;

  constructor(container: HTMLElement, config: Partial<DimensionalConfig> = {}) {
    this.container = container;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.clock = new THREE.Clock();

    // 1. Scene Setup with Atmospheric Depth Fog
    this.scene = new THREE.Scene();
    // Soft off-white / ivory fog to dissolve far lines seamlessly
    this.scene.fog = new THREE.FogExp2(0xfafbfc, 0.022);

    // 2. Camera Setup
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    this.camera.position.set(0, 1.2, 12);
    this.camera.lookAt(0, 0, 0);

    // 3. Renderer with high performance and battery awareness
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

    // 4. Groups
    this.lineGroup = new THREE.Group();
    this.scene.add(this.lineGroup);

    // 5. Build Subsystems
    this.buildBackgroundCoordinateField();
    this.buildCurvedManifoldField();
    this.buildParticleTraces();

    // 6. Start Loop
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
   * Strata 0: Deep cosmological coordinate floor grid
   */
  private buildBackgroundCoordinateField(): void {
    const size = 32;
    const divisions = this.config.quality === "low" ? 16 : 28;
    this.backgroundGrid = new THREE.GridHelper(size, divisions, 0x119e9d, 0x101536);
    this.backgroundGrid.position.set(0, -3.2, 0);
    const material = this.backgroundGrid.material as THREE.LineBasicMaterial;
    material.transparent = true;
    material.opacity = 0.12;
    this.scene.add(this.backgroundGrid);
  }

  /**
   * Strata 1: Procedural Curved Coordinate Manifold
   * Represents higher-dimensional space projecting into 3D.
   */
  private buildCurvedManifoldField(): void {
    const numCurves = this.config.quality === "low" ? 22 : this.config.quality === "medium" ? 38 : 52;
    const pointsPerCurve = this.config.quality === "low" ? 40 : 64;
    const spanX = 16;
    const spanZ = 14;

    const colorTeal = new THREE.Color(this.config.colorAccent);
    const colorIndigo = new THREE.Color(this.config.colorPrimary);
    const colorGold = new THREE.Color(this.config.colorGold);

    for (let i = 0; i < numCurves; i++) {
      const v = (i / (numCurves - 1)) * 2 - 1; // -1 to 1
      const zBase = v * (spanZ / 2);

      const positions = new Float32Array(pointsPerCurve * 3);
      const colors = new Float32Array(pointsPerCurve * 3);

      for (let j = 0; j < pointsPerCurve; j++) {
        const u = (j / (pointsPerCurve - 1)) * 2 - 1; // -1 to 1
        const x = u * (spanX / 2);
        const y = 0;
        const z = zBase;

        const idx = j * 3;
        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;

        // Gradient coloring along the curves
        const t = (u + 1) * 0.5;
        const curveColor = new THREE.Color();
        if (i % 7 === 0) {
          curveColor.copy(colorGold);
        } else {
          curveColor.lerpColors(colorTeal, colorIndigo, t);
        }

        colors[idx] = curveColor.r;
        colors[idx + 1] = curveColor.g;
        colors[idx + 2] = curveColor.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Clone original base positions for deformation math
      this.manifoldBasePositions.push(new Float32Array(positions));
      this.manifoldGeometries.push(geometry);

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: (i % 5 === 0 ? 0.38 : 0.22) * this.config.baseOpacity,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });

      const line = new THREE.Line(geometry, material);
      this.lineGroup.add(line);
    }
  }

  /**
   * Strata 2: Particle Traces & Orbital Streamlines
   */
  private buildParticleTraces(): void {
    const count = this.config.quality === "low" ? 35 : this.config.quality === "medium" ? 75 : 120;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color(this.config.colorPrimary);
    const c2 = new THREE.Color(this.config.colorAccent);
    const cGold = new THREE.Color(this.config.colorGold);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 16;
      positions[idx + 1] = (Math.random() - 0.5) * 6;
      positions[idx + 2] = (Math.random() - 0.5) * 14;

      velocities[idx] = (Math.random() - 0.5) * 0.008;
      velocities[idx + 1] = (Math.random() - 0.5) * 0.006;
      velocities[idx + 2] = (Math.random() - 0.5) * 0.008;

      const pColor = i % 8 === 0 ? cGold : i % 2 === 0 ? c1 : c2;
      colors[idx] = pColor.r;
      colors[idx + 1] = pColor.g;
      colors[idx + 2] = pColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    this.particlePositions = positions;
    this.particleVelocities = velocities;

    const material = new THREE.PointsMaterial({
      size: this.config.quality === "low" ? 0.07 : 0.09,
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
   * Main Render Loop
   */
  private animate = (): void => {
    if (this.isDisposed || this.isPaused) return;

    const delta = Math.min(0.05, this.clock.getDelta());
    const time = this.clock.getElapsedTime();

    // 1. Damped Spring Mouse Movement (Weighted, non-laggy, physical)
    const springFactor = 4.5 * delta;
    const prevMouseX = this.currentMouse.x;
    const prevMouseY = this.currentMouse.y;

    this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * springFactor;
    this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * springFactor;

    this.mouseVelocity.x = (this.currentMouse.x - prevMouseX) / delta;
    this.mouseVelocity.y = (this.currentMouse.y - prevMouseY) / delta;

    // 2. Camera Parallax & Subtle Perspective Tilt
    const camTiltX = this.currentMouse.x * 0.45;
    const camTiltY = -this.currentMouse.y * 0.35 + 1.2 - this.scrollProgress * 1.5;
    this.camera.position.x += (camTiltX - this.camera.position.x) * (2.5 * delta);
    this.camera.position.y += (camTiltY - this.camera.position.y) * (2.5 * delta);
    this.camera.lookAt(0, -this.scrollProgress * 0.8, 0);

    // 3. Multi-frequency Higher-Dimensional Wave Modulation
    // Incommensurable frequencies ensure organic, non-repeating flow
    const w1 = 0.28, w2 = 0.41, w3 = 0.67, w4 = 0.16;
    const breath = Math.sin(time * 0.22) * 0.25 + Math.cos(time * 0.14) * 0.15;

    // Gravitational lens coordinate in 3D space
    const gravX = this.currentMouse.x * 6.5;
    const gravZ = -this.currentMouse.y * 5.0;

    for (let i = 0; i < this.manifoldGeometries.length; i++) {
      const geom = this.manifoldGeometries[i];
      const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      const basePositions = this.manifoldBasePositions[i];
      const len = positions.length / 3;

      for (let j = 0; j < len; j++) {
        const idx = j * 3;
        const bx = basePositions[idx];
        const bz = basePositions[idx + 2];

        // 5D Projection Equation: y = f(x, z, t, w)
        const wave =
          Math.sin(bx * 0.25 + time * w1) * Math.cos(bz * 0.32 + time * w2) * 0.85 +
          Math.sin((bx + bz) * 0.18 + time * w3) * 0.45 +
          Math.cos(bz * 0.45 - time * w4) * 0.35;

        // Subtle Gravitational Lens around mouse cursor
        const dx = bx - gravX;
        const dz = bz - gravZ;
        const distSq = dx * dx + dz * dz;
        const gravInfluence = 1.0 / (1.0 + distSq * 0.32);
        const gravDisplacement = gravInfluence * 0.75;

        // Elevate with wave + breathing + gravitational attraction
        positions[idx + 1] = wave * (1.0 + breath) + gravDisplacement;

        // Subtle lateral warp in high dimensional space
        positions[idx] = bx + Math.sin(time * 0.18 + bz * 0.15) * 0.12;
      }

      posAttr.needsUpdate = true;
    }

    // 4. Update Particle Traces
    if (this.particlePoints && this.particlePositions && this.particleVelocities) {
      const pAttr = this.particlePoints.geometry.getAttribute("position") as THREE.BufferAttribute;
      const pPos = pAttr.array as Float32Array;
      const count = pPos.length / 3;

      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        pPos[idx] += this.particleVelocities[idx];
        pPos[idx + 1] += this.particleVelocities[idx + 1] + Math.sin(time + pPos[idx]) * 0.001;
        pPos[idx + 2] += this.particleVelocities[idx + 2];

        // Loop boundaries
        if (pPos[idx] > 8) pPos[idx] = -8;
        if (pPos[idx] < -8) pPos[idx] = 8;
        if (pPos[idx + 1] > 3.5) pPos[idx + 1] = -3.5;
        if (pPos[idx + 1] < -3.5) pPos[idx + 1] = 3.5;
        if (pPos[idx + 2] > 7) pPos[idx + 2] = -7;
        if (pPos[idx + 2] < -7) pPos[idx + 2] = 7;
      }
      pAttr.needsUpdate = true;
    }

    // 5. Rotate Coordinate Floor Grid at differential low speed
    if (this.backgroundGrid) {
      this.backgroundGrid.rotation.y = time * 0.015;
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
   * Comprehensive cleanup and resource disposal
   */
  public dispose(): void {
    this.isDisposed = true;
    this.pause();

    // Remove geometries
    this.manifoldGeometries.forEach((g) => g.dispose());
    this.manifoldGeometries = [];
    this.manifoldBasePositions = [];

    // Remove line meshes
    while (this.lineGroup.children.length > 0) {
      const obj = this.lineGroup.children[0] as THREE.Line;
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
      this.lineGroup.remove(obj);
    }
    this.scene.remove(this.lineGroup);

    // Remove particles
    if (this.particlePoints) {
      this.particlePoints.geometry.dispose();
      (this.particlePoints.material as THREE.Material).dispose();
      this.scene.remove(this.particlePoints);
      this.particlePoints = null;
    }

    // Remove grid
    if (this.backgroundGrid) {
      this.backgroundGrid.geometry.dispose();
      (this.backgroundGrid.material as THREE.Material).dispose();
      this.scene.remove(this.backgroundGrid);
      this.backgroundGrid = null;
    }

    // Remove canvas
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
