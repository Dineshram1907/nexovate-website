import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export const FinalCTASection: React.FC = () => {
  return (
    <section
      id="final-cta"
      aria-label="Section 08: Your Turn"
      className="relative w-full bg-[#071A2B] text-white pt-36 pb-40 sm:pt-48 sm:pb-56 overflow-hidden select-none border-t border-white/10"
    >
      <div className="nx-section-container text-center flex flex-col items-center">
        
        {/* Top Editorial Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="inline-flex items-center justify-center gap-2 mb-12"
        >
          <span className="nx-editorial-label text-white/60">
            <span className="w-2 h-2 rounded-full bg-[#11AFC0]" />
            08 — YOUR TURN
          </span>
        </motion.div>

        {/* Monumental Headline */}
        <div className="max-w-5xl mb-8 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: smoothEase }}
            className="font-sans font-extrabold text-[clamp(54px,9.5vw,144px)] leading-[0.90] tracking-[-0.075em] text-white"
          >
            WHAT WILL <br />
            <span className="text-[#11AFC0]">YOU BUILD?</span>
          </motion.h2>
        </div>

        {/* Supporting Narrative Line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: smoothEase }}
          className="text-[clamp(17px,1.4vw,22px)] text-white/70 font-normal leading-relaxed max-w-lg mb-12"
        >
          Start with the skill. Leave with something real.
        </motion.p>

        {/* Single Premium CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: 0.2, ease: smoothEase }}
        >
          <Link
            to="/programs"
            className="nx-btn-primary nx-btn-primary-light"
            aria-label="Explore Nexovate Programs"
          >
            <span>EXPLORE PROGRAMS</span>
            <span className="nx-btn-arrow text-lg leading-none">→</span>
          </Link>
        </motion.div>

        {/* Quiet Footnote Detail */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-[12px] font-mono tracking-widest text-white/40 uppercase"
        >
          APPLICATIONS OPEN FOR UPCOMING PRACTITIONER COHORTS
        </motion.p>

      </div>
    </section>
  );
};

export default FinalCTASection;
