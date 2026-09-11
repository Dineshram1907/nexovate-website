import React, { useRef, useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import {
  bindhuReview,
  arjunAvatar,
  hariniAvatar,
  pragReview,
  keinReview,
  yallReview,
} from "@/assets";

export interface StudentReview {
  id: string;
  name: string;
  program: string;
  roleOrCompany: string;
  quote: string;
  rating: number;
  image: string;
  objectPosition?: string;
}

export const STUDENT_REVIEWS: StudentReview[] = [
  {
    id: "review-bindhu",
    name: "Bindhu Priya",
    program: "AI Systems & Computer Vision Track",
    roleOrCompany: "Computer Vision Fellow",
    quote:
      "Before Nexovate, neural networks were abstract equations in lectures. Here, my mentor helped me train and deploy real-time vision pipelines from scratch. When I interview now, I walk engineers through my actual production codebase.",
    rating: 5,
    image: bindhuReview,
    objectPosition: "center 22%",
  },
  {
    id: "review-arjun",
    name: "Arjun Verma",
    program: "Full-Stack Systems Architecture",
    roleOrCompany: "Software Engineering Fellow",
    quote:
      "The contrast with traditional courses is night and day. You don't memorize slides — you architect distributed services with React, Node, and PostgreSQL. In my final technical interview, I walked the director through my live deployed ledger.",
    rating: 5,
    image: arjunAvatar,
    objectPosition: "center 18%",
  },
  {
    id: "review-harini",
    name: "Harini Balaji",
    program: "Cloud Architecture & DevOps Track",
    roleOrCompany: "Cloud Operations Fellow",
    quote:
      "Deploying multi-region Kubernetes clusters with automated Terraform pipelines was intense and practical. Having an SRE practitioner give direct feedback on your architecture is something you simply cannot get from documentation.",
    rating: 5,
    image: hariniAvatar,
    objectPosition: "center 20%",
  },
  {
    id: "review-pragadeesh",
    name: "Pragadeesh K",
    program: "Data Science & Analytics Track",
    roleOrCompany: "Data Engineering Fellow",
    quote:
      "Working with real messy datasets and building production analytics pipelines gave me the confidence to step into high-impact engineering roles from day one. Nexovate teaches you to think like a builder.",
    rating: 5,
    image: pragReview,
    objectPosition: "center 20%",
  },
  {
    id: "review-kein",
    name: "Kein Samuel",
    program: "Applied Software Systems",
    roleOrCompany: "Systems Engineering Fellow",
    quote:
      "Nexovate shifted my entire mindset from student to builder. The code reviews were demanding, the milestones were real, and the finished software was something I was genuinely proud to put my name on.",
    rating: 5,
    image: keinReview,
    objectPosition: "center 20%",
  },
  {
    id: "review-yallini",
    name: "Yallini S",
    program: "AI / ML Engineering Track",
    roleOrCompany: "Machine Learning Fellow",
    quote:
      "Building and fine-tuning open-source models with live latency constraints gave me practical intuition that no tutorial could provide. The mentorship here completely redefined my career trajectory.",
    rating: 5,
    image: yallReview,
    objectPosition: "center 20%",
  },
];

// Replicated dataset to ensure a continuous, genuinely infinite revolving ribbon
const REPEATED_REVIEWS = [
  ...STUDENT_REVIEWS,
  ...STUDENT_REVIEWS,
  ...STUDENT_REVIEWS,
  ...STUDENT_REVIEWS,
  ...STUDENT_REVIEWS,
  ...STUDENT_REVIEWS,
];

export const StudentReviews: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const scrollOffsetRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);

  const reducedMotion = useReducedMotion() ?? false;

  const [cardWidth, setCardWidth] = useState(380);
  const [cardGap, setCardGap] = useState(20);
  const [viewportWidth, setViewportWidth] = useState(1440);

  // Unified interactive momentum & mouse tracking state refs
  const mouseTargetXRef = useRef<number>(0); // Target mouse offset relative to center (-1 to 1)
  const mouseLerpedXRef = useRef<number>(0);  // Smoothly interpolated mouse offset
  const lastMouseXRef = useRef<number>(0);
  const lastMouseTimeRef = useRef<number>(0);
  const mouseVelocityRef = useRef<number>(0);
  const interactionMomentumRef = useRef<number>(0);
  const isPointerInsideRef = useRef<boolean>(false);

  // Touch tracking refs
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const touchLastXRef = useRef<number>(0);
  const isHorizontalSwipeRef = useRef<boolean>(false);

  // Responsive dimension updates
  const updateDimensions = useCallback(() => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    setViewportWidth(vw);

    if (vw < 640) {
      setCardWidth(Math.min(vw - 44, 320));
      setCardGap(14);
    } else if (vw < 1024) {
      setCardWidth(350);
      setCardGap(18);
    } else if (vw < 1440) {
      setCardWidth(380);
      setCardGap(20);
    } else {
      setCardWidth(410);
      setCardGap(24);
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Track vertical page scroll to add natural dynamic momentum without hijacking scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Scrolling down advances Left -> Right faster, scrolling up nudges backwards
      scrollOffsetRef.current += delta * 0.4;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── MOUSE INTERACTION HANDLERS ──
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const normalized = (relativeX / rect.width) * 2 - 1; // -1 (left edge) to +1 (right edge)
    mouseTargetXRef.current = normalized;

    // Calculate mouse velocity for subtle momentum injection
    const now = performance.now();
    const dt = Math.max(now - lastMouseTimeRef.current, 16);
    const dx = e.clientX - lastMouseXRef.current;
    lastMouseXRef.current = e.clientX;
    lastMouseTimeRef.current = now;

    // Gentle velocity push (moving mouse rightwards adds positive velocity)
    const instantVelocity = (dx / dt) * 12;
    mouseVelocityRef.current = Math.max(-40, Math.min(40, instantVelocity));
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    isPointerInsideRef.current = true;
    lastMouseXRef.current = e.clientX;
    lastMouseTimeRef.current = performance.now();
  };

  const handleMouseLeave = () => {
    isPointerInsideRef.current = false;
    mouseTargetXRef.current = 0; // Return smoothly to neutral center
  };

  // ── TOUCH INTERACTION HANDLERS (Non-blocking) ──
  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length === 0) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchLastXRef.current = e.touches[0].clientX;
    isHorizontalSwipeRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length === 0) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartXRef.current;
    const diffY = currentY - touchStartYRef.current;

    // Detect if this is an intentional horizontal flick vs vertical page scroll
    if (!isHorizontalSwipeRef.current && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
      isHorizontalSwipeRef.current = true;
    }

    if (isHorizontalSwipeRef.current) {
      const stepDelta = currentX - touchLastXRef.current;
      interactionMomentumRef.current += stepDelta * 0.75;
      touchLastXRef.current = currentX;
    }
  };

  const handleTouchEnd = () => {
    isHorizontalSwipeRef.current = false;
  };

  const singleCycleWidth = STUDENT_REVIEWS.length * (cardWidth + cardGap);

  // ── UNIFIED AUTOMATIC + INTERACTIVE MOMENTUM 3D PANORAMIC LOOP (LEFT → RIGHT) ──
  useEffect(() => {
    if (reducedMotion) return;

    // Base cinematic auto-flow speed (30px/second moving Left -> Right)
    const baseSpeed = 32;

    const renderPanoramicOrbit = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaSeconds = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      // 1. Smoothly interpolate mouse position (lerp damping: current += (target - current) * 0.06)
      const targetMouse = isPointerInsideRef.current ? mouseTargetXRef.current : 0;
      mouseLerpedXRef.current += (targetMouse - mouseLerpedXRef.current) * 0.06;

      // 2. Smoothly decay mouse velocity & touch momentum
      mouseVelocityRef.current *= 0.92;
      interactionMomentumRef.current *= 0.90;
      scrollOffsetRef.current *= 0.94;

      // 3. Dynamic unified velocity composition:
      // Base auto speed + mouse velocity boost + touch gesture momentum + vertical scroll boost
      const dynamicVelocity =
        baseSpeed +
        mouseVelocityRef.current * 0.65 +
        interactionMomentumRef.current * 2.0 +
        scrollOffsetRef.current * 0.12;

      // 4. Progress position continuously (Strictly LEFT → RIGHT)
      positionRef.current += dynamicVelocity * deltaSeconds;

      // 5. Mouse influence adds subtle panoramic focal shift (-50px to +50px smoothly)
      const mousePanoramicOffset = mouseLerpedXRef.current * 45;
      const currentTrackX = positionRef.current + mousePanoramicOffset;

      const centerX = viewportWidth / 2;

      // 6. Mathematical infinite modulo wrap (seamless loop without jumps)
      const normalizedTrackX = ((currentTrackX % singleCycleWidth) - singleCycleWidth * 2) % singleCycleWidth;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${normalizedTrackX}px, 0, 0)`;
      }

      // 7. Responsive curve tuning based on screen size
      const isMobile = viewportWidth < 640;
      const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
      const rotMultiplier = isMobile ? 8.2 : isTablet ? 8.8 : 9.5;
      const maxRot = isMobile ? 18 : 22;

      // 8. Calculate cylindrical perspective for each card relative to viewport center
      cardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;

        // Position of card center relative to viewport center
        const cardCenter = normalizedTrackX + idx * (cardWidth + cardGap) + cardWidth / 2;
        const distFromCenter = cardCenter - centerX;
        const normDist = distFromCenter / (cardWidth + cardGap);
        const absDist = Math.abs(normDist);

        // A. rotateY: Panoramic cylindrical concave curvature (Left cards: +deg, Right cards: -deg)
        const rotateY = Math.max(-maxRot, Math.min(maxRot, -normDist * rotMultiplier));

        // B. rotateZ: Authentic film-roll sloping edge arch
        const rotateZ = isMobile
          ? Math.max(-2, Math.min(2, normDist * 0.75))
          : Math.max(-3.5, Math.min(3.5, normDist * 1.3));

        // C. Scale: Center card is straight & largest (scale 1.0), side cards recede smoothly
        const scaleDecay = isMobile ? 0.085 : 0.075;
        const minScale = isMobile ? 0.82 : 0.78;
        const scale = Math.max(minScale, 1 - Math.min(0.22, Math.pow(absDist, 1.1) * scaleDecay));

        // D. TranslateY: Center card is at 0; outer cards follow the slight cylindrical arch
        const translateYMax = isMobile ? 22 : 32;
        const translateYMult = isMobile ? 5.5 : 8;
        const translateY = Math.min(translateYMax, Math.pow(absDist, 1.4) * translateYMult);

        // E. TranslateZ: Center card physically closest to the viewer in 3D perspective
        const maxZ = isMobile ? 32 : 44;
        const translateZ = Math.max(-120, (1 - Math.min(absDist, 2.5)) * maxZ);

        // F. Opacity: Natural atmospheric hierarchy (all cards remain 100% sharp and clear)
        const opacity = Math.max(0.55, 1 - Math.min(0.45, absDist * 0.14));

        // G. Z-Index: Center card sits on top of surrounding cards
        const zIndex = Math.round(50 - Math.min(absDist, 6) * 8);

        // Apply 3D panoramic matrix — ABSOLUTELY ZERO BLUR
        cardEl.style.transform = `translate3d(0, ${translateY}px, ${translateZ}px) scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        cardEl.style.opacity = `${opacity}`;
        cardEl.style.zIndex = `${zIndex}`;
        cardEl.style.filter = "none"; // 100% sharp photographs guaranteed
      });

      animFrameRef.current = requestAnimationFrame(renderPanoramicOrbit);
    };

    animFrameRef.current = requestAnimationFrame(renderPanoramicOrbit);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [viewportWidth, cardWidth, cardGap, singleCycleWidth, reducedMotion]);

  return (
    <section
      id="student-reviews"
      ref={sectionRef}
      className="relative w-full bg-[#F6F5F0] text-[#071A2B] select-none py-20 sm:py-28 lg:py-32 overflow-hidden"
      aria-label="Section 03: Student Reviews Panoramic Film Roll"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── ACCESSIBLE REDUCED MOTION STATIC GRID ── */}
      {reducedMotion ? (
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          {/* Minimal Section Intro */}
          <div className="text-left mb-14 px-4">
            <span
              className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#11AFC0] mb-3 block"
              style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
            >
              WHAT STUDENTS SAY
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A2B] tracking-tight leading-tight max-w-3xl"
              style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
            >
              Learning feels different when you're building something real.
            </h2>
          </div>

          {/* Clean Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {STUDENT_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="rounded-[28px] p-6 flex flex-col justify-between"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.85)",
                  boxShadow: "0 20px 50px rgba(7, 26, 43, 0.08)",
                }}
              >
                <div>
                  <div className="relative w-full aspect-[4/3.1] rounded-[20px] overflow-hidden bg-[#071A2B]/5 mb-5">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: review.objectPosition || "center 20%" }}
                      loading="lazy"
                    />
                  </div>

                  {/* 5 Stars Rating */}
                  <div className="flex items-center gap-1 mb-3 text-[#EFAF32]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#EFAF32] stroke-[#EFAF32]" />
                    ))}
                  </div>

                  {/* Student & Program */}
                  <h3 className="text-lg font-bold text-[#071A2B] tracking-tight font-jakarta mb-0.5">
                    {review.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#11AFC0] mb-3">
                    {review.program}
                  </p>

                  {/* Student Review */}
                  <blockquote className="text-[14.5px] text-[#071A2B]/90 font-medium leading-relaxed font-sans">
                    "{review.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ── CONTINUOUS 3D PANORAMIC CYLINDRICAL FILM-ROLL ARENA ── */
        <div className="w-full flex flex-col justify-between">
          
          {/* Section Minimal Editorial Intro */}
          <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-12 mb-10 sm:mb-14">
            <span
              className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#11AFC0] mb-2.5 block"
              style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
            >
              WHAT STUDENTS SAY
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#071A2B] tracking-tight leading-tight max-w-2xl"
              style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
            >
              Learning feels different when you're building something real.
            </h2>
          </div>

          {/* 3D Panoramic Cylindrical Perspective Stage */}
          <div
            className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px] flex items-center justify-start overflow-visible"
            style={{
              perspective: "1400px",
              perspectiveOrigin: "50% 50%",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Horizontal Film Strip Track (Self-moving LEFT → RIGHT infinitely) */}
            <div
              ref={trackRef}
              className="flex items-center absolute top-1/2 left-0 -translate-y-1/2 will-change-transform"
              style={{
                gap: `${cardGap}px`,
                transformStyle: "preserve-3d",
              }}
            >
              {REPEATED_REVIEWS.map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  style={{
                    width: `${cardWidth}px`,
                    backgroundColor: "rgba(255, 255, 255, 0.72)",
                    backdropFilter: "blur(20px) saturate(115%)",
                    WebkitBackdropFilter: "blur(20px) saturate(115%)",
                    border: "1px solid rgba(255, 255, 255, 0.75)",
                    boxShadow: "0 25px 70px rgba(7, 26, 43, 0.12), 0 4px 16px rgba(7, 26, 43, 0.04)",
                    borderRadius: "clamp(24px, 2.5vw, 30px)",
                    transformStyle: "preserve-3d",
                  }}
                  className="shrink-0 p-5 sm:p-6 flex flex-col justify-between will-change-transform select-none transition-shadow duration-300"
                >
                  <div>
                    {/* 100% SHARP Student Portrait Container — No Photo Blur */}
                    <div
                      className="relative w-full aspect-[4/3.1] rounded-[20px] sm:rounded-[22px] overflow-hidden bg-[#071A2B]/5 mb-4 shadow-[0_4px_16px_rgba(7,26,43,0.06)]"
                    >
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        style={{
                          objectPosition: review.objectPosition || "center 20%",
                          filter: "none",
                        }}
                        loading="lazy"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/20 via-transparent to-transparent pointer-events-none opacity-30" />
                    </div>

                    {/* 5 Filled Gold Stars */}
                    <div className="flex items-center gap-1.5 mb-2.5 text-[#EFAF32]">
                      {[...Array(review.rating)].map((_, starI) => (
                        <Star
                          key={starI}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#EFAF32] stroke-[#EFAF32]"
                        />
                      ))}
                    </div>

                    {/* Student Name & Program Track */}
                    <div className="mb-2.5">
                      <h3 className="text-base sm:text-[17px] font-bold text-[#071A2B] tracking-tight font-jakarta leading-tight">
                        {review.name}
                      </h3>
                      <p className="text-xs sm:text-[12.5px] font-semibold text-[#11AFC0] mt-0.5 tracking-tight">
                        {review.program}
                      </p>
                    </div>

                    {/* Review Quote Text */}
                    <blockquote className="text-[13.5px] sm:text-[14.8px] text-[#071A2B]/90 font-medium leading-[1.48] tracking-tight font-sans">
                      "{review.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudentReviews;
