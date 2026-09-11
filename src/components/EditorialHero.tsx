import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";

const CLOUDFRONT_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4";

export const EditorialHero: React.FC = () => {
  const { openEnquiryModal } = usePresentation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  // Scroll-linked animation progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Multi-layer Parallax & Scroll Interpolations
  // LAYER 1: Background parallax & fade to black
  const bgTranslateY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.7, 1], [1, 0.6, 0.15]);

  // LAYER 2: Technical metadata subtle parallax
  const metaTranslateY = useTransform(smoothProgress, [0, 1], ["0px", "-40px"]);
  const metaOpacity = useTransform(smoothProgress, [0, 0.6, 0.9], [1, 0.8, 0.2]);

  // LAYER 3: Main Editorial Headline Stage-by-Stage Reveal
  // Line 1: "practitioners"
  const line1Opacity = useTransform(smoothProgress, [0, 0.12, 0.35, 0.85, 1], [0.15, 1, 1, 0.8, 0]);
  const line1Y = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [40, 0, 0, -35]);

  // Line 2: "in live production"
  const line2Opacity = useTransform(smoothProgress, [0, 0.22, 0.45, 0.85, 1], [0, 1, 1, 0.8, 0]);
  const line2Y = useTransform(smoothProgress, [0, 0.25, 0.85, 1], [50, 0, 0, -35]);

  // Line 3: "environments."
  const line3Opacity = useTransform(smoothProgress, [0, 0.32, 0.55, 0.85, 1], [0, 1, 1, 0.8, 0]);
  const line3Y = useTransform(smoothProgress, [0, 0.35, 0.85, 1], [60, 0, 0, -35]);

  // LAYER 4: Secondary copy & CTA
  const secondaryOpacity = useTransform(smoothProgress, [0.35, 0.52, 0.85, 1], [0, 1, 0.9, 0]);
  const secondaryY = useTransform(smoothProgress, [0.35, 0.55, 1], [35, 0, -25]);

  const ctaOpacity = useTransform(smoothProgress, [0.48, 0.62, 0.88, 1], [0, 1, 0.9, 0]);
  const ctaY = useTransform(smoothProgress, [0.48, 0.65, 1], [30, 0, -20]);

  // Transition to Next Section (LEARN. BUILD. SHAPE TOMORROW.)
  const transitionOpacity = useTransform(smoothProgress, [0.72, 0.9, 1], [0, 1, 1]);
  const transitionY = useTransform(smoothProgress, [0.72, 0.92, 1], [60, 0, 0]);

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full bg-[#07080D] text-white"
      style={{ height: "140vh" }}
    >
      {/* Sticky Hero Viewport (100dvh) */}
      <div className="sticky top-0 w-full h-[100dvh] min-h-[100svh] overflow-hidden flex flex-col justify-between select-none">
        {/* ============================================================ */}
        {/* 1. CINEMATIC BACKGROUND WITH MULTI-LAYER DARKENING */}
        {/* ============================================================ */}
        <motion.div
          style={{ y: bgTranslateY, opacity: bgOpacity }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#07080D]"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover object-[center_32%] md:object-center pointer-events-none select-none filter brightness-[0.88] contrast-[1.08]"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={CLOUDFRONT_VIDEO_URL} type="video/mp4" />
          </video>

          {/* Layer 1: Global Tint */}
          <div className="absolute inset-0 bg-[#050508]/30 pointer-events-none" />

          {/* Layer 2: Vertical Gradual Darkening Gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,5,8,0.15) 0%, rgba(5,5,8,0.35) 45%, rgba(5,5,8,0.92) 90%, #07080D 100%)",
            }}
          />

          {/* Desktop Left Horizontal Contrast Shading */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(7,8,13,0.75) 0%, rgba(7,8,13,0.3) 55%, rgba(7,8,13,0.55) 100%)",
            }}
          />
        </motion.div>

        {/* ============================================================ */}
        {/* 2. SHOWCASE HEADER & TECHNICAL METADATA */}
        {/* ============================================================ */}
        <header className="relative z-30 w-full px-6 pt-[calc(24px+env(safe-area-inset-top))] pb-3 flex items-center justify-between">
          {/* Nexovate Logo + Title */}
          <a
            href="/"
            className="flex items-center gap-3 group outline-none"
            aria-label="Nexovate Home"
          >
            <div className="w-[32px] h-[32px] rounded-lg bg-[#141416]/80 border border-white/10 flex items-center justify-center p-1.5 backdrop-blur-md shadow-md">
              <img
                src="/assets/nexovate-symbol-Czw37Omm.png"
                alt=""
                className="w-full h-full object-contain opacity-90"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-[12px] font-bold text-[#F1E5C6]">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Manrope'] text-[15px] font-normal tracking-[1.5px] text-white">
                NEXOVATE
              </span>
              <span className="font-['Manrope'] text-[8px] tracking-[2px] text-white/40">
                SYSTEM 01
              </span>
            </div>
          </a>

          {/* Right: Circular 50x50 Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="w-[50px] h-[50px] rounded-[25px] bg-[#141414]/80 border border-white/10 flex flex-col items-center justify-center gap-[5px] backdrop-blur-md cursor-pointer transition-transform active:scale-95 hover:border-white/25 hover:bg-[#1a1a1a]/90 outline-none"
          >
            <span className="w-[22px] h-[1.5px] bg-white opacity-85 rounded-full" />
            <span className="w-[22px] h-[1.5px] bg-white opacity-85 rounded-full" />
            <span className="w-[14px] h-[1.5px] bg-white opacity-85 rounded-full self-end mr-[14px]" />
          </button>
        </header>

        {/* Technical Sub-Header Metadata */}
        <motion.div
          style={{ y: metaTranslateY, opacity: metaOpacity }}
          className="relative z-20 w-full px-6 flex items-center justify-between text-[9px] font-['Manrope'] tracking-[2px] text-white/40 uppercase pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#B38A35] font-semibold">01</span>
            <span>//</span>
            <span>LIVE / DIGITAL EXPERIENCE</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[#B38A35]">11001</span>
            <span>•</span>
            <span>2026</span>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* 3. MAIN EDITORIAL HERO CONTENT */}
        {/* ============================================================ */}
        <div className="relative z-20 w-full flex-1 flex flex-col justify-center px-6 md:px-12 max-w-5xl">
          {/* Main Editorial Headline (Georgia / Instrument Serif) */}
          <div className="font-serif text-[#F5F0E8] text-[clamp(38px,11.5vw,54px)] md:text-[clamp(52px,6.8vw,86px)] leading-[1.0] md:leading-[0.98] tracking-[-1.5px] text-left font-normal select-none">
            {/* Stage 1: practitioners */}
            <motion.div style={{ opacity: line1Opacity, y: line1Y }} className="block overflow-visible">
              <span className="italic font-light mr-1.5 opacity-90">practitioners</span>
            </motion.div>

            {/* Stage 2: in live production */}
            <motion.div style={{ opacity: line2Opacity, y: line2Y }} className="block overflow-visible">
              <span>in live production</span>
            </motion.div>

            {/* Stage 3: environments. */}
            <motion.div style={{ opacity: line3Opacity, y: line3Y }} className="block overflow-visible">
              <span>environments.</span>
            </motion.div>
          </div>

          {/* Secondary Copy */}
          <motion.p
            style={{ opacity: secondaryOpacity, y: secondaryY }}
            className="mt-5 md:mt-8 text-white/70 font-['Manrope'] text-[15px] sm:text-[17px] md:text-[19px] leading-[24px] md:leading-[28px] max-w-[420px] md:max-w-[500px] text-left font-normal"
          >
            Real people. Real projects.
            <br />
            A global community building what comes next.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="mt-7 md:mt-10 flex items-center gap-4"
          >
            <button
              onClick={() => openEnquiryModal()}
              onMouseDown={() => setBtnPressed(true)}
              onMouseUp={() => setBtnPressed(false)}
              onTouchStart={() => setBtnPressed(true)}
              onTouchEnd={() => setBtnPressed(false)}
              className={`group flex items-center gap-4 cursor-pointer outline-none transition-transform duration-150 ${
                btnPressed ? "scale-95" : "scale-100"
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="font-['Manrope'] text-[11px] font-medium tracking-[3px] text-white uppercase group-hover:text-[#F1E5C6] transition-colors">
                  EXPLORE NEXOVATE
                </span>
                <span className="w-[160px] h-[1px] bg-white/50 group-hover:bg-[#F1E5C6] group-hover:w-[180px] transition-all duration-300 mt-1" />
              </div>

              {/* 48x48 Circular Arrow Button */}
              <div className="w-[48px] h-[48px] rounded-[24px] border border-white/20 bg-white/5 flex items-center justify-center text-white group-hover:border-[#F1E5C6] group-hover:bg-[#F1E5C6]/15 group-hover:text-[#F1E5C6] transition-all">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* 4. RIGHT-SIDE VERTICAL MESSAGE */}
        {/* ============================================================ */}
        <div className="absolute right-6 sm:right-10 top-[52%] -translate-y-1/2 z-20 hidden sm:flex flex-col items-center pointer-events-none">
          {/* 120px Thin Vertical Line */}
          <div className="w-[1px] h-[100px] md:h-[120px] bg-white/20 mb-4" />
          {/* Vertical Words */}
          <div className="font-['Manrope'] text-[9px] font-medium tracking-[2.5px] text-white/60 leading-[16px] uppercase text-center">
            LEARN.
            <br />
            BUILD.
            <br />
            SHAPE
            <br />
            TOMORROW.
          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. BOTTOM SCROLL INDICATOR */}
        {/* ============================================================ */}
        <div className="relative z-20 w-full px-6 pb-[calc(18px+env(safe-area-inset-bottom))] flex items-end justify-between pointer-events-none">
          <div className="flex flex-col items-start gap-2">
            <div className="relative w-[1px] h-[55px] bg-white/20">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-white shadow-sm"
              />
            </div>
            <span className="font-['Manrope'] text-[9px] font-medium tracking-[3px] text-white/60 uppercase">
              SCROLL TO DISCOVER
            </span>
          </div>

          <div className="font-mono text-[8px] tracking-[1.5px] text-white/25 uppercase">
            NX_FRAME // 01
          </div>
        </div>

        {/* ============================================================ */}
        {/* 6. TRANSITION REVEAL (LEARN. BUILD. SHAPE TOMORROW.) */}
        {/* ============================================================ */}
        <motion.div
          style={{ opacity: transitionOpacity, y: transitionY }}
          className="absolute inset-0 z-40 bg-[#07080D] flex flex-col justify-center px-6 md:px-16 pointer-events-none"
        >
          <div className="max-w-4xl">
            <span className="font-['Manrope'] text-[11px] tracking-[3px] text-[#B38A35] font-semibold uppercase block mb-3">
              NEXT PHASE
            </span>
            <h2 className="font-serif text-[#F1E5C6] text-[clamp(44px,12vw,80px)] font-light leading-[1.0] tracking-[-2px] mb-2">
              LEARN.
            </h2>
            <h2 className="font-serif text-white text-[clamp(44px,12vw,80px)] font-light leading-[1.0] tracking-[-2px] mb-2 opacity-80">
              BUILD.
            </h2>
            <h2 className="font-serif text-white/60 text-[clamp(36px,10vw,72px)] font-light leading-[1.0] tracking-[-2px]">
              SHAPE TOMORROW.
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Shared Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#07080D] flex flex-col justify-between p-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="font-['Manrope'] text-[15px] font-medium tracking-[2.4px] text-white">
              NEXOVATE
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-5 my-auto">
            {["HOME", "ABOUT", "PROGRAMS", "PROJECTS", "CONTACT"].map((link, idx) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-baseline gap-4 text-white hover:text-[#F1E5C6] transition-colors"
              >
                <span className="text-[11px] font-mono text-white/40">0{idx + 1}</span>
                <span className="font-['Manrope'] text-[32px] font-light tracking-tight">
                  {link}
                </span>
              </a>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 flex justify-between items-end text-white/50 text-[10px] tracking-[2px] font-['Manrope']">
            <span>LEARN. BUILD. SHAPE TOMORROW.</span>
            <span>2026</span>
          </div>
        </div>
      )}
    </div>
  );
};
