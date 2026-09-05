import { useScroll, useTransform, MotionValue } from "motion/react";
import React from "react";

export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  distance: number = 50,
  offset: [string, string] = ["start end", "end start"]
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}
