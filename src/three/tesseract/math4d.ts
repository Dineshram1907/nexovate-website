/**
 * math4d.ts
 *
 * True 4-Dimensional Euclidean Space Mathematics & Hypercube Projections
 *
 * Principles:
 *  - 16 vertices of a 4D Hypercube (Tesseract) in [-1, 1]^4
 *  - 32 continuous 4D edges (Hamming distance == 1 in 4-bit space)
 *  - 16 architectural hyper-diagonal rails connecting nested depth layers
 *  - Independent 4D rotation matrices across planes: XW, YW, ZW, XY, XZ, YZ
 *  - 4D-to-3D Perspective (Stereographic) Projection
 */

export interface Vector4D {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface Edge4D {
  v1: number;
  v2: number;
}

// ── 1. Generate Canonical 16 Vertices of a 4D Hypercube ─────────────────────────
export function createTesseractVertices(size: number = 1): Vector4D[] {
  const vertices: Vector4D[] = [];
  for (let i = 0; i < 16; i++) {
    vertices.push({
      x: ((i & 1) ? 1 : -1) * size,
      y: ((i & 2) ? 1 : -1) * size,
      z: ((i & 4) ? 1 : -1) * size,
      w: ((i & 8) ? 1 : -1) * size,
    });
  }
  return vertices;
}

// ── 2. Generate 32 Canonical Edges of a 4D Hypercube ───────────────────────────
// Two vertices share an edge iff they differ by exactly one bit in their 4-bit index
export function createTesseractEdges(): Edge4D[] {
  const edges: Edge4D[] = [];
  for (let i = 0; i < 16; i++) {
    for (let bit = 0; bit < 4; bit++) {
      const j = i ^ (1 << bit);
      if (i < j) {
        edges.push({ v1: i, v2: j });
      }
    }
  }
  return edges; // Exactly 32 edges
}

// ── 3. High-Performance 4D Rotation in Place ────────────────────────────────────
// Rotates in 4D space across 5 rotation planes (XW, YW, ZW, XY, XZ)
export function rotate4D(
  v: Vector4D,
  thetaXW: number,
  thetaYW: number,
  thetaZW: number,
  thetaXY: number,
  thetaXZ: number,
  target: Vector4D
): void {
  let x = v.x;
  let y = v.y;
  let z = v.z;
  let w = v.w;

  // 1. Plane XW rotation
  if (thetaXW !== 0) {
    const c = Math.cos(thetaXW);
    const s = Math.sin(thetaXW);
    const xNew = x * c - w * s;
    const wNew = x * s + w * c;
    x = xNew;
    w = wNew;
  }

  // 2. Plane YW rotation
  if (thetaYW !== 0) {
    const c = Math.cos(thetaYW);
    const s = Math.sin(thetaYW);
    const yNew = y * c - w * s;
    const wNew = y * s + w * c;
    y = yNew;
    w = wNew;
  }

  // 3. Plane ZW rotation
  if (thetaZW !== 0) {
    const c = Math.cos(thetaZW);
    const s = Math.sin(thetaZW);
    const zNew = z * c - w * s;
    const wNew = z * s + w * c;
    z = zNew;
    w = wNew;
  }

  // 4. Plane XY rotation
  if (thetaXY !== 0) {
    const c = Math.cos(thetaXY);
    const s = Math.sin(thetaXY);
    const xNew = x * c - y * s;
    const yNew = x * s + y * c;
    x = xNew;
    y = yNew;
  }

  // 5. Plane XZ rotation
  if (thetaXZ !== 0) {
    const c = Math.cos(thetaXZ);
    const s = Math.sin(thetaXZ);
    const xNew = x * c - z * s;
    const zNew = x * s + z * c;
    x = xNew;
    z = zNew;
  }

  target.x = x;
  target.y = y;
  target.z = z;
  target.w = w;
}

// ── 4. 4D-to-3D Perspective Projection ──────────────────────────────────────────
// Projects 4D point (x, y, z, w) onto 3D hyperplane using 4D focal distance d4
export function project4Dto3D(
  v: Vector4D,
  d4: number = 2.4,
  target: Vector3D
): number {
  // Clamp divisor to prevent singularity when w approaches d4
  const factor = d4 / Math.max(0.35, d4 - v.w);
  target.x = v.x * factor;
  target.y = v.y * factor;
  target.z = v.z * factor;
  return factor; // Returns scale factor which correlates with 4D depth
}
