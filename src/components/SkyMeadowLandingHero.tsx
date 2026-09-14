import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { gratitudeHeroVideo, nexovateHeroCinematic } from "@/assets";

const smoothEase = [0.16, 1, 0.3, 1] as const;

export const SkyMeadowLandingHero: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Auto-play trigger on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled gracefully
      });
    }
  }, []);

  // Seamless playback loop
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 40) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  // Scroll listener: Smoothly dismiss the scroll indicator on first user scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to the infinite marquee
  const scrollToNext = () => {
    const nextEl = document.getElementById("brand-marquee") || document.querySelector(".brand-marquee-section");
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      id="landing-hero"
      aria-label="Nexovate Hero"
      className="relative w-full min-h-[100svh] bg-[#F6F5F0] p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col justify-between select-none font-sans overflow-hidden"
    >
      {/* ============================================================ */}
      {/* CINEMATIC INSET ROUNDED CONTAINER (NOT FULL-SCREEN)          */}
      {/* ============================================================ */}
      <div className="relative w-full h-[calc(100svh-24px)] sm:h-[calc(100svh-32px)] md:h-[calc(100svh-40px)] lg:h-[calc(100svh-48px)] min-h-[580px] max-w-[1400px] mx-auto rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden bg-[#071923] border border-[#071A2B]/10 shadow-[0_20px_50px_rgba(7,26,43,0.18)] flex flex-col justify-between">
        
        {/* ============================================================ */}
        {/* LAYER 0: CONTROLLED CINEMATIC BACKGROUND VIDEO               */}
        {/* ============================================================ */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-[#071923]">
          <video
            ref={videoRef}
            src={gratitudeHeroVideo}
            poster={nexovateHeroCinematic}
            autoPlay
            loop
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover object-[center_35%] scale-[1.08] origin-center pointer-events-none select-none will-change-transform opacity-95 transition-opacity duration-1000"
          />

          {/* Directional Subtle Gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#071923]/85 via-[#071923]/40 via-45% to-transparent pointer-events-none z-10"
          />

          {/* Soft Bottom Gradient for natural contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#071923]/80 via-transparent via-40% to-transparent pointer-events-none z-10"
          />
        </div>

        {/* ============================================================ */}
        {/* LAYER 1: EDITORIAL ASYMMETRICAL COMPOSITION                  */}
        {/* ============================================================ */}
        <div className="relative z-20 w-full h-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 py-8 sm:py-12 flex-1 flex flex-col justify-end">
          
          {/* CENTER-LOWER: Asymmetrical Headline & Narrative Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-4 sm:pb-6">
            
            {/* Main Headline (Lower Left, 8 columns) */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: smoothEase }}
                className="font-medium text-[clamp(52px,7vw,112px)] text-[#F6F5F0] leading-[0.90] tracking-[-0.045em] drop-shadow-[0_4px_24px_rgba(7,26,43,0.6)] max-w-[700px]"
              >
                <span className="block">BUILD</span>
                <span className="block mt-1 sm:mt-2">WHAT&apos;S</span>
                <span className="block mt-1 sm:mt-2 text-[#11AFC0]">
                  NEXT.
                </span>
              </motion.h1>
            </div>

            {/* Supporting Copy & Primary Action (Lower Right / Offset, 4 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
              className="lg:col-span-4 flex flex-col items-start gap-6 lg:pb-2"
            >
              <p className="text-[clamp(16px,1.25vw,19px)] text-[#F6F5F0]/85 font-normal leading-[1.5] max-w-[390px] tracking-[-0.01em]">
                A modern applied learning platform where students turn technology into real production systems.
              </p>

              {/* High-Restraint Editorial CTA Button */}
              <button
                onClick={() => navigate("/programs")}
                className="h-[50px] sm:h-[52px] px-8 sm:px-9 rounded-full bg-[#F6F5F0] hover:bg-white text-[#071A2B] font-semibold text-[14px] tracking-[-0.01em] inline-flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] active:translate-y-0 active:scale-95 cursor-pointer shadow-md group"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4 text-[#071A2B] group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>

          </div>

          {/* BOTTOM: Actionable Scroll Indicator (Fades out on user scroll) */}
          <AnimatePresence>
            {!hasScrolled && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4, ease: smoothEase }}
                className="pt-4 flex items-center justify-start w-full pointer-events-auto"
              >
                <button
                  onClick={scrollToNext}
                  className="inline-flex items-center gap-3 text-[#F6F5F0]/70 hover:text-white transition-colors cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC0]" />
                  <span className="text-[12px] font-normal tracking-wide text-[#F6F5F0]/70 group-hover:text-white transition-colors">
                    Scroll to explore
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SkyMeadowLandingHero;
