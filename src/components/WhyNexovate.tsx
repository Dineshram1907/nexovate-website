import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export const WhyNexovate: React.FC = () => {
  const principles = [
    {
      number: "01",
      title: "DISCOVER",
      headline: "Find What Genuinely Excites You",
      description:
        "Explore practical sandboxes across artificial intelligence, modern web engineering, and product design before committing to your specialized track.",
      accent: "#119E9D",
      proof: "Interactive Skill Roadmaps & Guided Explorations",
    },
    {
      number: "02",
      title: "BUILD",
      headline: "Turn Knowledge Into Something Real",
      description:
        "Implement concepts directly in production Git repositories with automated CI/CD pipelines, live authenticated APIs, and senior code reviews.",
      accent: "#0EA5E9",
      proof: "Production Codebases & Microservice Architecture",
    },
    {
      number: "03",
      title: "GROW",
      headline: "Leave With Demonstrable Proof",
      description:
        "Graduate with live deployed systems, published documentation, and demonstrable engineering artifacts that technical teams inspect directly.",
      accent: "#EFAF32",
      proof: "Verified Public Portfolios & Direct Referrals",
    },
  ];

  return (
    <section
      id="why-nexovate"
      className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-12 bg-[#F7F6F2] border-b border-[#0F1535]/06 select-none font-sans text-[#0F1535] scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#119E9D]/10 border border-[#119E9D]/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#119E9D]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#119E9D] uppercase">
              THE LEARNING CONTINUUM
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F1535] font-jakarta leading-[1.08] mb-6">
            Real Skills. <br />
            Real Projects. <br />
            Real <span className="text-[#119E9D]">Impact.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#576071] font-normal leading-relaxed max-w-2xl">
            Work on industry-grade codebases, learn from active practitioners, and graduate with a portfolio that speaks for you.
          </p>
        </div>

        {/* 3 Principles Editorial Layout — Unboxed, Hairline Dividers, Extreme Restraint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 pt-10 border-t border-[#0F1535]/10 text-left">
          {principles.map((principle, idx) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#0F1535]/40">
                    PHASE {principle.number}
                  </span>
                  <span
                    className="text-[11px] font-bold tracking-wider uppercase font-jakarta"
                    style={{ color: principle.accent }}
                  >
                    {principle.title}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#0F1535] mb-3 font-jakarta leading-snug">
                  {principle.headline}
                </h3>

                <p className="text-xs sm:text-sm text-[#576071] leading-relaxed mb-6 font-normal">
                  {principle.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#0F1535]/06">
                <span className="text-[11px] font-semibold text-[#0F1535]/75 block">
                  {principle.proof}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyNexovate;
