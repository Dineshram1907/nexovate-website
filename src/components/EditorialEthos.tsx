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
      className="relative w-full py-[var(--section-space)] px-[var(--page-padding)] bg-[#F7F6F2] text-[#0F1535] select-none font-sans overflow-hidden border-b border-[#0F1535]/08 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto w-full text-left">
        <MaskedLineReveal
          lines={["The Nexovate story."]}
          className="text-[clamp(28px,6vw,56px)] font-black tracking-[-0.035em] leading-tight text-[#0F1535] font-jakarta mb-12 sm:mb-16"
          tag="h2"
        />

        {/* 4-Chapter Vertical Story Progression with Staggered In-View Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 pt-8 border-t border-[#0F1535]/10">
          {chapters.map((ch, idx) => (
            <motion.div
              key={ch.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: idx * 0.1, ease: premiumEase }}
              className="flex flex-col items-start"
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0F1535] font-jakarta mb-2 sm:mb-3">
                {ch.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#576071] leading-relaxed font-normal max-w-[48ch]">
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


