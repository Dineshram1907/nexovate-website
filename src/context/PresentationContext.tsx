"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

export interface SectionMetadata {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
}

export const SECTIONS: SectionMetadata[] = [
  { id: "hero", number: "00", title: "HERO", shortTitle: "Hero" },
  { id: "why-nexovate", number: "01", title: "WHY NEXOVATE", shortTitle: "Why Nexovate" },
  { id: "programs", number: "02", title: "PROGRAMS", shortTitle: "Programs" },
  { id: "experience", number: "03", title: "EXPERIENCE", shortTitle: "Experience" },
  { id: "projects", number: "04", title: "PROJECTS", shortTitle: "Projects" },
  { id: "student-reviews", number: "05", title: "STUDENT REVIEWS", shortTitle: "Student Reviews" },
  { id: "institutions", number: "06", title: "INSTITUTIONS", shortTitle: "Institutions" },
  { id: "about", number: "07", title: "ABOUT", shortTitle: "About" },
  { id: "contact", number: "08", title: "CONTACT", shortTitle: "Contact" },
];

interface PresentationContextType {
  activeSectionIndex: number;
  direction: number;
  isTransitioning: boolean;
  isDesktop: boolean;
  sections: SectionMetadata[];
  selectedProgram: string;
  setSelectedProgram: (program: string) => void;
  inquiryType: "Student Program" | "Institution Partnership" | "General";
  setInquiryType: (type: "Student Program" | "Institution Partnership" | "General") => void;
  activeProgramIndex: number;
  setActiveProgramIndex: (idx: number) => void;
  activeProjectIndex: number;
  setActiveProjectIndex: (idx: number) => void;
  activeReviewIndex: number;
  setActiveReviewIndex: (idx: number) => void;
  enquiryModalOpen: boolean;
  isEnquiryModalOpen: boolean;
  openEnquiryModal: (programName?: string) => void;
  closeEnquiryModal: () => void;
  goToSection: (index: number) => void;
  nextSection: () => void;
  previousSection: () => void;
  enquireProgram: (programName: string, programIndex?: number) => void;
  enquireInstitution: () => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export const PresentationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Form State Pre-population
  const [selectedProgram, setSelectedProgram] = useState("Artificial Intelligence & Machine Learning");
  const [inquiryType, setInquiryType] = useState<"Student Program" | "Institution Partnership" | "General">("Student Program");

  // Track & Card Active Indices
  const [activeProgramIndex, setActiveProgramIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Intelligent Student Enquiry Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const activeSectionIndexRef = useRef(activeSectionIndex);
  activeSectionIndexRef.current = activeSectionIndex;

  // Responsive Breakpoint Detection
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Native Smooth Section Navigation (No Scroll Lock)
  const goToSection = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;

      setDirection(targetIndex > activeSectionIndexRef.current ? 1 : -1);
      setActiveSectionIndex(targetIndex);
      activeSectionIndexRef.current = targetIndex;

      const targetId = SECTIONS[targetIndex].id;
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const nextSection = useCallback(() => {
    goToSection(activeSectionIndexRef.current + 1);
  }, [goToSection]);

  const previousSection = useCallback(() => {
    goToSection(activeSectionIndexRef.current - 1);
  }, [goToSection]);

  // Modal Controllers
  const openEnquiryModal = useCallback((programName?: string) => {
    if (programName) {
      setSelectedProgram(programName);
    }
    setEnquiryModalOpen(true);
  }, []);

  const closeEnquiryModal = useCallback(() => {
    setEnquiryModalOpen(false);
  }, []);

  // Seamless Course -> Contact Flow
  const enquireProgram = useCallback(
    (programName: string, programIndex?: number) => {
      setSelectedProgram(programName);
      setInquiryType("Student Program");
      if (typeof programIndex === "number") {
        setActiveProgramIndex(programIndex);
      }
      openEnquiryModal(programName);
    },
    [openEnquiryModal]
  );

  // Seamless Institution -> Contact Flow
  const enquireInstitution = useCallback(() => {
    setSelectedProgram("Institutional Partnership");
    setInquiryType("Institution Partnership");
    openEnquiryModal("Institutional Partnership");
  }, [openEnquiryModal]);

  // PASSIVE INTERSECTION OBSERVER (Tracks active section on native scroll without intercepting events)
  useEffect(() => {
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
  }, []);

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
        activeProjectIndex,
        setActiveProjectIndex,
        activeReviewIndex,
        setActiveReviewIndex,
        enquiryModalOpen,
        isEnquiryModalOpen: enquiryModalOpen,
        openEnquiryModal,
        closeEnquiryModal,
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
