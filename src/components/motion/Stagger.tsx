import React from "react";
import { motion } from "motion/react";
import { premiumEase } from "@/lib/motion";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  className = "",
  staggerDelay = 0.08,
  delayChildren = 0.0,
  once = true,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerChildProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export const StaggerChild: React.FC<StaggerChildProps> = ({
  children,
  className = "",
  yOffset = 20,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: premiumEase,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
