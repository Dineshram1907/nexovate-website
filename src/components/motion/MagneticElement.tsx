import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Maximum offset in px (default 6px)
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * MagneticElement — Applies restrained physical magnetic attraction to interactive targets.
 * Clamped to 4-8px maximum to avoid disorienting motion.
 */
export const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  className = "",
  strength = 6,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 260, mass: 0.2 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    x.set(deltaX * strength);
    y.set(deltaY * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ x: smoothX, y: smoothY }}
      className={`inline-block ${className}`}
      data-cursor="pointer"
    >
      {children}
    </motion.div>
  );
};
