"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  yOffset?: number;
}

export default function ScrollReveal({
  children,
  width = "fit-content",
  className = "",
  delay = 0,
  yOffset = 60,
}: ScrollRevealProps) {
  return (
    <div style={{ width }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: yOffset },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.9,
              delay: delay,
              ease: [0.16, 1, 0.3, 1], // Smooth cinematic float-up deceleration
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
