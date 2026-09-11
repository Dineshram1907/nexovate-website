import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { IMAGE_REGISTRY } from "@/constants/imageRegistry";

const smoothEase = [0.16, 1, 0.3, 1] as const;

interface StudentReview {
  id: string;
  name: string;
  track: string;
  company: string;
  quote: string;
  image: string;
  capstone: string;
}

const VERIFIED_REVIEWS: StudentReview[] = [
  {
    id: "review-priya",
    name: "Priya Sundaram",
    track: "AI & Machine Learning",
    company: "Associate ML Engineer at Cognizant",
    quote:
      "Before Nexovate, I had watched dozens of tutorials on neural networks without ever knowing how to build one for real. My mentor reviewed my pull requests every week, helping me debug transformer architectures until my models ran smoothly in production.",
    image: IMAGE_REGISTRY.reviews.priya,
    capstone: "Real-Time Defect Detection",
  },
  {
    id: "review-arjun",
    name: "Arjun Verma",
    track: "Full Stack Web Engineering",
    company: "Software Engineer at Tech Mahindra",
    quote:
      "The contrast with standard academic lectures is night and day. You don't memorize slides — you build full-stack web applications with React, Node.js, and PostgreSQL. When interviewers asked about system design, I walked them through my live deployed project.",
    image: IMAGE_REGISTRY.reviews.arjun,
    capstone: "Distributed Financial Ledger",
  },
  {
    id: "review-rahul",
    name: "Rahul Nambiar",
    track: "Data Science & Analytics",
    company: "Data Analyst at Fractal Analytics",
    quote:
      "Working with messy real-world datasets and creating production analytics pipelines gave me the confidence to ace technical interviews. Nexovate taught me not just to write Python scripts, but to communicate actionable business decisions.",
    image: IMAGE_REGISTRY.reviews.rahul,
    capstone: "Multi-Echelon Demand Forecasting",
  },
  {
    id: "review-harini",
    name: "Harini Balaji",
    track: "Cloud Architecture & DevOps",
    company: "Cloud Operations Engineer at Infosys",
    quote:
      "Deploying multi-cluster Kubernetes apps with automated Terraform pipelines was hands-on and rigorous. Having an active SRE mentor gave me insights that you simply cannot get from textbook documentation.",
    image: IMAGE_REGISTRY.reviews.harini,
    capstone: "Zero-Downtime Multi-Region Kubernetes",
  },
];

export const ReviewsCarouselSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = VERIFIED_REVIEWS.length;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const current = VERIFIED_REVIEWS[currentIndex];

  return (
    <section
      id="student-experiences"
      aria-label="Section 02: Student Experiences"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative w-full bg-[#FBFAF7] text-[#071A2B] pt-32 pb-36 sm:pt-40 sm:pb-44 overflow-hidden select-none border-t border-[#071A2B]/10"
    >
      <div className="nx-section-container">
        
        {/* Top Header Label & Counter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex items-center justify-between border-b border-[#071A2B]/10 pb-6 mb-16 sm:mb-20"
        >
          <span className="nx-editorial-label text-[#071A2B]/60">
            <span className="w-2 h-2 rounded-full bg-[#11AFC0]" />
            02 — STUDENT EXPERIENCES
          </span>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-mono tracking-widest text-[#071A2B]/60 mr-2">
              0{currentIndex + 1} / 0{total}
            </span>
            <button
              onClick={handlePrev}
              aria-label="Previous student review"
              className="w-10 h-10 rounded-full border border-[#071A2B]/15 bg-white flex items-center justify-center text-[#071A2B] hover:bg-[#071A2B] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next student review"
              className="w-10 h-10 rounded-full border border-[#071A2B]/15 bg-white flex items-center justify-center text-[#071A2B] hover:bg-[#071A2B] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="font-sans font-bold text-[clamp(38px,6vw,92px)] leading-[0.94] tracking-[-0.06em] text-[#071A2B]"
          >
            People don't just learn here. <br />
            <span className="text-[#11AFC0]">They build.</span>
          </motion.h2>
        </div>

        {/* Dominant Editorial Review Card */}
        <div className="relative w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: smoothEase }}
              className="bg-white rounded-[28px] sm:rounded-[36px] p-8 sm:p-14 border border-[#071A2B]/10 shadow-[0_4px_24px_rgba(7,26,43,0.06)] flex flex-col gap-8"
            >
              {/* Star Rating & Track Tag */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-1 text-[#071A2B]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#071A2B] text-[#071A2B]" />
                  ))}
                </div>
                <span className="text-[11px] font-mono tracking-widest text-[#11AFC0] uppercase font-semibold">
                  {current.track}
                </span>
              </div>

              {/* High-Impact Quote */}
              <blockquote className="text-[clamp(18px,2vw,28px)] font-sans font-medium text-[#071A2B] leading-[1.35] tracking-[-0.025em]">
                "{current.quote}"
              </blockquote>

              {/* Author Attribution & Capstone Artifact */}
              <div className="pt-6 border-t border-[#071A2B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#071A2B]/15"
                  />
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-base text-[#071A2B]">
                      {current.name}
                    </span>
                    <span className="text-xs text-[#68747D] font-sans">
                      {current.company}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#071A2B]/60 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC0]" />
                  <span>PROJECT: {current.capstone}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default ReviewsCarouselSection;
