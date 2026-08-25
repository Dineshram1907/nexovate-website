"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

export interface SectionMeta {
  id: string;
  title: string;
  shortTitle: string;
  number: string;
  navKey: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: "hero", title: "Future-Ready Learning", shortTitle: "Hero", number: "01", navKey: "hero" },
  { id: "why-nexovate", title: "Why Nexovate", shortTitle: "Why Nexovate", number: "02", navKey: "why-nexovate" },
  { id: "programs", title: "Programs & Disciplines", shortTitle: "Programs", number: "03", navKey: "programs" },
  { id: "experience", title: "Student Experience", shortTitle: "Experience", number: "04", navKey: "experience" },
  { id: "projects", title: "Student Portfolio", shortTitle: "Projects", number: "05", navKey: "projects" },
  { id: "reviews", title: "Student Reviews", shortTitle: "Reviews", number: "06", navKey: "reviews" },
  { id: "institutions", title: "For Institutions", shortTitle: "Institutions", number: "07", navKey: "institutions" },
  { id: "about", title: "Why Nexovate Exists", shortTitle: "About", number: "08", navKey: "about" },
  { id: "contact", title: "Get in Touch", shortTitle: "Contact", number: "09", navKey: "contact" },
  { id: "final-cta", title: "Your Next Move", shortTitle: "Get Started", number: "10", navKey: "final-cta" },
];

interface PresentationContextType {
  activeSectionIndex: number;
  direction: number;
  isTransitioning: boolean;
  isDesktop: boolean;
  sections: SectionMeta[];
  selectedProgram: string;
  setSelectedProgram: (program: string) => void;
  inquiryType: string;
  setInquiryType: (type: string) => void;
  activeProgramIndex: number;
  setActiveProgramIndex: React.Dispatch<React.SetStateAction<number>>;
  goToSection: (index: number) => void;
  nextSection: () => void;
  previousSection: () => void;
  enquireProgram: (programName: string, programIndex?: number) => void;
  enquireInstitution: () => void;
}

const PresentationContext = createContext<PresentationContextType | null>(null);

