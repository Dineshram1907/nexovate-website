import React, { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import { Plus, Minus, ArrowRight } from "lucide-react";
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
        Nexovate is a practitioner-led applied learning platform helping students discover practical skills, build real production software and engineering systems, and prepare for career opportunities in modern technology. Learn more about our mission on our{" "}
        <Link
          to="/about"
          className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#0B1F33] transition-colors"
        >
          About page
        </Link>
        .
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
        <Link
          to="/programs"
          className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#0B1F33] transition-colors"
        >
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
      "Our pedagogy follows a structured 3-phase progression: Learn It (mastering core foundations and toolchains with mentor guidance), Build It (active coding and system implementation in production Git repositories), and Make It Real (shipping verified capstone applications with automated testing and deployment).",
    richAnswer: (
      <span>
        Our pedagogy follows a structured 3-phase progression: <strong>Learn It</strong> (mastering core foundations and toolchains with mentor guidance), <strong>Build It</strong> (active coding and system implementation in production Git repositories), and <strong>Make It Real</strong> (shipping verified capstone applications with automated testing and deployment). Read about our pedagogy on our{" "}
        <Link
          to="/about"
          className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#0B1F33] transition-colors"
        >
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
        Depending on your chosen track, you will develop practical competency in modern web frameworks (React, Node.js, TypeScript), Python, machine learning pipelines, cloud services, relational databases, firmware architecture, precision CAD design, or interactive UI/UX design.
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
    id: "how-nexovate-helps-build-real-projects",
    question: "How does Nexovate help students turn learning into real projects?",
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
        <Link
          to="/programs"
          className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#0B1F33] transition-colors"
        >
          Programs page
        </Link>{" "}
        and submit an online application, or connect directly with our admissions counseling team on the{" "}
        <Link
          to="/contact"
          className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#0B1F33] transition-colors"
        >
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
        <a
          href="tel:+919876543210"
          className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#0B1F33] transition-colors"
        >
          +91 98765 43210
        </a>{" "}
        (Monday through Saturday, 9:30 AM to 6:30 PM IST), by email at{" "}
        <a
          href="mailto:hello@nexovate.in"
          className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#0B1F33] transition-colors"
        >
          hello@nexovate.in
        </a>{" "}
        and{" "}
        <a
          href="mailto:support@nexovate.in"
          className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#0B1F33] transition-colors"
        >
          support@nexovate.in
        </a>
        , or through our{" "}
        <Link
          to="/contact"
          className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#0B1F33] transition-colors"
        >
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
        <Link
          to="/programs"
          className="text-[#11AFC0] font-semibold underline underline-offset-2 hover:text-[#0B1F33] transition-colors"
        >
          Programs page
        </Link>
        , choose the domain that matches your career goals, and submit an enquiry. An academic advisor will reach out within 24 business hours to guide you through orientation and cohort enrollment.
      </span>
    ),
  },
];

// Helper to clamp values between min and max
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

