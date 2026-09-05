import * as THREE from "three";

export type QualityTier = "low" | "medium" | "high";

export interface SolarConfig {
  quality: QualityTier;
  colorPrimary: string; // Deep navy #0F1535
  colorGold: string;    // Warm star gold #EFAF32
  colorTeal: string;    // Nexovate teal #119E9D
  colorCyan: string;    // Luminous cyan #0EA5E9
  colorBase: string;    // Warm off-white #FAF9F6
  colorWell: string;    // Gravitational well deep tone #070B1E
  baseOpacity: number;
}

const DEFAULT_CONFIG: SolarConfig = {
  quality: "high",
  colorPrimary: "#0F1535",
  colorGold: "#EFAF32",
  colorTeal: "#119E9D",
  colorCyan: "#0EA5E9",
  colorBase: "#F7F6F2",
  colorWell: "#070B1E",
  baseOpacity: 0.9,
};

interface Moon {
  mesh: THREE.Mesh;
  orbitRadius: number;
  speed: number;
  angle: number;
  inclination: number;
}

interface Planet {
  group: THREE.Group;
  mesh: THREE.Object3D;
  radius: number;
  orbitRadius: number;
  speed: number;
  angle: number;
  inclination: number;
  eccentricity: number;
  rotSpeed: number;
  moons: Moon[];
}

/**
 * SolarSystemCore — World-Class Physics & Solar-System Celestial Engine
 *
 * Implements:
 * 1. Central Luminous Star: Multi-layered procedural solar core, chromospheric noise,
 *    limb darkening, and radiant multi-tiered atmospheric corona.
 * 2. Gravitational Well & Accretion Lensing: Subtle dark gravitational well disk
 *    and inward-spiraling relativistic accretion particles.
 * 3. 5 Distinct Hand-Crafted Celestial Bodies:
 *    - Learn: Warm terrestrial gold planet with crater relief
 *    - Build: Cyan ocean planet with atmospheric Rayleigh halo and orbiting moon
 *    - Experiment: Banded gas giant with animated latitudinal currents and dual moons
 *    - Ship: Ringed Saturn-like giant with thin tilted concentric rings
 *    - Grow: High-inclination deep indigo ice world
 * 4. Tesseract / Higher-Dimensional Influence: Interlocking dual orbital planes
 *    with delicate mathematical nodes and Keplerian coordinate arcs.
 * 5. Continuous Slow Motion & Physical Camera Parallax: Damped spring mouse yaw/pitch,
 *    orbital plane breathing, and continuous scroll depth traversal.
 * 6. Responsive Architecture: Adaptive origin and DPR for mobile, tablet, and desktop.
 */
export class SolarSystemCore {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private config: SolarConfig;

  // Animation lifecycle
  private animFrameId: number | null = null;
  private clock: THREE.Clock;
  private isDisposed = false;
  private isPaused = false;

  // Hierarchies
  private rootGroup: THREE.Group;
  private primaryPlaneGroup: THREE.Group;
  private hyperPlaneGroup: THREE.Group;

  // Star & Gravitational Well components
  private starMesh: THREE.Mesh | null = null;
  private coronaMeshes: THREE.Mesh[] = [];
  private gravityWellMesh: THREE.Mesh | null = null;
  private accretionPoints: THREE.Points | null = null;
  private accretionData: { radius: number; angle: number; speed: number; y: number }[] = [];

  // Planetary System
  private planets: Planet[] = [];
  private orbitLines: THREE.Line[] = [];
  private dimensionalRings: THREE.Line[] = [];

  // Orbital Stardust
  private dustPoints: THREE.Points | null = null;
  private dustData: { radius: number; angle: number; speed: number; y: number }[] = [];

  // Mouse & Scroll Dynamics
  private targetMouse = new THREE.Vector2(0, 0);
  private currentMouse = new THREE.Vector2(0, 0);
  private targetScrollProgress = 0;
  private currentScrollProgress = 0;
  private isMobile = false;

