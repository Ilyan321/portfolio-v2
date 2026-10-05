"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("ERR: Unauthorized Access Denied");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md p-8 sm:p-10 rounded-sm border"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "var(--accent)" }}></div>
          <h1 className="font-mono-label text-sm uppercase tracking-widest" style={{ color: "var(--ink)" }}>Authenticate //</h1>
        </div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 font-mono-label text-xs tracking-wider text-red-500 border-l-2 border-red-500 pl-3 py-1"
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="font-mono-label block text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              &gt; Identification_Str
            </label>
            <input
              type="text"
              className="w-full font-mono-label text-sm rounded-sm border px-4 py-3 outline-none transition-all focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-mono-label block text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              &gt; Security_Key
            </label>
            <input
              type="password"
              className="w-full font-mono-label text-sm rounded-sm border px-4 py-3 outline-none transition-all focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-mono-label relative overflow-hidden rounded-sm border px-6 py-4 text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-50 mt-4 cursor-pointer"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)", color: "var(--accent)" }}
          >
            {isLoading ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <span>[ Initialize Session ]</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
