"use client";

import { education as defaultEducation, techStack as defaultTechStack, site as defaultSite } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function About({
  dbEducation,
  dbTechStack,
  dbProfile,
}: {
  dbEducation?: any[];
  dbTechStack?: any[];
  dbProfile?: any;
}) {
  const activeEdu = (dbEducation && dbEducation.length > 0) ? dbEducation : defaultEducation;
  const activeTechStack = (dbTechStack && dbTechStack.length > 0) ? dbTechStack : defaultTechStack;
  const activeProfile = dbProfile || defaultSite;

  return (
    <section
      id="about"
      className="relative border-t py-24 md:py-32"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg)",
      }}
    >
      <ScrollReveal width="100%">
        <div className="container-px">
          {/* Section Eyebrow Line */}
          <div className="flex items-center gap-3">
            <span
              className="font-mono-label text-xs uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              01 // About & Technical Stack
            </span>
            <div
              className="h-[1px] flex-1"
              style={{ backgroundColor: "var(--border)" }}
            />
          </div>

          {/* 2-Column Split: Left = Narrative & Education, Right = Categorized Skills */}
          <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            
            {/* Left Column: Narrative & Academic Foundation */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <h2
                  className="font-display text-2xl font-medium tracking-tight sm:text-3xl lg:text-4xl leading-tight"
                  style={{ color: "var(--ink)" }}
                >
                  Turning machine learning research into fast, reliable software.
                </h2>

                <div
                  className="font-body mt-6 space-y-4 text-base leading-relaxed sm:text-lg"
                  style={{ color: "var(--muted)" }}
                >
                  <p className="whitespace-pre-line leading-relaxed">
                    {activeProfile.about}
                  </p>
                </div>
              </div>

              {/* Academic Standing Cards */}
              <div className="mt-10 space-y-4">
                {activeEdu.map((edu: any, idx: number) => (
                  <div
                    key={edu.id || idx}
                    className="rounded-sm border p-5 transition-colors w-full min-w-0"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--panel)",
                    }}
                  >
                    <div className="flex items-center justify-between font-mono-label text-[11px] uppercase tracking-wider text-muted">
                      <span style={{ color: "var(--accent)" }}>{idx === 0 ? "University Education" : "Prior Education"}</span>
                      {edu.details && <span>{edu.details}</span>}
                    </div>
                    <div
                      className="mt-2 font-display text-base font-semibold break-words"
                      style={{ color: "var(--ink)" }}
                    >
                      {edu.degree}
                    </div>
                    <div className="mt-0.5 text-xs text-muted break-words">
                      {edu.institution}
                    </div>
                    <div
                      className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono-label text-[11px] text-muted"
                    >
                      <span>{edu.period}</span>
                      {edu.location && (
                        <>
                          <span>•</span>
                          <span>{edu.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Categorized Technical Skills */}
            <div id="skills" className="lg:col-span-6 space-y-6 pt-2 scroll-mt-24">
              {activeTechStack.map((category: any, idx: number) => (
                <div key={category.group || idx} className="space-y-2.5">
                  <div className="font-mono-label text-[11px] uppercase tracking-wider text-muted">
                    {category.group}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(category.items || []).map((item: string, itemIdx: number) => (
                      <span
                        key={itemIdx}
                        className="font-mono-label rounded-sm border px-2.5 py-1 text-xs transition-colors hover:border-accent hover:text-ink"
                        style={{
                          borderColor: "var(--border)",
                          backgroundColor: "var(--panel)",
                          color: "var(--ink)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
