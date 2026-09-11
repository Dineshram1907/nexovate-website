import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGE_REGISTRY } from "@/constants/imageRegistry";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const SPOTLIGHT_STORIES = [
  {
    id: "spotlight-01",
    quote: "I stopped collecting certificates and started building things.",
    details: "Real engineering growth isn't measured in course completion bars. It's measured by the software you deploy, the bugs you isolate, and the architectures you stand behind in front of technical leaders.",
    name: "Vishal Krishnamurthy",
    role: "Full-Stack Practitioner Fellow",
    company: "Nexovate Applied Cohort 2025",
    image: IMAGE_REGISTRY.experience.activeCohortCollaboration,
  },
  {
    id: "spotlight-02",
    quote: "Building real models in production taught me 10x more than any textbook.",
    details: "Debugging live inference latency, fine-tuning open-weights models, and deploying FastAPI microservices on cloud instances bridged the gap between theory and high-paying engineering roles.",
    name: "Priya Sundaram",
    role: "Associate Machine Learning Engineer",
    company: "Cognizant",
    image: IMAGE_REGISTRY.reviews.priya,
  },
  {
    id: "spotlight-03",
    quote: "My interviewer didn't look at my GPA. He looked at my deployed GitHub project.",
    details: "Walking through architectural choices, Redis caching layers, and database indexing during the technical round made the hiring decision effortless for the engineering director.",
    name: "Arjun Verma",
    role: "Software Development Engineer",
    company: "Tech Mahindra",
    image: IMAGE_REGISTRY.reviews.arjun,
  },
  {
    id: "spotlight-04",
    quote: "The practitioner mentorship gives you answers no AI prompt can formulate.",
    details: "Having a senior DevOps lead explain why distributed clusters fail during high concurrency gave me architectural intuition that transformed my entire perspective on system design.",
    name: "Harini Balaji",
    role: "Cloud Operations Engineer",
    company: "Infosys",
    image: IMAGE_REGISTRY.reviews.harini,
  },
];

export const ReviewSpotlightSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = SPOTLIGHT_STORIES.length;
  const current = SPOTLIGHT_STORIES[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % total);
  };

  return (
    <section
      id="spotlight"
      aria-label="Section 06: Practitioner Spotlight"
      className="relative w-full bg-[#071A2B] text-white pt-32 pb-36 sm:pt-40 sm:pb-48 overflow-hidden select-none border-t border-white/10"
    >
      <div className="nx-section-container">
        
        {/* Top Header Label & Counter Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex items-center justify-between border-b border-white/10 pb-6 mb-16 sm:mb-24"
        >
          <span className="nx-editorial-label text-white/70">
            <span className="w-2 h-2 rounded-full bg-[#11AFC0]" />
            06 — PRACTITIONER VOICES
          </span>

          <div className="flex items-center gap-3">
            <span className="text-[12px] font-mono tracking-widest text-white/60 mr-2">
              0{activeIdx + 1} / 0{total}
            </span>
            <button
              onClick={handlePrev}
              aria-label="Previous story"
              className="w-10 h-10 rounded-full border border-white/20 bg-[#102B40] flex items-center justify-center text-white hover:bg-white hover:text-[#071A2B] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next story"
              className="w-10 h-10 rounded-full border border-white/20 bg-[#102B40] flex items-center justify-center text-white hover:bg-white hover:text-[#071A2B] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Magazine-Style Editorial Spread */}
        <div className="nx-editorial-grid items-center gap-12 lg:gap-16">
          
          {/* Left Column: Dominant Portrait Asset */}
          <div className="col-span-12 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.65, ease: smoothEase }}
                className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-[#102B40] border border-white/10 shadow-2xl"
              >
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/85 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                  <span className="text-[11px] font-mono tracking-widest text-white/90 uppercase">
                    {current.name}
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-[#72D5DC] uppercase">
                    ACTIVE PRACTITIONER
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: High-Impact Editorial Pull Quote */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center gap-8 lg:pl-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: smoothEase }}
                className="flex flex-col gap-6"
              >
                <span className="text-4xl sm:text-6xl text-[#11AFC0] font-serif leading-none">“</span>
                
                <blockquote className="text-[clamp(24px,2.8vw,42px)] font-sans font-medium text-white leading-[1.2] tracking-[-0.035em]">
                  {current.quote}
                </blockquote>

                <p className="text-[clamp(16px,1.2vw,19px)] text-white/70 font-normal leading-relaxed max-w-xl">
                  {current.details}
                </p>

                <div className="pt-8 border-t border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#11AFC0]/20 border border-[#11AFC0]/40 flex items-center justify-center text-[#72D5DC] font-mono text-xs font-bold">
                    NX
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white tracking-tight">
                      {current.name} — {current.role}
                    </span>
                    <span className="text-xs text-white/50 font-mono tracking-wider uppercase">
                      {current.company}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ReviewSpotlightSection;
