"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import infinityLoaderAnimation from "@/assets/lottie/infinity-loader.json";

type TwinLabsMarkLoaderProps = {
  size?: number;
  className?: string;
};

export function TwinLabsMarkLoader({
  size = 120,
  className = "",
}: TwinLabsMarkLoaderProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <div
      className={`outreach-mark-loader ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Lottie
        animationData={infinityLoaderAnimation}
        loop={!reduceMotion}
        autoplay={!reduceMotion}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
