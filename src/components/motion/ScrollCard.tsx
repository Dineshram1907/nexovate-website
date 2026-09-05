import React from "react";
import { motion, MotionValue, useTransform } from "motion/react";

interface ScrollCardProps {
  progress: MotionValue<number>;
  entryRange: [number, number]; // e.g. [0.1, 0.4]
  fromSide?: "left" | "right" | "bottom" | "top";
  distance?: number;
  rotation?: number;
  scaleRange?: [number, number];
  children: React.ReactNode;
  className?: string;
}

export const ScrollCard: React.FC<ScrollCardProps> = ({
  progress,
  entryRange,
  fromSide = "right",
  distance = 180,
  rotation = 2,
  scaleRange = [0.94, 1],
  children,
  className = "",
}) => {
  const [start, end] = entryRange;

  const xVal =
    fromSide === "right"
      ? [distance, 0]
      : fromSide === "left"
      ? [-distance, 0]
      : [0, 0];

  const yVal =
    fromSide === "bottom"
      ? [distance, 0]
      : fromSide === "top"
      ? [-distance, 0]
      : [0, 0];

  const rotVal = fromSide === "right" ? [rotation, 0] : fromSide === "left" ? [-rotation, 0] : [0, 0];

  const x = useTransform(progress, [start, end], xVal);
  const y = useTransform(progress, [start, end], yVal);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], scaleRange);
  const rotate = useTransform(progress, [start, end], rotVal);

  return (
    <motion.div
      style={{
        x,
        y,
        opacity,
        scale,
        rotate,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
