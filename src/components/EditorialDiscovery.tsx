import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import "./EditorialDiscovery.css";

/* ─── CONSTANTS ─────────────────────────────────────────────────────────── */

const AUTOPLAY_INTERVAL = 4500; // ms per method

/* ─── DATA ──────────────────────────────────────────────────────────────── */

interface MethodStage {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  alt: string;
  tag: string;
  caption: string;
  meta: string;
}

const METHOD_STAGES: MethodStage[] = [
  {
    id: "stage-discover",
    num: "01",
    title: "DISCOVER",
    subtitle: "Discover without pressure",
    body: "Explore hands-on sandboxes across artificial intelligence, modern web engineering, and product design before specializing.",
    image: "/assets/discovery/discovery-stage-1.png",
    alt: "Student exploring hands-on sandboxes across AI and engineering",
    tag: "APPLIED LABORATORY",
    caption: "Active studio environment · Real engineering toolchains",
    meta: "STAGE 01 / EXPLORATION",
  },
  {
    id: "stage-build",
    num: "02",
    title: "BUILD",
    subtitle: "Build with senior practitioners",
    body: "Submit weekly Git pull requests evaluated by active engineers who examine architecture, performance benchmarks, and edge cases.",
    image: "/assets/discovery/discovery-stage-2.png",
    alt: "Two engineers collaborating on code review and architecture auditing",
    tag: "PRACTITIONER REVIEW",
    caption: "Weekly Git PR evaluation · Benchmark auditing",
    meta: "STAGE 02 / CODE REVIEW",
  },
  {
    id: "stage-ship",
    num: "03",
    title: "SHIP",
    subtitle: "Ship verifiable systems",
    body: "Deploy live microservices, authenticated APIs, and real-time databases into production cloud environments.",
    image: "/assets/discovery/discovery-stage-3.jpg",
    alt: "Engineering team deploying live microservices into production clouds",
    tag: "PRODUCTION SYSTEMS",
    caption: "Live microservices · Authenticated cloud infrastructure",
    meta: "STAGE 03 / SHIPMENT",
  },
];

/* ─── PROGRESS BAR COMPONENT ────────────────────────────────────────────── */

interface ProgressLineProps {
  active: boolean;
  paused: boolean;
  reduced: boolean;
}

const ProgressLine = memo(({ active, paused, reduced }: ProgressLineProps) => {
  if (!active) return null;

  if (reduced || paused) {
    return <div className="ned-progress-fill" style={{ transform: "scaleX(1)" }} />;
  }

  return (
    <motion.div
      className="ned-progress-fill"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
      style={{ originX: 0 }}
    />
  );
});

ProgressLine.displayName = "ProgressLine";

/* ─── MAIN COMPONENT ────────────────────────────────────────────────────── */

