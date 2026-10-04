import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
    >
      <div className="container-px flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-sm font-mono-label text-[10px] font-bold"
            style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
          >
            {site.initials}
          </div>
          <span className="font-mono-label text-xs" style={{ color: "var(--ink)" }}>
            {site.name} · {site.location}
          </span>
        </div>

        <div className="font-mono-label flex flex-wrap items-center gap-6 text-xs" style={{ color: "var(--muted)" }}>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          <a href={site.huggingface} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            Hugging Face
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            WhatsApp
          </a>
        </div>

        <div className="font-mono-label text-[11px]" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Ilyan Khan. Crafted with precision.
        </div>
      </div>
    </footer>
  );
}
