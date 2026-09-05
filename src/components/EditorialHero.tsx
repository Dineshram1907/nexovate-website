import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowDown, Play } from "lucide-react";
import { premiumEase } from "@/lib/motion";
import { usePresentation } from "@/context/PresentationContext";

const CLOUDFRONT_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4";

export const EditorialHero: React.FC = () => {
  const { openEnquiryModal } = usePresentation();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const scrollToCinematic = (e: React.MouseEvent) => {
    e.preventDefault();
    const cinematicEl = document.getElementById("cinematic-experience");
    if (cinematicEl) {
      cinematicEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="hero relative w-full min-h-[100svh] min-h-screen bg-black text-white flex flex-col justify-between items-stretch text-left px-[var(--page-padding)] pt-[calc(clamp(76px,11vh,110px)+env(safe-area-inset-top))] pb-[clamp(18px,3vh,36px)] select-none font-sans overflow-hidden border-b border-white/5"
    >
      {/* ── Z-INDEX 0: EXACT CINEMATIC CLOUDFRONT BACKGROUND VIDEO ── */}
      <div className="bg absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black">
        <video
          className="bg-video absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={CLOUDFRONT_VIDEO_URL} type="video/mp4" />
        </video>

        {/* Subtle cinematic gradient overlay for text readability while preserving the recognizable video */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.25) 55%, rgba(0, 0, 0, 0.35) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, transparent 35%, transparent 70%, rgba(0, 0, 0, 0.7) 100%)",
          }}
        />
      </div>

      {/* Top Spacer for Nav Balancing */}
      <div className="relative z-10 w-full max-w-7xl mx-auto shrink-0" />

      {/* ── Z-INDEX 1: CURRENT NEXOVATE EDITORIAL CONTENT ── */}
      <div className="page-content relative z-[1] max-w-7xl mx-auto w-full my-auto flex flex-col items-start justify-center text-left py-2 sm:py-6">
        <div className="max-w-[780px] w-full flex flex-col items-start text-left">
          
          {/* 1. EYEBROW / TAG */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: premiumEase }}
            className="flex items-center gap-2.5 mb-5 sm:mb-7"
          >
            <span className="w-5 sm:w-7 h-[2px] bg-[#18A9AA] rounded-full inline-block" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#18A9AA] font-sans">
              PRACTITIONER-LED APPLIED LEARNING
            </span>
          </motion.div>

          {/* 2. MAIN HEADLINE */}
          <h1 className="text-[clamp(44px,7.4vw,114px)] font-normal tracking-[-0.045em] leading-[0.91] select-none text-left mb-5 sm:mb-7 font-serif drop-shadow-md">
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: premiumEase }}
              className="block text-[#F7F4EE]"
            >
              Learning should
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32, ease: premiumEase }}
              className="block text-[#18A9AA]"
            >
              lead somewhere<span className="text-[#F2B632]">.</span>
            </motion.span>
          </h1>

          {/* 3. SUPPORTING COPY */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45, ease: premiumEase }}
            className="text-[15px] sm:text-[17px] text-white/90 font-normal leading-[1.6] max-w-[500px] mb-7 sm:mb-9 font-sans drop-shadow-sm"
          >
            We replace passive coursework with real engineering practice, production systems and guidance from active practitioners.
          </motion.p>

          {/* 4. CTA ACTIONS */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55, ease: premiumEase }}
            className="flex flex-wrap items-center gap-3.5 sm:gap-5 mb-6 sm:mb-8"
          >
            <button
              onClick={() => openEnquiryModal()}
              className="min-h-[50px] sm:min-h-[52px] inline-flex items-center justify-center gap-3 px-7 sm:px-9 rounded-full bg-[#F7F4EE] text-[#0F1535] font-semibold text-xs sm:text-[13px] tracking-wider uppercase hover:bg-white hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 cursor-pointer group active:scale-[0.98]"
            >
              <span>EXPLORE NEXOVATE</span>
              <ArrowRight className="w-4 h-4 text-[#18A9AA] group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="min-h-[50px] inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold text-white/90 hover:text-white uppercase tracking-wider py-2.5 px-4 cursor-pointer rounded-full transition-colors group active:scale-[0.98]"
            >
              <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#18A9AA] group-hover:bg-[#18A9AA]/10 transition-colors">
                <Play className="w-3 h-3 text-[#F2B632] fill-[#F2B632] ml-0.5" />
              </span>
              <span>WATCH OUR STORY</span>
            </button>
          </motion.div>

          {/* 5. TRUST ROW */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.65, ease: premiumEase }}
            className="flex items-center gap-3 text-[11px] font-mono font-bold tracking-widest text-white/60 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#18A9AA]" />
            <span>TRUSTED BY 2,000+ LEARNERS</span>
            <span className="text-white/25">•</span>
            <span className="text-white/40 hidden sm:inline">ALUMNI AT SCALE</span>
          </motion.div>
        </div>
      </div>

      {/* ── Z-INDEX 1: BOTTOM METRICS STRIP & SCROLL CUE ── */}
      <div className="relative z-[1] w-full max-w-7xl mx-auto pt-3 sm:pt-4 border-t border-white/10 shrink-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* 4 Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-10 text-left">
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-bold text-white font-sans tracking-tight">94%</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/60">Placement</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-bold text-white font-sans tracking-tight">100+</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/60">Production Code</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-bold text-white font-sans tracking-tight">1:1</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/60">Mentorship</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-bold text-white font-sans tracking-tight">4.9/5</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/60">Satisfaction</span>
            </div>
          </div>

          {/* Scroll Cue to Section 2 */}
          <button
            onClick={scrollToCinematic}
            className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-bold text-white/70 hover:text-white transition-colors cursor-pointer tracking-widest uppercase py-1"
          >
            <span>Scroll To Explore</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#F2B632] animate-bounce" />
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-[#0F1535] rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            >
              <source src={CLOUDFRONT_VIDEO_URL} type="video/mp4" />
            </video>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#18A9AA] transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditorialHero;
