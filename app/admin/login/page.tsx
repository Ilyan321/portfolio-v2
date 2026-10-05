"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this should hit an API route that verifies against env vars and returns an HttpOnly cookie.
    // For simplicity of this single-user portfolio, we'll do an API check.
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h1>
        
        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
        
        <div className="mb-4">
          <label className="block text-zinc-400 mb-2 text-sm">Username</label>
          <input
            type="text"
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-zinc-400 mb-2 text-sm">Password</label>
          <input
            type="password"
            className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold py-2 rounded transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
