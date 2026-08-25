"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { useHorizontalSwipe } from "@/hooks/useHorizontalSwipe";

// DEMO TESTIMONIALS — Replace with verified student reviews and approved photos before launch.

interface ReviewItem {
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
    programIndex: 0,
    role: "Engineering Graduate",
    location: "Chennai",
    image: "/reviews/arjun.jpg",
  },
  {
    id: "02",
    number: "02",
    quote:
      "Nexovate helped me connect the things I was learning with projects I could actually build. That made me much more confident.",
    name: "Priya S",
    program: "Data Science & Analytics",
    programIndex: 2,
    role: "Computer Science Student",
    location: "Coimbatore",
    image: "/reviews/priya.jpg",
  },
  {
    id: "03",
    number: "03",
    quote:
      "I liked that the focus was on doing, not just watching. Building projects made the concepts much easier to understand.",
    name: "Rahul M",
    program: "Full Stack Development",
    programIndex: 1,
    role: "Software Developer",
    location: "Chennai",
    image: "/reviews/rahul.jpg",
  },
  {
    id: "04",
    number: "04",
    quote:
      "The learning experience felt much closer to what I want to do professionally. The practical approach made a real difference.",
    name: "Harini R",
    program: "Emerging Technologies",
    programIndex: 5,
    role: "Technology Student",
    location: "Tamil Nadu",
    image: "/reviews/harini.jpg",
  },
  {
    id: "05",
    number: "05",
    quote:
      "I came in wanting to learn a technology and left with a clearer direction for what I wanted to build next.",
    name: "Vishal K",
    program: "Cloud Computing & DevOps",
    programIndex: 3,
    role: "Systems Engineer",
    location: "Chennai",
    image: "/reviews/vishal.jpg",
  },
];

export const StudentReviews: React.FC = () => {
  const { goToSection, setActiveProgramIndex } = usePresentation();
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

  // Responsive Horizontal Swipe Hook (Low distance threshold + velocity support)
  const { containerRef, dragOffset, handlers } = useHorizontalSwipe({
    onNext: nextReview,
    onPrev: prevReview,
    onInteraction: handleInteraction,
    dragDistanceThreshold: 30,
    velocityThreshold: 0.2,
    trackpadThreshold: 35,
  });

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
    goToSection(2); // Slide 03 Programs
  };

  const current = REVIEWS_DATA[activeReviewIndex];
  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section
      id="reviews"
      ref={containerRef}
      data-horizontal-carousel="true"
      tabIndex={0}
      {...handlers}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000);
      }}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative w-full min-h-[100svh] lg:h-full flex flex-col justify-center py-10 sm:py-14 px-4 sm:px-8 lg:px-16 overflow-hidden bg-[#FAFBFC] text-[#101536] select-none border-b border-[#101536]/08 focus:outline-none cursor-grab active:cursor-grabbing touch-pan-y"
    >
      {/* Background Faint Watermark Quote & Curve */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none text-[320px] font-serif leading-none text-[#101536]">
        “
      </div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#119E9D]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 pb-2.5 border-b border-[#101536]/08 gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#119E9D] uppercase block mb-1">
              SLIDE 06 // STUDENT STORIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#101536] leading-tight">
              THE PEOPLE BEHIND THE PROGRESS<span className="text-[#EFAF32]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5E6675] font-light">
            Real learning should leave a real impact.
          </p>
        </div>

        {/* FEATURED TESTIMONIAL DISPLAY WITH LIVE DRAG FEEDBACK */}
        <div
          style={{
            transform: dragOffset ? `translateX(${dragOffset}px)` : "none",
            transition: dragOffset ? "none" : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: cubicEase }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
            >
              {/* LEFT 40% — Large Student Portrait */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden shadow-xl border-2 border-[#101536]/08 bg-[#F1F2EF]">
                  <motion.div
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: cubicEase }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={current.image}
                      alt={current.name}
                      fill
                      sizes="(max-width: 1024px) 240px, 320px"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#101536]/80 backdrop-blur-sm text-[8px] font-mono text-white flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-[#119E9D]" />
                      <span>VERIFIED</span>
                    </div>
                  </motion.div>
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

                  <blockquote className="text-base sm:text-xl lg:text-2xl font-serif font-medium text-[#101536] leading-relaxed mb-4">
                    "{current.quote}"
                  </blockquote>
                </div>

                <div className="pt-3 border-t border-[#101536]/08 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#101536]">
                      {current.name}
                    </h3>
                    <button
                      onClick={() => handleExploreTrack(current.programIndex)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#119E9D] hover:underline mt-0.5 text-left"
                    >
                      <span>{current.program}</span>
                      <ArrowRight className="w-3 h-3 text-[#EFAF32]" />
                    </button>
                    <p className="text-[11px] text-[#5E6675]">
                      {current.role} • {current.location}
                    </p>
                  </div>

                  {/* Subtle Navigation Arrows */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        prevReview();
                        handleInteraction();
                      }}
                      aria-label="Previous testimonial"
                      className="w-8 h-8 rounded-full bg-white border border-[#101536]/10 flex items-center justify-center text-[#101536] hover:bg-[#101536] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#119E9D]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        nextReview();
                        handleInteraction();
                      }}
                      aria-label="Next testimonial"
                      className="w-8 h-8 rounded-full bg-white border border-[#101536]/10 flex items-center justify-center text-[#101536] hover:bg-[#101536] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#119E9D]"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM: 5-Avatar Selector & Progress Line */}
        <div className="mt-6 pt-4 border-t border-[#101536]/08 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {REVIEWS_DATA.map((item, idx) => {
              const isActive = activeReviewIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectReview(idx)}
                  className={`relative rounded-full overflow-hidden transition-all duration-300 focus:outline-none ${
                    isActive
                      ? "w-11 h-11 sm:w-12 sm:h-12 ring-2 ring-[#119E9D] ring-offset-2 scale-110 shadow-sm"
                      : "w-8 h-8 sm:w-9 sm:h-9 opacity-45 hover:opacity-100 hover:scale-105"
                  }`}
                  aria-label={`View review by ${item.name}`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-[10px] font-mono text-[#5E6675]/80 uppercase">
              0{activeReviewIndex + 1} / 0{REVIEWS_DATA.length}
            </span>
            <div className="w-28 sm:w-40 h-1 bg-[#101536]/08 rounded-full overflow-hidden">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#119E9D] to-[#EFAF32] rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
