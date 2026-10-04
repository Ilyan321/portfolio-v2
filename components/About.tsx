"use client";

import { education, techStack } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  const questEdu = education[0];
  const ibaEdu = education[1];

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
                <p>
                  I&apos;m a Computer Systems Engineering student at QUEST Nawabshah with a
                  3.50 GPA in my 4th semester, specializing in Generative AI workflows, real-time
                  NLP pipelines, and clean full-stack web engineering.
                </p>
                <p>
                  My engineering workflow centers around Python, C++, Next.js, and React.
                  Whether fine-tuning open-source LLMs with LoRA/QLoRA, orchestrating FAISS vector
                  retrieval pipelines, or deploying analytical dashboards with Streamlit,
                  I focus on writing systems that are architecturally sound, type-safe, and built to scale.
                </p>
              </div>
            </div>

            {/* Academic Standing Cards */}
            <div className="mt-10 space-y-4">
              <div
                className="rounded-sm border p-5 transition-colors"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--panel)",
                }}
              >
                <div className="flex items-center justify-between font-mono-label text-[11px] uppercase tracking-wider text-muted">
                  <span style={{ color: "var(--accent)" }}>University Education</span>
                  <span>4th Sem GPA: 3.50</span>
                </div>
                <div
                  className="mt-2 font-display text-base font-semibold"
                  style={{ color: "var(--ink)" }}
                >
                  {questEdu.degree}
                </div>
                <div className="mt-0.5 text-xs text-muted">
                  {questEdu.institution}
                </div>
                <div
                  className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono-label text-[11px] text-muted"
                >
                  <span>{questEdu.period}</span>
                  <span>•</span>
                  <span>Nawabshah, PK</span>
                </div>
              </div>

              <div
                className="rounded-sm border p-4 font-mono-label text-xs"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--panel)",
                }}
              >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted">
                  <span>Prior Education</span>
                  <span style={{ color: "var(--accent)" }}>Distinction</span>
                </div>
                <div className="mt-1 text-ink font-body text-sm font-medium">
                  {ibaEdu.degree}
                </div>
                <div className="mt-0.5 text-[11px] text-muted">
                  {ibaEdu.institution} · {ibaEdu.period}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Categorized Technical Skills (Open, No Enclosing Box) */}
          <div id="skills" className="lg:col-span-6 space-y-6 pt-2 scroll-mt-24">
            {techStack.map((category) => (
              <div key={category.group} className="space-y-2.5">
                <div className="font-mono-label text-[11px] uppercase tracking-wider text-muted">
                  {category.group}
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
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
