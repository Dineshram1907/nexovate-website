import React from "react";
import { motion, useInView } from "motion/react";
import { premiumEase } from "@/lib/motion";

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  once?: boolean;
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  className = "",
  delay = 0,
  yOffset = 24,
  once = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: premiumEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
