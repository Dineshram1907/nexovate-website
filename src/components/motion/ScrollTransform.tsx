import React from "react";
import { motion, MotionValue, useTransform } from "motion/react";

interface ScrollTransformProps {
  progress: MotionValue<number>;
  inputRange: number[]; // e.g. [0, 0.5, 1]
  outputX?: (string | number)[];
  outputY?: (string | number)[];
  outputScale?: number[];
  outputRotate?: number[];
  outputOpacity?: number[];
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollTransform: React.FC<ScrollTransformProps> = ({
  progress,
  inputRange,
  outputX,
  outputY,
  outputScale,
  outputRotate,
  outputOpacity,
  children,
  className = "",
  style = {},
}) => {
  const x = outputX ? useTransform(progress, inputRange, outputX) : undefined;
  const y = outputY ? useTransform(progress, inputRange, outputY) : undefined;
  const scale = outputScale ? useTransform(progress, inputRange, outputScale) : undefined;
  const rotate = outputRotate ? useTransform(progress, inputRange, outputRotate) : undefined;
  const opacity = outputOpacity ? useTransform(progress, inputRange, outputOpacity) : undefined;

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotate,
        opacity,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
