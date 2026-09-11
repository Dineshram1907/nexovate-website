import React, { useEffect, useRef, useState, useCallback } from "react";

// ============================================================================
// NEXOVATE CINEMATIC FRAME SEQUENCE
// Fixed sticky viewport + single fixed 2D canvas + scroll-driven frame selection.
// All 25 PNG frames occupy the exact same fixed screen rectangle.
// ============================================================================

const FRAME_COUNT = 25;
const FRAME_BASE =
  "/assets/nexovate-bg-scroll/ezgif-6c1b4324de66cb89-jpg/video_LTX_2_5_t2v_00001__frames";

const getFrameUrl = (frameNumber: number): string =>
  `${FRAME_BASE}/frame_${String(frameNumber).padStart(3, "0")}.png`;

interface NarrativeStage {
  id: number;
  progressRange: [number, number];
  eyebrow: string;
  line1: string;
  line2: string;
  accentLine2?: boolean;
}

const NARRATIVE_STAGES: NarrativeStage[] = [
  {
    id: 1,
    progressRange: [0, 0.25],
    eyebrow: "LEARN DIFFERENTLY",
    line1: "Learning should",
    line2: "lead somewhere.",
    accentLine2: true,
  },
  {
    id: 2,
    progressRange: [0.25, 0.5],
    eyebrow: "FROM KNOWLEDGE",
    line1: "Make what you learn",
    line2: "something you can use.",
    accentLine2: true,
  },
  {
    id: 3,
    progressRange: [0.5, 0.75],
    eyebrow: "REAL PRACTICE",
    line1: "Build alongside",
    line2: "people who build for real.",
    accentLine2: true,
  },
  {
    id: 4,
    progressRange: [0.75, 1.0],
    eyebrow: "WHAT COMES NEXT",
    line1: "Turn learning",
    line2: "into capability.",
    accentLine2: true,
  },
];

