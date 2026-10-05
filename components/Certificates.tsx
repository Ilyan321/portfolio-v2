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
            className="h-px flex-1"
            style={{ backgroundColor: "var(--border)" }}
          />
        </div>

        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2
            className="font-display text-4xl sm:text-5xl font-medium tracking-tight mb-6"
            style={{ color: "var(--ink)" }}
          >
            Certifications
          </h2>
        </div>

        {/* Certificates List */}
        <div className="flex flex-col">
          {activeCerts.length === 0 ? (
            <div className="text-sm font-mono-label" style={{ color: "var(--muted)" }}>
              No certificates yet.
            </div>
          ) : (
            displayedCerts.map((cert, idx) => (
              <div
                key={cert.id || idx}
                className="group flex flex-col sm:flex-row sm:items-center justify-between border-b py-6 sm:py-8 transition-colors hover:bg-white/[0.02]"
                style={{ borderColor: "var(--border)" }}
              >
                {/* Left: Title & Issuer */}
                <div className="flex flex-col gap-2 mb-4 sm:mb-0 max-w-xl">
                  <h3
                    className="font-display text-lg sm:text-xl font-medium"
                    style={{ color: "var(--ink)" }}
                  >
                    {cert.title}
                  </h3>
                  <div
                    className="font-mono-label text-xs uppercase tracking-wider"
                    style={{ color: "var(--muted)" }}
                  >
                    {cert.issuer} {cert.credentialId && `// ID: ${cert.credentialId}`}
                  </div>
                </div>

                {/* Right: Date & PDF Link */}
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12 shrink-0">
                  <span
                    className="font-mono-label text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    {cert.date}
                  </span>
                  
                  {cert.link || cert.file ? (
                    <a
                      href={cert.link || cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-label flex items-center gap-2 text-xs uppercase tracking-wider transition-colors hover:text-accent"
                      style={{ color: "var(--ink)" }}
                    >
                      <span>{cert.link || cert.file ? (cert.link?.includes('pdf') || cert.file?.includes('pdf') ? 'PDF' : 'Credential') : ''}</span>
                      <span>↗</span>
                    </a>
                  ) : (
                    <span className="w-10"></span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* View All Button */}
        {activeCerts.length > 4 && (
          <div className="mt-12 flex justify-start">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="font-mono-label inline-flex items-center gap-2 text-xs uppercase tracking-wider transition-colors hover:text-accent cursor-pointer"
              style={{ color: "var(--muted)" }}
            >
              <span>+ View All Certifications ({activeCerts.length})</span>
            </button>
          </div>
        )}
      </div>
      </ScrollReveal>
    </section>
  );
}
