import React from "react";
import { motion, MotionValue, useTransform } from "motion/react";

interface ParallaxLayerProps {
  progress: MotionValue<number>;
  speed?: number; // e.g. -50 to 50
  children: React.ReactNode;
  className?: string;
  horizontal?: boolean;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  progress,
  speed = 30,
  children,
  className = "",
  horizontal = false,
}) => {
  const transformVal = useTransform(progress, [0, 1], [-speed, speed]);

  return (
    <motion.div
      style={{
        [horizontal ? "x" : "y"]: transformVal,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
