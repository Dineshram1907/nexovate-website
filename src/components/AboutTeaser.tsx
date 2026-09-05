import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Target, Users2 } from "lucide-react";
import { MotionButton } from "./motion/MotionButton";

export const AboutTeaser: React.FC = () => {
  const principles = [
    {
      title: "Practitioners, Not Lecturers",
      desc: "Every curriculum is designed and taught by active software engineers, data scientists, and architects.",
      icon: Users2,
    },
    {
      title: "Proof Over Certificates",
      desc: "We measure student success by live deployed platforms, automated test suites, and public Git repositories.",
      icon: Target,
    },
    {
      title: "Zero Artificial Barrier",
      desc: "Our diagnostic sandboxes allow students from any background to discover genuine technical interest before specializing.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="about-teaser"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#F7F6F2]/85 border-b border-[#0F1535]/06 select-none overflow-x-clip font-sans text-[#0F1535] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto w-full z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#119E9D]/10 border border-[#119E9D]/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#119E9D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#119E9D] uppercase">
                WHO IS NEXOVATE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F1535] font-jakarta leading-tight mb-5">
              AN APPLIED STUDIO FOR <br />
              <span className="text-[#119E9D]">MODERN ENGINEERS</span>
              <span className="text-[#EFAF32]">.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#576071] leading-relaxed mb-6 font-normal">
              Nexovate was founded on a simple observation: conventional computing education teaches theoretical definitions, while technology teams hire for demonstrable production capability. We built the bridge.
            </p>

            <Link to="/about">
              <MotionButton
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-[#0F1535]/15 text-[#0F1535] font-bold text-xs uppercase tracking-wider hover:bg-[#0F1535] hover:text-white transition-colors shadow-2xs cursor-pointer"
                data-cursor="pointer"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#EFAF32]" />
              </MotionButton>
            </Link>
          </div>

          {/* Right Column: 3 Distinct Value Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-6 rounded-2xl bg-white border border-[#0F1535]/08 shadow-2xs flex flex-col justify-between text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#119E9D]/10 text-[#119E9D] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F1535] font-jakarta mb-2">
                      {p.title}
                    </h4>
                    <p className="text-xs text-[#576071] leading-relaxed font-normal">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
