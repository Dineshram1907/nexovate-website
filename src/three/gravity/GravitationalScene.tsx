import React, { useEffect, useRef } from "react";
import { MotionValue } from "motion/react";
import { GravitationalFieldCore, QualityTier } from "./GravitationalFieldCore";

interface GravitationalSceneProps {
  scrollProgress?: MotionValue<number> | number;
  className?: string;
}

/**
 * GravitationalScene
 *
 * React integration component for the Timeless Gravitational / Singularity Field:
 * - Manages WebGL context lifecycle and memory disposal.
 * - Bridges mouse pointer as a physical second gravitational mass.
 * - Synchronizes page scroll dynamics to spatial geodesic depth.
 * - Automatically selects quality tier based on device / screen size.
 * - Pauses rendering when scrolled out of view or tab inactive.
 */
export const GravitationalScene: React.FC<GravitationalSceneProps> = ({
  scrollProgress,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<GravitationalFieldCore | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect device capabilities & quality tier
    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const quality: QualityTier = prefersReduced || isMobile ? "low" : isTablet ? "medium" : "high";

    const core = new GravitationalFieldCore(container, {
      quality,
      baseOpacity: isMobile ? 0.45 : 0.7,
    });
    coreRef.current = core;

    if (prefersReduced) {
      core.pause();
    }

    // Normalized Mouse Tracking for Dual-Gravity Influence
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      core.setMouse(nx, ny);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Window Resize Debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        core.resize();
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            core.start();
          } else {
            core.pause();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Tab Visibility
    const handleVisibilityChange = () => {
      if (document.hidden) {
        core.pause();
      } else {
        core.start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      core.dispose();
      coreRef.current = null;
    };
  }, []);

  // Sync scroll progress
  useEffect(() => {
    if (!scrollProgress) return;

    if (typeof scrollProgress === "number") {
      coreRef.current?.setScrollProgress(scrollProgress);
      return;
    }

    const unsubscribe = scrollProgress.on("change", (latest) => {
      coreRef.current?.setScrollProgress(latest);
    });

    return () => unsubscribe();
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default GravitationalScene;
