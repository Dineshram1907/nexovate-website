import React from "react";
import { motion, MotionValue, useTransform } from "motion/react";

interface StorySequenceProps {
  progress: MotionValue<number>;
  steps: {
    range: [number, number]; // active range e.g. [0.0, 0.2]
    content: React.ReactNode;
  }[];
  className?: string;
}

export const StorySequence: React.FC<StorySequenceProps> = ({
  progress,
  steps,
  className = "relative w-full",
}) => {
  return (
    <div className={className}>
      {steps.map((step, idx) => {
        const [start, end] = step.range;
        const mid = (start + end) / 2;

        // Fade in from start to mid, fade out from mid to end
        const opacity = useTransform(
          progress,
          [start, Math.min(start + 0.08, mid), Math.max(end - 0.08, mid), end],
          [0, 1, 1, 0]
        );

        const y = useTransform(
          progress,
          [start, Math.min(start + 0.08, mid), end],
          [20, 0, -20]
        );

        const scale = useTransform(
          progress,
          [start, Math.min(start + 0.08, mid), end],
          [0.96, 1, 0.98]
        );

        return (
          <motion.div
            key={idx}
            style={{ opacity, y, scale }}
            className="w-full"
          >
            {step.content}
          </motion.div>
        );
      })}
    </div>
  );
};
