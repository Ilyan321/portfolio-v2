"use client";

import { useState } from "react";
import { saveSiteConfig } from "@/app/admin/actions";

export type StatItem = {
  value: string;
  label: string;
};

export type TechGroup = {
  group: string;
  items: string[];
};

export function SkillsAdmin({
  initialStats,
  initialTechStack,
}: {
  initialStats: StatItem[];
  initialTechStack: TechGroup[];
}) {
  const [stats, setStats] = useState<StatItem[]>(initialStats);
  const [techStack, setTechStack] = useState<TechGroup[]>(initialTechStack);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Group add state
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupItems, setNewGroupItems] = useState("");

  function handleAddStat() {
    setStats([...stats, { value: "New", label: "Metric Label" }]);
  }

  function handleRemoveStat(index: number) {
    setStats(stats.filter((_, i) => i !== index));
  }

  function handleAddGroup() {
    if (!newGroupName.trim()) return;
    const items = newGroupItems
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setTechStack([...techStack, { group: newGroupName.trim(), items }]);
    setNewGroupName("");
    setNewGroupItems("");
  }

  function handleRemoveGroup(index: number) {
    setTechStack(techStack.filter((_, i) => i !== index));
  }

  async function handleSaveAll() {
    setIsSaving(true);
    setStatusMsg(null);

    try {
      const [resStats, resTech] = await Promise.all([
        saveSiteConfig("stats", stats),
        saveSiteConfig("tech_stack", techStack),
      ]);

      if (!resStats.success || !resTech.success) {
        setStatusMsg({
          type: "error",
          text: `Save failed: ${resStats.error || resTech.error || "Unknown error"}`,
        });
      } else {
        setStatusMsg({
          type: "success",
          text: "Skills & Benchmark Metrics updated live on homepage!",
        });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save skills." });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatusMsg(null), 5000);
    }
  }

  return (
    <div className="space-y-8 font-body">
      {/* 1. Highlight Metrics Badges */}
      <div
        className="p-6 md:p-8 rounded-sm border space-y-6"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--border)" }}>
          <div>
            <h3 className="font-mono-label text-sm uppercase tracking-widest" style={{ color: "var(--ink)" }}>
              &gt; Hero Benchmark Metric Badges //
            </h3>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Key engineering metrics and impact statistics displayed beneath your hero introduction.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddStat}
            className="font-mono-label text-[11px] uppercase tracking-wider px-3 py-1.5 border rounded-sm transition-colors cursor-pointer hover:bg-white/[0.02] self-start sm:self-auto"
            style={{ borderColor: "var(--border)", color: "var(--accent)" }}
          >
            + Add Metric
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-sm border space-y-3 relative group"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono-label text-[10px] uppercase tracking-wider opacity-60" style={{ color: "var(--muted)" }}>
                  Metric #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveStat(idx)}
                  className="text-red-400 hover:text-red-500 font-mono text-xs cursor-pointer px-1"
                  title="Remove Metric"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1">
                <label className="font-mono-label block text-[9px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                  Value / Stat
                </label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const copy = [...stats];
                    copy[idx].value = e.target.value;
                    setStats(copy);
                  }}
                  placeholder="e.g. 99.05% / < 50ms"
                  className="w-full font-mono text-xs rounded-sm border p-2 outline-none focus:border-emerald-500"
                  style={{ backgroundColor: "var(--panel)", borderColor: "var(--border)", color: "var(--ink)" }}
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono-label block text-[9px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                  Label
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const copy = [...stats];
                    copy[idx].label = e.target.value;
                    setStats(copy);
                  }}
                  placeholder="e.g. Benchmark Accuracy"
                  className="w-full font-body text-xs rounded-sm border p-2 outline-none focus:border-emerald-500"
                  style={{ backgroundColor: "var(--panel)", borderColor: "var(--border)", color: "var(--ink)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Core Tech Stack Groups */}
      <div
        className="p-6 md:p-8 rounded-sm border space-y-6"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
      >
        <div className="border-b pb-4" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-mono-label text-sm uppercase tracking-widest" style={{ color: "var(--ink)" }}>
            &gt; Tech Stack & Competencies //
          </h3>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Categorized technical skills rendered in the skills section and used in the terminal assistant.
          </p>
        </div>

        <div className="space-y-4">
          {techStack.map((group, idx) => (
            <div
              key={idx}
              className="p-5 rounded-sm border space-y-3"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="font-mono-label text-xs uppercase tracking-wider text-emerald-500 font-semibold">
                    0{idx + 1} //
                  </span>
                  <input
                    type="text"
                    value={group.group}
                    onChange={(e) => {
                      const copy = [...techStack];
                      copy[idx].group = e.target.value;
                      setTechStack(copy);
                    }}
                    className="font-mono-label text-xs rounded-sm border px-3 py-1.5 outline-none focus:border-emerald-500 font-semibold"
                    style={{ backgroundColor: "var(--panel)", borderColor: "var(--border)", color: "var(--ink)" }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveGroup(idx)}
                  className="font-mono-label text-[10px] uppercase tracking-wider px-2.5 py-1 border rounded-sm text-red-500 border-red-500/30 hover:bg-red-500/10 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Delete Group
                </button>
              </div>

              <div className="space-y-1">
                <label className="font-mono-label block text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                  Skills & Tools in Group (comma separated)
                </label>
                <input
                  type="text"
                  value={group.items.join(", ")}
                  onChange={(e) => {
                    const items = e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean);
                    const copy = [...techStack];
                    copy[idx].items = items;
                    setTechStack(copy);
                  }}
                  className="w-full font-body text-xs rounded-sm border p-3 outline-none focus:border-emerald-500"
                  style={{ backgroundColor: "var(--panel)", borderColor: "var(--border)", color: "var(--ink)" }}
                />
              </div>

              {/* Tag previews */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {group.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className="font-mono-label text-[10px] border px-2 py-0.5 rounded-sm"
                    style={{ borderColor: "var(--border)", color: "var(--muted)", backgroundColor: "var(--panel)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add New Group Box */}
        <div
          className="p-5 rounded-sm border border-dashed space-y-4"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
        >
          <span className="font-mono-label text-xs uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            + Create New Tech Category
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Group Name (e.g. DevOps & Cloud)"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full font-body text-xs rounded-sm border p-3 outline-none focus:border-emerald-500"
                style={{ backgroundColor: "var(--panel)", borderColor: "var(--border)", color: "var(--ink)" }}
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <input
                type="text"
                placeholder="Items (comma separated: Docker, Kubernetes, AWS)"
                value={newGroupItems}
                onChange={(e) => setNewGroupItems(e.target.value)}
                className="w-full font-body text-xs rounded-sm border p-3 outline-none focus:border-emerald-500"
                style={{ backgroundColor: "var(--panel)", borderColor: "var(--border)", color: "var(--ink)" }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddGroup}
            disabled={!newGroupName.trim()}
            className="font-mono-label text-xs uppercase tracking-widest px-4 py-2 border rounded-sm transition-colors cursor-pointer disabled:opacity-40"
            style={{ borderColor: "var(--border)", color: "var(--ink)", backgroundColor: "var(--panel)" }}
          >
            Add Category Group
          </button>
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
          type="button"
          onClick={handleSaveAll}
          disabled={isSaving}
          className="w-full sm:w-auto font-mono-label relative overflow-hidden rounded-sm border px-8 py-3.5 text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--accent)", color: "var(--bg)" }}
        >
          {isSaving ? "Saving Live Changes..." : "[ Save Skills & Metrics ]"}
        </button>
      </div>
    </div>
  );
}
