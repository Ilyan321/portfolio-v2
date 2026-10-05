import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative border-t py-10"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg)",
      }}
    >
      <div
        className="container-px font-mono-label grid grid-cols-1 gap-4 text-[11px] uppercase sm:grid-cols-3 sm:items-center"
        style={{ color: "var(--muted)" }}
      >
        <div className="text-left">
          <span>QUEST Nawabshah · BE Computer Systems Engineering</span>
        </div>
        
        <div className="text-center">
          <span style={{ color: "var(--accent)" }}>Status: Open to work</span>
        </div>
        
        <div className="flex items-center justify-start sm:justify-end gap-4 text-left sm:text-right">
          <a href="/admin" className="hover:text-[var(--accent)] transition-colors">
            Admin
          </a>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
