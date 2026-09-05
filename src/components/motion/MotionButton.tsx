import React from "react";
import { motion } from "motion/react";
import { premiumEase } from "@/lib/motion";

interface MotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const MotionButton: React.FC<MotionButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: premiumEase }}
      className={`cursor-pointer ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};
