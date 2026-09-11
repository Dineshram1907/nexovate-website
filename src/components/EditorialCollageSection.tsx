import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import studentCodingImg from "@/assets/collage/student-coding-nexovate.jpg";
import laptopIdeasImg from "@/assets/collage/laptop-good-ideas.jpg";
import deskWireframeImg from "@/assets/collage/desk-wireframe-mug.jpg";

/* ── 4-POINT SPARKLE STAR SVG COMPONENT ── */
interface SparkleStarProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SparkleStar: React.FC<SparkleStarProps> = ({
  size = 32,
  color = "#FBBF24",
  className = "",
  style = {},
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M24 0C24.8 12.8 35.2 23.2 48 24C35.2 24.8 24.8 35.2 24 48C23.2 35.2 12.8 24.8 0 24C12.8 23.2 23.2 12.8 24 0Z"
      fill={color}
    />
  </svg>
);

/* ── EDITORIAL COLLAGE SECTION COMPONENT ── */
export const EditorialCollageSection: React.FC = () => {
  return (
    <section
      id="editorial-collage-section"
      className="editorial-collage-root relative w-full bg-[#F9F7F1] text-[#071A2B] overflow-hidden select-none"
      aria-label="Whatever you're curious about, build it."
    >
      {/* ── SCOPED HANDWRITTEN TYPOGRAPHY & COLLAGE UTILITIES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Patrick+Hand&display=swap');

        .collage-handwriting {
          font-family: 'Patrick Hand', 'Caveat', cursive, sans-serif;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .tape-frost {
          background: rgba(255, 255, 255, 0.65);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(1.5px);
          -webkit-backdrop-filter: blur(1.5px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .tape-blue {
          background: rgba(56, 189, 248, 0.55);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(1.5px);
          -webkit-backdrop-filter: blur(1.5px);
        }

        .grid-paper-pattern {
          background-color: #FFFDF9;
          background-image: 
            linear-gradient(rgba(17, 175, 192, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17, 175, 192, 0.12) 1px, transparent 1px);
          background-size: 14px 14px;
        }

        .lined-kraft-pattern {
          background-color: #F5E1C3;
          background-image: linear-gradient(rgba(120, 80, 40, 0.13) 1px, transparent 1px);
          background-size: 100% 20px;
        }
      `}</style>

      {/* ── MAIN COLLAGE VIEWPORT (DESKTOP & TABLET LAYOUT) ── */}
      <div className="hidden lg:block relative w-full max-w-[1520px] mx-auto min-h-[780px] xl:min-h-[840px] pt-14 pb-8 px-6 lg:px-12">
        
        {/* ── TOP-LEFT: STICKY NOTE (BLUE) ── */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: -8 }}
          whileInView={{ opacity: 1, y: 0, rotate: -4 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[3%] xl:left-[4%] top-[4%] z-20 w-[170px] xl:w-[195px] bg-[#D6EBF8] rounded-md p-4 pt-5 shadow-[0_10px_25px_rgba(7,26,43,0.08)] border border-[#C2E0F5]"
          style={{ transformOrigin: "top center" }}
        >
          {/* Top Tape */}
          <div className="tape-frost absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 rounded-[2px] rotate-[-1.5deg]" />
          
          <div className="collage-handwriting text-[#1E293B] text-lg xl:text-xl font-semibold space-y-1">
            <div>Ideas</div>
            <div>Skills</div>
            <div>Projects</div>
            <div className="flex items-center justify-between">
              <span>Opportunities</span>
              <span className="text-xl">☺</span>
            </div>
          </div>
        </motion.div>

        {/* ── TOP-LEFT: HANDWRITTEN ANNOTATION WITH ARROW ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="absolute left-[20%] xl:left-[21%] top-[5%] z-20 pointer-events-none"
        >
          <div className="collage-handwriting text-[#1E293B] text-base xl:text-lg leading-tight font-medium">
            <div>Some</div>
            <div>Students</div>
            <div>Real Work</div>
          </div>
          {/* Hand-drawn curved arrow pointing to polaroid */}
          <svg
            width="42"
            height="44"
            viewBox="0 0 42 44"
            fill="none"
            className="mt-1 ml-1 text-[#071A2B]"
          >
            <path
              d="M10 2C16 12 18 24 6 36M6 36L4 28M6 36L14 36"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* ── LEFT: MAIN POLAROID PHOTO (STUDENT CODING) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -8 }}
          whileInView={{ opacity: 1, y: 0, rotate: -4.5 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[5%] xl:left-[6%] top-[20%] z-10 w-[300px] xl:w-[350px] bg-white p-3.5 pb-4 rounded-[4px] shadow-[0_20px_45px_rgba(7,26,43,0.13)] border border-black/[0.06]"
          style={{ transformOrigin: "center center" }}
        >
          <div className="w-full aspect-[4/3] rounded-[2px] overflow-hidden bg-[#071A2B]">
            <img
              src={studentCodingImg}
              alt="Nexovate student coding at workspace"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* ── BOTTOM-LEFT: GRID PAPER NOTE (LIGHTBULB) ── */}
        <motion.div
          initial={{ opacity: 0, y: 25, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: 2.5 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid-paper-pattern absolute left-[2%] xl:left-[3%] top-[58%] z-20 w-[185px] xl:w-[205px] rounded-md p-3.5 pt-4 shadow-[0_12px_30px_rgba(7,26,43,0.10)] border border-[#071A2B]/10"
          style={{ transformOrigin: "center center" }}
        >
          {/* Tape on top left corner */}
          <div className="tape-frost absolute -top-2.5 left-2 w-10 h-4 rounded-[2px] rotate-[-25deg]" />

          <div className="flex items-start gap-2.5">
            {/* Hand-drawn lightbulb SVG */}
            <svg
              width="34"
              height="44"
              viewBox="0 0 36 46"
              fill="none"
              className="shrink-0 text-[#071A2B]"
            >
              <path d="M18 2V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M5 9L8 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M31 9L28 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M2 20H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M30 20H34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path
                d="M10 20C10 15.58 13.58 12 18 12C22.42 12 26 15.58 26 20C26 23.5 23.8 26.5 22 28.5V33H14V28.5C12.2 26.5 10 23.5 10 20Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M14 36H22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M16 39H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M15 22L18 17L21 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Handwritten Text */}
            <div className="collage-handwriting text-[#071A2B] text-base xl:text-lg leading-snug font-medium pt-0.5">
              <div>Curiosity</div>
              <div>today.</div>
              <div>A better</div>
              <div>tomorrow.</div>
            </div>
          </div>
        </motion.div>

        {/* ── LEFT ACCENT: ORANGE ZIGZAG / 'N' MARK ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="absolute left-[26%] xl:left-[27%] top-[68%] z-10 pointer-events-none"
        >
          <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
            <path
              d="M4 36L12 8L22 34L30 6"
              stroke="#EA580C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* ── CENTER EDITORIAL CLUSTER (HEADLINE, BADGE, SUBTEXT, CTA) ── */}
        <div className="relative z-30 max-w-[700px] mx-auto text-center flex flex-col items-center justify-center pt-2 xl:pt-6">
          
          {/* Top Oval Nexovate Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-6 relative inline-block"
          >
            <div className="border-[1.8px] border-[#071A2B] rounded-[50%/50%] px-7 py-1.5 rotate-[-2.5deg] shadow-sm bg-transparent hover:rotate-0 transition-transform">
              <span className="font-jakarta text-xs xl:text-[13px] font-extrabold tracking-[0.22em] text-[#071A2B] uppercase">
                NEXOVATE
              </span>
            </div>
          </motion.div>

          {/* Main Headline with Orange Sunburst & Teal Star */}
          <div className="relative w-full">
            {/* Orange Sunburst Doodle (top-right of headline) */}
            <div className="absolute right-[4%] xl:right-[6%] -top-4 pointer-events-none">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2V8" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M26 6L21 11" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M30 18L24 18" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-jakarta font-black text-5xl xl:text-[70px] leading-[1.06] text-[#071A2B] tracking-[-0.035em] text-center"
            >
              Whatever you're
              <br />
              curious about,
              <br />
              <span className="relative inline-block text-[#11AFC0] mt-1">
                build it.
                {/* Hand-drawn Orange Swoosh Underline */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-4 overflow-visible pointer-events-none"
                  viewBox="0 0 240 16"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 10C50 4 150 2 237 8C190 12 100 13 3 10Z"
                    fill="#F97316"
                  />
                </svg>
              </span>
            </motion.h2>

            {/* Hand-drawn Teal Sparkle Star (right of headline) */}
            <div className="absolute right-[2%] xl:right-[4%] bottom-2 pointer-events-none">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path
                  d="M18 2C18.5 10 26 17.5 34 18C26 18.5 18.5 26 18 34C17.5 26 10 18.5 2 18C10 17.5 17.5 10 18 2Z"
                  stroke="#11AFC0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Subtitle / Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="text-base xl:text-lg text-[#071A2B]/80 font-normal leading-relaxed max-w-md mx-auto mt-6 text-center"
          >
            Learn the skills. Build real projects.
            <br />
            Create opportunities for your future.
          </motion.p>

          {/* Primary CTA Button & Handwritten 'Start Building' Annotation */}
          <div className="relative mt-7 flex items-center justify-center">
            <motion.a
              href="/courses"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#071A2B] text-white font-bold text-sm xl:text-base shadow-[0_10px_25px_rgba(7,26,43,0.18)] hover:bg-[#0E2A44] hover:shadow-[0_14px_32px_rgba(7,26,43,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore Programs</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </motion.a>

            {/* Handwritten 'Start Building' Annotation with Curved Arrow */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="absolute left-[105%] top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none whitespace-nowrap pl-2"
            >
              {/* Curved arrow pointing up-left */}
              <svg
                width="38"
                height="34"
                viewBox="0 0 38 34"
                fill="none"
                className="text-[#071A2B] shrink-0"
              >
                <path
                  d="M34 2C30 18 16 28 4 28M4 28L12 24M4 28L10 32"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="collage-handwriting text-[#071A2B] text-base xl:text-lg leading-none font-semibold">
                <div>Start</div>
                <div>Building</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── TOP-RIGHT: HANDWRITTEN ANNOTATION WITH ARROW ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="absolute right-[8%] xl:right-[10%] top-[4%] z-20 pointer-events-none flex items-start gap-2"
        >
          <div className="collage-handwriting text-[#1E293B] text-base xl:text-lg leading-tight font-medium text-right">
            <div>From</div>
            <div>Learning</div>
            <div>to Earning</div>
          </div>
          {/* Curved arrow swooping down to laptop */}
          <svg
            width="32"
            height="36"
            viewBox="0 0 32 36"
            fill="none"
            className="mt-2 text-[#071A2B]"
          >
            <path
              d="M2 4C14 4 24 14 18 30M18 30L12 24M18 30L24 26"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* ── TOP-RIGHT: LAPTOP PHOTO FRAME ── */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: 10 }}
          whileInView={{ opacity: 1, y: 0, rotate: 6 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-[12%] xl:right-[14%] top-[8%] z-10 w-[240px] xl:w-[275px] bg-white p-3 pb-3.5 rounded-[4px] shadow-[0_16px_36px_rgba(7,26,43,0.12)] border border-black/[0.06]"
          style={{ transformOrigin: "center center" }}
        >
          <div className="w-full aspect-[4/3] rounded-[2px] overflow-hidden bg-[#071A2B]">
            <img
              src={laptopIdeasImg}
              alt="Laptop with quote: Good Ideas Build Real Futures"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* ── MIDDLE-RIGHT: KRAFT LINED NOTEBOOK NOTE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 3.5 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="lined-kraft-pattern absolute right-[2%] xl:right-[3%] top-[25%] z-20 w-[170px] xl:w-[190px] rounded-md p-3.5 pl-6 shadow-[0_12px_28px_rgba(7,26,43,0.10)] border border-[#D8BF9D]"
          style={{ transformOrigin: "center center" }}
        >
          {/* Blue Tape on top right */}
          <div className="tape-blue absolute -top-2.5 right-2 w-12 h-4 rounded-[2px] rotate-[10deg]" />

          {/* Notebook binder hole perforations on left edge */}
          <div className="absolute left-2.5 top-0 bottom-0 flex flex-col justify-around py-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#E8D1AF] border border-[#CBB08C]/60"
              />
            ))}
          </div>

          <div className="collage-handwriting text-[#2D1F13] text-base xl:text-lg font-bold leading-tight pl-1 space-y-1">
            <div>More</div>
            <div>Builders</div>
            <div>A Brighter</div>
            <div>Tomorrow</div>
            <div className="text-right text-lg pr-1">☺</div>
          </div>
        </motion.div>

        {/* ── MIDDLE-RIGHT: DESK WIREFRAME PHOTO FRAME ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -12 }}
          whileInView={{ opacity: 1, y: 0, rotate: -7 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-[7%] xl:right-[8%] top-[45%] z-10 w-[270px] xl:w-[310px] bg-white p-3.5 pb-4 rounded-[4px] shadow-[0_20px_45px_rgba(7,26,43,0.14)] border border-black/[0.06]"
          style={{ transformOrigin: "center center" }}
        >
          <div className="w-full aspect-[4/3] rounded-[2px] overflow-hidden bg-[#071A2B]">
            <img
              src={deskWireframeImg}
              alt="Desk with wireframe sketches and Nexovate coffee mug"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* ── BOTTOM-RIGHT: PINK STICKY NOTE (BUILD SHARE GROW) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 8 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-[3%] xl:right-[4%] top-[60%] z-20 w-[130px] xl:w-[145px] bg-[#FCE4EC] rounded-md p-3.5 shadow-[0_10px_25px_rgba(7,26,43,0.08)] border border-[#F8BBD0]"
          style={{ transformOrigin: "center center" }}
        >
          <div className="tape-frost absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3.5 rounded-[2px] rotate-[2deg]" />
          <div className="collage-handwriting text-[#4A154B] text-base xl:text-lg font-bold leading-tight text-center pt-1 space-y-1">
            <div>Build</div>
            <div>Share</div>
            <div>Grow</div>
            <div className="text-sm font-normal">♡</div>
          </div>
        </motion.div>

      </div>

      {/* ── DEDICATED ART-DIRECTED MOBILE COMPOSITION (< 1024px) ── */}
      <div className="block lg:hidden relative w-full px-5 sm:px-8 pt-10 pb-6">
        
        {/* Central Brand & Headline */}
        <div className="text-center flex flex-col items-center">
          {/* Top Oval Nexovate Badge */}
          <div className="border-[1.8px] border-[#071A2B] rounded-[50%/50%] px-5 py-1 rotate-[-2deg] mb-5 shadow-sm bg-transparent inline-block">
            <span className="font-jakarta text-[11px] font-extrabold tracking-[0.2em] text-[#071A2B] uppercase">
              NEXOVATE
            </span>
          </div>

          <div className="relative inline-block">
            <h2 className="font-jakarta font-black text-[34px] sm:text-[42px] leading-[1.08] text-[#071A2B] tracking-[-0.03em]">
              Whatever you're
              <br />
              curious about,
              <br />
              <span className="relative inline-block text-[#11AFC0] mt-0.5">
                build it.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 overflow-visible pointer-events-none"
                  viewBox="0 0 200 14"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9C40 3 120 2 198 7C160 11 80 12 2 9Z"
                    fill="#F97316"
                  />
                </svg>
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#071A2B]/80 font-normal leading-relaxed mt-4 max-w-xs sm:max-w-sm">
            Learn the skills. Build real projects. Create opportunities for your future.
          </p>

          {/* CTA Button */}
          <div className="mt-5 flex flex-col items-center gap-2">
            <a
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#071A2B] text-white font-bold text-sm shadow-[0_8px_20px_rgba(7,26,43,0.18)] active:scale-[0.98] transition-all"
            >
              <span>Explore Programs</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
            <div className="collage-handwriting text-[#071A2B] text-sm font-semibold flex items-center gap-1.5 pt-1">
              <span>Start Building</span>
              <span>↗</span>
            </div>
          </div>
        </div>

        {/* Mobile Collage Cards Layout */}
        <div className="mt-8 space-y-6 max-w-md mx-auto">
          {/* Card 1: Student Coding with Blue Sticky Note */}
          <div className="relative pt-6">
            {/* Taped sticky note overlapping top left */}
            <div className="tape-frost absolute top-0 left-2 z-20 w-36 bg-[#D6EBF8] rounded p-2.5 shadow-md border border-[#C2E0F5] rotate-[-4deg]">
              <div className="collage-handwriting text-xs font-semibold text-[#1E293B]">
                Ideas • Skills • Projects ☺
              </div>
            </div>

            <div className="bg-white p-3 pb-3.5 rounded shadow-lg border border-black/[0.06] rotate-[-2deg]">
              <div className="w-full aspect-[4/3] rounded overflow-hidden bg-[#071A2B]">
                <img
                  src={studentCodingImg}
                  alt="Student coding"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Desk Wireframe with Pink Sticky Note */}
          <div className="relative pt-4">
            <div className="bg-white p-3 pb-3.5 rounded shadow-lg border border-black/[0.06] rotate-[2deg]">
              <div className="w-full aspect-[4/3] rounded overflow-hidden bg-[#071A2B]">
                <img
                  src={deskWireframeImg}
                  alt="Wireframe sketches and mug"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Pink note overlapping bottom right */}
            <div className="absolute -bottom-3 right-3 z-20 bg-[#FCE4EC] rounded p-2.5 shadow-md border border-[#F8BBD0] rotate-[6deg]">
              <div className="collage-handwriting text-xs font-bold text-[#4A154B] text-center">
                Build • Share • Grow ♡
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── ORGANIC CURVED BOTTOM BOUNDARY & OVERLAPPING STARS ── */}
      <div className="relative w-full overflow-visible pointer-events-none mt-4 sm:mt-8">
        
        {/* SVG Organic Wave / Curve Transition: Fills warm ivory, cuts down into clean white (#FFFFFF) */}
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[70px] sm:h-[90px] md:h-[110px] xl:h-[130px] block overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Curve Shape */}
          <path
            d="M0 0C380 90 1060 90 1440 0V120H0V0Z"
            fill="#FFFFFF"
          />
        </svg>

        {/* ── 4-POINT DECORATIVE STARS POSITIONED PRECISELY OVER THE CURVE ── */}
        {/* Star 1: Left Medium Golden Star (Sitting just above curve) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="absolute left-[16%] sm:left-[19%] top-[35%] -translate-y-1/2 z-30 pointer-events-auto"
        >
          <SparkleStar size={26} color="#FBBF24" className="rotate-[12deg] drop-shadow-[0_2px_8px_rgba(251,191,36,0.35)]" />
        </motion.div>

        {/* Star 2: Center-Left Amber Star (Crossing / overlapping the curve) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="absolute left-[24%] sm:left-[26%] top-[65%] -translate-y-1/2 z-30 pointer-events-auto"
        >
          <SparkleStar size={20} color="#F59E0B" className="rotate-[-6deg] drop-shadow-[0_2px_6px_rgba(245,158,11,0.35)]" />
        </motion.div>

        {/* Star 3: Right Amber Star (Sitting above the curve) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="absolute right-[19%] sm:right-[21%] top-[38%] -translate-y-1/2 z-30 pointer-events-auto"
        >
          <SparkleStar size={22} color="#F97316" className="rotate-[15deg] drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)]" />
        </motion.div>

        {/* Star 4: Far Right Radiant Golden Star (Large hero star directly on the curve) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="absolute right-[12%] sm:right-[14%] top-[55%] -translate-y-1/2 z-30 pointer-events-auto"
        >
          <SparkleStar size={42} color="#FBBF24" className="rotate-[-8deg] drop-shadow-[0_4px_12px_rgba(251,191,36,0.5)]" />
          {/* Tiny accent dot near Star 4 */}
          <div className="absolute -left-2 top-0 w-2 h-2 rounded-full bg-[#F59E0B] opacity-80" />
        </motion.div>

      </div>

      {/* ── SECTION TRANSITION BASELINE (UNDERNEATH CURVE) ── */}
      <div className="w-full bg-[#FFFFFF] py-8 sm:py-12 px-6 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-jakarta font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#071A2B] tracking-tight"
        >
          Real skill. Real people. Real progress.
        </motion.h3>
      </div>

    </section>
  );
};

export default EditorialCollageSection;
