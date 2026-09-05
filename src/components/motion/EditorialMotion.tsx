import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { premiumEase } from "@/lib/motion";

interface MaskedLineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "div";
}

/**
 * Masked Line Reveal:
 * Each line sits inside an overflow-hidden wrapper and slides upward into view.
 */
export const MaskedLineReveal: React.FC<MaskedLineRevealProps> = ({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.1,
  tag = "div",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  const Tag = tag as any;

  return (
    <Tag ref={ref} className={`block ${className}`}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: "115%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
            transition={{
              duration: 0.85,
              delay: delay + idx * stagger,
              ease: premiumEase,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

interface WordStaggerRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

/**
 * Word Stagger Reveal:
 * Animates text word-by-word with subtle translateY and opacity.
 */
export const WordStaggerReveal: React.FC<WordStaggerRevealProps> = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const words = text.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.28em] py-0.5">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.65,
              delay: delay + idx * stagger,
              ease: premiumEase,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
};

interface ParallaxImageContainerProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  parallaxOffset?: number; // Distance to translate (e.g. 50px desktop, 20px mobile)
  scaleRange?: [number, number];
  aspectRatio?: string;
  children?: React.ReactNode;
}

/**
 * Parallax Image Container:
 * Container with overflow:hidden; inner image translates smoothly with scroll progress.
 */
export const ParallaxImageContainer: React.FC<ParallaxImageContainerProps> = ({
  src,
  alt,
  className = "",
  imageClassName = "",
  parallaxOffset = 50,
  scaleRange = [1.08, 1.0],
  aspectRatio = "aspect-[16/10]",
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-parallaxOffset, parallaxOffset]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);

  return (
    <div
      ref={containerRef}
      className={`relative ${aspectRatio} w-full overflow-hidden ${className}`}
    >
      <motion.img
        style={{ y, scale }}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover object-center ${imageClassName}`}
        loading="lazy"
      />
      {children}
    </div>
  );
};

interface AmbientTickerProps {
  phrases?: string[];
  className?: string;
  showCompanies?: boolean;
}

/**
 * High-fidelity vector representations for hiring partner companies
 */
const COMPANY_LOGOS = [
  {
    name: "Zoho",
    component: () => (
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center -space-x-1 h-5">
          <span className="w-3.5 h-3.5 rounded-[3px] border-[2px] border-[#E42528] bg-transparent -rotate-6 transform" />
          <span className="w-3.5 h-3.5 rounded-[3px] border-[2px] border-[#22A048] bg-transparent rotate-3 transform" />
          <span className="w-3.5 h-3.5 rounded-[3px] border-[2px] border-[#0091D5] bg-transparent -rotate-3 transform" />
          <span className="w-3.5 h-3.5 rounded-[3px] border-[2px] border-[#F9A01B] bg-transparent rotate-6 transform" />
        </div>
        <span className="text-[7.5px] font-black tracking-[0.22em] text-[#0F1535] font-sans -mt-0.5">ZOHO</span>
      </div>
    ),
  },
  {
    name: "Tata Consultancy Services",
    component: () => (
      <div className="flex items-center gap-1.5">
        <span className="text-sm sm:text-base font-black tracking-tight text-[#E6007E] font-sans lowercase leading-none">tcs</span>
        <div className="flex flex-col text-[7px] font-bold tracking-wider leading-[1.05] text-[#0F1535] border-l border-[#0F1535]/25 pl-1.5 font-sans uppercase">
          <span>TATA</span>
          <span>CONSULTANCY</span>
          <span>SERVICES</span>
        </div>
      </div>
    ),
  },
  {
    name: "Wipro",
    component: () => (
      <div className="flex items-center gap-1.5">
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="2.8" fill="#119E9D" />
          <circle cx="16" cy="6" r="1.6" fill="#E42528" />
          <circle cx="21" cy="7.5" r="1.6" fill="#F36F21" />
          <circle cx="24.5" cy="11" r="1.6" fill="#F9A01B" />
          <circle cx="26" cy="16" r="1.6" fill="#22A048" />
          <circle cx="24.5" cy="21" r="1.6" fill="#0091D5" />
          <circle cx="21" cy="24.5" r="1.6" fill="#005B94" />
          <circle cx="16" cy="26" r="1.6" fill="#6366F1" />
          <circle cx="11" cy="24.5" r="1.6" fill="#8B5CF6" />
          <circle cx="7.5" cy="21" r="1.6" fill="#A855F7" />
          <circle cx="6" cy="16" r="1.6" fill="#EC4899" />
          <circle cx="7.5" cy="11" r="1.6" fill="#EF4444" />
          <circle cx="11" cy="7.5" r="1.6" fill="#E42528" />
          <circle cx="16" cy="10.5" r="1.2" fill="#F36F21" />
          <circle cx="20.5" cy="12.5" r="1.2" fill="#22A048" />
          <circle cx="21.5" cy="16" r="1.2" fill="#0091D5" />
          <circle cx="20.5" cy="19.5" r="1.2" fill="#6366F1" />
          <circle cx="16" cy="21.5" r="1.2" fill="#8B5CF6" />
          <circle cx="11.5" cy="19.5" r="1.2" fill="#EC4899" />
          <circle cx="10.5" cy="16" r="1.2" fill="#EF4444" />
          <circle cx="11.5" cy="12.5" r="1.2" fill="#F9A01B" />
        </svg>
        <span className="font-bold text-xs sm:text-sm tracking-tight text-[#0F1535] lowercase font-sans">wipro</span>
      </div>
    ),
  },
  {
    name: "HCLTech",
    component: () => (
      <div className="flex items-baseline gap-1">
        <span className="text-sm sm:text-base font-black italic tracking-tighter text-[#0066B3] font-sans">HCL</span>
        <span className="text-[10px] font-bold tracking-tight text-[#0F1535] font-sans">Tech</span>
      </div>
    ),
  },
  {
    name: "Infosys",
    component: () => (
      <div className="flex items-center">
        <span className="text-sm sm:text-base font-bold tracking-tight text-[#007CC3] font-sans">Infosys</span>
      </div>
    ),
  },
  {
    name: "Accenture",
    component: () => (
      <div className="flex items-center">
        <span className="font-bold text-xs sm:text-[13px] text-[#0F1535] font-sans tracking-tight">accenture</span>
        <span className="font-black text-xs sm:text-sm text-[#A100FF] ml-0.5 leading-none">&gt;</span>
      </div>
    ),
  },
  {
    name: "Cognizant",
    component: () => (
      <div className="flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-[#0033A0] shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="12" cy="12" r="3.5" fill="currentColor" />
        </svg>
        <span className="font-bold text-xs sm:text-[13px] text-[#0F1535] font-sans tracking-tight">Cognizant</span>
      </div>
    ),
  },
  {
    name: "Tech Mahindra",
    component: () => (
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="3.5" height="3.5" rx="0.8" fill="#E31837" />
          <rect x="8" y="4" width="3.5" height="3.5" rx="0.8" fill="#E31837" />
          <rect x="14" y="4" width="3.5" height="3.5" rx="0.8" fill="#E31837" />
          <rect x="18" y="8" width="3.5" height="3.5" rx="0.8" fill="#E31837" />
          <rect x="18" y="14" width="3.5" height="3.5" rx="0.8" fill="#E31837" />
          <rect x="14" y="16" width="3.5" height="3.5" rx="0.8" fill="#E31837" />
          <rect x="8" y="16" width="3.5" height="3.5" rx="0.8" fill="#E31837" />
          <rect x="2" y="12" width="3.5" height="3.5" rx="0.8" fill="#E31837" />
        </svg>
        <div className="flex items-center leading-none">
          <span className="font-extrabold text-[11px] sm:text-xs text-[#0F1535] font-sans tracking-tight">Tech</span>
          <span className="font-normal text-[11px] sm:text-xs text-[#E31837] font-sans tracking-tight ml-0.5">Mahindra</span>
        </div>
      </div>
    ),
  },
];

/**
 * Editorial Ambient Ticker + Company Logo Infinite Marquee:
 * Dual-tier continuous drift featuring core ethos and top hiring partner brands.
 */
export const EditorialAmbientTicker: React.FC<AmbientTickerProps> = ({
  phrases = [
    "SHAPE",
    "DEPLOY",
    "INSPECT",
    "LEAD",
    "LEARN",
    "BUILD",
    "CREATE",
  ],
  className = "",
  showCompanies = true,
}) => {
  return (
    <div
      className={`w-full overflow-hidden select-none py-5 sm:py-6 border-y border-[#0F1535]/08 bg-[#F7F6F2] flex flex-col gap-4 sm:gap-5 ${className}`}
    >
      {/* 1. TOP TIER: Subdued Ethos Word Drift (Leftward Drift) */}
      <div className="w-full overflow-hidden flex" aria-hidden="true">
        <motion.div
          className="flex items-center gap-10 whitespace-nowrap will-change-transform shrink-0"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 32,
            ease: "linear",
          }}
        >
          {Array.from({ length: 4 }).flatMap((_, setIdx) =>
            phrases.map((phrase, idx) => (
              <div key={`${setIdx}-${idx}`} className="flex items-center gap-10">
                <span className="text-[clamp(11px,2.2vw,14px)] font-mono font-bold uppercase tracking-[0.25em] text-[#0F1535]/35">
                  {phrase}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#119E9D]/40" />
              </div>
            ))
          )}
        </motion.div>
      </div>

      {/* 2. BOTTOM TIER: Company Logo Marquee (Smooth Continuous Drift) */}
      {showCompanies && (
        <div className="w-full overflow-hidden flex pt-3 sm:pt-4 border-t border-[#0F1535]/08">
          <motion.div
            className="flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform shrink-0"
            animate={{ x: [-1200, 0] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }}
          >
            {Array.from({ length: 4 }).flatMap((_, setIdx) =>
              COMPANY_LOGOS.map((company, idx) => (
                <div key={`comp-${setIdx}-${idx}`} className="flex items-center gap-8 sm:gap-12">
                  <div className="flex items-center justify-center opacity-85 hover:opacity-100 transition-all duration-200 hover:scale-105 cursor-default">
                    <company.component />
                  </div>
                  <span className="h-5 w-[1px] bg-[#0F1535]/12" />
                </div>
              ))
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

