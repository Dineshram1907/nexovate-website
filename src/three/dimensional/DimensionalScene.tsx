import React, { useEffect, useRef } from "react";
import { MotionValue } from "motion/react";
import { DimensionalSculptureCore } from "./DimensionalSculptureCore";

interface DimensionalSceneProps {
  scrollProgress?: MotionValue<number> | number;
  className?: string;
  style?: React.CSSProperties;
}

export const DimensionalScene: React.FC<DimensionalSceneProps> = ({
  scrollProgress,
  className = "fixed inset-0 pointer-events-none z-0",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<DimensionalSculptureCore | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const core = new DimensionalSculptureCore(container, {
      quality: isMobile ? "low" : "high",
      baseOpacity: isMobile ? 0.75 : 0.88,
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
      className={`${className} overflow-hidden w-full h-full`}
      style={style}
      aria-hidden="true"
    />
  );
};

export default DimensionalScene;
