import React from "react";
import { motion } from "motion/react";
import { premiumEase } from "@/lib/motion";

interface SectionRevealProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  id,
  children,
  className = "",
  delay = 0,
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: premiumEase,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
