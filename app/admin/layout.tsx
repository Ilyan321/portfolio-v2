import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <header className="bg-zinc-900 border-b border-zinc-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-emerald-500">Admin Dashboard</h1>
          <nav className="flex gap-4">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              View Site
            </Link>
            <Link href="/api/auth/logout" className="text-zinc-400 hover:text-red-400 transition-colors">
              Logout
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow p-4 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
