import * as THREE from "three";

export type QualityTier = "low" | "medium" | "high";

export interface DimensionalSculptureConfig {
  quality: QualityTier;
  baseOpacity: number;
}

const DEFAULT_CONFIG: DimensionalSculptureConfig = {
  quality: "high",
  baseOpacity: 0.88,
};

/**
 * DimensionalSculptureCore
 *
 * A Timeless Abstract 3D Architectural Kinetic Sculpture for Nexovate:
 * - NO planets, NO stars, NO space wallpaper, NO cartoon astronomy.
 * - Represents the intersection of Human Curiosity, Knowledge, Technology, and Creation.
 * - Composed of nested precision-machined geometric armatures and translucent frosted physical planes.
 * - Higher-dimensional mathematical folding (4D rotation projection).
 * - Studio architectural lighting casting subtle caustics across surfaces.
 * - Continuous camera storytelling driven by page scroll across the 8 chapters.
 */
export class DimensionalSculptureCore {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private config: DimensionalSculptureConfig;
  private clock: THREE.Clock;

  private animFrameId: number | null = null;
  private isDisposed = false;
  private isPaused = false;
  private isMobile = false;

  // Group Hierarchies
  private rootGroup: THREE.Group;
  private outerArmatureGroup: THREE.Group;
  private innerPlanesGroup: THREE.Group;
  private coordinateRibGroup: THREE.Group;

  // Materials & Geometries references for cleanup
  private materials: THREE.Material[] = [];
  private geometries: THREE.BufferGeometry[] = [];
  private translucentPlanes: THREE.Mesh[] = [];

  // Plane data for 4D mathematical folding
  private planeInitialVertices: { mesh: THREE.Mesh; basePos: Float32Array; wCoords: Float32Array }[] = [];

  // Mouse & Camera Dynamics
  private targetMouse = new THREE.Vector2(0, 0);
  private currentMouse = new THREE.Vector2(0, 0);
  private targetScrollProgress = 0;
  private currentScrollProgress = 0;

  // Adaptive Sculpture Origin
  private sculptureOrigin = new THREE.Vector3(2.4, 0.2, -1.2);

  constructor(container: HTMLElement, config: Partial<DimensionalSculptureConfig> = {}) {
    this.container = container;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.clock = new THREE.Clock();

    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    this.isMobile = width < 768 || window.innerWidth < 768;

    if (this.isMobile) {
      this.sculptureOrigin.set(0.4, 0.8, -2.2);
    } else if (width < 1024) {
      this.sculptureOrigin.set(1.6, 0.3, -1.6);
    }

    // 1. Scene & Architectural Depth Fog (dissolves cleanly into warm off-white #F7F6F2)
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xf7f6f2, this.isMobile ? 0.024 : 0.018);

    // 2. Camera Setup (Architectural Perspective)
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.camera.position.set(0, 1.8, 12.5);
    this.camera.lookAt(this.sculptureOrigin.x * 0.35, 0.2, 0);

