import React from "react";
import { motion, MotionValue, useTransform } from "motion/react";

interface ScrollImageProps {
  progress: MotionValue<number>;
  range?: [number, number]; // e.g. [0.1, 0.5]
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  scaleRange?: [number, number];
}

export const ScrollImage: React.FC<ScrollImageProps> = ({
  progress,
  range = [0.1, 0.45],
  src,
  alt,
  className = "w-full h-full overflow-hidden",
  imgClassName = "w-full h-full object-cover",
  scaleRange = [1.08, 1],
}) => {
  const [start, end] = range;

  const clipProgress = useTransform(progress, [start, end], [100, 0]);
  const scale = useTransform(progress, [start, end], scaleRange);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  const clipPath = useTransform(clipProgress, (val) => `inset(0 ${val}% 0 0)`);

  return (
    <div className={className}>
      <motion.div
        style={{
          clipPath,
          opacity,
          scale,
        }}
        className="w-full h-full"
      >
        <img src={src} alt={alt} className={imgClassName} loading="lazy" />
      </motion.div>
    </div>
  );
};
