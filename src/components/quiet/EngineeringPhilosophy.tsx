"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid, Layers } from "lucide-react";

export interface PhilosophyStep {
  index: string;
  phase: string;
  headline: string;
  kicker: string;
  description: string;
}

export const philosophySteps: PhilosophyStep[] = [
  {
    index: "01",
    phase: "DISCOVER",
    headline: "First, I explore the problem space.",
    kicker: "BEFORE WRITING A SINGLE LINE OF CODE",
    description:
      "From user needs and edge cases to system constraints, I dig into the problem space until the shape of the solution starts to show.",
  },
  {
    index: "02",
    phase: "DESIGN",
    headline: "Then I architect the system.",
    kicker: "EVERY BOUNDARY AND DATA MODEL, JUSTIFIED",
    description:
      "Rough concepts become clear schemas, wireframes become resilient workflows. Every component and API boundary is there on purpose.",
  },
  {
    index: "03",
    phase: "BUILD & SHIP",
    headline: "Build it. Ship it. Listen. Repeat.",
    kicker: "VERIFIED WITH AUTOMATED TESTS & TIGHT FEEDBACK LOOPS",
    description:
      "Clean, scalable code with careful testing, performance checks, and tight feedback loops. Launched with confidence, then improved continuously.",
  },
];

export default function EngineeringPhilosophy() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [viewAll, setViewAll] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % philosophySteps.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + philosophySteps.length) % philosophySteps.length);
  }, []);

  // Auto-advance every 6.5s unless hovered or in "view all" mode
  useEffect(() => {
    if (viewAll || isPaused) return;
    timerRef.current = setTimeout(() => {
      next();
    }, 6500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, viewAll, isPaused, next]);

  // Handle subtle interactive mouse spotlight
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      next();
    } else if (e.key === "ArrowLeft") {
      prev();
    }
  };

  const activeStep = philosophySteps[current];

  return (
    <div
      ref={cardRef}
      className="my-6 sm:my-8 rounded-2xl sm:rounded-3xl border border-zinc-800/90 text-white relative overflow-hidden transition-all duration-300 shadow-2xl"
      style={{
        background: "radial-gradient(ellipse 90% 70% at 50% 25%, #151310 0%, #070707 100%)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 24px 48px -20px rgba(0, 0, 0, 0.85)",
      }}
      onPointerEnter={() => {
        setIsPaused(true);
        setIsHovered(true);
      }}
      onPointerLeave={() => {
        setIsPaused(false);
        setIsHovered(false);
      }}
      onPointerMove={handlePointerMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Engineering Philosophy & Methodology"
    >
      {/* 1. Masked Precision Dot Grid (Crisp in center, fades gently toward perimeter) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.14) 1.2px, transparent 1.2px)`,
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 85%)",
        }}
        aria-hidden="true"
      />

      {/* 2. Ambient Warm Orange Bloom behind headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 32%, rgba(255, 111, 67, 0.10) 0%, rgba(255, 111, 67, 0.02) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* 3. Interactive Cursor Spotlight */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300 rounded-full blur-2xl"
          style={{
            left: mousePos.x - 120,
            top: mousePos.y - 120,
            width: 240,
            height: 240,
            background: "radial-gradient(circle, rgba(255, 111, 67, 0.12) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Subtle View Toggle (discrete top-right corner) */}
      <div className="absolute top-4 sm:top-5 right-4 sm:right-6 z-20">
        <button
          type="button"
          onClick={() => setViewAll((v) => !v)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors cursor-pointer backdrop-blur-md"
          style={{ color: "#a1a1aa" }}
          title={viewAll ? "Switch to interactive slide view" : "View all 3 steps at once"}
        >
          {viewAll ? (
            <>
              <Layers className="size-3" />
              <span>Slides</span>
            </>
          ) : (
            <>
              <LayoutGrid className="size-3" />
              <span>All 3 Steps</span>
            </>
          )}
        </button>
      </div>

      {!viewAll ? (
        /* Cinematic Slide Stage: Matches User Mockup 1:1 */
        <div className="relative z-10 px-6 sm:px-12 py-12 sm:py-16 flex flex-col items-center text-center">
          {/* Top Pill Badge: Clean, Translucent, Glowing Dot */}
          <div className="mb-6 sm:mb-8">
            <button
              type="button"
              onClick={next}
              title="Click to advance phase"
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-md transition-all cursor-pointer shadow-xs"
            >
              <span
                className="size-1.5 rounded-full bg-[#ff6f43] animate-pulse"
                style={{ boxShadow: "0 0 10px rgba(255, 111, 67, 0.9)" }}
              />
              <span
                className="font-mono text-[11px] sm:text-[11.5px] font-semibold tracking-widest uppercase"
                style={{ color: "#f4f4f5" }}
              >
                {activeStep.index} · {activeStep.phase}
              </span>
            </button>
          </div>

          {/* Animated Slide Content */}
          <div className="min-h-[195px] sm:min-h-[180px] flex flex-col items-center justify-center w-full max-w-2xl px-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStep.index}
                initial={{ opacity: 0, y: direction * 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: direction * -10, filter: "blur(4px)" }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col items-center"
              >
                {/* Main Headline in Pure White */}
                <h3
                  className="text-3xl sm:text-4xl md:text-[40px] font-bold tracking-tight leading-[1.12] m-0 max-w-xl text-balance"
                  style={{ color: "#ffffff", textShadow: "0 2px 14px rgba(0, 0, 0, 0.6)" }}
                >
                  {activeStep.headline}
                </h3>

                {/* Orange Sub-Kicker */}
                <p
                  className="mt-4 mb-3.5 font-mono text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "#ff6f43" }}
                >
                  {activeStep.kicker}
                </p>

                {/* Description Body in High-Contrast Crisp Zinc */}
                <p
                  className="text-[14.5px] sm:text-[15.5px] leading-[1.8] max-w-xl mx-auto m-0 text-balance"
                  style={{ color: "#d4d4d8" }}
                >
                  {activeStep.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Navigation Controls: < [ ━━ ] • • > */}
          <div className="flex items-center justify-between w-full max-w-[220px] mt-8 pt-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous step"
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              style={{ color: "#a1a1aa" }}
            >
              <ChevronLeft className="size-4" />
            </button>

            {/* Stepper Dots & Active Bar */}
            <div className="flex items-center gap-2">
              {philosophySteps.map((step, idx) => (
                <button
                  key={step.index}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Jump to step ${step.index}: ${step.phase}`}
                  className="p-1 group cursor-pointer"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      idx === current
                        ? "w-7 bg-[#ff6f43] shadow-[0_0_10px_rgba(255,111,67,0.8)]"
                        : "w-1.5 bg-zinc-600 group-hover:bg-zinc-400"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next step"
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              style={{ color: "#a1a1aa" }}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      ) : (
        /* All Steps Stacked View */
        <div className="relative z-10 p-6 sm:p-10 pt-12 space-y-4">
          {philosophySteps.map((step) => (
            <div
              key={step.index}
              className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] text-left transition-all duration-200"
            >
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-white/10 bg-white/[0.05] mb-3">
                <span className="size-1.5 rounded-full bg-[#ff6f43] animate-pulse shadow-[0_0_8px_rgba(255,111,67,0.8)]" />
                <span className="font-mono text-[10.5px] font-semibold text-zinc-200 uppercase tracking-wider">
                  {step.index} · {step.phase}
                </span>
              </div>

              <h4
                className="text-xl sm:text-2xl font-bold tracking-tight leading-snug mb-2"
                style={{ color: "#ffffff" }}
              >
                {step.headline}
              </h4>

              <p
                className="font-mono text-[11px] font-semibold tracking-wider uppercase mb-2"
                style={{ color: "#ff6f43" }}
              >
                {step.kicker}
              </p>

              <p
                className="text-[13.5px] sm:text-[14.5px] leading-relaxed m-0"
                style={{ color: "#a1a1aa" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
