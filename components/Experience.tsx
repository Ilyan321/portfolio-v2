"use client";

import ScrollReveal from "./ScrollReveal";

export default function Experience() {
  const experiences = [
    {
      title: "AI Intern, FlyRank AI",
      meta: "Ongoing · Remote",
    },
    {
      title: "Python Developer Intern, IntelliVerse",
      meta: "GenAI & NLP Pipelines",
    },
  ];

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
        <ul className="max-w-4xl space-y-6">
          {experiences.map((exp) => (
            <li
              key={exp.title}
              className="flex flex-col gap-1 border-l-2 pl-5 sm:flex-row sm:items-baseline sm:justify-between transition-colors hover:border-accent"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="font-mono-label text-sm font-medium"
                style={{ color: "var(--ink)" }}
              >
                {exp.title}
              </span>
              <span
                className="font-mono-label text-xs uppercase tracking-wider"
                style={{ color: "var(--muted)" }}
              >
                {exp.meta}
              </span>
            </li>
          ))}
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
