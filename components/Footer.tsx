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
        className="container-px font-mono-label flex flex-col gap-3 text-[11px] uppercase sm:flex-row sm:items-center sm:justify-between"
        style={{ color: "var(--muted)" }}
      >
        <span>QUEST Nawabshah · BE Computer Systems Engineering</span>
        <span style={{ color: "var(--accent)" }}>Status: Open to work</span>
        <span>© {new Date().getFullYear()} {site.name}</span>
      </div>
    </footer>
  );
}
