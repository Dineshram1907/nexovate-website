import React from "react";
import { motion, MotionValue, useTransform } from "motion/react";

interface ScrollTextProps {
  progress: MotionValue<number>;
  range?: [number, number]; // e.g. [0.1, 0.35]
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export const ScrollText: React.FC<ScrollTextProps> = ({
  progress,
  range = [0.1, 0.35],
  children,
  className = "",
  yOffset = 24,
}) => {
  const [start, end] = range;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [yOffset, 0]);

  return (
    <motion.div
      style={{
        opacity,
        y,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
