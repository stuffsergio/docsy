export const fadeAnimation = {
  initial: {
    opacity: 0,
    x: -80,
    scale: 0,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "none",
  },
  exit: {
    opacity: 0,
    x: -80,
    scale: 0,
    filter: "blur(8px)",
  },
  transition: {
    ease: "easeInOut",
    duration: 0.2,
  },
};

export const fadeAnimation2 = {
  initial: {
    opacity: 0,
    x: 50,
    filter: "blur(8px)",
  },
  exit: {
    opacity: 0,
    x: 50,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "none",
  },

  transition: {
    ease: "easeInOut",
    duration: 0.2,
  },
};

export const whileAnimation = {
  whileHover: {
    scale: 1.3,
    transition: { duration: 0.2 },
  },
  whileTap: { scale: 0.9 },
};

export const whileAnimationSuave = {
  whileHover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
  whileTap: { scale: 0.9 },
};

export const floatAnimation = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 1.5, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const mainAnimation = {
  initial: {
    opacity: 0,
    y: 20,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    ease: "easeInOut",
    duration: 0.2,
  },
};
