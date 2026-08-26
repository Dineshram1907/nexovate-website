import React from "react";
import { motion } from "framer-motion";

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-2xl aspect-[16/9] flex items-center justify-center">
      {/* Background Subtle Portal Glow Aura */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#119E9D]/10 via-[#FAFBFC] to-[#EFAF32]/10 blur-3xl -z-10" />

      {/* Uncontained Cinematic Portal Visual with Subtle Motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full relative flex items-center justify-center"
        >
          <img
            src="/hero-cinematic-portal.png"
            alt="Nexovate — Student Walking Through Architectural Technology Portal"
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
