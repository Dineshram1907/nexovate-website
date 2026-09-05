import React from "react";
import { ArrowRight, Building2, Award, GraduationCap, CheckCircle2 } from "lucide-react";
import { IMAGE_REGISTRY } from "@/constants/imageRegistry";
import { usePresentation } from "@/context/PresentationContext";
import { MotionButton } from "./motion/MotionButton";

export const Institutions: React.FC = () => {
  const { enquireInstitution } = usePresentation();

  const offerings = [
    {
      title: "Centers of Excellence (CoE)",
      desc: "Establish state-of-the-art applied computing, artificial intelligence, and cloud laboratories right on your campus.",
      icon: Building2,
      stat: "Turnkey Labs",
    },
    {
      title: "Credit-Aligned Curriculum",
      desc: "Integrate industry-verified capstone modules directly into academic semesters with autonomous automated grading.",
      icon: GraduationCap,
      stat: "NAAC / NBA Aligned",
    },
    {
      title: "Enterprise Talent Pipeline",
      desc: "Connect graduating cohorts directly with hiring managers through verified GitHub repositories and deployed platforms.",
      icon: Award,
      stat: "Direct Placement",
    },
  ];

  return (
    <section
      id="institutions"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F7F6F2]/85 border-b border-[#0F1535]/06 select-none overflow-x-clip font-sans text-[#0F1535] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mission & Trust */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1535]/05 border border-[#0F1535]/10 mb-4">
              <Building2 className="w-3.5 h-3.5 text-[#0F1535]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#0F1535] uppercase">
                INSTITUTIONAL PARTNERSHIPS
              </span>
            </div>

            <div className="overflow-hidden">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F1535] font-jakarta leading-[1.08] mb-6">
                EMPOWER YOUR CAMPUS <br />
                <span className="text-[#119E9D]">WITH APPLIED STUDIOS</span>
                <span className="text-[#EFAF32]">.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#576071] font-normal leading-relaxed mb-8 max-w-xl">
              Leading colleges and universities partner with Nexovate to bridge academic theory and production software engineering. We help departments establish industry-backed Centers of Excellence with verifiable student capstone outcomes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8">
              {offerings.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-2xl bg-white border border-[#0F1535]/08 flex flex-col justify-between shadow-2xs"
                >
                  <span className="text-[10px] font-bold text-[#119E9D] uppercase tracking-wider block mb-1">
                    {item.stat}
                  </span>
                  <h4 className="text-xs font-bold text-[#0F1535] font-jakarta mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#576071] leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <MotionButton
              onClick={enquireInstitution}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#0F1535] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#119E9D] transition-colors shadow-sm cursor-pointer"
              data-cursor="pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4 text-[#EFAF32]" />
            </MotionButton>
          </div>

          {/* Right Column: High-Quality Real Innovation Workshop Imagery */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl bg-[#101536] border border-[#101536]/10 group">
              <img
                src={IMAGE_REGISTRY.institutions.innovationWorkshop}
                alt="Institutional leadership and faculty collaborating with Nexovate mentors"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101536]/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Verified Campus Implementation</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 font-jakarta">
                  Turnkey Academic Centers of Excellence
                </h3>
                <p className="text-xs text-white/80 max-w-md leading-relaxed">
                  Faculty training, automated testbench infrastructure, and direct enterprise placement channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Institutions;
