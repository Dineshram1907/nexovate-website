import React from "react";
import { motion } from "motion/react";
import { premiumEase } from "@/lib/motion";

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverLift?: boolean;
}

export const MotionCard: React.FC<MotionCardProps> = ({
  children,
  className = "",
  onClick,
  hoverLift = true,
}) => {
  return (
    <motion.div
      whileHover={
        hoverLift
          ? {
              y: -4,
              transition: { duration: 0.25, ease: premiumEase },
            }
          : undefined
      }
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
};
