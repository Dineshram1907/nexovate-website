import React from "react";
import { motion } from "motion/react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export const PeopleSection: React.FC = () => {
  return (
    <section
      id="people"
      aria-label="Section 05: People"
      className="relative w-full bg-[#071A2B] text-[#FFFFFF] pt-32 pb-36 sm:pt-40 sm:pb-48 overflow-hidden select-none"
    >
      <div className="nx-section-container">
        
        {/* Top Header Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex items-center justify-between border-b border-white/10 pb-6 mb-16 sm:mb-24"
        >
          <span className="nx-editorial-label text-white/70">
            <span className="w-2 h-2 rounded-full bg-[#11AFC0]" />
            05 — PEOPLE
          </span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-white/40 hidden sm:inline-block">
            PRACTITIONER VOICES
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="font-sans font-bold text-[clamp(40px,6.5vw,104px)] leading-[0.94] tracking-[-0.06em] text-white"
          >
            Built by people <br />
            <span className="text-[#72D5DC]">who wanted more</span> <br />
            from learning.
          </motion.h2>
        </div>

        {/* Magazine-Style Editorial Spread */}
        <div className="nx-editorial-grid items-center gap-12 lg:gap-16">
          
          {/* Left Column: Dominant Portrait Asset */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 1.04, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease: smoothEase }}
              className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-[#102B40] border border-white/10 shadow-2xl"
            >
              <img
                src="/brand-creator.jpg"
                alt="Nexovate engineering mentor and builder"
                className="w-full h-full object-cover object-top filter grayscale-[25%] contrast-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                <span className="text-[11px] font-mono tracking-widest text-white/90 uppercase">
                  PRACTITIONER COMMUNITY
                </span>
                <span className="text-[11px] font-mono tracking-widest text-[#72D5DC] uppercase">
                  ACTIVE FELLOW
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Impact Editorial Pull Quote & Manifesto Note */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-7 flex flex-col justify-center gap-8 lg:pl-6">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: 0.15, ease: smoothEase }}
              className="flex flex-col gap-6"
            >
              <span className="text-4xl sm:text-6xl text-[#11AFC0] font-serif leading-none">“</span>
              
              <blockquote className="text-[clamp(24px,2.8vw,42px)] font-sans font-medium text-white leading-[1.2] tracking-[-0.035em]">
                I stopped collecting certificates and started building things.
              </blockquote>

              <p className="text-[clamp(16px,1.2vw,19px)] text-white/70 font-normal leading-relaxed max-w-xl">
                Real engineering growth isn't measured in course completion bars. It's measured by the software you deploy, the bugs you isolate, and the architectures you stand behind.
              </p>

              <div className="pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#11AFC0]/20 border border-[#11AFC0]/40 flex items-center justify-center text-[#72D5DC] font-mono text-xs font-bold">
                  NX
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white tracking-tight">
                    Engineering Practitioner Fellowship
                  </span>
                  <span className="text-xs text-white/50 font-mono tracking-wider uppercase">
                    Nexovate Applied Cohorts
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PeopleSection;
