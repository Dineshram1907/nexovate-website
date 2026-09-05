import React, { useEffect, useRef } from "react";
import { MotionValue } from "motion/react";
import { SolarSystemCore, QualityTier } from "./SolarSystemCore";

interface SolarSystemSceneProps {
  scrollProgress?: MotionValue<number> | number;
  className?: string;
}

/**
 * SolarSystemScene
 *
 * React wrapper for the Procedural Physics & Solar System Engine:
 * - Bridges normalized mouse coordinates to camera tilt & orbital deflection.
 * - Bridges scroll progress to continuous camera glide through planetary layers.
 * - Automatically selects quality tier based on mobile / GPU capabilities.
 * - Pauses WebGL render loop when scrolled offscreen or tab hidden.
 * - Guarantees zero memory leaks on unmount.
 */
export const SolarSystemScene: React.FC<SolarSystemSceneProps> = ({
  scrollProgress,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<SolarSystemCore | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Device capability detection
    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const quality: QualityTier = prefersReduced || isMobile ? "low" : isTablet ? "medium" : "high";

    const core = new SolarSystemCore(container, {
      quality,
      baseOpacity: isMobile ? 0.72 : 0.92,
    });
    coreRef.current = core;

    if (prefersReduced) {
      core.pause();
    }

    // Normalized Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      core.setMouse(nx, ny);
    };

    // Passive Touch Tracking for Mobile Viewports
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const nx = (touch.clientX / window.innerWidth) * 2 - 1;
        const ny = (touch.clientY / window.innerHeight) * 2 - 1;
        core.setMouse(nx * 0.6, ny * 0.6);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Window Resize Debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        core.resize();
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    // IntersectionObserver to pause when offscreen
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
      window.removeEventListener("touchmove", handleTouchMove);
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

export default SolarSystemScene;
