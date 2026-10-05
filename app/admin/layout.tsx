import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen font-body flex flex-col selection:bg-accent selection:text-bg" style={{ backgroundColor: "var(--bg)", color: "var(--ink)" }}>
      <header className="border-b py-4 px-6 md:px-12" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)" }}></div>
            <h1 className="font-mono-label text-xs uppercase tracking-widest" style={{ color: "var(--ink)" }}>
              System // Admin_Terminal
            </h1>
          </div>
          <nav className="font-mono-label flex gap-6 text-[11px] uppercase tracking-wider">
            <Link href="/" className="transition-colors hover:text-white" style={{ color: "var(--muted)" }}>
              [ Return to Root ]
            </Link>
            <Link href="/api/auth/logout" className="text-red-500 hover:text-red-400 transition-colors">
              [ Terminate Session ]
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow p-6 md:p-12 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
