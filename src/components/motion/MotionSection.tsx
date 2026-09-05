import React from "react";
import { motion } from "motion/react";
import { premiumEase } from "@/lib/motion";

interface MotionSectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export const MotionSection: React.FC<MotionSectionProps> = ({
  id,
  children,
  className = "",
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: premiumEase }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
