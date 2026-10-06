"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSiteConfig } from "@/app/admin/actions";

export type DiagnosticItem = {
  term: string;
  value: string;
};

export type SpotlightStat = {
  label: string;
  sub: string;
};

export type ResearchSpotlightData = {
  eyebrow: string;
  title: string;
  description: string;
  stats: SpotlightStat[];
  stackTags: string[];
  link: string;
  huggingFaceLink?: string;
  diagnostics: DiagnosticItem[];
};

export function SpotlightAdmin({ initialSpotlight }: { initialSpotlight: ResearchSpotlightData }) {
  const router = useRouter();
  const [spotlight, setSpotlight] = useState<ResearchSpotlightData>(initialSpotlight);
  const [tagsStr, setTagsStr] = useState<string>((initialSpotlight.stackTags || []).join(", "));
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg(null);

    const parsedTags = tagsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...spotlight,
      stackTags: parsedTags,
    };

    try {
      const res = await saveSiteConfig("spotlight", payload);
      if (!res.success) {
        setStatusMsg({ type: "error", text: `Save failed: ${res.error}` });
      } else {
        setStatusMsg({ type: "success", text: "Research Spotlight updated live on homepage!" });
        router.refresh();
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save spotlight." });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatusMsg(null), 5000);
    }
  }

  function handleAddDiagnostic() {
    setSpotlight({
      ...spotlight,
      diagnostics: [...spotlight.diagnostics, { term: "New Parameter", value: "Parameter specification" }],
    });
  }

  function handleRemoveDiagnostic(index: number) {
    setSpotlight({
      ...spotlight,
      diagnostics: spotlight.diagnostics.filter((_, i) => i !== index),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-body">
      <div
        className="p-6 md:p-8 rounded-sm border space-y-6"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
      >
        <div className="border-b pb-4" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-mono-label text-sm uppercase tracking-widest" style={{ color: "var(--ink)" }}>
            &gt; Featured Research Architecture Spotlight //
          </h3>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            The flagship research deep-dive banner showcased on your homepage.
          </p>
        </div>

        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Eyebrow Tagline
          </label>
          <input
            type="text"
            required
            value={spotlight.eyebrow}
            onChange={(e) => setSpotlight({ ...spotlight, eyebrow: e.target.value })}
            className="w-full font-mono text-xs rounded-sm border p-3 outline-none focus:border-emerald-500 uppercase tracking-wider"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>

        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Architecture Title
          </label>
          <input
            type="text"
            required
            value={spotlight.title}
            onChange={(e) => setSpotlight({ ...spotlight, title: e.target.value })}
            className="w-full font-display text-sm rounded-sm border p-3 outline-none focus:border-emerald-500"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>

        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Detailed Description
          </label>
          <textarea
            required
            rows={3}
            value={spotlight.description}
            onChange={(e) => setSpotlight({ ...spotlight, description: e.target.value })}
            className="w-full font-body text-xs rounded-sm border p-3 outline-none focus:border-emerald-500 leading-relaxed"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              GitHub Repository URL
            </label>
            <input
              type="url"
              value={spotlight.link}
              onChange={(e) => setSpotlight({ ...spotlight, link: e.target.value })}
              className="w-full font-mono text-xs rounded-sm border p-3 outline-none focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Hugging Face Model / Space URL
            </label>
            <input
              type="url"
              value={spotlight.huggingFaceLink || ""}
              onChange={(e) => setSpotlight({ ...spotlight, huggingFaceLink: e.target.value })}
              className="w-full font-mono text-xs rounded-sm border p-3 outline-none focus:border-emerald-500"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Stack Tags (comma separated)
          </label>
          <input
            type="text"
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            className="w-full font-body text-xs rounded-sm border p-3 outline-none focus:border-emerald-500"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>

        {/* 3 Metrics */}
        <div className="space-y-3 pt-2">
          <label className="font-mono-label text-[10px] uppercase tracking-widest block" style={{ color: "var(--muted)" }}>
            Architecture Performance Badges (3 stats)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(spotlight.stats || []).map((s, idx) => (
              <div
                key={idx}
                className="p-3 rounded-sm border space-y-2"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
              >
                <input
                  type="text"
                  value={s.label}
                  onChange={(e) => {
                    const copy = [...spotlight.stats];
                    copy[idx].label = e.target.value;
                    setSpotlight({ ...spotlight, stats: copy });
                  }}
                  placeholder="e.g. 100%"
                  className="w-full font-mono text-xs font-semibold rounded-sm border p-2 outline-none focus:border-emerald-500 text-emerald-500"
                  style={{ backgroundColor: "var(--panel)", borderColor: "var(--border)" }}
                />
                <input
                  type="text"
                  value={s.sub}
                  onChange={(e) => {
                    const copy = [...spotlight.stats];
                    copy[idx].sub = e.target.value;
                    setSpotlight({ ...spotlight, stats: copy });
                  }}
                  placeholder="e.g. AST mutation safety"
                  className="w-full font-body text-xs rounded-sm border p-2 outline-none focus:border-emerald-500"
                  style={{ backgroundColor: "var(--panel)", borderColor: "var(--border)", color: "var(--ink)" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostics Specs */}
        <div className="space-y-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Diagnostic Key-Value Specifications
            </label>
            <button
              type="button"
              onClick={handleAddDiagnostic}
              className="font-mono-label text-[10px] uppercase tracking-wider px-2.5 py-1 border rounded-sm transition-colors cursor-pointer hover:bg-white/[0.02]"
              style={{ borderColor: "var(--border)", color: "var(--accent)" }}
            >
              + Add Spec Row
            </button>
          </div>

          <div className="space-y-2">
            {(spotlight.diagnostics || []).map((diag, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={diag.term}
                  onChange={(e) => {
                    const copy = [...spotlight.diagnostics];
                    copy[idx].term = e.target.value;
                    setSpotlight({ ...spotlight, diagnostics: copy });
                  }}
                  placeholder="Term / Spec Key"
                  className="w-full sm:w-1/3 font-mono text-xs rounded-sm border p-2.5 outline-none focus:border-emerald-500 font-semibold"
                  style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
                />
                <input
                  type="text"
                  value={diag.value}
                  onChange={(e) => {
                    const copy = [...spotlight.diagnostics];
                    copy[idx].value = e.target.value;
                    setSpotlight({ ...spotlight, diagnostics: copy });
                  }}
                  placeholder="Value / Description"
                  className="w-full sm:w-2/3 font-body text-xs rounded-sm border p-2.5 outline-none focus:border-emerald-500"
                  style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDiagnostic(idx)}
                  className="font-mono text-xs px-2.5 py-2 border rounded-sm text-red-500 border-red-500/30 hover:bg-red-500/10 cursor-pointer self-end sm:self-auto"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Action Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div>
          {statusMsg && (
            <span
              className={`font-mono-label text-xs uppercase tracking-wider ${
                statusMsg.type === "success" ? "text-emerald-500 font-semibold" : "text-red-500"
              }`}
            >
              {statusMsg.type === "success" ? "✓ " : "✕ "}
              {statusMsg.text}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="w-full sm:w-auto font-mono-label relative overflow-hidden rounded-sm border px-8 py-3.5 text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--accent)", color: "var(--bg)" }}
        >
          {isSaving ? "Saving Live Changes..." : "[ Save Research Spotlight ]"}
        </button>
      </div>
    </form>
  );
}
