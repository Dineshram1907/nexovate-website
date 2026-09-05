export const defaultEase = [0.22, 1, 0.36, 1] as const;

export const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: custom * 0.1,
      ease: defaultEase,
    },
  }),
};

export const scaleRevealVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: defaultEase,
    },
  },
};
