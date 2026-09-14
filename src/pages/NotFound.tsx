import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Compass } from "lucide-react";
import { SEO } from "@/components/SEO";

const easeCurve = [0.22, 1, 0.36, 1] as const;

export const NotFound: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    initial: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: easeCurve,
      },
    },
  };

  return (
    <div className="relative w-full min-h-[calc(100svh-72px)] bg-[#F6F5F0] text-[#071A2B] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-16 sm:py-24 select-none font-sans overflow-x-clip">
      <SEO
        title="404 — Page Not Found | Nexovate"
        description="The page you are looking for does not exist on Nexovate."
        noIndex={true}
      />

      {/* Subtle Background Ambience Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-notebook-grid opacity-60 pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-2xl mx-auto w-full flex flex-col items-center text-center"
      >
        {/* 1. EDITORIAL MICRO-LABEL */}
        <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11AFC0]/10 border border-[#11AFC0]/20 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[#11AFC0]" aria-hidden="true" />
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#071A2B] uppercase font-jakarta">
              NEXOVATE / 404
            </span>
          </div>
        </motion.div>

        {/* 2. GRAPHIC 404 TYPOGRAPHIC OBJECT WITH EDITORIAL ROUTE LINE */}
        <motion.div
          variants={itemVariants}
          className="relative w-full flex items-center justify-center my-2 sm:my-4"
        >
          {/* Subtle curved route line passing through the typographic object */}
          <svg
            className="absolute inset-x-0 w-full h-24 sm:h-32 -top-2 pointer-events-none opacity-80"
            viewBox="0 0 600 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M 20 60 C 140 10, 240 110, 360 40 C 460 -15, 520 90, 580 50"
              stroke="url(#routeGradient)"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            <circle cx="580" cy="50" r="3.5" fill="#11AFC0" />
            <defs>
              <linearGradient id="routeGradient" x1="20" y1="60" x2="580" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="#11AFC0" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#6366F1" stopOpacity="0.8" />
                <stop offset="1" stopColor="#11AFC0" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>

          <span
            className="font-black text-[clamp(110px,20vw,230px)] text-[#071A2B] tracking-[-0.065em] leading-[0.85] font-jakarta select-none drop-shadow-[0_8px_32px_rgba(7,26,43,0.06)]"
            aria-hidden="true"
          >
            404
          </span>
        </motion.div>

        {/* 3. SUPPORTING HEADLINE */}
        <motion.h1
          variants={itemVariants}
          className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#071A2B] font-jakarta leading-[1.12] mb-3 sm:mb-4 max-w-lg"
        >
          Looks like this path went somewhere else.
        </motion.h1>

        {/* 4. SUPPORTING COPY */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg text-[#5E6675] font-normal leading-relaxed max-w-md mx-auto mb-8 sm:mb-10"
        >
          This page doesn&apos;t exist anymore — or it never did.
        </motion.p>

        {/* 5. PRIMARY & SECONDARY ACTIONABLE CTAS */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <Link
            to="/"
            className="min-h-[48px] sm:min-h-[50px] px-7 sm:px-8 rounded-full bg-[#071A2B] text-white text-xs sm:text-[13px] font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2 hover:bg-[#11AFC0] active:scale-[0.98] transition-all duration-200 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11AFC0] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>BACK TO HOME</span>
          </Link>

          {/* Secondary CTA */}
          <Link
            to="/programs"
            className="min-h-[48px] sm:min-h-[50px] px-7 sm:px-8 rounded-full bg-white text-[#071A2B] border border-[#071A2B]/15 text-xs sm:text-[13px] font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2 hover:bg-[#F6F8F9] hover:border-[#11AFC0] active:scale-[0.98] transition-all duration-200 shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11AFC0] focus-visible:ring-offset-2"
          >
            <span>EXPLORE PROGRAMS</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