export const NexovateFAQSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  // Accordion state: First FAQ initially OPEN
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [userInteracted, setUserInteracted] = useState(false);

  // Unified Frame-by-Frame Scroll Progress (0 to 1)
  const [visualProgress, setVisualProgress] = useState(reducedMotion ? 1 : 0);
  const targetProgressRef = useRef(reducedMotion ? 1 : 0);
  const visualProgressRef = useRef(reducedMotion ? 1 : 0);
  const rafIdRef = useRef<number | null>(null);

  // Compute normalized section progress from viewport position
  const updateScrollProgress = useCallback(() => {
    if (reducedMotion || !sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight || 800;

    // Start progress when section top is 95% down the viewport
    // Reach 100% progress when section top reaches 20% from viewport top
    const startY = windowHeight * 0.95;
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
      setVisualProgress(1);
      return;
    }

    let isRunning = true;

    const tick = () => {
      const diff = targetProgressRef.current - visualProgressRef.current;
      if (Math.abs(diff) > 0.0008) {
        visualProgressRef.current += diff * 0.10;
        setVisualProgress(visualProgressRef.current);
      } else if (visualProgressRef.current !== targetProgressRef.current) {
        visualProgressRef.current = targetProgressRef.current;
        setVisualProgress(visualProgressRef.current);
      }

      if (isRunning) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    updateScrollProgress();
    visualProgressRef.current = targetProgressRef.current;
    setVisualProgress(visualProgressRef.current);

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

  // Accordion toggle handler (only one open at a time, click active to close)
  const toggleItem = (index: number) => {
    setUserInteracted(true);
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  // ── FRAME CALCULATIONS (Based on visualProgress 0 to 1) ──
  // FRAME 00–15: Background / grid enters
  const bgOpacity = reducedMotion ? 1 : clamp(visualProgress / 0.15, 0, 1);

  // FRAME 15–30: Eyebrow appears
  const eyebrowProgress = reducedMotion ? 1 : clamp((visualProgress - 0.15) / 0.15, 0, 1);
  const eyebrowOpacity = eyebrowProgress;
  const eyebrowY = (1 - eyebrowProgress) * 12;

  // FRAME 30–45: Main heading appears
  const headingProgress = reducedMotion ? 1 : clamp((visualProgress - 0.30) / 0.15, 0, 1);
  const headingOpacity = headingProgress;
  const headingY = (1 - headingProgress) * 16;

  // FRAME 45–60: Supporting copy appears
  const copyProgress = reducedMotion ? 1 : clamp((visualProgress - 0.45) / 0.15, 0, 1);
  const copyOpacity = copyProgress;
  const copyY = (1 - copyProgress) * 12;

  // FRAME 60–72: First FAQ container appears
  const row0Progress = reducedMotion ? 1 : clamp((visualProgress - 0.60) / 0.12, 0, 1);
  const row0Opacity = row0Progress;
  const row0Y = (1 - row0Progress) * 14;

  // FRAME 72–82: First answer expands smoothly on scroll (unless user manually interacted)
  const row0AnswerProgress = reducedMotion || userInteracted ? (activeIndex === 0 ? 1 : 0) : clamp((visualProgress - 0.72) / 0.10, 0, 1);

  // Row progress calculation for subsequent items
  const getRowProgress = (index: number) => {
    if (reducedMotion) return { opacity: 1, y: 0 };
    if (index === 0) return { opacity: row0Opacity, y: row0Y };

    // FRAME 82–88: FAQ 2
    // FRAME 88–92: FAQ 3
    // FRAME 92–95: FAQ 4
    // FRAME 95–98: FAQ 5
    // FRAME 98–100: Remaining FAQ stack settles
    let startThreshold = 0.82;
    let duration = 0.06;

    if (index === 1) {
      startThreshold = 0.82;
      duration = 0.06;
    } else if (index === 2) {
      startThreshold = 0.88;
      duration = 0.04;
    } else if (index === 3) {
      startThreshold = 0.92;
      duration = 0.03;
    } else if (index === 4) {
      startThreshold = 0.95;
      duration = 0.03;
    } else {
      startThreshold = 0.98;
      duration = 0.02;
    }

    const progress = clamp((visualProgress - startThreshold) / duration, 0, 1);
    return {
      opacity: progress,
      y: (1 - progress) * 12,
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
      className="relative w-full text-[#0B1F33] font-sans pt-[75px] pb-[55px] sm:pt-[95px] sm:pb-[70px] lg:pt-[110px] lg:pb-[80px] px-4 sm:px-6 overflow-hidden transition-colors"
      style={{
        backgroundColor: "#F8F7F2",
      }}
    >
      {/* ── 1. SUBTLE EDITORIAL GRID PATTERN OVERLAY ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: bgOpacity,
          backgroundImage: `
            linear-gradient(to right, rgba(12, 31, 48, 0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(12, 31, 48, 0.055) 1px, transparent 1px)
          `,
          backgroundSize: "clamp(100px, 12vw, 140px) clamp(100px, 12vw, 140px)",
          backgroundPosition: "center center",
        }}
      />

      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── 2. CENTERED EDITORIAL CONTENT COLUMN (MAX ~760px) ── */}
      <div className="relative z-10 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] max-w-[760px] mx-auto flex flex-col items-center text-center">
        
        {/* EYEBROW (Revealed in Frame 15–30) */}
        <div
          className="mb-3 sm:mb-4 will-change-transform"
          style={{
            opacity: eyebrowOpacity,
            transform: `translate3d(0, ${eyebrowY}px, 0)`,
          }}
        >
          <span className="text-[11px] sm:text-[12.5px] font-semibold tracking-[0.20em] uppercase text-[#536273] font-jakarta">
            FREQUENTLY ASKED QUESTIONS
          </span>
        </div>

        {/* LARGE EDITORIAL HEADING (Revealed in Frame 30–45) */}
        <div
          className="mb-3 sm:mb-4 will-change-transform"
          style={{
            opacity: headingOpacity,
            transform: `translate3d(0, ${headingY}px, 0)`,
          }}
        >
          <h2
            id="faq-heading"
            className="text-[40px] sm:text-[54px] md:text-[66px] lg:text-[76px] font-extrabold text-[#0B1F33] tracking-[-0.048em] leading-[0.98] font-jakarta"
          >
            Frequently <br />
            Asked Questions
          </h2>
        </div>

        {/* SUPPORTING TEXT (Revealed in Frame 45–60) */}
        <div
          className="mb-9 sm:mb-12 max-w-[620px] will-change-transform"
          style={{
            opacity: copyOpacity,
            transform: `translate3d(0, ${copyY}px, 0)`,
          }}
        >
          <p className="text-[15px] sm:text-[16.5px] text-[#536273] leading-relaxed font-normal">
            Everything you need to know before you start learning, building, and making it real.
          </p>
        </div>

        {/* ── 3. FAQ ACCORDION STACK ── */}
        <dl className="w-full flex flex-col gap-3 sm:gap-3.5 m-0 p-0 text-left">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = userInteracted ? activeIndex === index : (index === 0 && row0AnswerProgress > 0.05);
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
                {/* ── ACCORDION ROW CARD ── */}
                <div
                  className={`w-full rounded-[20px] sm:rounded-[24px] transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-[#FFFFFF] border border-[rgba(11,31,51,0.12)] shadow-[0_8px_30px_rgba(11,31,51,0.055)]"
                      : "bg-[#F3F5F6] hover:bg-[#ECEEF0] border border-[rgba(11,31,51,0.08)] shadow-none"
                  }`}
                >
                  <dt className="m-0 p-0">
                    <button
                      type="button"
                      id={headingId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggleItem(index)}
                      className={`w-full min-h-[62px] sm:min-h-[68px] flex items-center justify-between text-left transition-colors cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11AFC0] ${
                        isOpen
                          ? "px-5 sm:px-6 pt-4.5 sm:pt-5 pb-2"
                          : "px-5 sm:px-6 py-4 sm:py-4.5"
                      }`}
                    >
                      <span className="text-[15px] sm:text-[17px] font-semibold text-[#0B1F33] group-hover:text-[#11AFC0] transition-colors leading-snug font-jakarta pr-4">
                        {item.question}
                      </span>

                      {/* Icon Container (+ or -) */}
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-[#EAEFF5] text-[#0B1F33]"
                            : "bg-[#FFFFFF] text-[#0B1F33] border border-[rgba(11,31,51,0.08)] group-hover:border-[#11AFC0]/40 group-hover:text-[#11AFC0]"
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-[#0B1F33] transition-transform duration-200" />
                        ) : (
                          <Plus className="w-4 h-4 text-[#0B1F33] group-hover:text-[#11AFC0] transition-transform duration-200" />
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
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-[14px] sm:text-[15px] text-[#536273] leading-[1.65] font-normal max-w-2xl">
                      {item.richAnswer || item.answer}
                    </div>
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>

        {/* ── 4. COMPACT FINAL CTA ── */}
        <div className="w-full mt-12 sm:mt-14 pt-8 border-t border-[rgba(11,31,51,0.06)] flex flex-col items-center text-center">
          <h3 className="text-[19px] sm:text-[21px] font-bold text-[#0B1F33] font-jakarta tracking-tight">
            Still have questions?
          </h3>
          <p className="text-[13.5px] sm:text-[14.5px] text-[#536273] mt-1 mb-4">
            We're here to help you take the next step.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B1F33] text-white text-[13.5px] sm:text-[14px] font-semibold shadow-xs hover:bg-[#11AFC0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11AFC0]"
          >
            <span>Contact Nexovate</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export { NexovateFAQSection as NexovateFaqSection };
export default NexovateFAQSection;
