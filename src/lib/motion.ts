import { Variants, Transition } from "motion/react";

// Standard refined easing curves
export const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const editorialEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const springTactile: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

// Page transitions (old page: opacity 1->0, y 0->-10; new page: opacity 0->1, y 20->0)
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: premiumEase,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

// Section Reveal Variants
export const sectionRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: premiumEase,
    },
  },
};

// Text & Heading Reveals
export const headingRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

export const subtextRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1,
      ease: premiumEase,
    },
  },
};

// Clip-Path Image Reveal Variants
export const imageClipRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    scale: 1,
    transition: {
      duration: 0.75,
      ease: premiumEase,
    },
  },
};

// Subtle Scale Reveal
export const scaleRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

// Stagger Container & Items
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: premiumEase,
    },
  },
};

// Aliases for convenience
export const fadeUp = sectionRevealVariants;
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: premiumEase } },
};
export const staggerContainer = staggerContainerVariants;
export const staggerItem = staggerItemVariants;
export const scaleReveal = scaleRevealVariants;

