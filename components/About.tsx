import { site, techStack, education } from "@/lib/data";
import ScanLine from "./ScanLine";

export default function About() {
  return (
    <section id="about" className="relative border-t py-28" style={{ borderColor: "var(--border)" }}>
      <ScanLine targetId="about" />

      <div className="container-px">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left bio */}
          <div className="lg:col-span-5">
            <span className="font-mono-label text-xs uppercase" style={{ color: "var(--accent)" }}>
              01 // Background & Philosophy
            </span>
            <h2
              className="font-display mt-3 text-3xl font-medium tracking-tight md:text-4xl"
              style={{ color: "var(--ink)" }}
            >
              Engineering intelligence with zero bloat.
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed md:text-base" style={{ color: "var(--muted)" }}>
              <p>{site.about}</p>
              <p>
                My focus centers on high-efficiency generative AI applications — combining QLoRA fine-tuned open-source models with deterministic security boundaries and sub-second retrieval systems.
              </p>
            </div>

            {/* Academic profile */}
            <div className="mt-8 border-t pt-6" style={{ borderColor: "var(--border)" }}>
              <span className="font-mono-label text-xs uppercase" style={{ color: "var(--accent)" }}>
                Academic Affiliation
              </span>
              <div className="mt-3 space-y-4">
                {education.map((edu) => (
                  <div key={edu.degree} className="rounded-sm border p-4 transition-all hover:border-accent" style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}>
                    <div className="font-display text-sm font-semibold" style={{ color: "var(--ink)" }}>
                      {edu.degree}
                    </div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>
                      {edu.institution}
                    </div>
                    <div className="font-mono-label mt-2 text-[11px]" style={{ color: "var(--accent)" }}>
                      {edu.period} · {edu.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right tech taxonomy */}
          <div className="lg:col-span-7">
            <span className="font-mono-label text-xs uppercase" style={{ color: "var(--accent)" }}>
              02 // Technical Skills & Taxonomy
            </span>

            <div className="mt-6 space-y-6">
              {techStack.map((group) => (
                <div
                  key={group.group}
                  className="rounded-sm border p-5"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
                >
                  <div className="font-mono-label text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    {group.group}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="chip rounded-sm border px-3 py-1 font-mono-label text-xs"
                        style={{ borderColor: "var(--border)", color: "var(--ink)", backgroundColor: "var(--bg)" }}
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
      </div>
    </section>
  );
}
