"use client";

import { experience as defaultExperience } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Experience({ dbExperience }: { dbExperience?: any[] }) {
  const activeExp = (dbExperience && dbExperience.length > 0) ? dbExperience : defaultExperience;

  return (
    <section
      id="experience"
      className="relative border-t py-24 md:py-32"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg)",
      }}
    >
      <ScrollReveal width="100%">
        <div className="container-px">
          {/* Section Eyebrow Line */}
          <div className="flex items-center gap-3 mb-8">
            <span
              className="font-mono-label text-xs uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              03 // Experience
            </span>
            <div
              className="h-[1px] flex-1"
              style={{ backgroundColor: "var(--border)" }}
            />
          </div>

          {/* Section Header */}
          <h2
            className="font-display mb-12 text-3xl font-medium md:text-4xl"
            style={{ color: "var(--ink)" }}
          >
            Experience
          </h2>

          {/* Minimalist Editorial List with Left Hairline Rail */}
          <ul className="max-w-4xl space-y-8">
            {activeExp.map((exp: any, idx: number) => {
              const roleTitle = exp.role || exp.title || "Software Engineer";
              const companyName = exp.company || "";
              const periodStr = exp.period || exp.meta || "";
              const locationStr = exp.location || "";
              const isCurrent = !!exp.current;

              return (
                <li
                  key={exp.id || idx}
                  className="flex flex-col gap-2 border-l-2 pl-5 transition-colors hover:border-accent w-full min-w-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span
                        className="font-mono-label text-sm font-medium"
                        style={{ color: "var(--ink)" }}
                      >
                        {roleTitle} {companyName && <span className="opacity-70 font-normal">· {companyName}</span>}
                      </span>
                      {isCurrent && (
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono-label uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        >
                          Active
                        </span>
                      )}
                    </div>
                    <span
                      className="font-mono-label text-xs uppercase tracking-wider shrink-0"
                      style={{ color: "var(--muted)" }}
                    >
                      {periodStr} {locationStr && `· ${locationStr}`}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-sm mt-1 leading-relaxed opacity-90 max-w-3xl" style={{ color: "var(--muted)" }}>
                      {exp.description}
                    </p>
                  )}

                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {exp.skills.map((s: string, sIdx: number) => (
                        <span
                          key={sIdx}
                          className="font-mono-label text-[10px] border px-2 py-0.5 rounded-sm"
                          style={{ borderColor: "var(--border)", color: "var(--muted)", backgroundColor: "var(--panel)" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Bottom Monospace Annotation */}
          <p
            className="font-mono-label mt-10 max-w-2xl text-xs uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Specialized in autonomous knowledge engineering, LLM orchestration, and real-time inference pipelines.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
