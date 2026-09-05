import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";

export const FinalCTA: React.FC = () => {
  const { openEnquiryModal } = usePresentation();

  return (
    <section
      id="final-cta"
      className="relative w-full py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 bg-[#F7F6F2] select-none font-sans text-[#0F1535] scroll-mt-20 border-b border-[#0F1535]/06"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="w-full rounded-3xl bg-[#0F1535] border border-white/10 p-8 sm:p-14 lg:p-20 shadow-2xl overflow-hidden text-white relative text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left 65% Column */}
            <div className="lg:col-span-8 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#EFAF32]" />
                <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
                  ADMISSIONS & COHORTS
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05] font-jakarta">
                LET'S BUILD <br />
                <span className="text-[#119E9D]">WHAT'S NEXT</span>
                <span className="text-[#EFAF32]">.</span>
              </h2>

              <p className="text-sm sm:text-base text-white/75 max-w-xl mb-8 font-normal leading-relaxed">
                Step beyond passive coursework. Connect directly with our engineering mentors to evaluate track roadmaps, portfolio projects, and upcoming cohort availability.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Link to="/courses" className="w-full sm:w-auto">
                  <button className="min-h-[50px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[#0F1535] font-bold text-xs uppercase tracking-wider hover:bg-[#119E9D] hover:text-white transition-all shadow-md cursor-pointer group">
                    <span>Explore Courses</span>
                    <ArrowRight className="w-4 h-4 text-[#0F1535] group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <button
                  onClick={() => openEnquiryModal("Admissions Inquiry")}
                  className="min-h-[50px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/15 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#EFAF32]" />
                  <span>Talk to an Academic Mentor</span>
                </button>
              </div>
            </div>

            {/* Right Column: Key Proof Points */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-white/05 border border-white/10 text-left">
                <span className="text-2xl sm:text-3xl font-black text-white font-jakarta block mb-1">
                  100%
                </span>
                <span className="text-xs font-semibold text-white/70">
                  Public Deployed Capstones with GitHub Proof
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white/05 border border-white/10 text-left">
                <span className="text-2xl sm:text-3xl font-black text-[#EFAF32] font-jakarta block mb-1">
                  1:1
                </span>
                <span className="text-xs font-semibold text-white/70">
                  Weekly Senior Practitioner Git Code Reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
