import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const NexovateStatement: React.FC = () => {
  return (
    <section
      id="statement"
      className="relative w-full py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-12 bg-[#F7F6F2]/80 backdrop-blur-xs border-y border-[#0F1535]/06 select-none font-sans text-[#0F1535] overflow-x-clip scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto w-full text-left">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#119E9D]/10 border border-[#119E9D]/20 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#119E9D]" />
          <span className="text-[10px] sm:text-xs font-bold text-[#119E9D] uppercase tracking-[0.2em]">
            THE NEXOVATE THESIS
          </span>
        </div>

        {/* Monumental Editorial Thesis */}
        <h2 className="text-[clamp(1.85rem,4.2vw,3.65rem)] font-black tracking-tight leading-[1.12] text-[#0F1535] mb-12 font-jakarta">
          Conventional computing education teaches theoretical definitions.
          Technology teams hire for <span className="text-[#119E9D]">demonstrable production capability</span>.{" "}
          <span className="text-[#EFAF32]">We built the bridge.</span>
        </h2>

        {/* Three Disciplinary Pillars — Clean, Unboxed, High Restraint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-10 border-t border-[#0F1535]/10">
          <div>
            <span className="text-[11px] font-bold text-[#119E9D] tracking-widest uppercase block mb-3 font-jakarta">
              01 // PRACTITIONER MENTORSHIP
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#0F1535] mb-2 font-jakarta">
              Real code reviews on real Git pull requests.
            </h3>
            <p className="text-xs sm:text-sm text-[#576071] leading-relaxed">
              No multiple-choice tests. Every assignment is evaluated by senior engineers who examine architecture, performance benchmarks, and edge cases.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold text-[#0EA5E9] tracking-widest uppercase block mb-3 font-jakarta">
              02 // PRODUCTION INFRASTRUCTURE
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#0F1535] mb-2 font-jakarta">
              Shipped to live Kubernetes & cloud backends.
            </h3>
            <p className="text-xs sm:text-sm text-[#576071] leading-relaxed">
              Students build with modern toolchains: PyTorch, Docker, PostgreSQL, and distributed cloud services, experiencing production realities firsthand.
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold text-[#EFAF32] tracking-widest uppercase block mb-3 font-jakarta">
              03 // VERIFIED PROOF
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#0F1535] mb-2 font-jakarta">
              Portfolios that speak directly to hiring teams.
            </h3>
            <p className="text-xs sm:text-sm text-[#576071] leading-relaxed">
              Graduates walk into technical interviews with public repositories, deployed URLs, and demonstrable architectural confidence.
            </p>
          </div>
        </div>

        {/* Read About Link */}
        <div className="mt-12 pt-6">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F1535] uppercase tracking-wider hover:text-[#119E9D] transition-colors group cursor-pointer"
          >
            <span>Learn about our educational philosophy</span>
            <ArrowUpRight className="w-4 h-4 text-[#EFAF32] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NexovateStatement;
