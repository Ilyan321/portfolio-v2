"use client";

import { stats } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import dynamic from "next/dynamic";


export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vh-4rem)] w-full items-center pt-24 pb-16 md:pt-28 md:pb-20"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <ScrollReveal width="100%" delay={0.1}>
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

          {/* Right Column: Profile Photo Placeholder */}
          <div className="lg:col-span-5 h-[400px] lg:h-[500px] w-full flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50">
             <div className="text-center text-zinc-500">
               <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <p className="text-sm">Profile Photo Placeholder</p>
               <p className="text-xs mt-1">Replace with your image in public folder</p>
             </div>
          </div>

        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
