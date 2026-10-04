"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Projects() {
  // Allow expanding rows inline (single or multiple)
  const [expandedSlugs, setExpandedSlugs] = useState<string[]>([
    projects[0]?.slug || "", // First flagship open by default
  ]);
  const [showAll, setShowAll] = useState(false);

  const toggleRow = (slug: string) => {
    setExpandedSlugs((prev) =>
      prev.includes(slug) ? [] : [slug]
    );
  };

  const displayedProjects = showAll ? projects : projects.slice(0, 5);

  return (
    <section
      id="projects"
      className="relative border-t py-24 md:py-32"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg)",
      }}
    >
      <ScrollReveal width="100%">
        <div className="container-px">
        {/* Section Eyebrow Line */}
        <div className="flex items-center gap-3">
          <span
            className="font-mono-label text-xs uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            02 // Selected Projects
          </span>
          <div
            className="h-[1px] flex-1"
            style={{ backgroundColor: "var(--border)" }}
          />
        </div>

        {/* Section Headline */}
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              className="font-display text-2xl font-medium tracking-tight sm:text-3xl lg:text-4xl"
              style={{ color: "var(--ink)" }}
            >
              Engineered Systems &amp; Research
            </h2>
            <p
              className="font-body mt-2 text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--muted)" }}
            >
              Autonomous NLP agents, fine-tuned transformer pipelines, FAISS vector search, and high-speed full-stack applications.
            </p>
          </div>

          <div
            className="font-mono-label text-xs uppercase tracking-wider shrink-0"
            style={{ color: "var(--muted)" }}
          >
            Showing {displayedProjects.length} of {projects.length} Repositories
          </div>
        </div>

        {/* Expandable Accordion Rows */}
        <div className="mt-12 flex flex-col gap-3">
          {displayedProjects.map((project, idx) => {
            const isExpanded = expandedSlugs.includes(project.slug);
            const indexNumber = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={project.slug}
                className="rounded-sm border transition-all duration-200"
                style={{
                  borderColor: isExpanded ? "var(--accent)" : "var(--border)",
                  backgroundColor: "var(--panel)",
                }}
              >
                {/* Clickable Row Header */}
                <button
                  type="button"
                  onClick={() => toggleRow(project.slug)}
                  aria-expanded={isExpanded}
                  className="w-full text-left flex items-center justify-between gap-4 px-5 py-5 sm:px-6 cursor-pointer transition-colors"
                >
                  <div className="flex min-w-0 items-baseline gap-3 sm:gap-4">
                    <span
                      className="font-mono-label text-xs select-none"
                      style={{ color: isExpanded ? "var(--accent)" : "var(--muted)" }}
                    >
                      {indexNumber}
                    </span>

                    <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                      <span
                        className="font-display text-lg sm:text-xl font-medium truncate"
                        style={{ color: "var(--ink)" }}
                      >
                        {project.name}
                      </span>
                      <span
                        className="font-mono-label text-xs uppercase tracking-wider truncate"
                        style={{ color: "var(--muted)" }}
                      >
                        {project.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Right: Stack preview + Expand indicator */}
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="hidden md:flex items-center gap-1.5">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono-label rounded-sm border px-2 py-0.5 text-[10px]"
                          style={{
                            borderColor: "var(--border)",
                            backgroundColor: "var(--bg)",
                            color: "var(--muted)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span
                          className="font-mono-label text-[10px]"
                          style={{ color: "var(--muted)" }}
                        >
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>

                    <span
                      className="font-mono-label flex h-6 w-6 items-center justify-center rounded-sm border text-xs font-bold transition-transform duration-200"
                      style={{
                        borderColor: isExpanded ? "var(--accent)" : "var(--border)",
                        backgroundColor: isExpanded ? "var(--accent)" : "var(--bg)",
                        color: isExpanded ? "var(--bg)" : "var(--ink)",
                        transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* Inline Expanded Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="border-t px-5 pt-4 pb-6 sm:px-6 sm:pb-6"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <p
                          className="font-body text-sm leading-relaxed sm:text-base max-w-3xl"
                          style={{ color: "var(--muted)" }}
                        >
                          {project.description}
                        </p>

                        {/* All Tech Stack Pills */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="font-mono-label rounded-sm border px-2.5 py-0.5 text-[11px]"
                              style={{
                                borderColor: "var(--border)",
                                backgroundColor: "var(--bg)",
                                color: "var(--ink)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="mt-5 flex flex-wrap items-center gap-5 pt-2">
                          {project.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono-label inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider underline underline-offset-4 transition-colors hover:text-ink"
                              style={{ color: "var(--accent)" }}
                            >
                              <span>{link.label}</span>
                              <span>↗</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* View All / Collapse Button */}
        {projects.length > 5 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="font-mono-label rounded-sm border px-6 py-3 text-xs uppercase tracking-wider transition-all duration-200 hover:border-accent hover:text-accent cursor-pointer"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--panel)",
                color: "var(--ink)",
              }}
            >
              {showAll
                ? "− Collapse to Top 5 Repositories"
                : `+ View All Repositories (${projects.length})`}
            </button>
          </div>
        )}
      </div>
      </ScrollReveal>
    </section>
  );
}