export const PresentationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Authoritative Ref State for High-Frequency Desktop Events
  const isTransitioningRef = useRef(false);
  const activeSectionIndexRef = useRef(0);
  const lastTransitionTimestampRef = useRef(0);
  const wheelAccumulatorRef = useRef(0);
  const lastWheelTimestampRef = useRef(0);
  const wheelDecayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Connected Cross-Site Program & Inquiry State
  const [selectedProgram, setSelectedProgram] = useState("Artificial Intelligence & Machine Learning");
  const [inquiryType, setInquiryType] = useState("Student Program");
  const [activeProgramIndex, setActiveProgramIndex] = useState(0);

  // Total transition duration + inertia guard window for desktop presentation mode
  const ANIMATION_DURATION_MS = 750;
  const POST_TRANSITION_GUARD_MS = 200;
  const TOTAL_LOCK_WINDOW_MS = ANIMATION_DURATION_MS + POST_TRANSITION_GUARD_MS; // 950ms
  const WHEEL_DELTA_THRESHOLD = 60;

  // Responsive Breakpoint Detection (>= 1024px is desktop presentation; < 1024px is native mobile scroll)
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Synchronize activeSectionIndexRef
  useEffect(() => {
    activeSectionIndexRef.current = activeSectionIndex;
  }, [activeSectionIndex]);

  // SINGLE CENTRAL AUTHORITATIVE TRANSITION CONTROLLER
  const goToSection = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;

      // On Mobile / Tablet: Smooth native scroll to section
      if (!isDesktop) {
        setActiveSectionIndex(targetIndex);
        activeSectionIndexRef.current = targetIndex;
        const targetId = SECTIONS[targetIndex].id;
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      // On Desktop: Fullscreen Presentation Slide Transition
      if (targetIndex === activeSectionIndexRef.current) return;

      const now = Date.now();
      if (isTransitioningRef.current || now - lastTransitionTimestampRef.current < TOTAL_LOCK_WINDOW_MS) {
        return;
      }

      isTransitioningRef.current = true;
      lastTransitionTimestampRef.current = now;
      wheelAccumulatorRef.current = 0;
      setIsTransitioning(true);

      const newDirection = targetIndex > activeSectionIndexRef.current ? 1 : -1;
      setDirection(newDirection);
      setActiveSectionIndex(targetIndex);
      activeSectionIndexRef.current = targetIndex;

      setTimeout(() => {
        isTransitioningRef.current = false;
        setIsTransitioning(false);
        wheelAccumulatorRef.current = 0;
      }, TOTAL_LOCK_WINDOW_MS);
    },
    [isDesktop, TOTAL_LOCK_WINDOW_MS]
  );

  const nextSection = useCallback(() => {
    goToSection(activeSectionIndexRef.current + 1);
  }, [goToSection]);

  const previousSection = useCallback(() => {
    goToSection(activeSectionIndexRef.current - 1);
  }, [goToSection]);

  // Seamless Course -> Contact Flow
  const enquireProgram = useCallback(
    (programName: string, programIndex?: number) => {
      setSelectedProgram(programName);
      setInquiryType("Student Program");
      if (typeof programIndex === "number") {
        setActiveProgramIndex(programIndex);
      }
      goToSection(8); // Slide 09 Contact

      setTimeout(() => {
        const nameInput = document.getElementById("contact-name-input");
        if (nameInput) {
          nameInput.focus();
        }
      }, 950);
    },
    [goToSection]
  );

  // Seamless Institution -> Contact Flow
  const enquireInstitution = useCallback(() => {
    setSelectedProgram("Institutional Partnership");
    setInquiryType("Institution Partnership");
    goToSection(8); // Slide 09 Contact

    setTimeout(() => {
      const nameInput = document.getElementById("contact-name-input");
      if (nameInput) {
        nameInput.focus();
      }
    }, 950);
  }, [goToSection]);

  // DESKTOP KEYBOARD NAVIGATION CONTROLLER (Disabled on Mobile)
  useEffect(() => {
    if (!isDesktop) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        nextSection();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        previousSection();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSection(SECTIONS.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDesktop, nextSection, previousSection, goToSection]);

  // DESKTOP MOUSE WHEEL & TRACKPAD CONTROLLER (Strictly disabled on Mobile/Tablet)
  useEffect(() => {
    if (!isDesktop) return;

    const handleWheel = (e: WheelEvent) => {
      // Allow internal scrollable containers (e.g. modals) to scroll
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        const overflowY = window.getComputedStyle(el).overflowY;
        const isScrollable =
          (overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight;
        if (isScrollable) {
          const isScrollingDown = e.deltaY > 0;
          const canScrollDown = el.scrollTop + el.clientHeight < el.scrollHeight - 2;
          const canScrollUp = el.scrollTop > 2;
          if ((isScrollingDown && canScrollDown) || (!isScrollingDown && canScrollUp)) {
            return;
          }
        }
        el = el.parentElement;
      }

      // Allow horizontal carousel swipe (Reviews, Projects, Programs)
      const isInsideCarousel = (e.target as HTMLElement | null)?.closest("[data-horizontal-carousel]");
      if (isInsideCarousel && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      e.preventDefault();

      const now = Date.now();

      if (
        isTransitioningRef.current ||
        now - lastTransitionTimestampRef.current < TOTAL_LOCK_WINDOW_MS
      ) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      const timeSinceLastWheel = now - lastWheelTimestampRef.current;
      lastWheelTimestampRef.current = now;

      if (now - lastTransitionTimestampRef.current < 1200 && timeSinceLastWheel < 90) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      let deltaY = e.deltaY;
      if (e.deltaMode === 1) deltaY *= 33;
      if (e.deltaMode === 2) deltaY *= 100;

      if (
        (wheelAccumulatorRef.current > 0 && deltaY < 0) ||
        (wheelAccumulatorRef.current < 0 && deltaY > 0)
      ) {
        wheelAccumulatorRef.current = 0;
      }

      wheelAccumulatorRef.current += deltaY;

      if (wheelDecayTimeoutRef.current) clearTimeout(wheelDecayTimeoutRef.current);
      wheelDecayTimeoutRef.current = setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 180);

      if (wheelAccumulatorRef.current >= WHEEL_DELTA_THRESHOLD) {
        wheelAccumulatorRef.current = 0;
        nextSection();
      } else if (wheelAccumulatorRef.current <= -WHEEL_DELTA_THRESHOLD) {
        wheelAccumulatorRef.current = 0;
        previousSection();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isDesktop, nextSection, previousSection, TOTAL_LOCK_WINDOW_MS]);

  // MOBILE INTERSECTION OBSERVER (Automatically syncs activeSectionIndex on native scroll)
  useEffect(() => {
    if (isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = SECTIONS.findIndex((s) => s.id === entry.target.id);
            if (index !== -1) {
              setActiveSectionIndex(index);
              activeSectionIndexRef.current = index;
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isDesktop]);

  return (
    <PresentationContext.Provider
      value={{
        activeSectionIndex,
        direction,
        isTransitioning,
        isDesktop,
        sections: SECTIONS,
        selectedProgram,
        setSelectedProgram,
        inquiryType,
        setInquiryType,
        activeProgramIndex,
        setActiveProgramIndex,
        goToSection,
        nextSection,
        previousSection,
        enquireProgram,
        enquireInstitution,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};

export const usePresentation = () => {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error("usePresentation must be used within a PresentationProvider");
  }
  return context;
};
