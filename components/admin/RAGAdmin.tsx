"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchGitHubRepos, fetchIndexedDocuments, ingestGitHubRepo, deleteIndexedRepo } from "@/app/admin/actions";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  description: string;
  html_url: string;
  default_branch: string;
  updated_at: string;
}

interface IndexedDoc {
  slug: string;
  chunkCount: number;
  sample: string;
}

export function RAGAdmin({ initialIndexedDocs }: { initialIndexedDocs: IndexedDoc[] }) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [indexedDocs, setIndexedDocs] = useState<IndexedDoc[]>(initialIndexedDocs);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [customSlug, setCustomSlug] = useState("");
  const [isIngesting, setIsIngesting] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Ready. Select any public or private GitHub repository to index its README into pgvector."
  ]);

  useEffect(() => {
    async function loadRepos() {
      try {
        setLoadingRepos(true);
        const data = await fetchGitHubRepos();
        setRepos(data);
        if (data.length > 0) {
          setSelectedRepo(data[0].full_name);
          setCustomSlug(data[0].name);
        }
      } catch (err: any) {
        addLog(`[ERROR] Failed to load GitHub repositories: ${err.message}`);
      } finally {
        setLoadingRepos(false);
      }
    }
    loadRepos();
  }, []);

  function addLog(msg: string) {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${msg}`, ...prev.slice(0, 49)]);
  }

  const filteredRepos = repos.filter(
    (r) =>
      r.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedRepoObj = repos.find((r) => r.full_name === selectedRepo);

  async function handleIngest(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!selectedRepo) return;

    try {
      setIsIngesting(true);
      const slugToUse = customSlug.trim() || selectedRepoObj?.name || selectedRepo.split("/")[1];
      addLog(`[INGEST] Fetching README from GitHub: ${selectedRepo}...`);
      addLog(`[INGEST] Slicing into chunks & generating 384d vectors via Hugging Face...`);

      const result = await ingestGitHubRepo(selectedRepo, slugToUse);
      addLog(`[SUCCESS] ✅ Injected ${result.chunksCount} vectors into pgvector for '${result.slug}'!`);

      // Refresh indexed docs
      const updated = await fetchIndexedDocuments();
      setIndexedDocs(updated);
    } catch (err: any) {
      addLog(`[ERROR] Ingestion failed: ${err.message}`);
    } finally {
      setIsIngesting(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Are you sure you want to purge all vector chunks for '${slug}'?`)) return;
    try {
      addLog(`[PURGE] Deleting vector records for '${slug}'...`);
      await deleteIndexedRepo(slug);
      addLog(`[SUCCESS] Purged vectors for '${slug}'.`);
      const updated = await fetchIndexedDocuments();
      setIndexedDocs(updated);
    } catch (err: any) {
      addLog(`[ERROR] Delete failed: ${err.message}`);
    }
  }

  async function handleQuickReingest(slug: string) {
    // Find matching repo in repos list
    const match = repos.find(
      (r) => r.name.toLowerCase() === slug.toLowerCase() || r.full_name.toLowerCase().includes(slug.toLowerCase())
    );
    if (!match) {
      addLog(`[WARN] Could not find GitHub repository for slug '${slug}'. Please select it from the dropdown.`);
      return;
    }
    try {
      setIsIngesting(true);
      addLog(`[RE-SYNC] Fetching and re-embedding ${match.full_name} for '${slug}'...`);
      const result = await ingestGitHubRepo(match.full_name, slug);
      addLog(`[SUCCESS] ✅ Re-indexed ${result.chunksCount} vectors for '${result.slug}'!`);
      const updated = await fetchIndexedDocuments();
      setIndexedDocs(updated);
    } catch (err: any) {
      addLog(`[ERROR] Re-sync failed: ${err.message}`);
    } finally {
      setIsIngesting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Ingestion Form Card */}
      <div
        className="p-6 md:p-8 rounded-sm border"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-mono-label text-sm uppercase tracking-widest" style={{ color: "var(--ink)" }}>
              &gt; Ingest GitHub Repository //
            </h3>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Extracts raw Markdown README, vectorizes into 384d semantic embeddings, and stores in Supabase pgvector.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-sm text-[10px] font-mono-label uppercase tracking-wider border"
              style={{ borderColor: "var(--border)", color: "var(--accent)", backgroundColor: "var(--bg)" }}>
              Model: BAAI/bge-small-en-v1.5
            </span>
          </div>
        </div>

        <form onSubmit={handleIngest} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Repo Selection */}
            <div className="space-y-2">
              <label className="font-mono-label block text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                Select Repository ({loadingRepos ? "Loading..." : `${repos.length} Available`})
              </label>
              <select
                className="w-full font-mono-label text-xs rounded-sm border px-3 py-3 outline-none transition-all cursor-pointer"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
                value={selectedRepo}
                onChange={(e) => {
                  setSelectedRepo(e.target.value);
                  const match = repos.find((r) => r.full_name === e.target.value);
                  if (match) setCustomSlug(match.name);
                }}
                disabled={loadingRepos || isIngesting}
              >
                {repos.map((r) => (
                  <option key={r.id} value={r.full_name}>
                    {r.private ? "🔒" : "🌐"} {r.full_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Slug */}
            <div className="space-y-2">
              <label className="font-mono-label block text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                Project Slug (Vector Identifier in DB)
              </label>
              <input
                type="text"
                placeholder="e.g. HaqDar, Schema-Aware SQL Agent"
                className="w-full font-mono-label text-xs rounded-sm border px-3 py-3 outline-none"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                disabled={isIngesting}
                required
              />
            </div>
          </div>

          {/* Selected Repo Details Pill */}
          {selectedRepoObj && (
            <div
              className="p-3 rounded-sm border text-xs font-mono-label flex flex-wrap items-center justify-between gap-2"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${selectedRepoObj.private ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}>
                  {selectedRepoObj.private ? "Private Repo" : "Public Repo"}
                </span>
                <span style={{ color: "var(--ink)" }}>{selectedRepoObj.full_name}</span>
              </div>
              <span className="text-[11px] truncate max-w-md" style={{ color: "var(--muted)" }}>
                {selectedRepoObj.description}
              </span>
            </div>
          )}

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={isIngesting || loadingRepos || !selectedRepo}
              className="w-full sm:w-auto font-mono-label relative overflow-hidden rounded-sm border px-6 py-3 text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)", color: "var(--accent)" }}
            >
              {isIngesting ? (
                <>
                  <span className="inline-block h-3 w-3 rounded-full border-2 border-t-transparent border-emerald-400 animate-spin"></span>
                  <span>Vectorizing & Ingesting...</span>
                </>
              ) : (
                <span>[ Ingest & Store in pgvector ]</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Live Terminal Output Feed */}
      <div
        className="rounded-sm border overflow-hidden"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
      >
        <div
          className="flex items-center justify-between px-4 py-2 border-b"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)" }}></div>
            <span className="font-mono-label text-[11px] uppercase tracking-wider" style={{ color: "var(--ink)" }}>
              Live Ingestion Feed //
            </span>
          </div>
          <button
            onClick={() => setLogs(["[SYSTEM] Log cleared."])}
            className="font-mono-label text-[10px] uppercase tracking-wider transition-colors hover:text-white"
            style={{ color: "var(--muted)" }}
          >
            Clear Log
          </button>
        </div>
        <div className="p-4 font-mono text-xs space-y-1 max-h-48 overflow-y-auto" style={{ color: "var(--ink)" }}>
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={
                log.includes("[SUCCESS]")
                  ? "text-emerald-400"
                  : log.includes("[ERROR]")
                  ? "text-red-400"
                  : log.includes("[WARN]")
                  ? "text-amber-400"
                  : "opacity-80"
              }
            >
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Currently Indexed Vector Documents Table */}
      <div
        className="p-6 md:p-8 rounded-sm border"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-mono-label text-sm uppercase tracking-widest" style={{ color: "var(--ink)" }}>
              &gt; Knowledge Base Index ({indexedDocs.length} Repositories Indexed)
            </h3>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Active vector chunks stored in Supabase pgvector used by the terminal AI assistant.
            </p>
          </div>
          <button
            onClick={async () => {
              const updated = await fetchIndexedDocuments();
              setIndexedDocs(updated);
              addLog(`[REFRESH] Updated knowledge base summary.`);
            }}
            className="font-mono-label text-[11px] uppercase tracking-wider px-3 py-1.5 border rounded-sm transition-colors cursor-pointer hover:bg-white/[0.02]"
            style={{ borderColor: "var(--border)", color: "var(--ink)" }}
          >
            Refresh List
          </button>
        </div>

        {indexedDocs.length === 0 ? (
          <div className="text-center py-10 border border-dashed rounded-sm" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono-label text-xs" style={{ color: "var(--muted)" }}>
              No repositories currently indexed in pgvector. Use the form above to ingest your first repository.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {indexedDocs.map((doc) => (
              <div
                key={doc.slug}
                className="p-4 rounded-sm border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-label text-xs font-semibold" style={{ color: "var(--ink)" }}>
                      {doc.slug}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-sm text-[10px] font-mono-label uppercase tracking-wider"
                      style={{ backgroundColor: "rgba(142, 182, 155, 0.15)", color: "var(--accent)" }}
                    >
                      {doc.chunkCount} Vector Chunks
                    </span>
                  </div>
                  {doc.sample && (
                    <p className="text-[11px] line-clamp-1 opacity-70" style={{ color: "var(--muted)" }}>
                      Preview: {doc.sample}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuickReingest(doc.slug)}
                    disabled={isIngesting}
                    className="font-mono-label text-[11px] uppercase tracking-wider px-3 py-1.5 border rounded-sm transition-colors cursor-pointer hover:bg-white/[0.02]"
                    style={{ borderColor: "var(--border)", color: "var(--accent)" }}
                  >
                    Re-Sync
                  </button>
                  <button
                    onClick={() => handleDelete(doc.slug)}
                    disabled={isIngesting}
                    className="font-mono-label text-[11px] uppercase tracking-wider px-3 py-1.5 border rounded-sm text-red-500 border-red-500/30 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    Purge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
