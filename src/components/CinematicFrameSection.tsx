import React, { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import { getLenis } from "@/animations/smoothScroll";

const TOTAL_FRAMES = 25;
const FRAMES: string[] = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) =>
    `/assets/nexovate-bg-scroll/ezgif-6c1b4324de66cb89-jpg/video_LTX_2_5_t2v_00001__frames/frame_${String(
      i + 1
    ).padStart(3, "0")}.png`
);

// Floating ambient data particles positioned in the periphery (keeping center clean)
const PARTICLES = [
  { text: "01001", x: "88%", y: "18%", color: "#18A9AA", baseOpacity: 0.35 },
  { text: "00110", x: "92%", y: "42%", color: "rgba(255,255,255,0.25)", baseOpacity: 0.22 },
  { text: "11001", x: "85%", y: "78%", color: "#F2B632", baseOpacity: 0.35 },
  { text: "011010", x: "10%", y: "22%", color: "#18A9AA", baseOpacity: 0.30 },
  { text: "10101", x: "8%", y: "68%", color: "rgba(255,255,255,0.22)", baseOpacity: 0.22 },
  { text: "010101", x: "14%", y: "82%", color: "#F2B632", baseOpacity: 0.28 },
  { text: "10011", x: "80%", y: "88%", color: "#18A9AA", baseOpacity: 0.25 },
  { text: "00101", x: "12%", y: "45%", color: "rgba(255,255,255,0.20)", baseOpacity: 0.18 },
];

export const CinematicFrameSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameImgRef = useRef<HTMLImageElement>(null);

  const targetProgressRef = useRef<number>(0);
  const displayedProgressRef = useRef<number>(0);
  const currentFrameIndexRef = useRef<number>(TOTAL_FRAMES - 1);
  const rafIdRef = useRef<number | null>(null);
  const isLoopRunningRef = useRef<boolean>(false);

  const shouldReduceMotion = useReducedMotion();

  // 1. Image Preloading (Reversed priority: 25, 24, 23, 22...)
  useEffect(() => {
    const preloadedImages: HTMLImageElement[] = [];

    for (let i = TOTAL_FRAMES - 1; i >= 0; i--) {
      const img = new Image();
      img.src = FRAMES[i];
      if (typeof img.decode === "function" && i >= TOTAL_FRAMES - 6) {
        img.decode().catch(() => {});
      }
      preloadedImages.push(img);
    }

    return () => {
      preloadedImages.length = 0;
    };
  }, []);

  // 2. High-Performance Direct DOM Visual Renderer (60fps / 120fps)
  const renderVisuals = useCallback((progress: number) => {
    const p = Math.min(1, Math.max(0, progress));

    // ── REVERSED FRAME SEQUENCE WITH FINAL FRAME HOLD ──
    // 0.00 -> 0.90: Progresses frame_025 (index 24) down to frame_001 (index 0)
    // 0.90 -> 1.00: STRICTLY HOLD frame_001 (index 0). Zero fade, zero dissolve, zero blur.
    const frameMotionProgress = Math.min(1, p / 0.90);
    const targetIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round((1 - frameMotionProgress) * (TOTAL_FRAMES - 1)))
    );

    if (targetIndex !== currentFrameIndexRef.current && frameImgRef.current) {
      currentFrameIndexRef.current = targetIndex;
      frameImgRef.current.src = FRAMES[targetIndex];
    }
  }, []);

  // 3. Smooth Damped RAF Animation Loop (0.10 factor)
  const startLoop = useCallback(() => {
    if (isLoopRunningRef.current) return;
    isLoopRunningRef.current = true;

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    const dampingFactor = isMobile ? 0.14 : 0.10;

    const tick = () => {
      const target = targetProgressRef.current;
      const current = displayedProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.0003) {
        displayedProgressRef.current = target;
        renderVisuals(target);
        isLoopRunningRef.current = false;
        rafIdRef.current = null;
        return;
      }

      displayedProgressRef.current = current + diff * dampingFactor;
      renderVisuals(displayedProgressRef.current);

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [renderVisuals]);

  // 4. Scroll Tracking over 350vh Track
  useEffect(() => {
    if (shouldReduceMotion) return;

    const updateTargetProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollRange = section.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;

      const rawProgress = -rect.top / scrollRange;
      targetProgressRef.current = Math.min(1, Math.max(0, rawProgress));

      startLoop();
    };

    window.addEventListener("scroll", updateTargetProgress, { passive: true });

    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", updateTargetProgress);
    }

    updateTargetProgress();

    return () => {
      window.removeEventListener("scroll", updateTargetProgress);
      if (lenis) lenis.off("scroll", updateTargetProgress);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      isLoopRunningRef.current = false;
    };
  }, [shouldReduceMotion, startLoop]);

  return (
    <section
      ref={sectionRef}
      id="cinematic-experience"
      className={`cinematic-section relative w-full ${
        shouldReduceMotion ? "min-h-[100svh]" : "h-[350vh]"
      } bg-[#070913] text-white select-none`}
    >
      {/* ── FULL-BLEED STICKY CINEMATIC VIEWPORT (100svh) ── */}
      <div className="cinematic-sticky sticky top-0 w-full h-[100svh] h-[100dvh] h-screen overflow-hidden bg-[#070913]">
        
        {/* ── 1. FULL-BLEED CINEMATIC FRAME IMAGE (100% visible, no cards, no borders, holds on frame 1) ── */}
        <div className="cinematic-frame absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <img
            ref={frameImgRef}
            src={FRAMES[TOTAL_FRAMES - 1]}
            alt="Nexovate applied software engineering workspace"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
          />

          {/* Subtle cinematic vignette for centered text contrast while preserving golden sunlight */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-radial from-[#070913]/60 via-[#070913]/35 to-[#070913]/70"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070913]/80 via-transparent to-[#070913]/50"
          />
        </div>

        {/* ── 2. PERIPHERAL DATA PARTICLES (Very subtle, sparse, floating in edges) ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-10 select-none overflow-hidden"
        >
          {PARTICLES.map((part, idx) => (
            <span
              key={`particle-${idx}`}
              className="absolute font-mono text-[10px] sm:text-xs font-semibold tracking-widest select-none drop-shadow-sm"
              style={{
                left: part.x,
                top: part.y,
                color: part.color,
                opacity: part.baseOpacity,
              }}
            >
              {part.text}
            </span>
          ))}
        </div>

        {/* ── 3. DEAD-CENTERED EDITORIAL STATEMENT ── */}
        <div className="cinematic-copy absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(840px,90vw)] text-center z-20 pointer-events-none flex flex-col items-center justify-center px-4">
          
          {/* Eyebrow */}
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] text-[#18A9AA] uppercase block mb-3 sm:mb-4 drop-shadow-md">
            REAL WORK • REAL SYSTEMS
          </span>

          {/* Main Statement in Premium Editorial Serif */}
          <h2 className="text-[clamp(34px,4.5vw,70px)] font-normal text-[#F7F4EE] font-serif tracking-[-0.035em] leading-[0.98] select-none text-center drop-shadow-lg">
            Built alongside active practitioners in live production environments.
          </h2>
        </div>

      </div>
    </section>
  );
};

export default CinematicFrameSection;
