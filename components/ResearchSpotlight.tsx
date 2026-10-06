import { researchSpotlight as defaultSpotlight } from "@/lib/data";
import ScanLine from "./ScanLine";
import ScrollReveal from "./ScrollReveal";

export default function ResearchSpotlight({ dbSpotlight }: { dbSpotlight?: any }) {
  const spotlight = dbSpotlight || defaultSpotlight;

  return (
    <section id="research" className="relative border-t py-28" style={{ borderColor: "var(--border)" }}>
      <ScanLine targetId="research" />
      <ScrollReveal width="100%">
        <div className="container-px">
          <span
            className="font-mono-label text-xs uppercase"
            style={{ color: "var(--accent)" }}
          >
            {spotlight.eyebrow}
          </span>

          <h2
            className="font-display mt-3 max-w-3xl text-3xl font-medium leading-tight md:text-4xl break-words"
            style={{ color: "var(--ink)" }}
          >
            {spotlight.title}
          </h2>

          <p
            className="mt-5 max-w-2xl text-base leading-relaxed md:text-lg whitespace-pre-line"
            style={{ color: "var(--muted)" }}
          >
            {spotlight.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-8">
            {(spotlight.stats || []).map((s: any, idx: number) => (
              <div key={idx}>
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
            {(spotlight.stackTags || []).map((tag: string, idx: number) => (
              <span
                key={idx}
                className="chip font-mono-label rounded-sm border px-2.5 py-1 text-[11px]"
                style={{ borderColor: "var(--border)", color: "var(--ink)", backgroundColor: "var(--panel)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {spotlight.link && (
              <a
                href={spotlight.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5 shadow-sm cursor-pointer"
                style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
              >
                View GitHub Repository
              </a>
            )}
            {spotlight.huggingFaceLink && (
              <a
                href={spotlight.huggingFaceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="chip rounded-sm border px-6 py-3 font-mono-label text-xs font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5 cursor-pointer"
                style={{ borderColor: "var(--border)", color: "var(--ink)", backgroundColor: "var(--panel)" }}
              >
                Hugging Face Model
              </a>
            )}
          </div>

          {/* Diagnostic report layout: architectural pipeline + diagnostics findings panel */}
          <div
            id="research-report"
            className="relative mt-12 grid grid-cols-1 overflow-hidden rounded-sm border lg:grid-cols-12"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
          >
            <ScanLine targetId="research-report" />

            {/* Left Column: Interactive Architectural Pipeline Stream */}
            <div
              className="lg:col-span-6 border-b lg:border-b-0 lg:border-r p-6 sm:p-8 flex flex-col justify-between"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <div className="flex items-center justify-between font-mono-label text-[11px] uppercase tracking-wider mb-6">
                  <span style={{ color: "var(--accent)" }}>Execution Pipeline Trace</span>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: "#4ade80" }} />
                      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "#4ade80" }} />
                    </span>
                    <span className="text-[10px] text-muted">Firewall Active</span>
                  </div>
                </div>

                {/* Pipeline Flow Nodes */}
                <div className="space-y-3 font-mono-label text-xs">
                  <div className="rounded-sm border p-3" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                    <div className="flex items-center justify-between text-[10px] text-muted uppercase">
                      <span>Step 01 // User Intent Ingestion</span>
                      <span className="text-accent">Input</span>
                    </div>
                    <div className="mt-1 font-mono text-ink text-[12px]">
                      &quot;List top 5 users sorted by transaction volume&quot;
                    </div>
                  </div>

                  <div className="flex justify-center text-muted text-[10px]">↓ Tokenization & QLoRA Matrix</div>

                  <div className="rounded-sm border p-3" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                    <div className="flex items-center justify-between text-[10px] text-muted uppercase">
                      <span>Step 02 // Neural SQL Generator</span>
                      <span className="text-accent">LLaMA-3 8B</span>
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-ink opacity-90">
                      SELECT u.name, SUM(t.amt) FROM users u JOIN trans t ...
                    </div>
                  </div>

                  <div className="flex justify-center text-accent font-semibold text-[10px]">↓ Python AST Security Interceptor</div>

                  <div className="rounded-sm border p-3 border-accent/40" style={{ borderColor: "var(--accent)", backgroundColor: "var(--bg)" }}>
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold" style={{ color: "var(--accent)" }}>
                      <span>Step 03 // Deterministic AST Guard</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-accent/10 border border-accent/30 text-accent">MUTATION SAFETY: 100%</span>
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-muted">
                      Blocks DROP, DELETE, ALTER, UNION INJECTION before execution
                    </div>
                  </div>

                  <div className="flex justify-center text-muted text-[10px]">↓ Verified Read-Only Stream</div>

                  <div className="rounded-sm border p-3" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                    <div className="flex items-center justify-between text-[10px] text-muted uppercase">
                      <span>Step 04 // SQLite Execution Sandbox</span>
                      <span className="text-accent">Output Ready</span>
                    </div>
                    <div className="mt-1 font-mono text-ink text-[12px]">
                      Sub-millisecond query results returned to client safely
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t flex items-center justify-between font-mono-label text-[11px] text-muted" style={{ borderColor: "var(--border)" }}>
                <span>Inference Latency: &lt;45ms</span>
                <span>Spider Join Val: 84.2%</span>
              </div>
            </div>

            {/* Right Column: Architectural Diagnostics Table */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="font-mono-label mb-6 text-[11px] uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                  Architecture Diagnostics & Safeguards
                </div>
                <dl className="space-y-4">
                  {(spotlight.diagnostics || []).map((row: any, i: number) => (
                    <div
                      key={i}
                      className="flex flex-col gap-1 border-t pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                      style={{ borderColor: i === 0 ? "transparent" : "var(--border)" }}
                    >
                      <dt className="font-mono-label text-xs uppercase break-words text-muted">
                        {row.term}
                      </dt>
                      <dd className="font-mono-label text-xs sm:text-right break-words text-ink font-medium">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 pt-4 border-t font-mono-label text-[11px] text-muted" style={{ borderColor: "var(--border)" }}>
                Production-grade architecture fine-tuned for high accuracy on relational databases.
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
