import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import { premiumEase } from "@/lib/motion";

export interface ScrollSceneProps {
  children: (progress: MotionValue<number>) => React.ReactNode;
  className?: string;
  height?: string; // e.g. "min-h-[150vh]" or "h-auto"
  offset?: ["start end" | "start start" | "start center", "end start" | "end end" | "end center"];
}

/**
 * ScrollScene wraps a container and provides continuous scroll progress (0 -> 1)
 * directly tied to native window scrolling.
 */
export const ScrollScene: React.FC<ScrollSceneProps> = ({
  children,
  className = "relative w-full",
  height,
  offset = ["start end", "end start"],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className={`${height || ""} ${className}`}>
      {children(smoothProgress)}
    </div>
  );
};
