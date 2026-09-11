import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export const IntroSection: React.FC = () => {
  return (
    <section
      id="intro"
      aria-label="Section 01: Nexovate"
      className="relative w-full bg-[#F6F5F0] text-[#071A2B] pt-32 pb-36 sm:pt-40 sm:pb-44 overflow-hidden select-none"
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
              01 — NEXOVATE
            </span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#071A2B]/40 hidden sm:inline-block">
              PRACTITIONER PLATFORM
            </span>
          </motion.div>

          {/* Asymmetrical 12-Col Headline */}
          <div className="col-span-12 lg:col-span-10 xl:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease: smoothEase }}
              className="font-sans font-bold text-[clamp(44px,7.2vw,128px)] leading-[0.92] tracking-[-0.065em] text-[#071A2B] mb-12 sm:mb-16"
            >
              <span className="block">Learn something.</span>
              <span className="block mt-2">Build something.</span>
              <span className="block mt-2 text-[#11AFC0] nx-serif-accent font-normal">
                Make it matter.
              </span>
            </motion.h2>
          </div>

          {/* Empty spacer for asymmetrical breathing room */}
          <div className="hidden lg:block lg:col-span-2 xl:col-span-3" />

          {/* Supporting Statement & Direct CTA */}
          <div className="col-span-12 lg:col-start-7 lg:col-span-6 xl:col-start-7 xl:col-span-5 mt-4 sm:mt-6">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
              className="flex flex-col gap-8"
            >
              <p className="text-[clamp(17px,1.4vw,20px)] text-[#68747D] font-normal leading-[1.5] tracking-[-0.015em]">
                Nexovate helps you turn practical skills into real work — through guided learning, hands-on projects, and a community built around making.
              </p>
              
              <div>
                <Link
                  to="/programs"
                  className="nx-btn-secondary group"
                  aria-label="Explore Nexovate Programs"
                >
                  <span>EXPLORE PROGRAMS</span>
                  <span className="nx-btn-arrow text-base leading-none">→</span>
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;
