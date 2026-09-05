import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { IMAGE_REGISTRY } from "@/constants/imageRegistry";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle scroll parallax for the photographic stage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);

  const handleScrollToStatement = (e: React.MouseEvent) => {
    const el = document.getElementById("statement") || document.getElementById("why-nexovate");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-start items-center text-center px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 select-none font-sans text-[#0F1535] overflow-x-clip"
    >
      {/* ══════════════════════════════════════════════════════════════════
          1. CENTER EDITORIAL UPPER STAGE (CONFIDENT TYPOGRAPHY)
      ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: headlineY }}
        className="max-w-4xl mx-auto w-full flex flex-col items-center mb-12 sm:mb-16"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1535]/[0.04] border border-[#0F1535]/[0.08] mb-6 sm:mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#119E9D]" />
          <span className="text-[10px] sm:text-xs font-bold text-[#0F1535] uppercase tracking-[0.2em]">
            PRACTITIONER-LED EDUCATION
          </span>
        </motion.div>

        {/* Monumental Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.75rem,7.2vw,5.5rem)] font-black tracking-tight leading-[1.04] mb-6 sm:mb-8 font-jakarta text-[#0F1535]"
        >
          Learn. Build.<br />
          <span className="text-[#119E9D]">Shape Tomorrow</span>
          <span className="text-[#EFAF32]">.</span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(1.05rem,2.1vw,1.3rem)] text-[#576071] max-w-2xl font-normal leading-relaxed mb-8 sm:mb-10"
        >
          Master high-impact engineering concepts with industry practitioners through live interactive laboratories, weekly Git code reviews, and verifiable deployed systems.
        </motion.p>

        {/* Primary & Secondary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <Link to="/courses" className="w-full sm:w-auto">
            <button
              className="min-h-[50px] w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#0F1535] hover:bg-[#119E9D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#119E9D] cursor-pointer group"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4 text-[#EFAF32] group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </Link>

          <a href="#statement" onClick={handleScrollToStatement} className="w-full sm:w-auto">
            <button
              className="min-h-[50px] w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white border border-[#0F1535]/15 text-[#0F1535] font-bold text-xs uppercase tracking-wider hover:bg-[#F7F6F2] hover:border-[#119E9D] transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#119E9D] cursor-pointer shadow-2xs"
            >
              <div className="w-5 h-5 rounded-full bg-[#119E9D]/15 flex items-center justify-center text-[#119E9D] group-hover:bg-[#119E9D] group-hover:text-white transition-colors">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
              <span>See How It Works</span>
            </button>
          </a>
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════
          2. WIDE AUTHENTIC PHOTOGRAPHIC CENTERPIECE (EDITORIAL SCALE)
      ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl mx-auto mb-14 sm:mb-18"
      >
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#0F1535]/10 bg-[#0F1535]">
          <motion.img
            style={{ scale: imageScale }}
            src={IMAGE_REGISTRY.hero.anchoredStudentStudio}
            alt="Nexovate students collaborating in an advanced engineering studio"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Subtle natural gradient mask for seamless integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1535]/35 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════
          3. RESTRAINED VERIFIED TELEMETRY (UNBOXED, CONFIDENT)
      ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-4xl mx-auto pt-8 border-t border-[#0F1535]/08 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3 text-xs text-[#576071] font-semibold"
      >
        <div className="flex items-center gap-2">
          <span className="text-[#0F1535] font-black font-jakarta text-sm">2.5M+</span>
          <span>Students Empowered</span>
        </div>
        <span className="hidden sm:inline text-[#0F1535]/20">•</span>
        <div className="flex items-center gap-2">
          <span className="text-[#0F1535] font-black font-jakarta text-sm">137+</span>
          <span>Curriculum Tracks</span>
        </div>
        <span className="hidden sm:inline text-[#0F1535]/20">•</span>
        <div className="flex items-center gap-2">
          <span className="text-[#0F1535] font-black font-jakarta text-sm">600+</span>
          <span>Practitioner Mentors</span>
        </div>
        <span className="hidden sm:inline text-[#0F1535]/20">•</span>
        <div className="flex items-center gap-2">
          <span className="text-[#0F1535] font-black font-jakarta text-sm">50+</span>
          <span>Partner Institutions</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
