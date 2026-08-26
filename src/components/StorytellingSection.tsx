import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Lightbulb, Compass, Award } from "lucide-react";

export const StorytellingSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-notebook-lines select-none border-b border-[#101536]/06 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT 55% — Storytelling Headline & Concept */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0E7FF] border border-[#6366F1]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#6366F1] uppercase">
                THE NEXOVATE LEARNING PHILOSOPHY
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#101536] leading-tight mb-4">
              LEARNING SHOULDN'T FEEL LIKE A TEXTBOOK<span className="text-[#F97316]">.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#5E6675] font-medium leading-relaxed mb-6">
              Explore ideas through experiences, projects, challenges and stories that make learning stick. Nexovate replaces passive lectures with active creation.
            </p>

            {/* 3 Playful Concept Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-2">
              <div className="p-4 bg-white rounded-2xl border border-[#101536]/10 shadow-xs relative">
                <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-2">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-[#101536]">Spark Curiosity</h4>
                <p className="text-[11px] text-[#5E6675] mt-1">Ask big questions before building.</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#101536]/10 shadow-xs relative">
                <div className="w-8 h-8 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mb-2">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-[#101536]">Explore Real Tools</h4>
                <p className="text-[11px] text-[#5E6675] mt-1">Work with modern software.</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#101536]/10 shadow-xs relative">
                <div className="w-8 h-8 rounded-xl bg-[#D1FAE5] text-[#059669] flex items-center justify-center mb-2">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-[#101536]">Build Artifacts</h4>
                <p className="text-[11px] text-[#5E6675] mt-1">Create projects you own.</p>
              </div>
            </div>
          </div>

          {/* RIGHT 45% — Paper Layered Composition */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3.5] bg-white rounded-3xl border border-[#101536]/10 p-6 shadow-xl text-left select-none">
              {/* Taped Sticky Note */}
              <div className="note-taped p-4 mb-4 font-mono text-xs text-[#101536]">
                <p className="font-bold text-sm mb-1 text-[#F97316]">★ Student Manifesto</p>
                <p className="leading-snug text-[#5E6675]">
                  "I don't just want to memorize theory. I want to build things that matter."
                </p>
              </div>

              <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-dashed border-[#101536]/15 font-mono text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#6366F1]">LEARNING METHODOLOGY</span>
                  <span className="text-[10px] bg-[#6366F1]/10 text-[#6366F1] px-2 py-0.5 rounded-full font-bold">100% APPLIED</span>
                </div>
                <p className="text-[#5E6675] leading-relaxed text-[11px]">
                  ✓ Interactive exploratory sessions<br />
                  ✓ 1-on-1 mentor guidance<br />
                  ✓ Real-world portfolio artifacts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