export const EditorialDiscovery: React.FC = () => {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentStage = METHOD_STAGES[activeIndex];

  /* 1. Preload all stage images on mount */
  useEffect(() => {
    METHOD_STAGES.forEach((stage) => {
      const img = new Image();
      img.src = stage.image;
    });
  }, []);

  /* 2. Autoplay rotation engine (4.5s) */
  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (reducedMotion || isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % METHOD_STAGES.length);
    }, AUTOPLAY_INTERVAL);
  }, [reducedMotion, isPaused]);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer, activeIndex]);

  /* 3. Pause when browser tab is inactive */
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  /* 4. Manual selection handler */
  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const handlePause = useCallback(() => setIsPaused(true), []);
  const handleResume = useCallback(() => setIsPaused(false), []);

  return (
    <section
      id="discovery"
      className="ned-section"
      style={{ scrollMarginTop: "var(--navbar-height, 80px)" }}
    >
      <div className="ned-container">
        
        {/* ══ 1. HEADER ZONE (Eyebrow + Main Heading) ════════════════════ */}
        <header className="ned-header">
          <div className="ned-eyebrow-wrap">
            <span className="ned-eyebrow">01 — THE NEXOVATE METHOD</span>
          </div>

          <h2 className="ned-heading">
            <span className="ned-heading-plain">Discover what you’re</span>
            <br className="ned-heading-break" />
            <span className="ned-heading-teal">capable of</span>
            <span className="ned-heading-gold">.</span>
          </h2>
        </header>

        {/* ══ 2. EDITORIAL STATEMENT ═════════════════════════════════════ */}
        <div className="ned-statement">
          <div className="ned-statement-quote">
            <p className="ned-statement-text">
              Nexovate is built around the premise that computing mastery cannot be memorized from slides. It is forged by writing code, breaking environments, and designing systems that actually work in the real world.
            </p>
          </div>
        </div>

        {/* ══ 3. METHOD INDEX (Interactive Editorial Navigation) ═════════ */}
        <div
          className="ned-methods"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onFocus={handlePause}
          onBlur={handleResume}
        >
          <div className="ned-methods-header" aria-hidden="true">
            <span className="ned-methods-label">METHODOLOGY</span>
            <span className="ned-methods-count">03 STAGES</span>
          </div>

          <nav className="ned-methods-list" aria-label="Nexovate Method Stages">
            {METHOD_STAGES.map((stage, idx) => {
              const isActive = activeIndex === idx;

              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  id={`method-tab-${stage.num}`}
                  aria-selected={isActive}
                  aria-current={isActive ? "true" : undefined}
                  aria-controls={`method-panel-${stage.num}`}
                  aria-label={`Method stage ${stage.num}: ${stage.title} — ${stage.subtitle}`}
                  onClick={() => handleSelect(idx)}
                  className={`ned-method-btn${isActive ? " ned-method-btn--active" : ""}`}
                >
                  {/* Top line: Number, Title, Subtitle */}
                  <div className="ned-method-meta">
                    <span className={`ned-method-num${isActive ? " ned-method-num--active" : ""}`}>
                      {stage.num}
                    </span>
                    <div className="ned-method-titles">
                      <span className={`ned-method-name${isActive ? " ned-method-name--active" : ""}`}>
                        {stage.title}
                      </span>
                      <span className={`ned-method-sub${isActive ? " ned-method-sub--active" : ""}`}>
                        {stage.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Animated Progress Indicator Rail */}
                  <div className="ned-progress-rail" aria-hidden="true">
                    <ProgressLine active={isActive} paused={isPaused} reduced={reducedMotion} />
                  </div>

                  {/* Expandable Method Description */}
                  <p
                    id={`method-panel-${stage.num}`}
                    className={`ned-method-desc${isActive ? " ned-method-desc--active" : ""}`}
                  >
                    {stage.body}
                  </p>
                </button>
              );
            })}
          </nav>

          {/* Program CTA Link */}
          <div className="ned-action-wrap">
            <button
              type="button"
              className="ned-action-btn"
              onClick={() => navigate("/programs")}
            >
              <span>Explore full curriculum</span>
              <ArrowUpRight className="ned-action-icon" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ══ 4. LARGE VISUAL STAGE (Dominant Visual Anchor) ════════════ */}
        <div
          className="ned-stage"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
        >
          {/* Ambient Glow Bloom Layer (soft teal & deep navy) */}
          <div className="ned-stage-glow" aria-hidden="true">
            <div className="ned-glow-core" />
            <div className="ned-glow-ambient" />
            <div className="ned-glow-depth" />
          </div>

          {/* Cinematic Frame */}
          <figure className="ned-frame">
            {/* Crossfading Image Stack */}
            <AnimatePresence mode="sync">
              <motion.img
                key={currentStage.id}
                src={currentStage.image}
                alt={currentStage.alt}
                className="ned-img"
                initial={{
                  opacity: 0,
                  scale: reducedMotion ? 1 : 1.025,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: reducedMotion ? 1 : 0.98,
                }}
                transition={{
                  duration: reducedMotion ? 0.2 : 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </AnimatePresence>

            {/* Gradient Scrim for Contrast */}
            <div className="ned-scrim" aria-hidden="true" />

            {/* Live Environment Badge (Top-Left) */}
            <div className="ned-badge" aria-live="polite">
              <span className="ned-badge-dot" aria-hidden="true" />
              <span className="ned-badge-text">{currentStage.tag}</span>
            </div>

            {/* Integrated Stage Caption (Bottom) */}
            <figcaption className="ned-caption">
              <div className="ned-caption-left">
                <span className="ned-caption-meta">{currentStage.meta}</span>
                <span className="ned-caption-text">{currentStage.caption}</span>
              </div>
              <span className="ned-caption-counter" aria-hidden="true">
                {currentStage.num} / 03
              </span>
            </figcaption>
          </figure>
        </div>

      </div>
    </section>
  );
};

export default EditorialDiscovery;
