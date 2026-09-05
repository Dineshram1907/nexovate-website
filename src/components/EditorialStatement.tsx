import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { premiumEase } from "@/lib/motion";

export const EditorialStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const statementLines = ["Learning should", "lead somewhere."];

  return (
    <section
      ref={containerRef}
      id="statement"
      className="relative w-full py-[var(--section-space)] px-[var(--page-padding)] bg-[#F7F6F2] text-[#0F1535] select-none font-sans overflow-hidden scroll-mt-16 border-b border-[#0F1535]/08"
    >
      <div className="max-w-6xl mx-auto w-full text-left">
        {/* Monumental Masked Editorial Statement */}
        <h2 className="text-[clamp(32px,6.8vw,78px)] font-black tracking-[-0.035em] leading-[1.02] text-[#0F1535] font-jakarta mb-8 sm:mb-14">
          {statementLines.map((line, idx) => (
            <span key={line} className="block overflow-hidden py-0.5">
              <motion.span
                className="block"
                initial={{ y: "115%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + idx * 0.12,
                  ease: premiumEase,
                }}
              >
                {idx === 1 ? (
                  <>
                    <span className="text-[#119E9D]">lead somewhere</span>
                    <span className="text-[#EFAF32]">.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Narrative Split with sequential entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.32, ease: premiumEase }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pt-8 sm:pt-10 border-t border-[#0F1535]/10"
        >
          <div className="lg:col-span-7">
            <p className="text-base sm:text-xl lg:text-2xl text-[#576071] font-normal leading-relaxed max-w-[50ch]">
              We replaced passive theoretical coursework with live code reviews, production cloud infrastructure, and verified deployed systems built alongside active software practitioners.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <p className="text-xs sm:text-sm text-[#576071] leading-relaxed max-w-[46ch]">
              Every Nexovate student graduates not merely with a certificate, but with a public Git repository, live API backends, and demonstrable engineering confidence that hiring teams inspect directly.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0F1535] uppercase tracking-wider hover:text-[#119E9D] transition-colors group cursor-pointer pt-1 min-h-[44px]"
            >
              <span>Our Educational Philosophy</span>
              <ArrowUpRight className="w-4 h-4 text-[#EFAF32] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EditorialStatement;

