/**
 * TesseractScene.tsx
 *
 * Primary Three.js WebGL Host for the Interactive 4D Tesseract Environment
 *
 * Principles:
 *  - Real mathematical 4D hypercube projected into 3D camera
 *  - Zero React re-renders on RAF loop (Three.js state maintained in ref)
 *  - Responsive across mobile, tablet, desktop, and ultrawide
 *  - Full resource teardown on unmount (no memory leaks)
 */

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { TesseractCore } from "./TesseractCore";
import { CameraController } from "./CameraController";

interface TesseractSceneProps {
  scrollProgress?: any; // MotionValue<number> | number
  introScale?: number;  // 0 to 1
  className?: string;
}

export const TesseractScene: React.FC<TesseractSceneProps> = ({
  scrollProgress,
  introScale = 1.0,
  className = "absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(0);
  const introRef = useRef<number>(0);

  // Sync scroll progress via ref without causing React re-renders
  useEffect(() => {
    if (!scrollProgress) return;

    if (typeof scrollProgress === "number") {
      scrollRef.current = scrollProgress;
      return;
    }

    if (typeof scrollProgress.get === "function") {
      scrollRef.current = scrollProgress.get();
      const unsubscribe = scrollProgress.on("change", (v: number) => {
        scrollRef.current = v;
      });
      return () => unsubscribe();
    }
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Dynamic quality profiling based on viewport & device capability
    const w = window.innerWidth;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    const mem = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;

    const quality: "high" | "medium" | "low" =
      w < 768 || mem < 4 || cores < 4
        ? "low"
        : w < 1024 || isTouch
        ? "medium"
        : "high";

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const dpr =
      quality === "low"
        ? Math.min(window.devicePixelRatio || 1, 1.0)
        : quality === "medium"
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : Math.min(window.devicePixelRatio || 1, 2.0);

    // ── 1. Three.js Scene Setup ─────────────────────────────────────────────
    const scene = new THREE.Scene();
    const cameraController = new CameraController(width, height, prefersReduced);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0); // Completely transparent background
      renderer.domElement.setAttribute("role", "img");
      renderer.domElement.setAttribute("aria-label", "Interactive 4D tesseract mathematical visualization");
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("WebGL Tesseract initialization fallback:", err);
      return;
    }

    // ── 2. Create Procedural 4D Tesseract Geometry Core ─────────────────────
    const tesseractCore = new TesseractCore(quality);
    scene.add(tesseractCore.group);

    // ── 3. Mouse & Pointer Tracking ─────────────────────────────────────────
    const parentEl = container.parentElement || window;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / (rect.width || 1) - 0.5) * 2;
      const ny = -(((e.clientY - rect.top) / (rect.height || 1) - 0.5) * 2);
      cameraController.setMouse(nx, ny);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const rect = container.getBoundingClientRect();
        const nx = ((t.clientX - rect.left) / (rect.width || 1) - 0.5) * 2;
        const ny = -(((t.clientY - rect.top) / (rect.height || 1) - 0.5) * 2);
        cameraController.setMouse(nx, ny);
      }
    };

    const onPointerLeave = () => {
      cameraController.setMouse(0, 0);
    };

    const onTouchEnd = () => {
      cameraController.setMouse(0, 0);
    };

    parentEl.addEventListener("mousemove", onPointerMove as EventListener, { passive: true });
    parentEl.addEventListener("mouseleave", onPointerLeave as EventListener, { passive: true });
    parentEl.addEventListener("touchmove", onTouchMove as EventListener, { passive: true });
    parentEl.addEventListener("touchend", onTouchEnd as EventListener, { passive: true });

    // ── 4. Resize Handling ──────────────────────────────────────────────────
    const onResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      cameraController.resize(width, height);
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    // ── 5. Main Animation Loop ──────────────────────────────────────────────
    let isVisible = document.visibilityState === "visible";
    let animationFrameId: number;
    let startTime = performance.now();

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Smooth intro spring: reveals from core to full structural expansion
    let currentIntro = prefersReduced ? 1.0 : 0.05;

    const render = (now: number) => {
      if (isVisible && renderer) {
        const elapsed = (now - startTime) * 0.001;

        // Smoothly blossom introScale up to 1.0
        currentIntro += (1.0 - currentIntro) * 0.035;
        introRef.current = currentIntro;

        // Update camera and extract smooth mouse offset
        const { mouseOffset } = cameraController.update(elapsed, scrollRef.current);

        // Update 4D hypercube vertices, rotations, nested layers, and lines
        tesseractCore.update(
          elapsed,
          scrollRef.current,
          mouseOffset,
          currentIntro
        );

        renderer.render(scene, cameraController.camera);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (prefersReduced) {
      tesseractCore.update(0, 0, { x: 0, y: 0 }, 1.0);
      renderer.render(scene, cameraController.camera);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    // ── 6. Thorough Teardown & Resource Disposal ─────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      parentEl.removeEventListener("mousemove", onPointerMove as EventListener);
      parentEl.removeEventListener("mouseleave", onPointerLeave as EventListener);
      parentEl.removeEventListener("touchmove", onTouchMove as EventListener);
      parentEl.removeEventListener("touchend", onTouchEnd as EventListener);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      tesseractCore.dispose();

      if (renderer) {
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      aria-hidden="true"
      style={{ userSelect: "none" }}
    />
  );
};

export default TesseractScene;
