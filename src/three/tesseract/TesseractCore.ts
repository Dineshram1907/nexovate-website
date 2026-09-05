/**
 * TesseractCore.ts
 *
 * Modular Engine for Real-Time 4D Tesseract Geometry & Infinite Tunnel Projection
 *
 * Principles:
 *  - Zero allocation in animation loop (preallocated typed arrays & scratch vectors)
 *  - Genuine 4D hypercube vertices & 32 edges per layer
 *  - Concentric infinity-castle tunnel rails connecting nested depth layers
 *  - Custom depth-fading ShaderMaterial for razor-sharp, anti-aliased editorial lines
 *  - Smooth continuous 4D rotational folding across XW, YW, ZW, XY, and XZ planes
 */

import * as THREE from "three";
import {
  createTesseractVertices,
  createTesseractEdges,
  rotate4D,
  project4Dto3D,
  Vector4D,
  Vector3D,
  Edge4D,
} from "./math4d";

export type QualityTier = "high" | "medium" | "low";

export interface TesseractConfig {
  numLayers: number;
  baseSize: number;
  d4Distance: number;
  tunnelDepth: number;
  railIndices: number[];
  rotationSpeedScale: number;
}

export class TesseractCore {
  public group: THREE.Group;
  private lineMesh: THREE.LineSegments;
  private lineGeometry: THREE.BufferGeometry;
  private lineMaterial: THREE.ShaderMaterial;

  private pointsMesh: THREE.Points;
  private pointsGeometry: THREE.BufferGeometry;
  private pointsMaterial: THREE.ShaderMaterial;
  private gridHelper: THREE.GridHelper | null = null;

  private config: TesseractConfig;
  private baseVertices: Vector4D[];
  private edges: Edge4D[];

  // Preallocated buffer storage
  private totalLineVertices: number;
  private linePositions: Float32Array;
  private lineAlphas: Float32Array;
  private lineColors: Float32Array;

  private totalPoints: number;
  private pointPositions: Float32Array;
  private pointSizes: Float32Array;
  private pointColors: Float32Array;
  private pointAlphas: Float32Array;

  // Scratch memory for 0-allocation updates
  private scratchRotated: Vector4D[];
  private scratchProjected: Vector3D[][]; // [layer][16]
  private scratchScales: number[][];      // [layer][16]

