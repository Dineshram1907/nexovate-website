import React, { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import { Plus, X } from "lucide-react";
import { Link } from "react-router-dom";

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
  richAnswer?: React.ReactNode;
}

export const FAQ_ITEMS: FAQItemData[] = [
  {
    id: "what-is-nexovate",
    question: "What is Nexovate?",
    answer:
      "Nexovate is a practitioner-led applied learning platform helping students discover practical skills, build real production software and engineering systems, and prepare for career opportunities in modern technology.",
    richAnswer: (
      <span>
        Nexovate is a practitioner-led applied learning platform helping students discover practical skills, build real production software and engineering systems, and prepare for career opportunities in modern technology.
      </span>
    ),
  },
  {
    id: "who-is-nexovate-for",
    question: "Who is Nexovate for?",
    answer:
      "Nexovate is built for college students, engineering graduates, career pivoters, and self-starters who want hands-on practical mentorship, real development experience, and demonstrable portfolio proof. We also partner with academic institutions and industry organizations to build modern talent pipelines.",
    richAnswer: (
      <span>
        Nexovate is built for college students, engineering graduates, career pivoters, and self-starters who want hands-on practical mentorship, real development experience, and demonstrable portfolio proof. We also partner with academic institutions and industry organizations to build modern talent pipelines.
      </span>
    ),
  },
  {
    id: "what-programs-does-nexovate-offer",
    question: "What programs does Nexovate offer?",
    answer:
      "Nexovate offers specialized practitioner-led tracks across Artificial Intelligence & Machine Learning, Full Stack Web Engineering, Data Science & Predictive Analytics, Cloud Architecture & DevOps, Embedded Systems & Firmware, IoT & Robotics, VLSI Digital Design, AutoCAD 2D & 3D Design, Cyber Security, and UI/UX Product Design.",
    richAnswer: (
      <span>
        Nexovate offers specialized practitioner-led tracks across Artificial Intelligence & Machine Learning, Full Stack Web Engineering, Data Science & Predictive Analytics, Cloud Architecture & DevOps, Embedded Systems & Firmware, IoT & Robotics, VLSI Digital Design, AutoCAD 2D & 3D Design, Cyber Security, and UI/UX Product Design. Explore all active tracks on our{" "}
        <Link to="/programs" className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#071A2B] transition-colors">
          Programs page
        </Link>
        .
      </span>
    ),
  },
  {
    id: "how-does-learning-work",
    question: "How does learning at Nexovate work?",
    answer:
      "Our pedagogy follows a 3-phase progression: Learn It (mastering core foundations and toolchains with mentor guidance), Build It (active coding and system implementation in production Git repositories), and Make It Real (shipping verified capstone applications with automated testing and deployment).",
    richAnswer: (
      <span>
        Our pedagogy follows a 3-phase progression: <strong>Learn It</strong> (mastering core foundations and toolchains with mentor guidance), <strong>Build It</strong> (active coding and system implementation in production Git repositories), and <strong>Make It Real</strong> (shipping verified capstone applications with automated testing and deployment). Learn more on our{" "}
        <Link to="/about" className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#071A2B] transition-colors">
          About page
        </Link>
        .
      </span>
    ),
  },
  {
    id: "prior-experience-needed",
    question: "Do I need prior coding or technical experience to join Nexovate?",
    answer:
      "No prior professional background is required for beginner tracks. We offer guided foundations and sandbox environments for newcomers, as well as advanced engineering curricula for learners with prior technical experience.",
    richAnswer: (
      <span>
        No prior professional background is required for beginner tracks. We offer guided foundations and sandbox environments for newcomers, as well as advanced engineering curricula for learners with prior technical experience.
      </span>
    ),
  },
  {
    id: "real-projects",
    question: "Will I work on real projects at Nexovate?",
    answer:
      "Yes. Every track centers on active implementation. Students submit pull requests, receive code reviews from practitioners, and build live deployed systems that serve as verifiable portfolio proof.",
    richAnswer: (
      <span>
        Yes. Every track centers on active implementation. Students submit pull requests, receive code reviews from practitioners, and build live deployed systems that serve as verifiable portfolio proof.
      </span>
    ),
  },
  {
    id: "skills-developed",
    question: "What skills can I develop through Nexovate programs?",
    answer:
      "Depending on your chosen track, you will develop practical competency in modern web frameworks (React, Node.js, TypeScript), Python, machine learning pipelines, cloud services, relational databases, firmware architecture, precision CAD design, or interactive UI/UX design.",
    richAnswer: (
      <span>
        Depending on your chosen track, you will develop competency in modern full-stack web frameworks (React, Node.js, TypeScript), Python, machine learning pipelines, cloud services, relational databases, firmware architecture, precision CAD design, or interactive UI/UX design.
      </span>
    ),
  },
  {
    id: "how-is-nexovate-different",
    question: "How is Nexovate different from traditional learning?",
    answer:
      "Traditional classrooms often rely on passive lectures and rote memorization. Nexovate provides an interactive studio environment focused on practitioner mentorship, active problem-solving, real codebase execution, and verifiable project outcomes.",
    richAnswer: (
      <span>
        Traditional classrooms often rely on passive lectures and rote memorization. Nexovate provides an interactive studio environment focused on practitioner mentorship, active problem-solving, real codebase execution, and verifiable project outcomes.
      </span>
    ),
  },
  {
    id: "learning-to-building",
    question: "How does Nexovate help students move from learning to building?",
    answer:
      "By bridging theory with immediate production practice. Instead of isolated theoretical exercises, students work on real-world problems in active repositories with practitioner guidance, architectural feedback, and automated deployment pipelines.",
    richAnswer: (
      <span>
        By bridging theory with immediate production practice. Instead of isolated theoretical exercises, students work on real-world problems in active repositories with practitioner guidance, architectural feedback, and automated deployment pipelines.
      </span>
    ),
  },
  {
    id: "how-to-join",
    question: "How can I join a Nexovate program?",
    answer:
      "You can browse active tracks on our Programs page and submit an online application, or connect directly with our admissions counseling team on the Contact page to discuss your learning goals and upcoming cohort dates.",
    richAnswer: (
      <span>
        You can browse active tracks on our{" "}
        <Link to="/programs" className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#071A2B] transition-colors">
          Programs page
        </Link>{" "}
        and submit an online application, or connect directly with our admissions counseling team on the{" "}
        <Link to="/contact" className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#071A2B] transition-colors">
          Contact page
        </Link>{" "}
        to discuss your learning goals and upcoming cohort dates.
      </span>
    ),
  },
  {
    id: "where-to-contact",
    question: "Where can I contact Nexovate?",
    answer:
      "You can contact our admissions and support team by phone at +91 98765 43210 (Monday through Saturday, 9:30 AM to 6:30 PM IST), by email at hello@nexovate.in and support@nexovate.in, or through our Contact page.",
    richAnswer: (
      <span>
        You can contact our admissions and support team by phone at{" "}
        <a href="tel:+919876543210" className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#071A2B] transition-colors">
          +91 98765 43210
        </a>{" "}
        (Monday through Saturday, 9:30 AM to 6:30 PM IST), by email at{" "}
        <a href="mailto:hello@nexovate.in" className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#071A2B] transition-colors">
          hello@nexovate.in
        </a>{" "}
        and{" "}
        <a href="mailto:support@nexovate.in" className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#071A2B] transition-colors">
          support@nexovate.in
        </a>
        , or through our{" "}
        <Link to="/contact" className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#071A2B] transition-colors">
          Contact page
        </Link>
        .
      </span>
    ),
  },
  {
    id: "how-to-get-started",
    question: "How can I get started with Nexovate?",
    answer:
      "To get started, explore our available curriculum tracks on our Programs page, choose the domain that matches your career goals, and submit an enquiry. An academic advisor will reach out within 24 business hours to guide you through orientation and cohort enrollment.",
    richAnswer: (
      <span>
        To get started, explore our available curriculum tracks on our{" "}
        <Link to="/programs" className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#071A2B] transition-colors">
          Programs page
        </Link>
        , choose the domain that matches your career goals, and submit an enquiry. An academic advisor will reach out within 24 business hours to guide you through orientation and cohort enrollment.
      </span>
    ),
  },
];

