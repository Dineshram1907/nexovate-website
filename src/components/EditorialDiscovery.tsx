import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { brandCreatorImage } from "@/assets";
import { premiumEase } from "@/lib/motion";

export const EditorialDiscovery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Scroll parallax for studio photo
  const { scrollYProgress } = useScroll({
    target: imageFrameRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.01]);

  const pillars = [
    {
      num: "01",
      title: "Discover Without Pressure",
      desc: "Explore hands-on sandboxes across artificial intelligence, modern web engineering, and product design before specializing.",
    },
    {
      num: "02",
      title: "Build With Senior Practitioners",
      desc: "Submit weekly Git pull requests evaluated by active engineers who examine architecture, performance benchmarks, and edge cases.",
    },
    {
      num: "03",
      title: "Ship Verifiable Systems",
      desc: "Deploy live microservices, authenticated APIs, and real-time databases into production cloud environments.",
    },
  ];

  const headlineLines = ["Discover what", "you're capable of."];

  return (
    <section
      ref={containerRef}
      id="discovery"
      className="relative w-full py-[var(--section-space)] px-[var(--page-padding)] bg-[#F7F6F2] text-[#0F1535] select-none font-sans overflow-hidden border-b border-[#0F1535]/08 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center text-left">
          {/* LEFT: Editorial Narrative & Principles */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="text-[clamp(28px,6vw,56px)] font-black tracking-[-0.035em] leading-[1.05] text-[#0F1535] font-jakarta mb-5 sm:mb-7">
              {headlineLines.map((line, idx) => (
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
                        <span className="text-[#119E9D]">you're capable of</span>
                        <span className="text-[#EFAF32]">.</span>
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.32, ease: premiumEase }}
              className="text-sm sm:text-base md:text-lg text-[#576071] font-normal leading-relaxed mb-8 sm:mb-10 max-w-[52ch]"
            >
              Nexovate is built around the premise that computing mastery cannot be memorized from slides. It is forged by writing code, breaking environments, and designing systems that actually work in the real world.
            </motion.p>

            <div className="flex flex-col gap-6 w-full pt-6 border-t border-[#0F1535]/10">
              {pillars.map((p, idx) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.6, delay: 0.42 + idx * 0.1, ease: premiumEase }}
                  className="flex items-start gap-4"
                >
                  <span className="text-xs font-mono font-bold text-[#119E9D] pt-0.5 shrink-0">
                    {p.num}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0F1535] font-jakarta mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#576071] leading-relaxed max-w-[48ch]">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Authentic Studio Documentary Image with Scroll Parallax */}
          <div ref={imageFrameRef} className="lg:col-span-6 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8, delay: 0.25, ease: premiumEase }}
              className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#0F1535] border border-[#0F1535]/10 group max-h-[520px]"
            >
              <motion.img
                style={{ y: imageY, scale: imageScale }}
                src={brandCreatorImage}
                alt="Student developing a software engineering system in studio"
                className="w-full h-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1535]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 text-white text-left">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EFAF32] block mb-1">
                  APPLIED LABORATORY
                </span>
                <p className="text-xs font-semibold text-white/90">
                  Active studio environment • Real engineering toolchains
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialDiscovery;

