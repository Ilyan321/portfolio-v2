"use client";

import { site, stats } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[90vh] w-full flex-col justify-center pt-28 pb-20 md:pt-36 md:pb-24"
    >
      <div className="container-px">
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <div
            className="flex items-center gap-2 rounded-sm border px-3 py-1 font-mono-label text-[11px] uppercase tracking-wider"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--panel)",
              color: "var(--accent)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: "#4ade80" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: "#4ade80" }}
              />
            </span>
            <span>Software Developer & AI Engineer</span>
          </div>
          <span
            className="hidden font-mono-label text-xs sm:inline-block"
            style={{ color: "var(--muted)" }}
          >
            QUEST Nawabshah
          </span>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl">
          <h1
            className="font-display text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]"
            style={{ color: "var(--ink)" }}
          >
            Architecting real-time AI & high-speed full-stack applications.
          </h1>

          <p
            className="mt-6 max-w-2xl font-mono-label text-sm leading-relaxed md:text-base"
            style={{ color: "var(--muted)" }}
          >
            Specializing in Generative AI integration, LoRA fine-tuning, RAG retrieval
            pipelines, and high-performance Next.js architectures.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="rounded-sm px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
          >
            Explore Projects
          </a>

          <a
            href="#contact"
            className="rounded-sm border px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--panel)",
              color: "var(--ink)",
            }}
          >
            Get In Touch
          </a>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border px-5 py-3 font-mono-label text-xs uppercase tracking-wider transition-all duration-200 hover:text-accent"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted)",
            }}
          >
            Resume.pdf ↗
          </a>
        </div>

        {/* Quick Highlights / Metrics Ticker */}
        <div
          className="mt-16 grid grid-cols-2 gap-4 border-t pt-8 sm:grid-cols-4"
          style={{ borderColor: "var(--border)" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="space-y-1">
              <div
                className="font-mono-label text-[11px] uppercase tracking-wider"
                style={{ color: "var(--muted)" }}
              >
                {s.label}
              </div>
              <div
                className="font-display text-sm font-semibold sm:text-base"
                style={{ color: "var(--ink)" }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
