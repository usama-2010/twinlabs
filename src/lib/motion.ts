export const motionTokens = {
  ease: {
    silk: [0.16, 1, 0.3, 1] as const,
    out: [0.22, 1, 0.36, 1] as const,
    smooth: [0.25, 0.1, 0.25, 1] as const,
  },
  duration: {
    fast: 0.2,
    base: 0.55,
    slow: 0.85,
    hero: 1,
  },
  stagger: {
    tight: 0.06,
    base: 0.1,
    loose: 0.14,
  },
  viewport: {
    margin: "-80px",
    once: true,
  },
  hero: {
    lineDelay: 0.12,
    mountDelay: 0.1,
    blur: 10,
    y: 32,
  },
  carousel: {
    slideDuration: 6,
    rotationSpeed: 0.15,
  },
} as const;