export const CinematicImageSequence: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // In-memory preloaded frame objects
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef<number>(0);

  // Scroll playhead state outside React state (imperative 60fps rendering)
  const renderedFrameRef = useRef<number>(-1);
  const pendingFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Narrative typography stage (only updates when crossing narrative boundary)
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const activeStageIdRef = useRef<number>(1);

  // ─────────────────────────────────────────────────────────────
  // 1. DRAW FRAME ON CANVAS
  // All 25 frames are rendered into the exact same centered rectangle.
  // No translation, no zoom, no crop, no scale animation.
  // ─────────────────────────────────────────────────────────────
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let targetImg = imagesRef.current[frameIndex];
    let isFallback = false;

    // Fallback to nearest loaded frame if target frame is still decoding
    if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) {
      isFallback = true;
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        const lower = imagesRef.current[frameIndex - offset];
        if (lower && lower.complete && lower.naturalWidth > 0) {
          targetImg = lower;
          break;
        }
        const higher = imagesRef.current[frameIndex + offset];
        if (higher && higher.complete && higher.naturalWidth > 0) {
          targetImg = higher;
          break;
        }
      }
    }

    if (!targetImg || !targetImg.complete || targetImg.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = targetImg.naturalWidth;
    const imgHeight = targetImg.naturalHeight;

    // Clear canvas with consistent dark cinematic background
    ctx.fillStyle = "#070913";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Identical contain fit calculation across every frame
    const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const drawX = (canvasWidth - drawWidth) / 2;
    const drawY = (canvasHeight - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(targetImg, drawX, drawY, drawWidth, drawHeight);

    if (!isFallback) {
      renderedFrameRef.current = frameIndex;
    }
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 2. CANVAS SIZING WITH DPR CAPPED AT 2
  // ─────────────────────────────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !sticky) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = sticky.clientWidth || window.innerWidth;
    const height = sticky.clientHeight || window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const frameToDraw = renderedFrameRef.current >= 0 ? renderedFrameRef.current : 0;
    drawFrame(frameToDraw);
  }, [drawFrame]);

  // ─────────────────────────────────────────────────────────────
  // 3. CONTINUOUS SCROLL PROGRESS -> FRAME NUMBER
  // ─────────────────────────────────────────────────────────────
  const updatePlayhead = useCallback(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    // Accessibility: reduced motion support
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      if (renderedFrameRef.current !== 0) {
        drawFrame(0);
      }
      return;
    }

    const rect = section.getBoundingClientRect();
    const stickyHeight = sticky.offsetHeight || window.innerHeight;
    const scrollableDistance = section.offsetHeight - stickyHeight;
    if (scrollableDistance <= 0) return;

    // Continuous normalized scroll progress (0.0 to 1.0)
    const scrolled = -rect.top;
    const progress = Math.min(1, Math.max(0, scrolled / scrollableDistance));

    // Direct mapping to frame index: 0 (Frame 001) to 24 (Frame 025)
    const targetFrameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(progress * (FRAME_COUNT - 1)))
    );

    // Update narrative stage only when boundary changes (no re-renders on continuous scroll)
    const matchedStage =
      NARRATIVE_STAGES.find(
        (s) =>
          progress >= s.progressRange[0] &&
          (progress < s.progressRange[1] || (s.id === 4 && progress <= 1))
      ) || NARRATIVE_STAGES[0];

    if (matchedStage.id !== activeStageIdRef.current) {
      activeStageIdRef.current = matchedStage.id;
      setActiveStageId(matchedStage.id);
    }

    // Trigger canvas draw when target frame differs from currently rendered
    if (targetFrameIndex !== renderedFrameRef.current) {
      pendingFrameRef.current = targetFrameIndex;
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          drawFrame(pendingFrameRef.current);
          rafIdRef.current = null;
        });
      }
    }

    // Diagnostics hook on window for manual verification
    if (typeof window !== "undefined") {
      (window as any).__NEXOVATE_CINEMA_DEBUG__ = {
        progress,
        frameIndex: targetFrameIndex,
        frameNumber: targetFrameIndex + 1,
        loadedFrames: loadedCountRef.current,
        frameCount: FRAME_COUNT,
        sectionStart: section.offsetTop,
        sectionEnd: section.offsetTop + section.offsetHeight,
        scrollDistance: scrollableDistance,
        setFrame: (num: number) => {
          const idx = Math.max(0, Math.min(FRAME_COUNT - 1, num - 1));
          drawFrame(idx);
        },
      };
    }
  }, [drawFrame]);

  // ─────────────────────────────────────────────────────────────
  // 4. PRELOAD ALL 25 ASSETS
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameIdx = i - 1;
      const url = getFrameUrl(i);
      img.src = url;

      img.onload = () => {
        images[frameIdx] = img;
        count++;
        loadedCountRef.current = count;

        // Render Frame 001 immediately on load so canvas is ready at landing
        if (i === 1 && renderedFrameRef.current === -1) {
          drawFrame(0);
        }

        // If target frame loads while playhead is waiting on it, render it immediately
        if (pendingFrameRef.current === frameIdx) {
          drawFrame(frameIdx);
        }
      };

      img.onerror = () => {
        console.error(`[Cinematic Loader] FAILED to load frame ${i} from URL: ${url}`);
      };

      images[frameIdx] = img;
    }

    imagesRef.current = images;

    // Initial canvas sizing and frame draw
    resizeCanvas();
    updatePlayhead();

    // Natural passive scroll and resize listeners (zero scroll hijacking)
    const onScroll = () => {
      updatePlayhead();
    };

    const onResize = () => {
      resizeCanvas();
      updatePlayhead();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", onResize);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", onResize);
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame, resizeCanvas, updatePlayhead]);

  const activeNarrative =
    NARRATIVE_STAGES.find((s) => s.id === activeStageId) || NARRATIVE_STAGES[0];

  return (
    <section
      ref={sectionRef}
      id="cinematic-experience"
      className="cinematic-sequence relative w-full h-[800vh] min-h-[800vh] bg-[#070913] select-none font-sans isolate"
      aria-label="Nexovate 25-Frame Cinematic Sequence"
    >
      {/* ── STICKY VIEWPORT (100vw × 100svh fixed visual camera) ── */}
      <div
        ref={stickyRef}
        className="cinematic-sticky sticky top-0 w-full h-[100svh] min-h-[100svh] max-h-[100svh] overflow-hidden bg-[#070913]"
      >
        {/* EXACTLY ONE 2D CANVAS — FIXED POSITION, REPLACING PIXELS FRAME BY FRAME */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="block w-full h-full pointer-events-none select-none"
        />

        {/* Cinematic Scrim for Typographic Contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#070913]/30 pointer-events-none z-10"
        />

        {/* EDITORIAL NARRATIVE OVERLAY (DRIVEN BY SHARED SCROLL TIMELINE) */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none z-20 p-6 text-center">
          <div className="relative w-[min(900px,calc(100vw-40px))] text-center flex items-center justify-center min-h-[220px] sm:min-h-[280px]">
            <div
              key={activeNarrative.id}
              className="flex flex-col items-center justify-center text-center transition-all duration-300 ease-out"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center justify-center gap-2.5 mb-3 sm:mb-5">
                <span className="w-4 h-[1.5px] bg-[#10A7B5]" />
                <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.2em] uppercase text-[#10A7B5]">
                  {activeNarrative.eyebrow}
                </span>
                <span className="w-4 h-[1.5px] bg-[#10A7B5]" />
              </div>

              {/* Monumental Centered Headline */}
              <h2 className="font-sans font-extrabold text-[clamp(36px,6.5vw,88px)] text-[#F5F1E8] leading-[0.94] tracking-[-0.055em] drop-shadow-[0_4px_32px_rgba(7,9,19,0.85)] max-w-[900px]">
                <span className="block">{activeNarrative.line1}</span>
                <span
                  className={`block ${
                    activeNarrative.accentLine2 ? "text-[#10A7B5]" : "text-[#F5F1E8]"
                  }`}
                >
                  {activeNarrative.line2}
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicImageSequence;
