"use client";

import { useEffect, useState, useRef } from "react";

/**
 * A horizontal scanline in var(--accent) that sweeps top-to-bottom once
 * when its parent section enters the viewport, then fades out.
 */
export default function ScanLine({ targetId }: { targetId: string }) {
  const [animating, setAnimating] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimating(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      ref={lineRef}
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 w-full h-[2px] scanline-glow z-20 transition-all duration-1000 ease-out ${
        animating ? "top-full opacity-0" : "top-0 opacity-100"
      }`}
      style={{
        backgroundColor: "var(--accent)",
        boxShadow: "0 0 14px 2px var(--accent)",
      }}
    />
  );
}
