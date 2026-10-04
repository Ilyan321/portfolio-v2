"use client";

import { stats } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vh-4rem)] w-full items-center pt-24 pb-16 md:pt-28 md:pb-20"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="container-px w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7">
            {/* Monospace Eyebrow Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-sm border px-3 py-1 font-mono-label text-[11px] uppercase tracking-wider"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--panel)",
                color: "var(--accent)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ backgroundColor: "#4ade80" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: "#4ade80" }}
                />
              </span>
              <span>Computer Systems Engineering @ QUEST Nawabshah</span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-[3.25rem] lg:leading-[1.12] hyphens-none"
              style={{ color: "var(--ink)", wordBreak: "keep-all" }}
            >
              Architecting real-time AI &amp; high-speed full-stack systems.
            </h1>

            {/* Punchy Body Copy (Human-Readable Sans, Not Monospace) */}
            <p
              className="font-body mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--muted)" }}
            >
              Undergrad engineer turning machine learning research into production-grade software: from LoRA fine-tuning and FAISS RAG retrieval pipelines to high-speed full-stack web applications.
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="rounded-sm px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
              >
                Explore Projects
              </a>

              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:border-accent"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--panel)",
                  color: "var(--ink)",
                }}
              >
                Download CV ↗
              </a>

              <a
                href="#contact"
                className="font-mono-label ml-2 text-xs uppercase tracking-wider underline underline-offset-4 transition-colors hover:text-accent"
                style={{ color: "var(--muted)" }}
              >
                Get In Touch
              </a>
            </div>

            {/* Quick Metrics Ticker */}
            <div
              className="mt-12 grid grid-cols-2 gap-6 border-t pt-6 sm:grid-cols-4"
              style={{ borderColor: "var(--border)" }}
            >
              {stats.map((s) => (
                <div key={s.label} className="space-y-1">
                  <div
                    className="font-mono-label text-[10px] uppercase tracking-wider"
                    style={{ color: "var(--muted)" }}
                  >
                    {s.label}
                  </div>
                  <div
                    className="font-display text-base font-semibold sm:text-lg"
                    style={{ color: "var(--ink)" }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Pipeline & System Telemetry (Authentic, Not AI Slop) */}
          <div className="lg:col-span-5">
            <div
              className="relative overflow-hidden rounded-sm border p-6"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--panel)",
              }}
            >
              {/* Telemetry Header */}
              <div
                className="flex items-center justify-between border-b pb-4 font-mono-label text-xs uppercase tracking-wider"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                  <span className="font-semibold" style={{ color: "var(--ink)" }}>SYSTEM TELEMETRY</span>
                </div>
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>SYS_OK // 2026</span>
              </div>

              {/* Core Disciplines */}
              <div className="mt-5 space-y-3 font-mono-label text-xs">
                <div className="flex items-baseline justify-between">
                  <span style={{ color: "var(--muted)" }}>01 · NLP & GENAI</span>
                  <span className="font-medium" style={{ color: "var(--ink)" }}>LoRA / FAISS / QLoRA</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span style={{ color: "var(--muted)" }}>02 · FULL-STACK WEB</span>
                  <span className="font-medium" style={{ color: "var(--ink)" }}>Next.js 15 / React / TS</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span style={{ color: "var(--muted)" }}>03 · SYSTEMS & LOGIC</span>
                  <span className="font-medium" style={{ color: "var(--ink)" }}>Python / C++ / AST Safety</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span style={{ color: "var(--muted)" }}>04 · DATABASE & CLOUD</span>
                  <span className="font-medium" style={{ color: "var(--ink)" }}>Supabase / Postgres / VPS</span>
                </div>
              </div>

              {/* Execution Pipeline Trace */}
              <div
                className="mt-6 rounded-sm border p-4 font-mono-label"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg)",
                }}
              >
                <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-wider">
                  <span style={{ color: "var(--muted)" }}>INFERENCE PIPELINE</span>
                  <span style={{ color: "var(--accent)" }}>SUB-50ms TARGET</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span style={{ color: "var(--ink)" }}>› Embedding Vectorization</span>
                    <span style={{ color: "var(--accent)" }}>11.8ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: "var(--ink)" }}>› Semantic Retrieval (FAISS)</span>
                    <span style={{ color: "var(--accent)" }}>14.2ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: "var(--ink)" }}>› LoRA Adapter Forward Pass</span>
                    <span style={{ color: "var(--accent)" }}>21.5ms</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2" style={{ borderColor: "var(--border)" }}>
                    <span className="font-semibold" style={{ color: "var(--ink)" }}>Total Pipeline Latency</span>
                    <span className="font-bold" style={{ color: "var(--accent)" }}>47.5ms</span>
                  </div>
                </div>
              </div>

              {/* Meta Status Footer */}
              <div
                className="mt-5 flex items-center justify-between font-mono-label text-[10px] uppercase tracking-wider"
                style={{ color: "var(--muted)" }}
              >
                <span>LOC: Nawabshah, PK</span>
                <span>STATUS: Open To Work</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
