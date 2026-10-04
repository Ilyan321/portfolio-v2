"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * A horizontal scanline in var(--accent) that sweeps top-to-bottom once
 * when its parent section enters the viewport, then fades out.
 */
export default function ScanLine({ targetId }: { targetId: string }) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const target = document.getElementById(targetId);
    const line = lineRef.current;
    if (!target || !line) return;

    const duration = prefersReducedMotion ? 0.3 : 1.1;

    const ctx = gsap.context(() => {
      gsap.set(line, { top: "0%", opacity: 0 });

      ScrollTrigger.create({
        trigger: target,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.set(line, { opacity: 1, top: "0%" })
            .to(line, { top: "100%", duration, ease: "power1.inOut" })
            .to(line, { opacity: 0, duration: 0.3 }, "-=0.1");
        },
      });
    });

    return () => ctx.revert();
  }, [targetId]);

  return (
    <div
      ref={lineRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 w-full h-[2px] scanline-glow z-20"
      style={{ backgroundColor: "var(--accent)" }}
    />
  );
}
