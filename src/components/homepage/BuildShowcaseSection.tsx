import React from "react";
import { motion } from "motion/react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export const BuildShowcaseSection: React.FC = () => {
  return (
    <section
      id="what-you-can-build"
      aria-label="Section 03: What You Can Build"
      className="relative w-full bg-[#071A2B] text-white pt-32 pb-36 sm:pt-40 sm:pb-44 overflow-hidden select-none"
    >
      <div className="nx-section-container">
        
        {/* Top Header Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex items-center justify-between border-b border-white/10 pb-6 mb-16 sm:mb-20"
        >
          <span className="nx-editorial-label text-white/70">
            <span className="w-2 h-2 rounded-full bg-[#11AFC0]" />
            03 — WHAT YOU CAN BUILD
          </span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-white/40 hidden sm:inline-block">
            TANGIBLE ARTIFACTS
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="font-sans font-bold text-[clamp(40px,6vw,96px)] leading-[0.94] tracking-[-0.06em] text-white"
          >
            Don't just learn the skill. <br />
            <span className="text-[#72D5DC]">Use it.</span>
          </motion.h2>
        </div>

        {/* Single Dominant Project Showcase (16:9 Cinematic Asset) */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: smoothEase }}
          className="relative w-full max-w-[1400px] mx-auto aspect-[16/9] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#102B40] shadow-2xl border border-white/15 group"
        >
          <img
            src="/assets/discovery/discovery-stage-robotics.jpg"
            alt="Autonomous robotics and full-stack telemetry interface built by Nexovate engineering practitioners"
            className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/90 via-[#071A2B]/20 to-transparent pointer-events-none" />

          {/* Top Corner Metadata */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-3 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-white text-[#071A2B] text-[11px] font-mono font-bold tracking-widest uppercase">
              PROJECT / 01
            </span>
            <span className="text-white/80 text-[11px] font-mono tracking-widest uppercase hidden sm:inline-block">
              ENGINEERING ARTIFACT
            </span>
          </div>

          {/* Bottom Editorial Information Bar */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
            <div className="flex flex-col gap-1.5 max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#72D5DC]">
                INTELLIGENT TELEMETRY SYSTEM
              </span>
              <h3 className="text-xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                Autonomous Perception & Real-Time Telemetry Interface
              </h3>
            </div>

            {/* Micro Metadata Tags */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-mono tracking-wider">
                WEB EXPERIENCE
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-mono tracking-wider">
                PRODUCT DESIGN
              </span>
              <span className="px-3 py-1 rounded-full bg-[#11AFC0]/30 backdrop-blur-md border border-[#11AFC0]/40 text-[#72D5DC] text-[11px] font-mono tracking-wider">
                NEXOVATE
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BuildShowcaseSection;
