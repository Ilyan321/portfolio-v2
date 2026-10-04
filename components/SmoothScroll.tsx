"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;

    // Use gsap to update Lenis (more performant than requestAnimationFrame manually)
    // Wait, let's just use requestAnimationFrame if we don't need GSAP for this specifically, but the prompt says gsap is in package.json. Let's use requestAnimationFrame for simplicity.
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    // Optional: Integrate with GSAP ScrollTrigger if used later
    // gsap.ticker.add((time)=>{
    //   lenis.raf(time * 1000)
    // })

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
