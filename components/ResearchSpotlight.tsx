import { researchSpotlight } from "@/lib/data";
import ScanLine from "./ScanLine";

export default function ResearchSpotlight() {
  return (
    <section id="research" className="relative border-t py-28" style={{ borderColor: "var(--border)" }}>
      <ScanLine targetId="research" />
      <div className="container-px">
        <span
          className="font-mono-label text-xs uppercase"
          style={{ color: "var(--accent)" }}
        >
          {researchSpotlight.eyebrow}
        </span>

        <h2
          className="font-display mt-3 max-w-3xl text-3xl font-medium leading-tight md:text-4xl"
          style={{ color: "var(--ink)" }}
        >
          {researchSpotlight.title}
        </h2>

        <p
          className="mt-5 max-w-2xl text-base leading-relaxed md:text-lg"
          style={{ color: "var(--muted)" }}
        >
          {researchSpotlight.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-8">
          {researchSpotlight.stats.map((s) => (
            <div key={s.sub}>
              <div className="font-mono-label text-2xl font-bold" style={{ color: "var(--accent)" }}>
                {s.label}
              </div>
              <div className="font-mono-label text-xs uppercase" style={{ color: "var(--muted)" }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {researchSpotlight.stackTags.map((tag) => (
            <span
              key={tag}
              className="chip font-mono-label rounded-sm border px-2.5 py-1 text-[11px]"
              style={{ borderColor: "var(--border)", color: "var(--ink)", backgroundColor: "var(--panel)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={researchSpotlight.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5 shadow-sm"
            style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
          >
            View GitHub Repository
          </a>
          <a
            href={researchSpotlight.huggingFaceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="chip rounded-sm border px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
            style={{ borderColor: "var(--border)", color: "var(--ink)", backgroundColor: "var(--panel)" }}
          >
            Hugging Face Model
          </a>
        </div>

        {/* diagnostic report layout: generative diagram + findings panel */}
        <div
          id="research-report"
          className="relative mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border md:grid-cols-2"
          style={{ borderColor: "var(--border)" }}
        >
          <ScanLine targetId="research-report" />
          <div
            className="relative flex h-64 items-center justify-center p-6 md:h-auto"
            style={{ backgroundColor: "var(--panel)" }}
          >
            <ASTSecurityVisualizer />
          </div>
          <div className="p-8" style={{ backgroundColor: "var(--panel)" }}>
            <div className="font-mono-label mb-4 text-[11px] uppercase tracking-wider" style={{ color: "var(--accent)" }}>
              Architecture Diagnostics & Safeguards
            </div>
            <dl className="space-y-4">
              {researchSpotlight.diagnostics.map((row, i) => (
                <div
                  key={row.term}
                  className="flex flex-col gap-1 border-t pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  style={{ borderColor: i === 0 ? "transparent" : "var(--border)" }}
                >
                  <dt className="font-mono-label text-xs uppercase" style={{ color: "var(--muted)" }}>
                    {row.term}
                  </dt>
                  <dd className="font-mono-label text-xs sm:text-right" style={{ color: "var(--ink)" }}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function ASTSecurityVisualizer() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="h-full w-full"
      role="img"
      aria-label="Abstract AST Security Firewall Pipeline Diagram"
    >
      <defs>
        <radialGradient id="astCore" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="240" fill="var(--panel)" />
      <circle cx="160" cy="120" r="85" fill="url(#astCore)" />
      
      {/* Node network simulating AST Parser tree */}
      <circle cx="160" cy="40" r="12" fill="var(--accent)" />
      <circle cx="90" cy="110" r="9" fill="var(--border)" />
      <circle cx="230" cy="110" r="9" fill="var(--border)" />
      <circle cx="60" cy="180" r="7" fill="var(--muted)" />
      <circle cx="120" cy="180" r="7" fill="var(--accent)" />
      <circle cx="200" cy="180" r="7" fill="var(--accent)" />
      <circle cx="260" cy="180" r="7" fill="var(--muted)" />

      {/* Connection branches */}
      <line x1="160" y1="40" x2="90" y2="110" stroke="var(--border)" strokeWidth="1.5" />
      <line x1="160" y1="40" x2="230" y2="110" stroke="var(--border)" strokeWidth="1.5" />
      <line x1="90" y1="110" x2="60" y2="180" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="90" y1="110" x2="120" y2="180" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="230" y1="110" x2="200" y2="180" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="230" y1="110" x2="260" y2="180" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />

      {/* Grid crosshairs */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          x2="320"
          y1={i * 35 + 15}
          y2={i * 35 + 15}
          stroke="var(--border)"
          strokeWidth="0.5"
          opacity="0.25"
        />
      ))}
    </svg>
  );
}
