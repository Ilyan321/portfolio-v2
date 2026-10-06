"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function Certificates({ dbCerts }: { dbCerts?: any[] }) {
  const activeCerts = dbCerts || [];
  const [showAll, setShowAll] = useState(false);
  const displayedCerts = showAll ? activeCerts : activeCerts.slice(0, 4);

  return (
    <section
      id="certificates"
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
            04 // Certifications
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
          Certifications
        </h2>

        {activeCerts.length === 0 ? (
          <div className="text-sm font-mono-label" style={{ color: "var(--muted)" }}>
            No certificates yet.
          </div>
        ) : (
          <ul className="max-w-4xl space-y-6">
            {displayedCerts.map((cert, idx) => {
              let displayIssuer = cert.issuer || "";
              let credId = "";
              let tag = "";
              if (displayIssuer.includes("|||")) {
                const parts = displayIssuer.split("|||").map((s: string) => s.trim());
                displayIssuer = parts[0] || "";
                credId = parts[1] || "";
                tag = parts[2] || "";
              }

              return (
                <li
                  key={cert.id || idx}
                  className="group flex flex-col gap-2 border-l-2 pl-5 sm:flex-row sm:items-baseline sm:justify-between transition-colors hover:border-accent w-full min-w-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span
                        className="font-mono-label text-sm font-medium transition-colors group-hover:text-accent break-words"
                        style={{ color: "var(--ink)" }}
                      >
                        {cert.title}
                      </span>
                      {tag && (
                        <span
                          className="font-mono-label text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border flex-shrink-0"
                          style={{
                            borderColor: "var(--border)",
                            color: "var(--muted)",
                            backgroundColor: "var(--panel)",
                          }}
                        >
                          {tag}
                        </span>
                      )}
                    </div>
                    <div
                      className="font-mono-label text-xs break-words"
                      style={{ color: "var(--muted)" }}
                    >
                      {displayIssuer} {credId ? `· ID: ${credId}` : ""}
                    </div>
                  </div>

                  {/* Date & Document Link */}
                  <div className="flex items-center gap-4 shrink-0 sm:flex-col sm:items-end sm:gap-1.5">
                    <span
                      className="font-mono-label text-xs uppercase tracking-wider"
                      style={{ color: "var(--muted)" }}
                    >
                      {cert.date}
                    </span>
                    {(cert.link || cert.file) && (
                      <a
                        href={cert.link || cert.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono-label text-xs underline underline-offset-4 transition-colors hover:text-ink inline-flex items-center gap-1"
                        style={{ color: "var(--accent)" }}
                        title={`View / Download ${cert.title}`}
                      >
                        {(cert.link || cert.file)?.includes(".pdf") ? "PDF" : "Credential"} ↗
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* View All / Collapse Toggle */}
        {activeCerts.length > 4 && (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="font-mono-label inline-flex items-center gap-2 rounded border px-4 py-2 text-xs uppercase tracking-wider transition-colors hover:border-accent hover:text-ink cursor-pointer"
              style={{
                borderColor: "var(--border)",
                color: "var(--accent)",
                backgroundColor: "transparent",
              }}
            >
              {showAll
                ? `− Collapse to Top 4`
                : `+ View All Certifications (${activeCerts.length})`}
            </button>
          </div>
        )}

        {/* Bottom Monospace Annotation */}
        <p
          className="font-mono-label mt-12 max-w-2xl text-xs uppercase tracking-wider"
          style={{ color: "var(--muted)" }}
        >
          Verified industry credentials across Cybersecurity, Generative AI, LLM Orchestration, and Prompt Engineering.
        </p>
      </div>
      </ScrollReveal>
    </section>
  );
}
