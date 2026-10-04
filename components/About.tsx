"use client";

import { site, education } from "@/lib/data";

export default function About() {
  const currentEdu = education[0];

  return (
    <section
      id="about"
      className="relative border-t py-24 md:py-32"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="container-px">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <span
            className="font-mono-label text-xs uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            01 // About
          </span>
          <div
            className="h-[1px] flex-1"
            style={{ backgroundColor: "var(--border)" }}
          />
        </div>

        {/* Content Layout */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Short Bio */}
          <div className="lg:col-span-8">
            <h2
              className="font-display text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl"
              style={{ color: "var(--ink)" }}
            >
              Building intelligent, production-ready systems with uncompromising performance.
            </h2>

            <div
              className="mt-6 space-y-4 text-base leading-relaxed md:text-lg"
              style={{ color: "var(--muted)" }}
            >
              <p>
                I am a Computer Systems Engineering student at QUEST Nawabshah
                specializing in Generative AI, real-time NLP pipelines, and clean
                full-stack web applications.
              </p>
              <p>
                I focus on fine-tuning open-source LLMs (LoRA/QLoRA), designing fast vector
                retrieval engines, and shipping scalable web interfaces that prioritize
                speed, security, and developer ergonomics.
              </p>
            </div>
          </div>

          {/* Quick Context Card */}
          <div className="lg:col-span-4">
            <div
              className="rounded-sm border p-6 space-y-5"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--panel)",
              }}
            >
              <div>
                <div
                  className="font-mono-label text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  Education
                </div>
                <div
                  className="mt-1 font-display text-sm font-semibold"
                  style={{ color: "var(--ink)" }}
                >
                  BE Computer System Engineering
                </div>
                <div className="mt-0.5 text-xs" style={{ color: "var(--muted)" }}>
                  {currentEdu.institution}
                </div>
                <div
                  className="mt-1 font-mono-label text-[11px]"
                  style={{ color: "var(--accent)" }}
                >
                  2024 – 2028 · CGPA 3.10
                </div>
              </div>

              <div
                className="border-t pt-4"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="font-mono-label text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  Location
                </div>
                <div
                  className="mt-1 font-display text-sm font-semibold"
                  style={{ color: "var(--ink)" }}
                >
                  {site.location}
                </div>
                <div
                  className="mt-0.5 font-mono-label text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  Available for Remote & Relocation
                </div>
              </div>

              <div
                className="border-t pt-4"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="font-mono-label text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  Specializations
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["LoRA Fine-Tuning", "Vector RAG", "Next.js 15", "PyTorch", "FastAPI"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-sm border px-2 py-0.5 font-mono-label text-[11px]"
                        style={{
                          borderColor: "var(--border)",
                          backgroundColor: "var(--bg)",
                          color: "var(--ink)",
                        }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
