"use client";

import { site as defaultSite, stats as defaultStats } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import InteractiveTerminal from "./InteractiveTerminal";

export default function Hero({
  dbProfile,
  dbStats,
  statsCounts,
}: {
  dbProfile?: any;
  dbStats?: any[];
  statsCounts?: { projects: number; certs: number; internships: number; skills: number };
}) {
  const profile = dbProfile || defaultSite;
  const metrics = (dbStats && dbStats.length > 0)
    ? dbStats
    : statsCounts
    ? [
        { value: `${statsCounts.projects}+`, label: "Projects" },
        { value: `${statsCounts.internships}`, label: "Internships" },
        { value: `${statsCounts.certs}`, label: "Certificates" },
        { value: `${statsCounts.skills}+`, label: "Skills" },
      ]
    : defaultStats;

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
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-sm border px-3 py-1 font-mono-label text-[11px] uppercase tracking-wider"
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
                <span>{profile.role || "Computer Systems Engineering @ QUEST Nawabshah"}</span>
              </div>

              {/* Main Headline */}
              <h1
                className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-[3.25rem] lg:leading-[1.12] hyphens-none break-words"
                style={{ color: "var(--ink)" }}
              >
                {profile.headline || "Architecting real-time AI & high-speed full-stack systems."}
              </h1>

              {/* Punchy Body Copy */}
              <p
                className="font-body mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
                style={{ color: "var(--muted)" }}
              >
                {profile.subline || "Undergrad engineer turning machine learning research into production-grade software: from LoRA fine-tuning and FAISS RAG retrieval pipelines to high-speed full-stack web applications."}
              </p>

              {/* Action CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="rounded-sm px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
                  style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
                >
                  Explore Projects
                </a>

                <a
                  href={profile.cvUrl || "/cv.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:border-accent cursor-pointer"
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
                  className="font-mono-label ml-2 text-xs uppercase tracking-wider underline underline-offset-4 transition-colors hover:text-accent cursor-pointer"
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
                {metrics.map((s: any, idx: number) => (
                  <div key={idx} className="space-y-1">
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

            {/* Right Column: Interactive Terminal */}
            <div className="lg:col-span-5 flex items-center">
              <InteractiveTerminal />
            </div>

          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
