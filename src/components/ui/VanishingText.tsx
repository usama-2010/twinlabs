"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  r: number;
  color: string;
};

type VanishingTextProps = {
  phrases: string[];
  className?: string;
  /** Ms to show each phrase before vanishing */
  holdDuration?: number;
  /** Ms before the first cycle starts */
  startDelay?: number;
};

export function VanishingText({
  phrases,
  className = "",
  holdDuration = 3200,
  startDelay = 2400,
}: VanishingTextProps) {
  const reduce = useReducedMotion();
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const indexRef = useRef(0);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  const [text, setText] = useState(phrases[0] ?? "");
  const [animating, setAnimating] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const clearHoldTimer = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const scheduleNext = useCallback(
    (delay: number) => {
      clearHoldTimer();
      holdTimerRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        triggerVanishRef.current();
      }, delay);
    },
    []
  );

  const sampleText = useCallback((value: string) => {
    const el = textRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return false;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.ceil(rect.width);
    const h = Math.ceil(rect.height);

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const styles = getComputedStyle(el);
    const fontSize = parseFloat(styles.fontSize);
    ctx.font = `${styles.fontWeight} ${fontSize}px ${styles.fontFamily}`;
    ctx.fillStyle = styles.color;
    ctx.textBaseline = "top";
    ctx.fillText(value, 0, 0);

    const { data } = ctx.getImageData(0, 0, w * dpr, h * dpr);
    const step = Math.max(2, Math.floor(fontSize / 18));
    const particles: Particle[] = [];
    const color = styles.color;

    for (let y = 0; y < h * dpr; y += step) {
      for (let x = 0; x < w * dpr; x += step) {
        const i = (y * w * dpr + x) * 4;
        if (data[i + 3] > 80) {
          particles.push({
            x: x / dpr,
            y: y / dpr,
            r: step / dpr,
            color,
          });
        }
      }
    }

    particlesRef.current = particles;
    return particles.length > 0;
  }, []);

  const triggerVanishRef = useRef<() => void>(() => {});

  triggerVanishRef.current = () => {
    const current = phrases[indexRef.current] ?? "";
    if (!sampleText(current)) {
      scheduleNext(holdDuration);
      return;
    }

    setAnimating(true);
    setFadeIn(false);

    const maxX = particlesRef.current.reduce(
      (prev, p) => (p.x > prev ? p.x : prev),
      0
    );

    const animateFrame = (pos: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || !mountedRef.current) return;

      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const dpr = canvas.width / w;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const remaining: Particle[] = [];

      for (const p of particlesRef.current) {
        if (p.x < pos) {
          remaining.push(p);
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.r, p.r);
        } else {
          if (p.r <= 0.05) continue;
          p.x += Math.random() > 0.5 ? 1.2 : -0.8;
          p.y += (Math.random() - 0.5) * 1.4;
          p.r -= 0.04 + Math.random() * 0.04;
          remaining.push(p);
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.r, p.r);
        }
      }

      particlesRef.current = remaining;

      if (remaining.length > 0) {
        rafRef.current = requestAnimationFrame(() => animateFrame(pos - 6));
        return;
      }

      const next = (indexRef.current + 1) % phrases.length;
      indexRef.current = next;
      const nextText = phrases[next] ?? "";
      setText(nextText);
      setAnimating(false);
      setFadeIn(true);
      scheduleNext(holdDuration);
    };

    rafRef.current = requestAnimationFrame(() => animateFrame(maxX + 12));
  };

  useEffect(() => {
    mountedRef.current = true;

    if (reduce || phrases.length <= 1) {
      return () => {
        mountedRef.current = false;
      };
    }

    scheduleNext(startDelay);

    return () => {
      mountedRef.current = false;
      clearHoldTimer();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, phrases, holdDuration, startDelay, scheduleNext]);

  if (reduce || phrases.length <= 1) {
    return (
      <span className={className} aria-live="polite">
        {text}
      </span>
    );
  }

  return (
    <span className={`relative inline-block ${className}`.trim()}>
      <span className="sr-only" aria-live="polite">
        {text}
      </span>
      <motion.span
        ref={textRef}
        aria-hidden
        animate={{ opacity: animating ? 0 : 1 }}
        transition={{ duration: fadeIn ? 0.45 : 0.1, ease: "easeOut" }}
        className={animating ? "text-transparent" : undefined}
      >
        {text}
      </motion.span>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`pointer-events-none absolute top-0 left-0 ${animating ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}
