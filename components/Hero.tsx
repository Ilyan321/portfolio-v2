"use client";

import dynamic from "next/dynamic";
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
          <div
            className="font-mono-label mb-4 flex items-center gap-2 text-xs uppercase animate-fade-in"
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
          </div>

          <h1
            className="font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.05] tracking-tight"
            style={{ color: "var(--ink)" }}
          >
            {headlineWords.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="mr-[0.28em] inline-block transition-transform duration-300 hover:-translate-y-1"
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            className="font-mono-label mt-6 text-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {site.subline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-sm px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-transform duration-200 hover:-translate-y-0.5 shadow-sm"
              style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
            >
              Explore Projects
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="chip rounded-sm border px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-transform duration-200 hover:-translate-y-0.5"
              style={{ borderColor: "var(--border)", color: "var(--ink)", backgroundColor: "var(--panel)" }}
            >
              Download CV
            </a>
          </div>

          <div
            className="font-mono-label mt-12 grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-6 text-xs uppercase"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                <span style={{ color: "var(--ink)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* right: interactive 3D scene, desktop only */}
        <div className="relative hidden h-[460px] w-full items-center justify-center md:flex">
          <Scene3D />
        </div>
      </div>
    </section>
  );
}
