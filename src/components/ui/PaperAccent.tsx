"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { accents, type AccentChoice } from "@/data/accents";

const GrainGradient = dynamic(
  () => import("@paper-design/shaders-react").then((module) => module.GrainGradient),
  { ssr: false },
);

export default function PaperAccent({ accent }: { accent: AccentChoice }) {
  const ref = useRef<HTMLDivElement>(null);
  const checked = useRef(false);
  const [visible, setVisible] = useState(false);
  const [supported, setSupported] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [foreground, setForeground] = useState(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);
    const syncVisibility = () => setForeground(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!visible || reduceMotion || checked.current) return;
    checked.current = true;
    try {
      const gl = document.createElement("canvas").getContext("webgl2");
      setSupported(Boolean(gl));
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      // The pre-rendered Paper shader stays visible without WebGL.
      setSupported(false);
    }
  }, [visible, reduceMotion]);

  const dark = resolvedTheme === "dark";
  const palette = accents.find((item) => item.id === accent) ?? accents.find(item => item.id === "orange")!;
  return (
    <div
      ref={ref}
      className="paper-background"
      data-moving={!reduceMotion && foreground && visible}
      aria-hidden="true"
    >
      <Image className="paper-still paper-still-light" style={{ filter: `hue-rotate(${palette.shift}deg)` }} src="/shaders/grain-light.webp" width={1240} height={240} alt="" unoptimized />
      <Image className="paper-still paper-still-dark" style={{ filter: `hue-rotate(${palette.shift}deg)` }} src="/shaders/grain-dark.webp" width={1240} height={240} alt="" unoptimized />
      {supported && visible && !reduceMotion && (
        <GrainGradient
          className="paper-canvas"
          colors={dark ? ["#262628", palette.dark, palette.light] : ["#f0efeb", palette.dark, palette.light]}
          colorBack={dark ? "#131315" : "#f8f7f4"}
          shape="wave"
          softness={0.75}
          intensity={0.16}
          noise={0.02}
          scale={0.75}
          rotation={-12}
          speed={foreground ? 0.08 : 0}
          frame={12000}
          minPixelRatio={1}
          maxPixelCount={90000}
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
}