    // 3. WebGL Renderer with Adaptive Pixel Ratio
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      depth: true,
      stencil: false,
    });
    this.renderer.setSize(width, height);
    this.setDPRByQuality();
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // 4. Architectural Studio Lighting
    this.setupStudioLighting();

    // 5. Structure Hierarchies
    this.rootGroup = new THREE.Group();
    this.rootGroup.position.copy(this.sculptureOrigin);
    this.scene.add(this.rootGroup);

    this.outerArmatureGroup = new THREE.Group();
    this.innerPlanesGroup = new THREE.Group();
    this.coordinateRibGroup = new THREE.Group();

    this.rootGroup.add(this.outerArmatureGroup);
    this.rootGroup.add(this.innerPlanesGroup);
    this.rootGroup.add(this.coordinateRibGroup);

    // 6. Build All Precision Architectural Subsystems
    this.buildOuterArmature();
    this.buildTranslucentDimensionalPlanes();
    this.buildCoordinateRibs();

    // 7. Start Render Loop
    this.start();
  }

  private setDPRByQuality(): void {
    const nativeDPR = window.devicePixelRatio || 1;
    if (this.isMobile || this.config.quality === "low") {
      this.renderer.setPixelRatio(Math.min(1.0, nativeDPR));
    } else if (this.config.quality === "medium") {
      this.renderer.setPixelRatio(Math.min(1.5, nativeDPR));
    } else {
      this.renderer.setPixelRatio(Math.min(2.0, nativeDPR));
    }
  }

  private setupStudioLighting(): void {
    // Ambient soft illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    // Key architectural light (Warm ivory)
    const keyLight = new THREE.DirectionalLight(0xfffbf5, 1.8);
    keyLight.position.set(6, 9, 8);
    this.scene.add(keyLight);

    // Fill architectural light (Cool cyan/teal)
    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.1);
    fillLight.position.set(-7, -4, 5);
    this.scene.add(fillLight);

    // Subtle rim light creating edge caustics
    const rimLight = new THREE.DirectionalLight(0x119e9d, 0.7);
    rimLight.position.set(0, 8, -6);
    this.scene.add(rimLight);
  }

  /**
   * 1. Outer Precision Armature: Slender chamfered geometric frame
   */
  private buildOuterArmature(): void {
    const size = this.isMobile ? 2.4 : 3.2;
    const thickness = 0.04;

    const frameGeom = new THREE.BoxGeometry(size, size, size);
    const edgesGeom = new THREE.EdgesGeometry(frameGeom, 15);
    this.geometries.push(frameGeom, edgesGeom);

    const frameLineMat = new THREE.LineBasicMaterial({
      color: 0x0f1535,
      transparent: true,
      opacity: 0.45,
      linewidth: 1,
    });
    this.materials.push(frameLineMat);

    const frameWireframe = new THREE.LineSegments(edgesGeom, frameLineMat);
    this.outerArmatureGroup.add(frameWireframe);

    // Subtle micro-gold precision vertices
    const vertexGeom = new THREE.OctahedronGeometry(0.06, 0);
    this.geometries.push(vertexGeom);

    const goldMat = new THREE.MeshBasicMaterial({
      color: 0xefaf32,
      transparent: true,
      opacity: 0.85,
    });
    this.materials.push(goldMat);

    const h = size / 2;
    const cornerPositions = [
      [h, h, h], [h, h, -h], [h, -h, h], [h, -h, -h],
      [-h, h, h], [-h, h, -h], [-h, -h, h], [-h, -h, -h],
    ];

    cornerPositions.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(vertexGeom, goldMat);
      node.position.set(x, y, z);
      this.outerArmatureGroup.add(node);
    });
  }

  /**
   * 2. Nested Translucent Planes: Frosted physical glass layers folding in 4D
   */
  private buildTranslucentDimensionalPlanes(): void {
    const planeCount = this.isMobile ? 4 : 6;
    const planeWidth = this.isMobile ? 2.2 : 2.8;
    const planeHeight = this.isMobile ? 1.5 : 2.0;

    for (let i = 0; i < planeCount; i++) {
      const segs = 16;
      const geom = new THREE.PlaneGeometry(planeWidth, planeHeight, segs, segs);
      this.geometries.push(geom);

      // Distinct physical materials with transmission and glancing refraction
      const isTealShift = i % 2 === 0;
      const mat = new THREE.MeshPhysicalMaterial({
        color: isTealShift ? 0x119e9d : 0x0f1535,
        roughness: 0.22,
        transmission: 0.72,
        thickness: 0.35,
        transparent: true,
        opacity: isTealShift ? 0.35 : 0.28,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      this.materials.push(mat);

      const plane = new THREE.Mesh(geom, mat);
      
      // Initial offset orientations
      plane.rotation.x = (i * Math.PI) / planeCount;
      plane.rotation.y = (i * Math.PI * 0.5) / planeCount;
      plane.rotation.z = i * 0.25;

      this.innerPlanesGroup.add(plane);
      this.translucentPlanes.push(plane);

      // Store 4D coordinates for mathematical folding
      const posAttr = geom.attributes.position;
      const basePos = new Float32Array(posAttr.array);
      const wCoords = new Float32Array(posAttr.count);

      for (let j = 0; j < posAttr.count; j++) {
        // Higher-dimensional phase allocation
        wCoords[j] = Math.sin(j * 0.4 + i * 1.2) * 1.2;
      }

      this.planeInitialVertices.push({ mesh: plane, basePos, wCoords });
    }
  }

  /**
   * 3. Precision Coordinate Ribs: Thin geometric splines guiding transformation
   */
  private buildCoordinateRibs(): void {
    const ribCount = this.isMobile ? 3 : 5;
    const curveRadius = this.isMobile ? 1.6 : 2.2;

    for (let i = 0; i < ribCount; i++) {
      const points: THREE.Vector3[] = [];
      const steps = 64;

      for (let s = 0; s <= steps; s++) {
        const u = (s / steps) * Math.PI * 2;
        const x = Math.cos(u) * curveRadius;
        const y = Math.sin(u * 2 + i) * 0.6;
        const z = Math.sin(u) * curveRadius;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curveGeom = new THREE.BufferGeometry().setFromPoints(points);
      this.geometries.push(curveGeom);

      const ribMat = new THREE.LineBasicMaterial({
        color: i === 0 ? 0xefaf32 : 0x119e9d,
        transparent: true,
        opacity: i === 0 ? 0.6 : 0.35,
      });
      this.materials.push(ribMat);

      const ribLine = new THREE.Line(curveGeom, ribMat);
      ribLine.rotation.x = (i * Math.PI) / ribCount;
      ribLine.rotation.z = (i * Math.PI * 0.3) / ribCount;

      this.coordinateRibGroup.add(ribLine);
    }
  }

  public setMouse(nx: number, ny: number): void {
    this.targetMouse.set(nx, ny);
  }

  public setScrollProgress(progress: number): void {
    this.targetScrollProgress = Math.max(0, Math.min(1, progress));
  }

  /**
   * Main Render & Kinetic Transformation Loop
   */
  private animate = (): void => {
    if (this.isDisposed || this.isPaused) return;

    const delta = Math.min(0.04, this.clock.getDelta());
    const time = this.clock.getElapsedTime();

    // 1. Damped Mouse Dynamics
    const springDamp = 3.0 * delta;
    this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * springDamp;
    this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * springDamp;

    // 2. Smooth Scroll Interpolation
    this.currentScrollProgress = THREE.MathUtils.lerp(
      this.currentScrollProgress,
      this.targetScrollProgress,
      0.05
    );
    const p = this.currentScrollProgress;

    // 3. Continuous Multi-Axis Kinetic Rotation
    this.outerArmatureGroup.rotation.y = time * 0.08 + this.currentMouse.x * 0.15;
    this.outerArmatureGroup.rotation.x = 0.2 + Math.sin(time * 0.06) * 0.08 - this.currentMouse.y * 0.12;

    this.innerPlanesGroup.rotation.y = -time * 0.05;
    this.innerPlanesGroup.rotation.z = Math.cos(time * 0.04) * 0.1;

    this.coordinateRibGroup.rotation.x = time * 0.04;
    this.coordinateRibGroup.rotation.y = time * 0.06;

    // 4. Mathematical 4D Rotation Projection on Translucent Planes
    const theta4D = time * 0.12 + p * Math.PI;
    const cosT = Math.cos(theta4D);
    const sinT = Math.sin(theta4D);

    for (let k = 0; k < this.planeInitialVertices.length; k++) {
      const { mesh, basePos, wCoords } = this.planeInitialVertices[k];
      const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let j = 0; j < posAttr.count; j++) {
        const idx = j * 3;
        const x0 = basePos[idx];
        const y0 = basePos[idx + 1];
        const w0 = wCoords[j];

        // 4D Plane Rotation: X-W plane
        const xRot = x0 * cosT - w0 * sinT;
        const wRot = x0 * sinT + w0 * cosT;

        // Perspective 4D to 3D projection: factor = 1 / (d - w)
        const d = 3.5;
        const factor = d / (d - wRot * 0.4);

        arr[idx] = xRot * factor;
        arr[idx + 1] = y0 * factor;
        arr[idx + 2] = (basePos[idx + 2] + Math.sin(time * 0.2 + j * 0.1) * 0.08) * factor;
      }

      posAttr.needsUpdate = true;
    }

    // 5. Continuous Camera Storytelling along Physical Spline across 8 Chapters
    const baseX = this.isMobile ? 0.3 : 0.0;
    const baseY = this.isMobile ? 1.4 : 1.8;
    const baseZ = this.isMobile ? 13.5 : 12.5;

    // Dynamic coordinates:
    // Arrival: wide view
    // Discover & Learn: camera pushes forward, geometry unfolds
    // Build & Create: lateral shift into architectural focus
    // Grow & Trust: elevated expansive framing
    // Final CTA: calm pullback to wide tranquility
    const camX = baseX + Math.sin(p * Math.PI * 1.4) * (this.isMobile ? 0.9 : 2.0) + this.currentMouse.x * 0.35;
    const camY = baseY + Math.sin(p * Math.PI * 1.8) * 1.0 - this.currentMouse.y * 0.25 + (p * 0.5);
    const camZ = baseZ - Math.sin(p * Math.PI) * (this.isMobile ? 2.2 : 3.6);

    this.camera.position.set(camX, camY, camZ);

    const lookTargetX = this.sculptureOrigin.x * (0.35 - p * 0.25) + this.currentMouse.x * 0.18;
    const lookTargetY = 0.2 + (p * 0.25);
    const lookTargetZ = -p * 1.0;
    this.camera.lookAt(lookTargetX, lookTargetY, lookTargetZ);

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
    this.isMobile = width < 768;

    this.camera.aspect = width / height;
    if (this.isMobile) {
      this.camera.fov = 48;
      this.sculptureOrigin.set(0.4, 0.8, -2.2);
    } else if (width < 1024) {
      this.camera.fov = 44;
      this.sculptureOrigin.set(1.6, 0.3, -1.6);
    } else {
      this.camera.fov = 42;
      this.sculptureOrigin.set(2.4, 0.2, -1.2);
    }
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.setDPRByQuality();
    this.rootGroup.position.copy(this.sculptureOrigin);
  }

  public dispose(): void {
    this.isDisposed = true;
    this.pause();

    // Dispose all geometries
    this.geometries.forEach((g) => g.dispose());
    this.geometries = [];

    // Dispose all materials
    this.materials.forEach((m) => m.dispose());
    this.materials = [];

    // Clear meshes
    this.translucentPlanes = [];
    this.planeInitialVertices = [];

    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
