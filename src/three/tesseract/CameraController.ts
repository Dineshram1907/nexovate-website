/**
 * CameraController.ts
 *
 * Cinematic Camera Physics & Interactive Trajectory Controller
 *
 * Principles:
 *  - Slow, restrained Lissajous drift (gives subtle breathing sensation)
 *  - High-inertia mouse parallax (damped spring response, no jerky snap)
 *  - Scroll-coupled forward travel through the tesseract corridor
 *  - Absolute respect for prefers-reduced-motion
 */

import * as THREE from "three";

export class CameraController {
  public camera: THREE.PerspectiveCamera;
  
  // Base configuration
  private baseFov: number = 42;
  private baseZ: number = 6.2;

  // Target and current interpolated coordinates
  private targetX: number = 0;
  private targetY: number = 0;
  private currentX: number = 0;
  private currentY: number = 0;

  private mouseInfluenceX: number = 0;
  private mouseInfluenceY: number = 0;
  private currentMouseX: number = 0;
  private currentMouseY: number = 0;

  private isReducedMotion: boolean = false;

  constructor(width: number, height: number, isReducedMotion: boolean = false) {
    this.isReducedMotion = isReducedMotion;
    const aspect = width / (height || 1);
    this.camera = new THREE.PerspectiveCamera(this.baseFov, aspect, 0.1, 100);
    this.camera.position.set(0, 0, this.baseZ);
    this.camera.lookAt(0, 0, 0);
  }

  public resize(width: number, height: number): void {
    this.camera.aspect = width / (height || 1);
    // On narrower mobile viewports, widen FOV slightly to frame the tesseract gracefully
    if (width < 640) {
      this.camera.fov = 52;
      this.baseZ = 7.4;
    } else if (width < 1024) {
      this.camera.fov = 46;
      this.baseZ = 6.8;
    } else {
      this.camera.fov = this.baseFov;
      this.baseZ = 6.2;
    }
    this.camera.updateProjectionMatrix();
  }

  public setMouse(normalizedX: number, normalizedY: number): void {
    if (this.isReducedMotion) return;
    // Clamped physical deflection (maximum +/- 0.55 units)
    this.mouseInfluenceX = THREE.MathUtils.clamp(normalizedX * 0.55, -0.55, 0.55);
    this.mouseInfluenceY = THREE.MathUtils.clamp(normalizedY * 0.40, -0.40, 0.40);
  }

  public update(time: number, scrollProgress: number): { mouseOffset: { x: number; y: number } } {
    if (this.isReducedMotion) {
      this.camera.position.set(0, 0, this.baseZ);
      this.camera.lookAt(0, 0, 0);
      return { mouseOffset: { x: 0, y: 0 } };
    }

    // 1. Gentle physical damping on mouse coordinates (stiffness ~0.065)
    this.currentMouseX += (this.mouseInfluenceX - this.currentMouseX) * 0.065;
    this.currentMouseY += (this.mouseInfluenceY - this.currentMouseY) * 0.065;

    // 2. Subtle Lissajous breathing drift
    const driftX = Math.sin(time * 0.18) * 0.09;
    const driftY = Math.cos(time * 0.14) * 0.07;

    // 3. Scroll-driven travel along corridor (Z axis advances slightly, camera tilts)
    const scrollZ = scrollProgress * 1.8;
    const scrollPitch = Math.sin(scrollProgress * Math.PI) * 0.08;

    this.targetX = this.currentMouseX + driftX;
    this.targetY = this.currentMouseY + driftY;

    this.currentX += (this.targetX - this.currentX) * 0.08;
    this.currentY += (this.targetY - this.currentY) * 0.08;

    this.camera.position.x = this.currentX;
    this.camera.position.y = this.currentY;
    this.camera.position.z = this.baseZ - scrollZ;

    // Camera target: focal point slightly adjusts with mouse deflection
    const lookTarget = new THREE.Vector3(
      this.currentX * 0.3,
      this.currentY * 0.3 - scrollPitch,
      0
    );
    this.camera.lookAt(lookTarget);

    return {
      mouseOffset: {
        x: this.currentMouseX,
        y: this.currentMouseY,
      },
    };
  }
}
