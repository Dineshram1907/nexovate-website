import React from "react";
import { motion } from "motion/react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export const BeliefSection: React.FC = () => {
  return (
    <section
      id="belief"
      aria-label="Section 01: The Belief"
      className="relative w-full bg-[#F6F5F0] text-[#071A2B] pt-32 pb-36 sm:pt-40 sm:pb-48 overflow-hidden select-none"
    >
      <div className="nx-section-container">
        <div className="nx-editorial-grid">
          
          {/* Top Label & Coordinate Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="col-span-12 flex items-center justify-between border-b border-[#071A2B]/10 pb-6 mb-16 sm:mb-24"
          >
            <span className="nx-editorial-label text-[#071A2B]/60">
              <span className="w-2 h-2 rounded-full bg-[#11AFC0]" />
              01 — THE BELIEF
            </span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#071A2B]/40 hidden sm:inline-block">
              PHILOSOPHY / 2026
            </span>
          </motion.div>

          {/* Asymmetrical 12-Col Headline & Narrative Composition */}
          <div className="col-span-12 lg:col-span-10 xl:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease: smoothEase }}
              className="font-sans font-bold text-[clamp(46px,7.5vw,136px)] leading-[0.92] tracking-[-0.065em] text-[#071A2B] mb-12 sm:mb-16"
            >
              <span className="block">Knowing isn't the destination.</span>
              <span className="block mt-2 sm:mt-3">
                <span className="text-[#11AFC0]">Building</span> is.
              </span>
            </motion.h2>
          </div>

          {/* Empty spacer for deliberate asymmetrical breathing room */}
          <div className="hidden lg:block lg:col-span-2 xl:col-span-3" />

          {/* Secondary Editorial Paragraph & Principle Note (Offset Column Span) */}
          <div className="col-span-12 lg:col-start-7 lg:col-span-6 xl:col-start-7 xl:col-span-5 mt-4 sm:mt-8">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
              className="flex flex-col gap-6"
            >
              <p className="text-[clamp(17px,1.4vw,21px)] text-[#68747D] font-normal leading-[1.5] tracking-[-0.015em]">
                At Nexovate, learning doesn't end with understanding. It begins when you turn what you know into something real.
              </p>
              
              <div className="pt-6 border-t border-[#071A2B]/10 flex items-center justify-between text-[12px] font-sans tracking-wide text-[#071A2B]/60">
                <span className="font-semibold uppercase tracking-[0.14em]">PRACTITIONER-LED</span>
                <span className="text-[#071A2B]/40 font-mono">01 // 06</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeliefSection;
