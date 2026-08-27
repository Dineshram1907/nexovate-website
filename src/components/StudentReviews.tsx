"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import {
  arjunAvatar,
  priyaAvatar,
  rahulAvatar,
  hariniAvatar,
  vishalAvatar,
} from "@/assets";

export interface ReviewItem {
  id: string;
  number: string;
  quote: string;
  name: string;
  program: string;
  programIndex: number;
  role: string;
  location: string;
  image: string;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "01",
    number: "01",
    quote:
      "Learning became much more practical once I started working on real projects. Nexovate helped me understand how technology is actually applied beyond the classroom.",
    name: "Arjun Kumar",
    program: "AI & Machine Learning",
    programIndex: 3,
    role: "Engineering Graduate",
    location: "Chennai",
    image: arjunAvatar,
  },
  {
    id: "02",
    number: "02",
    quote:
      "Nexovate helped me connect the things I was learning with projects I could actually build. That made me much more confident in interviews.",
    name: "Priya S",
    program: "Data Science & Analytics",
    programIndex: 4,
    role: "Computer Science Student",
    location: "Coimbatore",
    image: priyaAvatar,
  },
  {
    id: "03",
    number: "03",
    quote:
      "I liked that the focus was on doing, not just watching. Building projects made complex full-stack concepts much easier to understand.",
    name: "Rahul M",
    program: "Full Stack Web Engineering",
    programIndex: 0,
    role: "Software Developer",
    location: "Chennai",
    image: rahulAvatar,
  },
  {
    id: "04",
    number: "04",
    quote:
      "The learning experience felt much closer to what I want to do professionally. The practitioner mentorship made a huge difference.",
    name: "Harini R",
    program: "Cloud & DevOps Architecture",
    programIndex: 5,
    role: "Technology Student",
    location: "Tamil Nadu",
    image: hariniAvatar,
  },
  {
    id: "05",
    number: "05",
    quote:
      "I came in wanting to explore UI/UX and left with a portfolio of live interactive design prototypes I'm genuinely proud of.",
    name: "Vishal K",
    program: "UI/UX & Product Design",
    programIndex: 1,
    role: "Product Design Fellow",
    location: "Chennai",
    image: vishalAvatar,
  },
];

export const StudentReviews: React.FC = () => {
  const { setActiveProgramIndex } = usePresentation();
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const AUTOPLAY_DURATION = 5000; // 5 seconds
  const PROGRESS_INTERVAL = 50; // ms
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextReview = useCallback(() => {
    setActiveReviewIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
    setProgress(0);
  }, []);

  const prevReview = useCallback(() => {
    setActiveReviewIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
    setProgress(0);
  }, []);

  const handleInteraction = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }, []);

  // Autoplay progression timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextVal = prev + (PROGRESS_INTERVAL / AUTOPLAY_DURATION) * 100;
        return nextVal >= 100 ? 100 : nextVal;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  // When progress reaches 100%, switch to next review cleanly
  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
      nextReview();
    }
  }, [progress, nextReview]);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const handleSelectReview = (index: number) => {
    setActiveReviewIndex(index);
    setProgress(0);
    handleInteraction();
  };

  const handleExploreTrack = (index: number) => {
    setActiveProgramIndex(index);
    const element = document.getElementById("programs");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Touch Swipe Handlers
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    handleInteraction();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (deltaX < 0) {
        nextReview();
      } else {
        prevReview();
      }
    }
  };

  const current = REVIEWS_DATA[activeReviewIndex];
  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section
      id="student-reviews"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-notebook-grid text-[#101536] select-none border-b border-[#101536]/06 overflow-x-clip scroll-mt-20 font-sans"
      onMouseEnter={handleInteraction}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Faint Watermark Quote & Curve */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none text-[320px] font-serif leading-none text-[#101536]">
        “
      </div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#119E9D]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#101536]/08 gap-2">
          <div className="text-left">
            <span className="text-xs font-bold tracking-[0.2em] text-[#6366F1] uppercase block mb-1">
              STUDENT STORIES & OUTCOMES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#101536] leading-tight font-jakarta">
              STUDENT REVIEWS<span className="text-[#F97316]">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs sm:text-sm text-[#5E6675] font-medium hidden sm:block">
              Verified feedback from learners who built and shipped real capstones with Nexovate.
            </p>
            {/* Arrows */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  prevReview();
                  handleInteraction();
                }}
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-xl bg-white border border-[#101536]/10 flex items-center justify-center text-[#101536] hover:bg-[#101536] hover:text-white transition-colors cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  nextReview();
                  handleInteraction();
                }}
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-xl bg-white border border-[#101536]/10 flex items-center justify-center text-[#101536] hover:bg-[#101536] hover:text-white transition-colors cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* FEATURED TESTIMONIAL DISPLAY */}
        <div className="bg-white border border-[#101536]/10 rounded-3xl p-6 sm:p-10 shadow-lg mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: cubicEase }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
            >
              {/* LEFT 40% — Large Student Portrait */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden shadow-xl border-2 border-[#101536]/08 bg-[#0B1028]">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#101536]/80 backdrop-blur-sm text-[10px] font-bold text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#119E9D]" />
                    <span>VERIFIED LEARNER</span>
                  </div>
                </div>
              </div>

              {/* RIGHT 60% — 5 Gold Stars, Featured Quote & Student Info */}
              <div className="lg:col-span-7 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-1 text-[#EFAF32] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#EFAF32]" />
                    ))}
                  </div>

                  <blockquote className="text-base sm:text-xl lg:text-2xl font-serif font-medium text-[#101536] leading-relaxed mb-6 italic">
                    "{current.quote}"
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-[#101536]/08 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#101536] font-jakarta">
                      {current.name}
                    </h3>
                    <p className="text-xs text-[#5E6675]">
                      {current.role} • {current.location}
                    </p>
                  </div>

                  <button
                    onClick={() => handleExploreTrack(current.programIndex)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#6366F1]/10 text-[#6366F1] hover:bg-[#6366F1] hover:text-white transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <span>Track: {current.program}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM: 5-Avatar Selector & Progress Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {REVIEWS_DATA.map((item, idx) => {
              const isActive = activeReviewIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectReview(idx)}
                  className={`relative rounded-full overflow-hidden transition-all duration-300 focus:outline-none cursor-pointer ${
                    isActive
                      ? "w-11 h-11 sm:w-12 sm:h-12 ring-2 ring-[#6366F1] ring-offset-2 scale-110 shadow-sm"
                      : "w-8 h-8 sm:w-9 sm:h-9 opacity-45 hover:opacity-100 hover:scale-105"
                  }`}
                  aria-label={`View review by ${item.name}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-[#5E6675]/80 uppercase">
              0{activeReviewIndex + 1} / 0{REVIEWS_DATA.length}
            </span>
            <div className="w-28 sm:w-40 h-1 bg-[#101536]/08 rounded-full overflow-hidden">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#6366F1] to-[#F97316] rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