// Linear interpolation helper
const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

// Clamp helper
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

export const NexovateFAQSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  // Accordion state (default: item 0 open matching the screenshot)
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [userInteracted, setUserInteracted] = useState(false);

  // Unified Scroll Scrub Visual Progress (0 to 1)
  const [scrollProgress, setScrollProgress] = useState(reducedMotion ? 1 : 0);
  const targetProgressRef = useRef(reducedMotion ? 1 : 0);
  const visualProgressRef = useRef(reducedMotion ? 1 : 0);
  const rafIdRef = useRef<number | null>(null);

  // Compute scroll progress relative to viewport entry
  const updateScrollProgress = useCallback(() => {
    if (reducedMotion || !sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight || 800;

    // Start reveal when the top of the section enters near the bottom of viewport
    // Complete reveal when top of the section is at ~25% from top of viewport
    const startY = windowHeight * 0.90;
    const endY = windowHeight * 0.20;
    const totalDist = startY - endY;

    if (totalDist <= 0) return;

    const currentDist = startY - rect.top;
    const rawProgress = clamp(currentDist / totalDist, 0, 1);

    targetProgressRef.current = rawProgress;
  }, [reducedMotion]);

  // RequestAnimationFrame lerp smoothing loop
  useEffect(() => {
    if (reducedMotion) {
      setScrollProgress(1);
      return;
    }

    let isRunning = true;

    const tick = () => {
      const diff = targetProgressRef.current - visualProgressRef.current;
      if (Math.abs(diff) > 0.001) {
        visualProgressRef.current = lerp(visualProgressRef.current, targetProgressRef.current, 0.12);
        setScrollProgress(visualProgressRef.current);
      } else if (visualProgressRef.current !== targetProgressRef.current) {
        visualProgressRef.current = targetProgressRef.current;
        setScrollProgress(visualProgressRef.current);
      }

      if (isRunning) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    updateScrollProgress();
    visualProgressRef.current = targetProgressRef.current;
    setScrollProgress(visualProgressRef.current);

    rafIdRef.current = requestAnimationFrame(tick);

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [reducedMotion, updateScrollProgress]);

  // Accordion toggle handler
  const toggleItem = (index: number) => {
    setUserInteracted(true);
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  // ── FRAME CALCULATIONS (Based on scrollProgress 0 to 1) ──
  // Frame 00–10: Background & grid reveal
  const bgOpacity = reducedMotion ? 1 : clamp((scrollProgress - 0.00) / 0.12, 0, 1);

  // Frame 10–25: Eyebrow reveal
  const eyebrowProgress = reducedMotion ? 1 : clamp((scrollProgress - 0.08) / 0.16, 0, 1);
  const eyebrowOpacity = eyebrowProgress;
  const eyebrowY = (1 - eyebrowProgress) * 14;
  const eyebrowBlur = (1 - eyebrowProgress) * 4;

  // Frame 25–45: Heading reveal
  const headingProgress = reducedMotion ? 1 : clamp((scrollProgress - 0.20) / 0.22, 0, 1);
  const headingOpacity = headingProgress;
  const headingY = (1 - headingProgress) * 18;
  const headingScale = 0.98 + 0.02 * headingProgress;

  // Frame 45–60: First FAQ row container reveal
  const row0Progress = reducedMotion ? 1 : clamp((scrollProgress - 0.40) / 0.16, 0, 1);
  const row0Opacity = row0Progress;
  const row0Y = (1 - row0Progress) * 16;

  // Frame 60–72: First FAQ answer expansion
  const row0AnswerProgress = reducedMotion || userInteracted ? (activeIndex === 0 ? 1 : 0) : clamp((scrollProgress - 0.55) / 0.15, 0, 1);

  // Helper for subsequent rows reveal
  const getRowProgress = (rowIndex: number) => {
    if (reducedMotion) return { opacity: 1, y: 0 };
    if (rowIndex === 0) return { opacity: row0Opacity, y: row0Y };

    // Row 1 (Frame 70-80), Row 2 (Frame 78-88), Row 3 (Frame 85-94), Row 4+ (Frame 90-100)
    const startThreshold = 0.65 + (rowIndex - 1) * 0.07;
    const progress = clamp((scrollProgress - startThreshold) / 0.12, 0, 1);
    return {
      opacity: progress,
      y: (1 - progress) * 14,
    };
  };

  // Structured Data (JSON-LD FAQPage Schema - single source of truth)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://nexovate.org.in/#faq",
    "name": "Nexovate Frequently Asked Questions",
    "url": "https://nexovate.org.in/#faq",
    "isPartOf": {
      "@id": "https://nexovate.org.in/#website"
    },
    "about": {
      "@id": "https://nexovate.org.in/#organization"
    },
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full text-[#071A2B] select-none font-sans py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden"
      style={{
        backgroundColor: "#F8F9FD",
      }}
    >
      {/* ── 1. SUBTLE EDITORIAL GRID PATTERN OVERLAY ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: bgOpacity,
          backgroundImage: `
            linear-gradient(to right, rgba(7, 26, 43, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(7, 26, 43, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: "clamp(120px, 14vw, 180px) clamp(120px, 14vw, 180px)",
          backgroundPosition: "center center",
        }}
      />

      {/* FAQPage Structured Data (Exact matching visible content) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── 2. CENTERED EDITORIAL CONTENT COLUMN (760px–820px MAX) ── */}
      <div className="relative z-10 w-full max-w-[760px] mx-auto flex flex-col items-center text-center">
        
        {/* EYEBROW (Revealed in Frame 10–25) */}
        <div
          className="mb-4 will-change-transform"
          style={{
            opacity: eyebrowOpacity,
            transform: `translate3d(0, ${eyebrowY}px, 0)`,
            filter: eyebrowBlur > 0.1 ? `blur(${eyebrowBlur}px)` : "none",
          }}
        >
          <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.20em] uppercase text-[#071A2B]/75 font-jakarta">
            TRUSTED BY LEARNERS & BUILDERS
          </span>
        </div>

        {/* TWO-LINE MAIN HEADING (Revealed in Frame 25–45) */}
        <div
          className="mb-12 sm:mb-14 will-change-transform"
          style={{
            opacity: headingOpacity,
            transform: `translate3d(0, ${headingY}px, 0) scale(${headingScale})`,
          }}
        >
          <h2
            id="faq-heading"
            className="text-[36px] sm:text-[48px] md:text-[56px] font-black text-[#071A2B] tracking-[-0.035em] leading-[1.06] font-jakarta"
          >
            Frequently <br />
            Asked Questions
          </h2>
        </div>

        {/* ── 3. ACCORDION ROWS LIST (Matching Screenshot Reference) ── */}
        <dl className="w-full flex flex-col gap-3.5 sm:gap-4 m-0 p-0 text-left">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = userInteracted ? activeIndex === index : (index === 0 && row0AnswerProgress > 0.1);
            const isFirst = index === 0;
            const headingId = `faq-heading-${item.id}`;
            const answerId = `faq-answer-${index}`;
            const rowProg = getRowProgress(index);

            return (
              <div
                key={item.id}
                className="w-full transition-all duration-300 will-change-transform"
                style={{
                  opacity: rowProg.opacity,
                  transform: `translate3d(0, ${rowProg.y}px, 0)`,
                }}
              >
                {/* ── ACCORDION CARD CONTAINER ── */}
                <div
                  className={`w-full rounded-[22px] sm:rounded-[26px] transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white border border-[#E2E8F0] shadow-[0_12px_36px_rgba(7,26,43,0.06)]"
                      : "bg-[#EEF3FA]/85 hover:bg-[#E6EEF8] border border-white/80 shadow-xs"
                  }`}
                >
                  <dt className="m-0 p-0">
                    <button
                      type="button"
                      id={headingId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggleItem(index)}
                      className={`w-full min-h-[58px] sm:min-h-[64px] flex items-center justify-between text-left transition-colors cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11AFC0] ${
                        isOpen ? "px-6 sm:px-7 pt-5 sm:pt-6 pb-2" : "px-6 sm:px-7 py-3.5 sm:py-4"
                      }`}
                    >
                      <span className="text-[14.5px] sm:text-[16.5px] font-bold text-[#071A2B] group-hover:text-[#11AFC0] transition-colors leading-snug font-jakarta pr-4">
                        {item.question}
                      </span>

                      {/* Icon Button (Close '×' when open, Circle '+' when collapsed) */}
                      <span
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 font-bold ${
                          isOpen
                            ? "bg-[#E8EEF8] text-[#071A2B] hover:bg-[#DDE6F4]"
                            : "bg-white text-[#071A2B] shadow-xs border border-[#071A2B]/06 group-hover:border-[#11AFC0]/40 group-hover:text-[#11AFC0]"
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <X className="w-4 h-4 text-[#071A2B] transition-transform duration-200" />
                        ) : (
                          <Plus className="w-4 h-4 text-[#071A2B] group-hover:text-[#11AFC0] transition-transform duration-200" />
                        )}
                      </span>
                    </button>
                  </dt>

                  {/* ── EXPANDABLE ANSWER BODY ── */}
                  <dd
                    id={answerId}
                    role="region"
                    aria-labelledby={headingId}
                    className="m-0 overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? "400px" : "0px",
                      opacity: isOpen ? (isFirst && !userInteracted ? row0AnswerProgress : 1) : 0,
                    }}
                  >
                    <div className="px-6 sm:px-7 pb-6 pt-1 text-[13.5px] sm:text-[14.5px] text-[#5E6675] leading-[1.65] font-normal max-w-2xl">
                      {item.richAnswer || item.answer}
                    </div>
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>

      </div>
    </section>
  );
};

export { NexovateFAQSection as NexovateFaqSection };
export default NexovateFAQSection;
