import React from "react";
import { motion } from "motion/react";
import { MaskedLineReveal } from "@/components/motion/EditorialMotion";
import { premiumEase } from "@/lib/motion";

export const EditorialEthos: React.FC = () => {
  const chapters = [
    {
      step: "01",
      title: "Why We Exist",
      body: "Traditional engineering education focuses on theoretical definitions that prepare students for multiple-choice exams. High-growth technology teams hire for demonstrable code quality, distributed system architecture, and production readiness.",
    },
    {
      step: "02",
      title: "How We Teach",
      body: "We do not use pre-recorded slides or superficial multiple-choice quizzes. Students work directly in Git repositories, submitting weekly pull requests that receive granular line-by-line critiques from active senior engineers.",
    },
    {
      step: "03",
      title: "What We Believe",
      body: "We believe that true confidence comes from shipping software that actually runs in the wild. When a student deploys a live Kubernetes cluster or an AI inference pipeline, their technical identity permanently shifts.",
    },
    {
      step: "04",
      title: "Where We're Going",
      body: "We are partnering with leading university campuses to install applied Centers of Excellence, bridging higher education and real enterprise talent pipelines across artificial intelligence, cloud, and modern software design.",
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-12 sm:py-16 md:py-[var(--section-space)] px-4 sm:px-6 md:px-[var(--page-padding)] bg-[#F7F6F2] text-[#0F1535] select-none font-sans overflow-hidden border-b border-[#0F1535]/08 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto w-full text-left">
        <div className="flex flex-row items-end justify-between mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-[#0F1535]/10 gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#119E9D] uppercase block mb-1 sm:mb-2">
              OUR PHILOSOPHY
            </span>
            <MaskedLineReveal
              lines={["The Nexovate story."]}
              className="text-[clamp(26px,5.5vw,52px)] font-black tracking-[-0.035em] leading-tight text-[#0F1535] font-jakarta"
              tag="h2"
            />
          </div>
          <span className="text-xs font-mono text-[#576071] uppercase tracking-widest hidden sm:block">
            4 PRINCIPLES
          </span>
        </div>

        {/* ── MOBILE HORIZONTAL CHAPTER CAROUSEL (<= 768px) ── */}
        <div className="block md:hidden w-full">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 pt-1 -mx-4 px-4">
            {chapters.map((ch) => (
              <article
                key={ch.step}
                className="snap-start shrink-0 w-[84vw] max-w-[320px] bg-white border border-[#0F1535]/08 rounded-2xl p-5 flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-full bg-[#119E9D]/10 text-[#119E9D] font-mono font-bold text-xs flex items-center justify-center">
                      {ch.step}
                    </span>
                    <span className="text-[10px] font-mono text-[#576071] tracking-wider uppercase">
                      CHAPTER {ch.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#0F1535] font-jakarta mb-2">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-[#576071] leading-relaxed font-normal">
                    {ch.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 px-1 text-[10px] font-mono text-[#576071]">
            <span>← SWIPE TO READ STORY →</span>
            <span>4 CHAPTERS</span>
          </div>
        </div>

        {/* ── DESKTOP 2x2 COMPACT GRID (>= 768px) ── */}
        <div className="hidden md:grid grid-cols-2 gap-8 lg:gap-12">
          {chapters.map((ch, idx) => (
            <motion.div
              key={ch.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: premiumEase }}
              className="flex flex-col items-start p-6 rounded-2xl bg-white border border-[#0F1535]/06 shadow-xs"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-7 h-7 rounded-full bg-[#119E9D]/10 text-[#119E9D] font-mono font-bold text-xs flex items-center justify-center">
                  {ch.step}
                </span>
                <span className="text-[10px] font-mono text-[#576071] uppercase tracking-wider">
                  PRINCIPLE {ch.step}
                </span>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-[#0F1535] font-jakarta mb-2">
                {ch.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#576071] leading-relaxed font-normal max-w-[44ch]">
                {ch.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorialEthos;


