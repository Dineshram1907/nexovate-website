import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Lightbulb, Heart, Star, Check } from "lucide-react";
import { realStudentsGroup } from "@/assets";

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-2xl aspect-[16/10.5] sm:aspect-[16/10] flex items-center justify-center select-none">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#6366F1]/10 via-[#FFFDF9] to-[#F97316]/10 blur-2xl -z-10" />

      {/* Main Real Photography Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full flex items-center justify-center p-2"
      >
        {/* Slightly Rotated Paper Photo Frame */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white transform rotate-1">
          <img
            src={realStudentsGroup}
            alt="Real Nexovate Students Collaborating and Studying Together"
            className="w-full h-full object-cover"
            loading="eager"
          />

          {/* Masking Tape Top Left */}
          <div className="absolute -top-3 left-8 w-14 h-5 bg-[#F97316]/40 -rotate-12 rounded-xs shadow-xs backdrop-blur-xs z-20" />
          {/* Masking Tape Top Right */}
          <div className="absolute -top-3 right-8 w-14 h-5 bg-[#119E9D]/40 rotate-12 rounded-xs shadow-xs backdrop-blur-xs z-20" />

          {/* Floating Sticky Note Checklist Right Side (matching input_file_0.png) */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 4 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-4 right-4 bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-2xl p-3 shadow-lg font-sans text-[11px] text-[#101536] text-left select-none"
          >
            <div className="space-y-1 font-bold">
              <div className="flex items-center gap-1.5 text-[#101536]">
                <Check className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Explore</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#6366F1]">
                <Check className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>Learn</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#F97316]">
                <Check className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Create</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#119E9D]">
                <Check className="w-3.5 h-3.5 text-[#119E9D]" />
                <span>Grow</span>
                <Heart className="w-3 h-3 text-[#F97316] fill-current ml-0.5" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hand-drawn Doodle 1: Lightbulb Left */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -left-2 z-20 w-10 h-10 rounded-2xl bg-white border border-[#F59E0B]/30 shadow-md flex items-center justify-center text-[#F59E0B]"
        >
          <Lightbulb className="w-5 h-5 fill-current" />
        </motion.div>

        {/* Hand-drawn Doodle 2: Star Bottom Right */}
        <motion.div
          animate={{ scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-3 -right-2 z-20 text-[#F59E0B]"
        >
          <Star className="w-6 h-6 fill-current" />
        </motion.div>
      </motion.div>
    </div>
  );
};
