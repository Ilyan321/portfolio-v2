"use client";

import { site } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import { Terminal } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg) 85%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      <div className="container-px flex h-14 items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight transition-opacity hover:opacity-80"
          style={{ color: "var(--ink)" }}
        >
          <div
            className="flex h-7 w-7 items-center justify-center rounded-sm font-mono-label text-xs font-bold"
            style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
          >
            {site.initials}
          </div>
          <span>{site.name}</span>
          <span
            className="hidden font-mono-label text-[11px] font-normal sm:inline-block"
            style={{ color: "var(--muted)" }}
          >
            / AI & Full-Stack
          </span>
        </a>

        <nav className="flex items-center gap-6">
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono-label text-xs uppercase tracking-wider transition-colors hover:text-accent"
                style={{ color: "var(--muted)" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="chip hidden rounded-sm border px-3 py-1 font-mono-label text-xs sm:inline-flex"
              style={{ borderColor: "var(--border)", color: "var(--ink)" }}
            >
              CV.pdf
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
