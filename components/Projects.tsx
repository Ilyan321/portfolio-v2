"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function Projects({ dbProjects }: { dbProjects: any[] }) {
  const [expandedSlugs, setExpandedSlugs] = useState<string[]>([
    dbProjects[0]?.id || "", 
  ]);
  const [showAll, setShowAll] = useState(false);

  const toggleRow = (slug: string) => {
    setExpandedSlugs((prev) =>
      prev.includes(slug) ? [] : [slug]
    );
  };

  const displayedProjects = showAll ? dbProjects : dbProjects.slice(0, 5);

  return (
    <section id="projects" className="relative py-24 md:py-32" style={{ backgroundColor: "var(--bg)" }}>
      <ScrollReveal width="100%">
        <div className="container-px">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              02 // Selected Works
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold max-w-xl">
              Systems engineered for scale and speed.
            </h2>
            <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              A curated selection of my recent AI and full-stack projects.
            </p>
          </div>

          {dbProjects.length === 0 ? (
            <div className="text-center py-20 text-zinc-500 border border-zinc-800 rounded-lg">
              No projects yet. Add some in the Admin Dashboard!
            </div>
          ) : (
            <div className="border-t" style={{ borderColor: "var(--border)" }}>
              {displayedProjects.map((project, idx) => {
                const isExpanded = expandedSlugs.includes(project.id);

                return (
                  <div key={project.id} className="group border-b" style={{ borderColor: "var(--border)" }}>
                    <button
                      onClick={() => toggleRow(project.id)}
                      className="w-full flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 text-left transition-colors hover:bg-white/[0.02]"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 mb-4 md:mb-0">
                        <span className="font-mono-label text-xs" style={{ color: "var(--muted)" }}>
                          0{idx + 1}
                        </span>
                        <h3 className="text-xl md:text-2xl font-semibold tracking-tight transition-colors group-hover:text-emerald-400">
                          {project.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm" style={{ color: "var(--muted)" }}>
                        <div className="hidden md:flex gap-3">
                          {project.tags.map((tag: string) => (
                            <span key={tag} className="px-2 py-1 rounded-full border text-xs whitespace-nowrap" style={{ borderColor: "var(--border)" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <motion.div animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.2 }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8">
                            <div className="md:col-span-8 md:col-start-2">
                              <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-4">
                                {project.link && (
                                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-emerald-400 transition-colors">
                                    Live Project
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                                  </a>
                                )}
                                {project.github && (
                                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-emerald-400 transition-colors">
                                    Source Code
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}

          {dbProjects.length > 5 && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: "var(--border)" }}
              >
                {showAll ? "Show Less" : "View All Projects"}
              </button>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
