import { describe, it, expect } from "vitest";
import {
  createTesseractVertices,
  createTesseractEdges,
  rotate4D,
  project4Dto3D,
  Vector4D,
  Vector3D,
} from "./math4d";

describe("math4d — 4D Hypercube Mathematics", () => {
  describe("createTesseractVertices", () => {
    it("should generate exactly 16 vertices for a 4D hypercube", () => {
      const vertices = createTesseractVertices(1);
      expect(vertices).toHaveLength(16);
    });

    it("should generate vertices with correct Euclidean norm", () => {
      const size = 1.5;
      const vertices = createTesseractVertices(size);
      const expectedNorm = Math.sqrt(4 * size * size); // sqrt(1.5^2 * 4) = 3.0

      for (const v of vertices) {
        const norm = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z + v.w * v.w);
        expect(norm).toBeCloseTo(expectedNorm, 5);
      }
    });

    it("should contain 16 unique coordinate tuples", () => {
      const vertices = createTesseractVertices(1);
      const set = new Set(vertices.map((v) => `${v.x},${v.y},${v.z},${v.w}`));
      expect(set.size).toBe(16);
    });
  });

  describe("createTesseractEdges", () => {
    it("should generate exactly 32 canonical 4D edges", () => {
      const edges = createTesseractEdges();
      expect(edges).toHaveLength(32);
    });

    it("should ensure every vertex has degree 4", () => {
      const edges = createTesseractEdges();
      const degreeMap = new Map<number, number>();

      for (let i = 0; i < 16; i++) {
        degreeMap.set(i, 0);
      }

      for (const edge of edges) {
        expect(edge.v1).toBeLessThan(edge.v2);
        degreeMap.set(edge.v1, (degreeMap.get(edge.v1) || 0) + 1);
        degreeMap.set(edge.v2, (degreeMap.get(edge.v2) || 0) + 1);
      }

      for (let i = 0; i < 16; i++) {
        expect(degreeMap.get(i)).toBe(4);
      }
    });

    it("should only connect vertices with Hamming distance of 1", () => {
      const edges = createTesseractEdges();

      for (const edge of edges) {
        // In binary index, XOR should have exactly 1 bit set (power of 2)
        const diff = edge.v1 ^ edge.v2;
        const isPowerOfTwo = (diff & (diff - 1)) === 0 && diff > 0;
        expect(isPowerOfTwo).toBe(true);
      }
    });
  });

  describe("rotate4D", () => {
    it("should preserve Euclidean vector length across 4D rotations (isometry)", () => {
      const v: Vector4D = { x: 1, y: 1, z: 1, w: 1 };
      const initialNorm = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z + v.w * v.w);

      const target: Vector4D = { x: 0, y: 0, z: 0, w: 0 };
      rotate4D(v, 0.45, 0.32, 0.18, 0.25, 0.14, target);

      const rotatedNorm = Math.sqrt(
        target.x * target.x +
        target.y * target.y +
        target.z * target.z +
        target.w * target.w
      );

      expect(rotatedNorm).toBeCloseTo(initialNorm, 5);
    });

    it("should return to identical point after full 2*PI rotation in any plane", () => {
      const v: Vector4D = { x: 0.8, y: -0.5, z: 1.2, w: 0.4 };
      const target: Vector4D = { x: 0, y: 0, z: 0, w: 0 };

      rotate4D(v, Math.PI * 2, 0, 0, 0, 0, target);
      expect(target.x).toBeCloseTo(v.x, 5);
      expect(target.w).toBeCloseTo(v.w, 5);

      rotate4D(v, 0, Math.PI * 2, 0, 0, 0, target);
      expect(target.y).toBeCloseTo(v.y, 5);
      expect(target.w).toBeCloseTo(v.w, 5);
    });
  });

  describe("project4Dto3D", () => {
    it("should project 4D point to 3D with correct depth scaling", () => {
      const d4 = 2.4;
      const target: Vector3D = { x: 0, y: 0, z: 0 };

      // Point on positive W axis
      const vPositiveW: Vector4D = { x: 1, y: 1, z: 1, w: 1.0 };
      const factorPositive = project4Dto3D(vPositiveW, d4, target);
      expect(factorPositive).toBeGreaterThan(1.0);
      expect(target.x).toBeCloseTo(factorPositive, 5);

      // Point on negative W axis
      const vNegativeW: Vector4D = { x: 1, y: 1, z: 1, w: -1.0 };
      const factorNegative = project4Dto3D(vNegativeW, d4, target);
      expect(factorNegative).toBeLessThan(1.0);
      expect(target.x).toBeCloseTo(factorNegative, 5);
    });

    it("should clamp singularities safely when w approaches d4", () => {
      const d4 = 2.4;
      const target: Vector3D = { x: 0, y: 0, z: 0 };
      const vNearSingularity: Vector4D = { x: 1, y: 1, z: 1, w: 2.3999 };

      const factor = project4Dto3D(vNearSingularity, d4, target);
      expect(Number.isFinite(factor)).toBe(true);
      expect(Number.isFinite(target.x)).toBe(true);
    });
  });
});
