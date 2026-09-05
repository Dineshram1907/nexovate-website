import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { MaskedLineReveal } from "@/components/motion/EditorialMotion";
import { premiumEase } from "@/lib/motion";

export const EditorialFinalCTA: React.FC = () => {
  const { openEnquiryModal } = usePresentation();

  return (
    <section
      id="final-cta"
      className="relative w-full py-[var(--section-space)] px-[var(--page-padding)] bg-[#090D24] text-white select-none font-sans overflow-hidden text-center scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center relative z-10">

        {/* Monumental Masked Line Reveal for Final Question */}
        <div className="mb-6 sm:mb-8 w-full flex justify-center">
          <MaskedLineReveal
            lines={["WHAT WILL", "YOU BUILD?"]}
            className="text-[clamp(34px,8.5vw,84px)] font-black tracking-[-0.035em] leading-[0.95] text-white font-jakarta uppercase"
            lineClassName="text-white"
            tag="h2"
            stagger={0.12}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, delay: 0.25, ease: premiumEase }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-xl font-normal leading-relaxed mb-8 sm:mb-12 font-sans px-2"
        >
          Step beyond passive coursework. Connect directly with practitioner mentors to evaluate track roadmaps and begin your first production build.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, delay: 0.35, ease: premiumEase }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Link to="/courses" className="w-full sm:w-auto">
            <button className="min-h-[48px] sm:min-h-[52px] w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-9 py-3.5 rounded-full bg-white text-[#0F1535] font-bold text-xs uppercase tracking-wider hover:bg-[#119E9D] hover:text-white transition-all duration-200 shadow-xl cursor-pointer group active:scale-95">
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4 text-[#EFAF32] group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <button
            onClick={() => openEnquiryModal("General Admissions Inquiry")}
            className="min-h-[48px] sm:min-h-[52px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/15 cursor-pointer active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-[#EFAF32]" />
            <span>Contact Nexovate</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default EditorialFinalCTA;


