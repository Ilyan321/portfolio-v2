"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import ScanLine from "./ScanLine";
import { ExternalLink, Github, Sparkles } from "./Icons";

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "flagship">("all");

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.flagship);

  return (
    <section id="projects" className="relative border-t py-28" style={{ borderColor: "var(--border)" }}>
      <ScanLine targetId="projects" />

      <div className="container-px">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono-label text-xs uppercase" style={{ color: "var(--accent)" }}>
              03 // Engineering Portfolio
            </span>
            <h2
              className="font-display mt-3 text-3xl font-medium tracking-tight md:text-4xl"
              style={{ color: "var(--ink)" }}
            >
              Curated Production & Research Work
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              NLP inference engines, retrieval-augmented pipelines, fine-tuned transformer architectures, and real-time full-stack portals.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`chip rounded-sm border px-3 py-1.5 font-mono-label text-xs uppercase tracking-wider transition-all ${
                filter === "all" ? "font-bold shadow-sm" : "opacity-70"
              }`}
              style={{
                borderColor: "var(--border)",
                backgroundColor: filter === "all" ? "var(--accent)" : "var(--panel)",
                color: filter === "all" ? "var(--bg)" : "var(--ink)",
              }}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter("flagship")}
              className={`chip rounded-sm border px-3 py-1.5 font-mono-label text-xs uppercase tracking-wider transition-all ${
                filter === "flagship" ? "font-bold shadow-sm" : "opacity-70"
              }`}
              style={{
                borderColor: "var(--border)",
                backgroundColor: filter === "flagship" ? "var(--accent)" : "var(--panel)",
                color: filter === "flagship" ? "var(--bg)" : "var(--ink)",
              }}
            >
              Flagship Only
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <article
              key={project.slug}
              className={`group relative flex flex-col justify-between rounded-sm border p-6 transition-all duration-300 hover:border-accent hover:-translate-y-1 ${
                project.flagship ? "md:p-8" : ""
              }`}
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--panel)",
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono-label text-[11px] uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    {project.tagline}
                  </span>
                  {project.flagship && (
                    <span
                      className="flex items-center gap-1 rounded-sm px-2 py-0.5 font-mono-label text-[10px] uppercase font-semibold"
                      style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
                    >
                      <Sparkles className="h-3 w-3" /> Flagship
                    </span>
                  )}
                </div>

                <h3 className="font-display mt-3 text-xl font-medium tracking-tight md:text-2xl" style={{ color: "var(--ink)" }}>
                  {project.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {project.description}
                </p>
              </div>

              <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono-label rounded-sm border px-2 py-0.5 text-[10px]"
                      style={{ borderColor: "var(--border)", color: "var(--ink)", backgroundColor: "var(--bg)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-label text-xs font-medium transition-opacity hover:opacity-75"
                      style={{ color: "var(--accent)" }}
                    >
                      {link.label.toLowerCase().includes("github") ? (
                        <Github className="h-3.5 w-3.5" />
                      ) : (
                        <ExternalLink className="h-3.5 w-3.5" />
                      )}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
