import { experience } from "@/lib/data";
import ScanLine from "./ScanLine";

export default function Experience() {
  return (
    <section id="experience" className="relative border-t py-28" style={{ borderColor: "var(--border)" }}>
      <ScanLine targetId="experience" />

      <div className="container-px">
        <div className="max-w-2xl">
          <span className="font-mono-label text-xs uppercase" style={{ color: "var(--accent)" }}>
            04 // Professional History
          </span>
          <h2
            className="font-display mt-3 text-3xl font-medium tracking-tight md:text-4xl"
            style={{ color: "var(--ink)" }}
          >
            Internships & Engineering Experience
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {experience.map((exp) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="grid grid-cols-1 gap-4 rounded-sm border p-6 transition-all duration-300 hover:border-accent md:grid-cols-12 md:items-start"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
            >
              <div className="md:col-span-4">
                <div className="font-display text-lg font-semibold" style={{ color: "var(--ink)" }}>
                  {exp.role}
                </div>
                <div className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                  {exp.company}
                </div>
                <div className="font-mono-label mt-1 text-xs" style={{ color: "var(--muted)" }}>
                  {exp.period} · {exp.location}
                </div>
              </div>

              <div className="text-sm leading-relaxed md:col-span-8" style={{ color: "var(--muted)" }}>
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
