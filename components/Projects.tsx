"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function Projects({ dbProjects }: { dbProjects?: any[] }) {
  const activeProjects = dbProjects || [];

  // Allow expanding rows inline (single or multiple)
  const [expandedSlugs, setExpandedSlugs] = useState<string[]>([
    activeProjects[0]?.id || activeProjects[0]?.slug || "", // First flagship open by default
  ]);
  const [showAll, setShowAll] = useState(false);

  const toggleRow = (slug: string) => {
    setExpandedSlugs((prev) =>
      prev.includes(slug) ? [] : [slug]
    );
  };

  const displayedProjects = showAll ? activeProjects : activeProjects.slice(0, 5);

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
        <div className="flex items-center gap-3 mb-8">
          <span
            className="font-mono-label text-xs uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            02 // Selected Projects
          </span>
          <div
            className="h-px flex-1"
            style={{ backgroundColor: "var(--border)" }}
          />
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="font-display text-4xl sm:text-5xl font-medium tracking-tight max-w-2xl"
            style={{ color: "var(--ink)" }}
          >
            Architecting real-time AI & high-speed full-stack systems.
          </h2>
          <div
            className="font-mono-label text-xs uppercase tracking-widest"
            style={{ color: "var(--muted)" }}
          >
            Showing {displayedProjects.length} of {activeProjects.length} Repositories
          </div>
        </div>

        {/* Expandable Accordion Rows */}
        <div className="mt-12 flex flex-col gap-3">
          {activeProjects.length === 0 ? (
            <div className="text-sm font-mono-label" style={{ color: "var(--muted)" }}>
              No projects yet.
            </div>
          ) : (
            displayedProjects.map((project, idx) => {
              const isExpanded = expandedSlugs.includes(project.id || project.slug);
              const indexNumber = String(idx + 1).padStart(2, "0");
              
              let titleStr = project.title || project.name || "";
              let taglineStr = project.tagline || "";
              if (titleStr.includes("|||")) {
                const parts = titleStr.split("|||").map((s: string) => s.trim());
                titleStr = parts[0] || "";
                taglineStr = parts[1] || "";
              }
              return (
                <div
                  key={project.id || project.slug}
                  className="rounded-sm border transition-all duration-200"
                  style={{
                    borderColor: isExpanded ? "var(--accent)" : "var(--border)",
                    backgroundColor: "var(--panel)",
                  }}
                >
                  {/* Clickable Row Header */}
                  <button
                    type="button"
                    onClick={() => toggleRow(project.id || project.slug)}
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
                          {titleStr}
                        </span>
                        <span
                          className="font-mono-label text-xs uppercase tracking-wider truncate"
                          style={{ color: "var(--muted)" }}
                        >
                          {taglineStr}
                        </span>
                      </div>
                    </div>

                    {/* Right: Stack preview + Expand indicator */}
                    <div className="flex shrink-0 items-center gap-3">
                      <div className="hidden md:flex items-center gap-1.5">
                        {(project.tags || project.stack || []).slice(0, 3).map((tech: string) => (
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
                        {(project.tags || project.stack || []).length > 3 && (
                          <span
                            className="font-mono-label text-[10px]"
                            style={{ color: "var(--muted)" }}
                          >
                            +{(project.tags || project.stack || []).length - 3}
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
                            {(project.tags || project.stack || []).map((tech: string) => (
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
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono-label inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider underline underline-offset-4 transition-colors hover:text-ink"
                                style={{ color: "var(--accent)" }}
                              >
                                <span>Live Demo</span>
                                <span>↗</span>
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono-label inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider underline underline-offset-4 transition-colors hover:text-ink"
                                style={{ color: "var(--accent)" }}
                              >
                                <span>GitHub</span>
                                <span>↗</span>
                              </a>
                            )}
                            
                            {/* Compatibility for old hardcoded links if ever needed */}
                            {project.links && project.links.map((link: any) => (
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
            })
          )}
        </div>

        {/* View All / Collapse Button */}
        {activeProjects.length > 5 && (
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
                : `+ View All Repositories (${activeProjects.length})`}
            </button>
          </div>
        )}
      </div>
      </ScrollReveal>
    </section>
  );
}
