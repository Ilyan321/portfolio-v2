"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function Certificates({ dbCerts }: { dbCerts: any[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayedCerts = showAll ? dbCerts : dbCerts.slice(0, 4);

  return (
    <section
      id="certificates"
      className="relative border-t py-24 md:py-32"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
    >
      <ScrollReveal width="100%">
        <div className="container-px">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              04 // Certifications
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
          </div>

          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold max-w-xl mb-6">Continuous learning & credentials.</h2>
            <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Verified achievements from industry leaders.
            </p>
          </div>

          {dbCerts.length === 0 ? (
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              No certificates yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedCerts.map((cert) => (
                <div key={cert.id} className="group relative p-6 rounded-2xl border transition-colors hover:bg-white/[0.02]" style={{ borderColor: "var(--border)" }}>
                  <div className="mb-4 text-xs font-mono-label" style={{ color: "var(--muted)" }}>{cert.date}</div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">{cert.title}</h3>
                  <div className="text-sm font-medium mb-6" style={{ color: "var(--muted)" }}>{cert.issuer}</div>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                      View Credential
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {dbCerts.length > 4 && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: "var(--border)" }}
              >
                {showAll ? "Show Less" : "View All"}
              </button>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
