export interface NavItem {
  label: string;
  target: string;
  sectionId: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Why Nexovate", target: "#why-nexovate", sectionId: "why-nexovate" },
  { label: "Programs", target: "#programs", sectionId: "programs" },
  { label: "Experience", target: "#experience", sectionId: "experience" },
  { label: "Projects", target: "#projects", sectionId: "projects" },
  { label: "Student Reviews", target: "#student-reviews", sectionId: "student-reviews" },
  { label: "Institutions", target: "#institutions", sectionId: "institutions" },
  { label: "About", target: "#about", sectionId: "about" },
  { label: "Contact", target: "#contact", sectionId: "contact" },
];
