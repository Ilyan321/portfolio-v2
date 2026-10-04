"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site, stats } from "@/lib/data";
import ScanLine from "./ScanLine";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => null,
});

const headlineWords = site.headline.split(" ");

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      <ScanLine targetId="top" />

      <div className="container-px grid w-full grid-cols-1 items-center gap-12 pt-28 pb-16 md:grid-cols-2 md:pt-16">
        {/* left: text block */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono-label mb-4 flex items-center gap-2 text-xs uppercase"
            style={{ color: "var(--accent)" }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </span>
            <span>Available for remote & full-time roles</span>
          </motion.div>

          <motion.h1
            className="font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.05] tracking-tight"
            style={{ color: "var(--ink)" }}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                className="mr-[0.28em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="font-mono-label mt-6 text-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {site.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="rounded-sm px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
            >
              Explore Projects
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="chip rounded-sm border px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
              style={{ borderColor: "var(--border)", color: "var(--ink)", backgroundColor: "var(--panel)" }}
            >
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="font-mono-label mt-12 grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-6 text-xs uppercase"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                <span style={{ color: "var(--ink)" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* right: interactive 3D scene, desktop only */}
        <div className="relative hidden h-[460px] w-full items-center justify-center md:flex">
          <Scene3D />
        </div>
      </div>
    </section>
  );
}