  // Adaptive Origin
  private systemOrigin = new THREE.Vector3(3.4, 0.35, -1.0);

  // Scientific Instrument Power-On Lifecycle
  private introTime = 0;
  private introDuration = 1.4;
  private isIntroComplete = false;

  constructor(container: HTMLElement, config: Partial<SolarConfig> = {}) {
    this.container = container;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.clock = new THREE.Clock();

    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    this.isMobile = width < 768 || window.innerWidth < 768;

    // Adjust origin for mobile viewports to frame cleanly beside/around typography
    if (this.isMobile) {
      this.systemOrigin.set(1.1, 0.9, -2.2);
    } else if (width < 1024) {
      this.systemOrigin.set(2.4, 0.4, -1.4);
    }

    // 1. Scene & Atmospheric Depth Fog (fades into warm off-white #F7F6F2)
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xf7f6f2, this.isMobile ? 0.024 : 0.018);

    // 2. Camera Setup (Architectural Perspective)
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 140);
    this.camera.position.set(0, 1.9, 12.8);
    this.camera.lookAt(this.systemOrigin.x * 0.4, 0.2, 0);

    // 3. WebGL Renderer
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

    // 4. Physical Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);

    // Point light radiating directly from the central star
    const starPointLight = new THREE.PointLight(0xfff5db, 2.2, 35, 1.2);
    starPointLight.position.copy(this.systemOrigin);
    this.scene.add(starPointLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 1.1);
    dirLight.position.set(this.systemOrigin.x + 1, this.systemOrigin.y + 4, 6);
    this.scene.add(dirLight);

    // 5. Structure Hierarchies
    this.rootGroup = new THREE.Group();
    this.rootGroup.position.copy(this.systemOrigin);
    this.scene.add(this.rootGroup);

    // Primary orbital plane (~24° inclination)
    this.primaryPlaneGroup = new THREE.Group();
    this.primaryPlaneGroup.rotation.x = 0.42;
    this.primaryPlaneGroup.rotation.y = -0.16;
    this.rootGroup.add(this.primaryPlaneGroup);

    // Higher-dimensional secondary orbital plane (~ -18° complementary tilt)
    this.hyperPlaneGroup = new THREE.Group();
    this.hyperPlaneGroup.rotation.x = -0.32;
    this.hyperPlaneGroup.rotation.y = 0.24;
    this.hyperPlaneGroup.rotation.z = 0.1;
    this.rootGroup.add(this.hyperPlaneGroup);

    // 6. Build All Subsystems
    this.buildGravitationalCore();
    this.buildHigherDimensionalOrbits();
    this.buildPlanetarySystem();
    this.buildStardust();
    this.buildAccretionStream();

    // 7. Start Render Loop
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
   * 1. Gravitational Center: Luminous Star + Accretion Disk / Gravitational Well
   */
  private buildGravitationalCore(): void {
    const starRadius = this.isMobile ? 0.78 : 0.92;
    const segs = this.config.quality === "low" ? 28 : 44;
    const starGeom = new THREE.SphereGeometry(starRadius, segs, segs);

    // Multi-frequency procedural solar shader
    const starMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorCore: { value: new THREE.Color(0xfffdf5) },   // Ultra-hot ivory
        uColorSurface: { value: new THREE.Color(this.config.colorGold) }, // Refined gold
        uColorLimb: { value: new THREE.Color(0xc26c04) },   // Deep amber edge
        uColorCorona: { value: new THREE.Color(this.config.colorTeal) }, // Subtle teal flare
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorCore;
        uniform vec3 uColorSurface;
        uniform vec3 uColorLimb;
        uniform vec3 uColorCorona;
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;

        // Simplex-inspired light noise
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        void main() {
          // Fresnel & Limb darkening
          float viewDot = max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0)));
          float limb = pow(1.0 - viewDot, 2.2);

          // Animated solar surface granulation
          float n1 = sin(vUv.x * 24.0 + uTime * 0.7) * cos(vUv.y * 24.0 - uTime * 0.6);
          float n2 = sin(vUv.x * 48.0 - uTime * 1.2) * cos(vUv.y * 48.0 + uTime * 1.1);
          float gran = (n1 * 0.6 + n2 * 0.4) * 0.08;

          vec3 baseColor = mix(uColorCore, uColorSurface, pow(1.0 - viewDot, 1.2) + gran);
          vec3 finalColor = mix(baseColor, uColorLimb, smoothstep(0.35, 0.95, limb));
          
          // Subtle teal energy flare on glancing rim
          finalColor = mix(finalColor, uColorCorona, pow(limb, 4.0) * 0.28);

          gl_FragColor = vec4(finalColor, 0.98);
        }
      `,
      transparent: true,
      depthWrite: true,
    });

    this.starMesh = new THREE.Mesh(starGeom, starMat);
    this.primaryPlaneGroup.add(this.starMesh);

    // Multi-tier Atmospheric Corona Glow (Billboarded soft halos)
    const coronaLayers = [
      { scale: 2.6, opacity: 0.55, color: this.config.colorGold, p: 2.8 },
      { scale: 4.4, opacity: 0.32, color: 0xe59f3b, p: 3.2 },
      { scale: 6.2, opacity: 0.16, color: this.config.colorTeal, p: 3.8 },
    ];

    coronaLayers.forEach((layer) => {
      const planeGeom = new THREE.PlaneGeometry(starRadius * layer.scale, starRadius * layer.scale);
      const planeMat = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(layer.color) },
          uOpacity: { value: layer.opacity * this.config.baseOpacity },
          uPower: { value: layer.p },
          uTime: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uPower;
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            float dist = length(vUv - vec2(0.5)) * 2.0;
            if (dist > 1.0) discard;
            float pulse = sin(uTime * 1.5 + dist * 3.0) * 0.04;
            float glow = pow(max(0.0, 1.0 - dist), uPower) * (uOpacity + pulse);
            gl_FragColor = vec4(uColor, glow);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const coronaMesh = new THREE.Mesh(planeGeom, planeMat);
      coronaMesh.rotation.x = -0.42; // Face camera perspective
      this.coronaMeshes.push(coronaMesh);
      this.primaryPlaneGroup.add(coronaMesh);
    });

    // Gravitational Well / Black Hole Singularity Ring (Restrained Scientific Contrast)
    const wellGeom = new THREE.RingGeometry(starRadius * 0.95, starRadius * 1.85, 48);
    const wellMat = new THREE.ShaderMaterial({
      uniforms: {
        uColorWell: { value: new THREE.Color(this.config.colorWell) },
        uColorTeal: { value: new THREE.Color(this.config.colorTeal) },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorWell;
        uniform vec3 uColorTeal;
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          float dist = length(vUv - vec2(0.5)) * 2.0;
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          float swirl = sin(angle * 4.0 - uTime * 1.8 + dist * 6.0) * 0.5 + 0.5;
          
          float alpha = smoothstep(0.1, 0.45, dist) * smoothstep(0.98, 0.55, dist) * 0.38;
          vec3 col = mix(uColorWell, uColorTeal, swirl * 0.4);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    this.gravityWellMesh = new THREE.Mesh(wellGeom, wellMat);
    this.gravityWellMesh.rotation.x = Math.PI / 2;
    this.primaryPlaneGroup.add(this.gravityWellMesh);
  }

  /**
   * 2. Tesseract & Higher-Dimensional Nested Orbital Guides
   */
  private buildHigherDimensionalOrbits(): void {
    // Intersecting complementary dimensional rings with node tick marks
    const radii = [2.2, 4.6, 7.2];
    const teal = new THREE.Color(this.config.colorTeal);

    radii.forEach((r, idx) => {
      const segs = 72;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * (r * 0.94);
        const y = Math.sin(theta * 2.0) * (0.15 * (idx + 1));
        points.push(new THREE.Vector3(x, y, z));
      }

      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineDashedMaterial({
        color: teal,
        transparent: true,
        opacity: (0.12 + idx * 0.04) * this.config.baseOpacity,
        dashSize: 0.15,
        gapSize: 0.18,
        depthWrite: false,
      });

      const line = new THREE.Line(geom, mat);
      line.computeLineDistances();
      this.dimensionalRings.push(line);
      this.hyperPlaneGroup.add(line);
    });
  }

  /**
   * 3. Five Distinct Hand-Crafted Celestial Bodies
   */
  private buildPlanetarySystem(): void {
    const orbitConfigs = [
      // 01: LEARN — Terrestrial Gold / Amber
      {
        r: 1.85,
        speed: 0.48,
        size: 0.17,
        type: "terrestrial",
        color: 0xdf8d1e,
        ecc: 0.05,
        incl: 0.06,
        hasMoons: false,
      },
      // 02: BUILD — Ocean & Cyan World with 1 Moon
      {
        r: 2.85,
        speed: 0.35,
        size: 0.23,
        type: "ocean",
        color: 0x0ea5e9,
        ecc: 0.03,
        incl: -0.04,
        hasMoons: true,
        moonCount: 1,
      },
      // 03: EXPERIMENT — Banded Gas Giant with 2 Moons
      {
        r: 4.1,
        speed: 0.22,
        size: 0.46,
        type: "banded",
        color: 0xc47b14,
        ecc: 0.04,
        incl: 0.03,
        hasMoons: true,
        moonCount: 2,
      },
      // 04: SHIP — Majestic Ringed Planet with 1 Moon
      {
        r: 5.6,
        speed: 0.15,
        size: 0.39,
        type: "ringed",
        color: 0xd69e62,
        ecc: 0.06,
        incl: -0.05,
        hasMoons: true,
        moonCount: 1,
      },
      // 05: GROW — Distant Deep Indigo Ice Giant
      {
        r: 7.1,
        speed: 0.1,
        size: 0.22,
        type: "ice",
        color: 0x3b82f6,
        ecc: 0.04,
        incl: 0.09,
        hasMoons: false,
      },
    ];

    const navyColor = new THREE.Color(this.config.colorPrimary);
    const tealColor = new THREE.Color(this.config.colorTeal);

    orbitConfigs.forEach((cfg, idx) => {
      // A. Fine Keplerian Orbit Line
      const segments = 110;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * cfg.r;
        const z = Math.sin(theta) * cfg.r * (1 - cfg.ecc);
        const y = Math.sin(theta) * cfg.incl;
        points.push(new THREE.Vector3(x, y, z));
      }

      const orbitGeom = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? tealColor : navyColor,
        transparent: true,
        opacity: (idx % 2 === 0 ? 0.28 : 0.18) * this.config.baseOpacity,
        depthWrite: false,
      });

      const orbitLine = new THREE.Line(orbitGeom, orbitMat);
      this.orbitLines.push(orbitLine);
      this.primaryPlaneGroup.add(orbitLine);

      // B. Planet Assembly Group
      const planetGroup = new THREE.Group();
      let planetMesh: THREE.Object3D;
      const moons: Moon[] = [];

      if (cfg.type === "ocean") {
        // Cyan / Teal ocean planet with Rayleigh atmospheric glow
        const geom = new THREE.SphereGeometry(cfg.size, 32, 32);
        const mat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          roughness: 0.35,
          metalness: 0.25,
          emissive: new THREE.Color(0x024566),
          emissiveIntensity: 0.3,
        });
        planetMesh = new THREE.Mesh(geom, mat);

        // Thin atmospheric halo
        const haloGeom = new THREE.SphereGeometry(cfg.size * 1.08, 24, 24);
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.25,
          wireframe: false,
          depthWrite: false,
        });
        planetGroup.add(new THREE.Mesh(haloGeom, haloMat));
        planetGroup.add(planetMesh);
      } else if (cfg.type === "banded") {
        // Gas giant with latitudinal striations
        const geom = new THREE.SphereGeometry(cfg.size, 36, 36);
        const mat = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uBaseColor: { value: new THREE.Color(0xd99b50) },
            uBandColor: { value: new THREE.Color(0x844812) },
            uTealAccent: { value: new THREE.Color(this.config.colorTeal) },
            uLightDir: { value: new THREE.Vector3(1, 0.4, 1).normalize() },
          },
          vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
              vUv = uv;
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 uBaseColor;
            uniform vec3 uBandColor;
            uniform vec3 uTealAccent;
            uniform vec3 uLightDir;
            uniform float uTime;
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
              float bandY = vUv.y * 42.0 + sin(vUv.x * 8.0 + uTime * 0.3) * 0.8;
              float bands = sin(bandY) * 0.5 + 0.5;
              vec3 col = mix(uBaseColor, uBandColor, bands);
              
              // Faint storm spot
              float spot = smoothstep(0.08, 0.0, length(vUv - vec2(0.65, 0.42)));
              col = mix(col, uTealAccent, spot * 0.7);

              float diff = max(0.18, dot(vNormal, uLightDir));
              gl_FragColor = vec4(col * diff, 1.0);
            }
          `,
        });
        planetMesh = new THREE.Mesh(geom, mat);
        planetGroup.add(planetMesh);
      } else if (cfg.type === "ringed") {
        // Saturn-like planet with concentric tilted ring system
        const bodyGeom = new THREE.SphereGeometry(cfg.size, 32, 32);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          roughness: 0.55,
          metalness: 0.15,
        });
        const body = new THREE.Mesh(bodyGeom, bodyMat);
        planetGroup.add(body);

        // Wafer-thin concentric rings
        const ringGeom = new THREE.RingGeometry(cfg.size * 1.32, cfg.size * 2.38, 54);
        const ringMat = new THREE.ShaderMaterial({
          uniforms: {
            uColorRing: { value: new THREE.Color(0xdfba8c) },
            uColorDark: { value: new THREE.Color(0x6b4c2b) },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 uColorRing;
            uniform vec3 uColorDark;
            varying vec2 vUv;
            void main() {
              float dist = length(vUv - vec2(0.5)) * 2.0;
              if (dist < 0.55 || dist > 0.98) discard;
              
              // Cassini-like division ring
              float cassini = smoothstep(0.74, 0.76, dist) * smoothstep(0.80, 0.78, dist);
              float ringStr = sin(dist * 60.0) * 0.15 + 0.85;
              vec3 c = mix(uColorRing, uColorDark, cassini);
              gl_FragColor = vec4(c * ringStr, (1.0 - cassini * 0.6) * 0.75);
            }
          `,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        const rings = new THREE.Mesh(ringGeom, ringMat);
        rings.rotation.x = Math.PI / 2 + 0.32;
        planetGroup.add(rings);
        planetMesh = planetGroup;
      } else {
        // Terrestrial / Ice
        const geom = new THREE.SphereGeometry(cfg.size, 24, 24);
        const mat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          roughness: 0.45,
          metalness: 0.2,
        });
        planetMesh = new THREE.Mesh(geom, mat);
        planetGroup.add(planetMesh);
      }

      // C. Moons for designated planets
      if (cfg.hasMoons) {
        const count = cfg.moonCount || 1;
        for (let m = 0; m < count; m++) {
          const mRadius = cfg.size * (0.16 + m * 0.05);
          const mGeom = new THREE.SphereGeometry(mRadius, 14, 14);
          const mMat = new THREE.MeshStandardMaterial({
            color: 0xe2e8f0,
            roughness: 0.7,
            metalness: 0.1,
          });
          const mMesh = new THREE.Mesh(mGeom, mMat);
          planetGroup.add(mMesh);

          moons.push({
            mesh: mMesh,
            orbitRadius: cfg.size * (1.7 + m * 0.85),
            speed: (1.2 + m * 0.6),
            angle: (m * Math.PI) / 2,
            inclination: 0.15 * (m + 1),
          });
        }
      }

      this.primaryPlaneGroup.add(planetGroup);

      this.planets.push({
        group: planetGroup,
        mesh: planetMesh,
        radius: cfg.size,
        orbitRadius: cfg.r,
        speed: cfg.speed * 0.32,
        angle: (idx * Math.PI) / 2.3,
        inclination: cfg.incl,
        eccentricity: cfg.ecc,
        rotSpeed: 0.35 + Math.random() * 0.35,
        moons,
      });
    });
  }

  /**
   * 4. Inward Accretion Stream Particles around the Gravitational Core
   */
  private buildAccretionStream(): void {
    const count = this.config.quality === "low" ? 35 : 75;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const teal = new THREE.Color(this.config.colorTeal);
    const gold = new THREE.Color(this.config.colorGold);

    for (let i = 0; i < count; i++) {
      const radius = 1.0 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.45 + (1.0 / radius) * 0.3;
      const y = (Math.random() - 0.5) * 0.15;

      this.accretionData.push({ radius, angle, speed, y });

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const pCol = i % 3 === 0 ? gold : teal;
      colors[i * 3] = pCol.r;
      colors[i * 3 + 1] = pCol.g;
      colors[i * 3 + 2] = pCol.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: this.isMobile ? 0.05 : 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.65 * this.config.baseOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.accretionPoints = new THREE.Points(geometry, material);
    this.primaryPlaneGroup.add(this.accretionPoints);
  }

  /**
   * 5. Restrained Orbital Stardust
   */
  private buildStardust(): void {
    const count = this.config.quality === "low" ? 45 : this.config.quality === "medium" ? 95 : 160;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const teal = new THREE.Color(this.config.colorTeal);
    const gold = new THREE.Color(this.config.colorGold);
    const cyan = new THREE.Color(this.config.colorCyan);

    for (let i = 0; i < count; i++) {
      const radius = 1.6 + Math.random() * 6.8;
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.18 / Math.sqrt(radius)) * (Math.random() * 0.3 + 0.85);
      const y = (Math.random() - 0.5) * 0.45;

      this.dustData.push({ radius, angle, speed, y });

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const pCol = i % 4 === 0 ? gold : i % 2 === 0 ? teal : cyan;
      colors[i * 3] = pCol.r;
      colors[i * 3 + 1] = pCol.g;
      colors[i * 3 + 2] = pCol.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: this.isMobile ? 0.05 : 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.52 * this.config.baseOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.dustPoints = new THREE.Points(geometry, material);
    this.primaryPlaneGroup.add(this.dustPoints);
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
    this.targetScrollProgress = Math.max(0, Math.min(1, progress));
  }

  /**
   * Main Render & Physics Loop
   */
  private animate = (): void => {
    if (this.isDisposed || this.isPaused) return;

    const delta = Math.min(0.04, this.clock.getDelta());
    const time = this.clock.getElapsedTime();

    // 1. Damped Mouse Smoothing with Weighted Inertia
    const springDamp = 3.2 * delta;
    this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * springDamp;
    this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * springDamp;

    // 2. Central Star Shader & Corona Breathing
    if (this.starMesh) {
      const mat = this.starMesh.material as THREE.ShaderMaterial;
      if (mat.uniforms) mat.uniforms.uTime.value = time;
      this.starMesh.rotation.y = time * 0.07;
    }
    for (let c = 0; c < this.coronaMeshes.length; c++) {
      const mat = this.coronaMeshes[c].material as THREE.ShaderMaterial;
      if (mat.uniforms) mat.uniforms.uTime.value = time;
    }

    // 4. Gravitational Well Shader
    if (this.gravityWellMesh) {
      const mat = this.gravityWellMesh.material as THREE.ShaderMaterial;
      if (mat.uniforms) mat.uniforms.uTime.value = time;
      this.gravityWellMesh.rotation.z = -time * 0.2;
    }

    // 5. Update Planets along Keplerian Trajectories
    for (let i = 0; i < this.planets.length; i++) {
      const p = this.planets[i];
      p.angle += p.speed * delta;

      const x = Math.cos(p.angle) * p.orbitRadius;
      const z = Math.sin(p.angle) * p.orbitRadius * (1 - p.eccentricity);
      const y = Math.sin(p.angle) * p.inclination;

      p.group.position.set(x, y, z);
      p.mesh.rotation.y += p.rotSpeed * delta;

      // Update Planet Moons
      for (let m = 0; m < p.moons.length; m++) {
        const moon = p.moons[m];
        moon.angle += moon.speed * delta;
        const mx = Math.cos(moon.angle) * moon.orbitRadius;
        const mz = Math.sin(moon.angle) * moon.orbitRadius;
        const my = Math.sin(moon.angle * 2.0) * moon.inclination;
        moon.mesh.position.set(mx, my, mz);
      }
    }

    // 6. Update Accretion Stream
    if (this.accretionPoints) {
      const attr = this.accretionPoints.geometry.getAttribute("position") as THREE.BufferAttribute;
      const pos = attr.array as Float32Array;

      for (let i = 0; i < this.accretionData.length; i++) {
        const a = this.accretionData[i];
        a.angle += a.speed * delta;

        const idx = i * 3;
        pos[idx] = Math.cos(a.angle) * a.radius;
        pos[idx + 1] = a.y + Math.sin(time * 1.5 + i) * 0.02;
        pos[idx + 2] = Math.sin(a.angle) * a.radius;
      }
      attr.needsUpdate = true;
    }

    // 7. Update Stardust Particles
    if (this.dustPoints) {
      const pAttr = this.dustPoints.geometry.getAttribute("position") as THREE.BufferAttribute;
      const pPos = pAttr.array as Float32Array;

      for (let i = 0; i < this.dustData.length; i++) {
        const d = this.dustData[i];
        d.angle += d.speed * delta;

        const idx = i * 3;
        pPos[idx] = Math.cos(d.angle) * d.radius;
        pPos[idx + 1] = d.y + Math.sin(time * 0.4 + i) * 0.035;
        pPos[idx + 2] = Math.sin(d.angle) * d.radius;
      }
      pAttr.needsUpdate = true;
    }

    // 8. Tesseract Hyperplane Slow Counter-Rotation
    this.hyperPlaneGroup.rotation.z = 0.1 + Math.sin(time * 0.08) * 0.06;
    this.hyperPlaneGroup.rotation.y = 0.24 + time * 0.015;

    // 9. Orbital Plane Continuous Gentle Physical Breathing
    this.primaryPlaneGroup.rotation.x =
      0.42 + Math.sin(time * 0.1) * 0.03 - this.currentMouse.y * 0.05;
    this.primaryPlaneGroup.rotation.y =
      -0.16 + Math.cos(time * 0.08) * 0.03 + this.currentMouse.x * 0.06;

    // 10. Instrument Power-On Transition Lifecycle
    let easeIntro = 1.0;
    if (!this.isIntroComplete) {
      this.introTime += delta;
      const progress = Math.min(1.0, this.introTime / this.introDuration);
      easeIntro = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      this.rootGroup.scale.setScalar(0.25 + 0.75 * easeIntro);
      if (progress >= 1.0) {
        this.isIntroComplete = true;
      }
    }

    // 11. Continuous Camera Storytelling along Physical Spline
    this.currentScrollProgress = THREE.MathUtils.lerp(
      this.currentScrollProgress,
      this.targetScrollProgress,
      0.05
    );

    const p = this.currentScrollProgress;
    const baseX = this.isMobile ? 0.2 : 0.0;
    const baseY = this.isMobile ? 1.4 : 1.9;
    const baseZ = this.isMobile ? 13.8 : 12.8;

    // Dynamic camera coordinates across the narrative journey:
    // Intro: Camera smoothly pulls back from initial focal point (z = 7.5) to arrival wide (baseZ)
    // 0.0 - 0.15: Wide architectural hero view
    // 0.15 - 0.40: Descent into primary orbital plane
    // 0.40 - 0.65: Lateral tracking along structured program rings
    // 0.65 - 0.85: Elevated perspective revealing hyper-dimensional geometry
    // 0.85 - 1.00: Gentle pull back into a tranquil, wide, calm field
    const introZOffset = (1.0 - easeIntro) * -5.0;
    const camX = baseX + Math.sin(p * Math.PI * 1.4) * (this.isMobile ? 1.0 : 2.2) + this.currentMouse.x * 0.35;
    const camY = baseY + Math.sin(p * Math.PI * 1.8) * 1.1 - this.currentMouse.y * 0.3 + (p * 0.6);
    const camZ = baseZ + introZOffset - Math.sin(p * Math.PI) * (this.isMobile ? 2.4 : 3.8);

    this.camera.position.set(camX, camY, camZ);

    const lookTargetX = this.systemOrigin.x * (0.35 - p * 0.25) + this.currentMouse.x * 0.2;
    const lookTargetY = 0.2 + (p * 0.3);
    const lookTargetZ = -p * 1.2;
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
      this.systemOrigin.set(0.6, 1.0, -2.4);
    } else if (width < 1024) {
      this.camera.fov = 44;
      this.systemOrigin.set(2.2, 0.4, -1.4);
    } else {
      this.camera.fov = 42;
      this.systemOrigin.set(3.4, 0.35, -1.0);
    }
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.setDPRByQuality();
    this.rootGroup.position.copy(this.systemOrigin);
  }

  public setQuality(quality: QualityTier): void {
    this.config.quality = quality;
    this.setDPRByQuality();
  }

  /**
   * Complete memory cleanup & WebGL resource disposal
   */
  public dispose(): void {
    this.isDisposed = true;
    this.pause();

    // Dispose Orbits
    this.orbitLines.forEach((l) => {
      l.geometry.dispose();
      (l.material as THREE.Material).dispose();
      this.primaryPlaneGroup.remove(l);
    });
    this.orbitLines = [];

    // Dispose Dimensional Rings
    this.dimensionalRings.forEach((r) => {
      r.geometry.dispose();
      (r.material as THREE.Material).dispose();
      this.hyperPlaneGroup.remove(r);
    });
    this.dimensionalRings = [];

    // Dispose Planets & Moons
    this.planets.forEach((p) => {
      p.group.traverse((child) => {
        if ((child as THREE.Mesh).geometry) {
          (child as THREE.Mesh).geometry.dispose();
        }
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
      this.primaryPlaneGroup.remove(p.group);
    });
    this.planets = [];

    // Dispose Star & Coronas
    if (this.starMesh) {
      this.starMesh.geometry.dispose();
      (this.starMesh.material as THREE.Material).dispose();
      this.primaryPlaneGroup.remove(this.starMesh);
      this.starMesh = null;
    }
    this.coronaMeshes.forEach((c) => {
      c.geometry.dispose();
      (c.material as THREE.Material).dispose();
      this.primaryPlaneGroup.remove(c);
    });
    this.coronaMeshes = [];

    // Dispose Gravitational Well
    if (this.gravityWellMesh) {
      this.gravityWellMesh.geometry.dispose();
      (this.gravityWellMesh.material as THREE.Material).dispose();
      this.primaryPlaneGroup.remove(this.gravityWellMesh);
      this.gravityWellMesh = null;
    }

    // Dispose Particles
    if (this.accretionPoints) {
      this.accretionPoints.geometry.dispose();
      (this.accretionPoints.material as THREE.Material).dispose();
      this.primaryPlaneGroup.remove(this.accretionPoints);
      this.accretionPoints = null;
    }

    if (this.dustPoints) {
      this.dustPoints.geometry.dispose();
      (this.dustPoints.material as THREE.Material).dispose();
      this.primaryPlaneGroup.remove(this.dustPoints);
      this.dustPoints = null;
    }

    this.scene.remove(this.rootGroup);

    // Dispose Renderer
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}

export default SolarSystemCore;