  constructor(quality: QualityTier | boolean = "high") {
    this.group = new THREE.Group();

    // Map legacy boolean or tier string
    const tier: QualityTier =
      typeof quality === "boolean"
        ? (quality ? "low" : "high")
        : quality;

    const isLow = tier === "low";
    const isMedium = tier === "medium";

    // Adaptive rail count: 4 corner rails on mobile, 8 on tablet, 16 on desktop
    const railIndices = isLow
      ? [0, 3, 12, 15]
      : isMedium
      ? [0, 2, 4, 6, 8, 10, 12, 14]
      : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    this.config = {
      numLayers: isLow ? 2 : isMedium ? 3 : 5,
      baseSize: 1.25,
      d4Distance: 2.35,
      tunnelDepth: isLow ? 3.2 : isMedium ? 4.0 : 4.8,
      railIndices,
      rotationSpeedScale: isLow ? 0.75 : 1.0,
    };

    this.baseVertices = createTesseractVertices(this.config.baseSize);
    this.edges = createTesseractEdges(); // 32 edges

    const N = this.config.numLayers;
    // 32 edges per layer * 2 vertices = 64 vertices per layer
    const layerLineVertices = N * 32 * 2;
    // Inter-layer guide rails: (N - 1) transitions * rail count * 2 vertices
    const railLineVertices = (N - 1) * this.config.railIndices.length * 2;
    this.totalLineVertices = layerLineVertices + railLineVertices;

    this.linePositions = new Float32Array(this.totalLineVertices * 3);
    this.lineAlphas = new Float32Array(this.totalLineVertices);
    this.lineColors = new Float32Array(this.totalLineVertices * 3);

    // Vertex points: N layers * 16 vertices
    this.totalPoints = N * 16;
    this.pointPositions = new Float32Array(this.totalPoints * 3);
    this.pointSizes = new Float32Array(this.totalPoints);
    this.pointColors = new Float32Array(this.totalPoints * 3);
    this.pointAlphas = new Float32Array(this.totalPoints);

    // Scratch structures
    this.scratchRotated = [];
    for (let i = 0; i < 16; i++) {
      this.scratchRotated.push({ x: 0, y: 0, z: 0, w: 0 });
    }

    this.scratchProjected = [];
    this.scratchScales = [];
    for (let layer = 0; layer < N; layer++) {
      const pLayer: Vector3D[] = [];
      const sLayer: number[] = [];
      for (let i = 0; i < 16; i++) {
        pLayer.push({ x: 0, y: 0, z: 0 });
        sLayer.push(1);
      }
      this.scratchProjected.push(pLayer);
      this.scratchScales.push(sLayer);
    }

    // ── 1. Line Segments Setup ────────────────────────────────────────────────
    this.lineGeometry = new THREE.BufferGeometry();
    this.lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.linePositions, 3)
    );
    this.lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(this.lineColors, 3)
    );
    this.lineGeometry.setAttribute(
      "alpha",
      new THREE.BufferAttribute(this.lineAlphas, 1)
    );

    this.lineMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.NormalBlending,
      vertexShader: /* glsl */ `
        attribute float alpha;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vDepth;

        void main() {
          vColor = color;
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vDepth = -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vDepth;

        void main() {
          if (vAlpha <= 0.005) discard;
          // Smooth depth attenuation towards warm off-white background
          float depthFade = smoothstep(14.0, 1.5, vDepth);
          float finalAlpha = vAlpha * depthFade;
          gl_FragColor = vec4(vColor, finalAlpha);
        }
      `,
    });

    this.lineMesh = new THREE.LineSegments(this.lineGeometry, this.lineMaterial);
    this.lineMesh.frustumCulled = false;
    this.group.add(this.lineMesh);

    // ── 2. Vertex Node Points Setup ───────────────────────────────────────────
    this.pointsGeometry = new THREE.BufferGeometry();
    this.pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.pointPositions, 3)
    );
    this.pointsGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(this.pointColors, 3)
    );
    this.pointsGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(this.pointSizes, 1)
    );
    this.pointsGeometry.setAttribute(
      "alpha",
      new THREE.BufferAttribute(this.pointAlphas, 1)
    );

    this.pointsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.NormalBlending,
      vertexShader: /* glsl */ `
        attribute float size;
        attribute float alpha;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_PointSize = clamp(gl_PointSize, 1.5, 9.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          // Soft glowing antialiased round point
          float pointSoft = smoothstep(0.5, 0.1, dist);
          float core = smoothstep(0.2, 0.0, dist);
          vec3 finalColor = mix(vColor, vec3(1.0), core * 0.4);
          gl_FragColor = vec4(finalColor, vAlpha * pointSoft);
        }
      `,
    });

    this.pointsMesh = new THREE.Points(this.pointsGeometry, this.pointsMaterial);
    this.pointsMesh.frustumCulled = false;
    this.group.add(this.pointsMesh);

    // ── 3. Subtle Perspective Coordinate Grid Plane (Reference Grounding) ────
    const gridHelper = new THREE.GridHelper(18, 28, 0x6366f1, 0x101536);
    gridHelper.position.set(0, -2.4, 0);
    const gridMat = gridHelper.material as THREE.LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = isLow ? 0.03 : 0.06;
    gridMat.depthWrite = false;
    this.gridHelper = gridHelper;
    this.group.add(gridHelper);
  }

  /**
   * Updates 4D rotations, perspective projections, infinite nested layers, and line buffers.
   *
   * @param time - Continuous elapsed seconds
   * @param scrollProgress - Normalized scroll position [0, 1] through hero track
   * @param mouseParallax - Smooth mouse offset {x, y}
   * @param introScale - Intro reveal progress [0, 1]
   */
  public update(
    time: number,
    scrollProgress: number,
    mouseParallax: { x: number; y: number },
    introScale: number = 1.0
  ): void {
    const N = this.config.numLayers;

    // ── 1. Calculate Continuous Multi-Frequency 4D Rotation Angles ───────────
    // Low-frequency harmonic mixing ensures geometry never repeats identical configurations
    const t = time * 0.22 + scrollProgress * 1.8;

    const thetaXW = t * 0.52 + Math.sin(t * 0.23) * 0.35 + mouseParallax.x * 0.4;
    const thetaYW = t * 0.41 + Math.cos(t * 0.19) * 0.30 + mouseParallax.y * 0.4;
    const thetaZW = t * 0.29 + Math.sin(t * 0.14) * 0.25;
    const thetaXY = Math.sin(t * 0.11) * 0.15 + (mouseParallax.x - mouseParallax.y) * 0.2;
    const thetaXZ = Math.cos(t * 0.09) * 0.12;

    // ── 2. Rotate Base 16 Vertices in 4D ─────────────────────────────────────
    for (let i = 0; i < 16; i++) {
      rotate4D(
        this.baseVertices[i],
        thetaXW,
        thetaYW,
        thetaZW,
        thetaXY,
        thetaXZ,
        this.scratchRotated[i]
      );
    }

    // ── 3. Calculate Nested Layers (Continuous Infinite Zoom) ────────────────
    // Loop parameter cycles infinitely without abrupt restart
    const cycleSpeed = time * 0.045 + scrollProgress * 0.35;

    let linePosIdx = 0;
    let lineColIdx = 0;
    let lineAlphaIdx = 0;

    let pointPosIdx = 0;
    let pointColIdx = 0;
    let pointSizeIdx = 0;
    let pointAlphaIdx = 0;

    // Brand color palette tokens
    const cNavy = { r: 0.063, g: 0.082, b: 0.212 };   // #101536
    const cIndigo = { r: 0.388, g: 0.400, b: 0.945 }; // #6366F1
    const cDeepIndigo = { r: 0.263, g: 0.243, b: 0.725 }; // #4338CA
    const cSlate = { r: 0.580, g: 0.639, b: 0.722 };  // #94A3B8
    const cGold = { r: 0.937, g: 0.686, b: 0.196 };   // #EFAF32

    for (let layer = 0; layer < N; layer++) {
      const layerOffset = layer / N;
      const progress = ((cycleSpeed + layerOffset) % 1.0 + 1.0) % 1.0;

      // Scale expands smoothly from inner core to perimeter
      // e.g. 0.35 -> 2.8 with exponential growth
      const scaleFactor = Math.exp((progress - 0.4) * 2.1) * 0.75 * introScale;
      const zOffset = (progress - 0.5) * this.config.tunnelDepth;

      // Weight & opacity bell curve: smooth fade-in at birth, fade-out at boundary
      const birth = Math.min(1.0, progress / 0.22);
      const death = Math.min(1.0, (1.0 - progress) / 0.22);
      const layerOpacity = birth * death;

      // Project each of the 16 vertices of this layer
      const projLayer = this.scratchProjected[layer];
      const scaleLayer = this.scratchScales[layer];

      for (let i = 0; i < 16; i++) {
        const factor = project4Dto3D(
          this.scratchRotated[i],
          this.config.d4Distance,
          projLayer[i]
        );
        projLayer[i].x *= scaleFactor;
        projLayer[i].y *= scaleFactor;
        projLayer[i].z = projLayer[i].z * scaleFactor + zOffset;
        scaleLayer[i] = factor;

        // Store points data
        this.pointPositions[pointPosIdx++] = projLayer[i].x;
        this.pointPositions[pointPosIdx++] = projLayer[i].y;
        this.pointPositions[pointPosIdx++] = projLayer[i].z;

        // Point color & intensity based on 4D depth (w factor)
        const isInnerCore = factor < 1.0;
        const pColor = isInnerCore ? cGold : (progress > 0.6 ? cDeepIndigo : cIndigo);

        this.pointColors[pointColIdx++] = pColor.r;
        this.pointColors[pointColIdx++] = pColor.g;
        this.pointColors[pointColIdx++] = pColor.b;

        this.pointSizes[pointSizeIdx++] = isInnerCore ? 4.5 : 3.0;
        this.pointAlphas[pointAlphaIdx++] = layerOpacity * (isInnerCore ? 0.85 : 0.65);
      }

      // Store 32 Tesseract Edges for this layer
      for (let e = 0; e < 32; e++) {
        const edge = this.edges[e];
        const p1 = projLayer[edge.v1];
        const p2 = projLayer[edge.v2];

        // Line positions
        this.linePositions[linePosIdx++] = p1.x;
        this.linePositions[linePosIdx++] = p1.y;
        this.linePositions[linePosIdx++] = p1.z;

        this.linePositions[linePosIdx++] = p2.x;
        this.linePositions[linePosIdx++] = p2.y;
        this.linePositions[linePosIdx++] = p2.z;

        // Depth-graded colors: closer = deeper indigo/navy, distant = subtle slate/mist
        const midZ = (p1.z + p2.z) * 0.5;
        const depthNorm = THREE.MathUtils.clamp((midZ + 3.0) / 6.0, 0.0, 1.0);

        // Blend color between slate and deep indigo
        const lr = THREE.MathUtils.lerp(cSlate.r, cDeepIndigo.r, depthNorm);
        const lg = THREE.MathUtils.lerp(cSlate.g, cDeepIndigo.g, depthNorm);
        const lb = THREE.MathUtils.lerp(cSlate.b, cDeepIndigo.b, depthNorm);

        // Vertex 1 Color
        this.lineColors[lineColIdx++] = lr;
        this.lineColors[lineColIdx++] = lg;
        this.lineColors[lineColIdx++] = lb;

        // Vertex 2 Color
        this.lineColors[lineColIdx++] = lr;
        this.lineColors[lineColIdx++] = lg;
        this.lineColors[lineColIdx++] = lb;

        // Precision line alpha (refined, restrained, distinct)
        const edgeAlpha = layerOpacity * THREE.MathUtils.lerp(0.18, 0.48, depthNorm);
        this.lineAlphas[lineAlphaIdx++] = edgeAlpha;
        this.lineAlphas[lineAlphaIdx++] = edgeAlpha;
      }
    }

    // ── 4. Inter-Layer Architectural Tunnel Rails ────────────────────────────
    // Connects corresponding 16 vertices between adjacent nested frames
    for (let layer = 0; layer < N - 1; layer++) {
      const pCurrent = this.scratchProjected[layer];
      const pNext = this.scratchProjected[layer + 1];

      for (const v of this.config.railIndices) {
        const p1 = pCurrent[v];
        const p2 = pNext[v];

        this.linePositions[linePosIdx++] = p1.x;
        this.linePositions[linePosIdx++] = p1.y;
        this.linePositions[linePosIdx++] = p1.z;

        this.linePositions[linePosIdx++] = p2.x;
        this.linePositions[linePosIdx++] = p2.y;
        this.linePositions[linePosIdx++] = p2.z;

        // Subtle architectural perspective rail color (fainter than hypercube edges)
        this.lineColors[lineColIdx++] = cIndigo.r;
        this.lineColors[lineColIdx++] = cIndigo.g;
        this.lineColors[lineColIdx++] = cIndigo.b;

        this.lineColors[lineColIdx++] = cSlate.r;
        this.lineColors[lineColIdx++] = cSlate.g;
        this.lineColors[lineColIdx++] = cSlate.b;

        // Soft guide rail opacity
        const railAlpha = 0.12 * introScale;
        this.lineAlphas[lineAlphaIdx++] = railAlpha;
        this.lineAlphas[lineAlphaIdx++] = railAlpha;
      }
    }

    // ── 5. Push Updated Buffers to GPU ───────────────────────────────────────
    (this.lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.lineGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    (this.lineGeometry.attributes.alpha as THREE.BufferAttribute).needsUpdate = true;

    (this.pointsGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.pointsGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    (this.pointsGeometry.attributes.size as THREE.BufferAttribute).needsUpdate = true;
    (this.pointsGeometry.attributes.alpha as THREE.BufferAttribute).needsUpdate = true;
  }

  public dispose(): void {
    this.lineGeometry.dispose();
    this.lineMaterial.dispose();
    this.pointsGeometry.dispose();
    this.pointsMaterial.dispose();
    if (this.gridHelper) {
      this.gridHelper.geometry.dispose();
      (this.gridHelper.material as THREE.Material).dispose();
    }
    this.group.clear();
  }
}
