export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 16
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.90,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.45,
      staggerChildren: 0.15
    }
  }
};

export const fadeUpItem = {
  hidden: {
    opacity: 0,
    y: 12
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.65,
      ease: "easeOut"
    }
  }
};

export const cardHover = {
  y: -4,

  transition: {
    duration: 0.2,
    ease: "easeOut"
  }
};
