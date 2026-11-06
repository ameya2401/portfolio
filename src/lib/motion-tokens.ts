export const motionTransitions = {
  springSnappy: { type: 'spring' as const, stiffness: 450, damping: 25 },
  springGentle: { type: 'spring' as const, stiffness: 220, damping: 20 },
  easeOut: { ease: [0.23, 1, 0.32, 1], duration: 0.25 },
};

