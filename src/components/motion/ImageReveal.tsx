import React from "react";
import { motion } from "motion/react";
import { premiumEase } from "@/lib/motion";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  variant?: "clip" | "scale" | "fade";
  delay?: number;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = "",
  imgClassName = "w-full h-full object-cover",
  variant = "clip",
  delay = 0,
}) => {
  if (variant === "clip") {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, delay, ease: premiumEase }}
          className="w-full h-full"
        >
          <img src={src} alt={alt} className={imgClassName} loading="lazy" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, delay, ease: premiumEase }}
        className={imgClassName}
        loading="lazy"
      />
    </div>
  );
};
