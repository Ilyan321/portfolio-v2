"use client";

import { site } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors"
      style={{
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container-px flex h-16 items-center justify-between">
        {/* Left: Monogram / Initials */}
        <a
          href="#top"
          className="group flex items-center gap-3 font-display text-sm font-semibold tracking-tight transition-opacity hover:opacity-85"
          style={{ color: "var(--ink)" }}
        >
          <div
            className="flex h-7 w-7 items-center justify-center rounded-sm font-mono-label text-xs font-bold transition-transform group-hover:scale-105"
            style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
          >
            {site.initials}
          </div>
          <span className="font-mono-label text-xs font-semibold uppercase tracking-wider">
            {site.name}
          </span>
        </a>

        {/* Center: Clean Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
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
        </nav>

        {/* Right: Status Pill & Theme Toggle */}
        <div className="flex items-center gap-4">
          <div
            className="hidden items-center gap-2 rounded-sm border px-2.5 py-1 font-mono-label text-[11px] uppercase tracking-wider sm:flex"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--panel)",
              color: "var(--accent)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ backgroundColor: "#4ade80" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: "#4ade80" }}
              />
            </span>
            <span style={{ color: "var(--muted)" }}>Status:</span>
            <span className="font-semibold text-ink">Open to work</span>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
