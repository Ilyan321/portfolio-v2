import { site as defaultSite } from "@/lib/data";

export default function Footer({ dbProfile }: { dbProfile?: any }) {
  const site = dbProfile || defaultSite;
  return (
    <footer
      id="site-footer"
      className="relative border-t py-12"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg)",
      }}
    >
      <div
        className="container-px font-mono-label grid grid-cols-1 gap-6 text-[11px] uppercase sm:grid-cols-3 sm:items-center sm:gap-4"
        style={{ color: "var(--muted)" }}
      >
        <div className="text-center sm:text-left">
          <span>QUEST Nawabshah · BE Computer Systems Engineering</span>
        </div>
        
        <div className="text-center">
          <span style={{ color: "var(--accent)" }}>Status: Open to work</span>
        </div>
        
        <div className="flex items-center justify-center sm:justify-end gap-4">
          <a href="/admin" className="hover:text-[var(--accent)] transition-colors">
            Admin
          </a>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
