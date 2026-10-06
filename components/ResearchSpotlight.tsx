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

          {/* Diagnostic report layout: architectural diagram + diagnostics findings panel */}
          <div
            id="research-report"
            className="relative mt-12 grid grid-cols-1 overflow-hidden rounded-sm border lg:grid-cols-12"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
          >
            <ScanLine targetId="research-report" />

            {/* Left Column: Visual Architecture & AST Network Diagram */}
            <div
              className="lg:col-span-6 border-b lg:border-b-0 lg:border-r p-6 sm:p-8 flex flex-col justify-between"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <div className="flex items-center justify-between font-mono-label text-[11px] uppercase tracking-wider mb-4">
                  <span style={{ color: "var(--accent)" }}>System Architecture & AST Network</span>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: "#4ade80" }} />
                      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "#4ade80" }} />
                    </span>
                    <span className="text-[10px] text-muted">Firewall: 100% Safe</span>
                  </div>
                </div>

                {/* Vector Architecture Flow Diagram */}
                <div className="relative w-full rounded-sm border p-2 flex items-center justify-center" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                  <svg
                    viewBox="0 0 420 300"
                    className="w-full h-auto max-h-[300px]"
                    role="img"
                    aria-label="Schema-Aware SQL Agent Architecture Diagram"
                  >
                    {/* Background Grid Pattern */}
                    <defs>
                      <pattern id="archGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border)" strokeWidth="0.5" opacity="0.3" />
                      </pattern>
                      <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="var(--border)" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>

                    <rect width="420" height="300" fill="url(#archGrid)" />

                    {/* Connecting Signal Lines */}
                    {/* Top -> Center */}
                    <line x1="210" y1="52" x2="210" y2="105" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
                    
                    {/* Center -> Left (AST Guard) */}
                    <path d="M 160 135 L 110 135 L 110 195" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                    
                    {/* Center -> Right (Spider Join) */}
                    <path d="M 260 135 L 310 135 L 310 195" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 3" />
                    
                    {/* Left (AST Guard) -> Bottom Output */}
                    <path d="M 110 235 L 110 260 L 210 260" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                    
                    {/* Right -> Bottom Output */}
                    <path d="M 310 235 L 310 260 L 210 260" fill="none" stroke="var(--border)" strokeWidth="1.2" strokeDasharray="3 3" />

                    {/* NODE 1: Client Query (Top) */}
                    <g transform="translate(110, 18)">
                      <rect width="200" height="34" rx="4" fill="var(--panel)" stroke="var(--border)" strokeWidth="1" />
                      <circle cx="15" cy="17" r="4" fill="var(--accent)" />
                      <text x="30" y="16" fill="var(--accent)" fontSize="9" fontFamily="monospace" fontWeight="bold">01 // NATURAL PROMPT</text>
                      <text x="30" y="27" fill="var(--ink)" fontSize="8.5" fontFamily="monospace">&quot;List top 5 users by sales&quot;</text>
                    </g>

                    {/* NODE 2: LLaMA-3 LoRA Engine (Center Hub) */}
                    <g transform="translate(130, 105)">
                      <rect width="160" height="52" rx="5" fill="var(--panel)" stroke="var(--accent)" strokeWidth="1.5" />
                      <circle cx="20" cy="26" r="6" fill="var(--accent)" opacity="0.8" />
                      <text x="36" y="24" fill="var(--ink)" fontSize="10.5" fontFamily="monospace" fontWeight="bold">LLaMA-3-8B Core</text>
                      <text x="36" y="38" fill="var(--muted)" fontSize="8.5" fontFamily="monospace">QLoRA / Unsloth 4-Bit</text>
                    </g>

                    {/* NODE 3: AST Security Firewall (Left) */}
                    <g transform="translate(30, 195)">
                      <rect width="160" height="42" rx="4" fill="var(--panel)" stroke="var(--accent)" strokeWidth="1.2" />
                      <rect x="8" y="8" width="6" height="6" fill="#4ade80" rx="1" />
                      <text x="22" y="18" fill="var(--ink)" fontSize="9.5" fontFamily="monospace" fontWeight="bold">AST Security Guard</text>
                      <text x="22" y="30" fill="var(--accent)" fontSize="8" fontFamily="monospace">Blocks DROP / DELETE</text>
                    </g>

                    {/* NODE 4: Spider Join Validator (Right) */}
                    <g transform="translate(230, 195)">
                      <rect width="160" height="42" rx="4" fill="var(--panel)" stroke="var(--border)" strokeWidth="1" />
                      <circle cx="12" cy="21" r="3.5" fill="var(--muted)" />
                      <text x="24" y="18" fill="var(--ink)" fontSize="9.5" fontFamily="monospace" fontWeight="bold">Spider Join Matrix</text>
                      <text x="24" y="30" fill="var(--muted)" fontSize="8" fontFamily="monospace">Multi-Table Resolution</text>
                    </g>

                    {/* NODE 5: Safe SQLite Sandbox Output (Bottom) */}
                    <g transform="translate(130, 245)">
                      <rect width="160" height="32" rx="4" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1" />
                      <text x="80" y="20" fill="var(--bg)" fontSize="9.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        ✓ VERIFIED READ-ONLY STREAM
                      </text>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t flex items-center justify-between font-mono-label text-[11px] text-muted" style={{ borderColor: "var(--border)" }}>
                <span>Inference Latency: &lt;45ms</span>
                <span>Spider Benchmark: 84.2%</span>
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
