"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { updateExperiencePositions, deleteExperience, createExperience, updateExperience } from "@/app/admin/actions";

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  current?: boolean;
  description: string;
  skills: string[];
  position?: number;
};

export function ExperienceAdmin({ initialExperience }: { initialExperience: ExperienceItem[] }) {
  const router = useRouter();
  const [experienceList, setExperienceList] = useState<ExperienceItem[]>(initialExperience);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("Remote");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [skillsStr, setSkillsStr] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setExperienceList((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        const newArray = arrayMove(items, oldIndex, newIndex);

        const updates = newArray.map((item, index) => ({ id: item.id, position: index }));
        updateExperiencePositions(updates);
        return newArray;
      });
    }
  }

  function startAdding() {
    setIsAdding(true);
    setEditingId(null);
    setStatusMsg(null);
    setRole("");
    setCompany("");
    setPeriod("");
    setLocation("Remote");
    setCurrent(false);
    setDescription("");
    setSkillsStr("");
  }

  function startEditing(item: ExperienceItem) {
    setIsAdding(false);
    setStatusMsg(null);
    setEditingId(item.id);
    setRole(item.role);
    setCompany(item.company);
    setPeriod(item.period);
    setLocation(item.location || "Remote");
    setCurrent(!!item.current);
    setDescription(item.description);
    setSkillsStr((item.skills || []).join(", "));
  }

  function cancelEdit() {
    setEditingId(null);
    setIsAdding(false);
  }

  async function handleSave(e: React.FormEvent, id?: string) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg(null);

    const parsedSkills = skillsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      role,
      company,
      period,
      location,
      current,
      description,
      skills: parsedSkills,
    };

    try {
      if (id) {
        const res = await updateExperience(id, payload);
        if (res && res.success && res.experience) {
          setExperienceList(experienceList.map((item) => (item.id === id ? res.experience : item)));
          setStatusMsg({ type: "success", text: "Role updated successfully!" });
          setEditingId(null);
          router.refresh();
        } else if (res && !res.success) {
          setStatusMsg({ type: "error", text: `Update failed: ${res.error}` });
        } else {
          // fallback if direct object returned
          setExperienceList(experienceList.map((item) => (item.id === id ? { ...item, ...payload } : item)));
          setStatusMsg({ type: "success", text: "Role updated successfully!" });
          setEditingId(null);
          router.refresh();
        }
      } else {
        const res = await createExperience({ ...payload, position: experienceList.length });
        if (res && res.success && res.experience) {
          setExperienceList([...experienceList, res.experience]);
          setStatusMsg({ type: "success", text: "New role created successfully!" });
          setIsAdding(false);
          router.refresh();
        } else if (res && !res.success) {
          setStatusMsg({ type: "error", text: `Creation failed: ${res.error}` });
        } else {
          setExperienceList([...experienceList, { id: `exp-${Date.now()}`, ...payload, position: experienceList.length }]);
          setStatusMsg({ type: "success", text: "New role created successfully!" });
          setIsAdding(false);
          router.refresh();
        }
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save experience." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMsg(null), 4000);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this experience entry?")) {
      const res = await deleteExperience(id);
      if (res && !res.success) {
        setStatusMsg({ type: "error", text: `Delete failed: ${res.error}` });
      } else {
        setExperienceList(experienceList.filter((item) => item.id !== id));
        setStatusMsg({ type: "success", text: "Experience entry removed." });
        router.refresh();
      }
      setTimeout(() => setStatusMsg(null), 4000);
    }
  }

  const renderForm = (id?: string) => (
    <form
      onSubmit={(e) => handleSave(e, id)}
      className="p-6 rounded-sm border space-y-4"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Job Title / Role
          </label>
          <input
            type="text"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. AI Intern / Full-Stack Engineer"
            className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>

        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Company / Organization
          </label>
          <input
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. FlyRank AI"
            className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Period / Timeline
          </label>
          <input
            type="text"
            required
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            placeholder="e.g. Jun 2026 – Present"
            className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>

        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Remote / City, Country"
            className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>

        <div className="flex items-center gap-2 pt-6">
          <input
            type="checkbox"
            id="currentRole"
            checked={current}
            onChange={(e) => setCurrent(e.target.checked)}
            className="cursor-pointer h-4 w-4 rounded accent-emerald-500"
          />
          <label htmlFor="currentRole" className="font-mono-label text-xs uppercase tracking-wider cursor-pointer" style={{ color: "var(--ink)" }}>
            Current Active Role
          </label>
        </div>
      </div>

      <div className="space-y-1">
        <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          Role Description / Key Achievements
        </label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your technical contributions, models fine-tuned, or systems built..."
          className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500 leading-relaxed"
          style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
        />
      </div>

      <div className="space-y-1">
        <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          Skills & Tech Used (comma separated)
        </label>
        <input
          type="text"
          value={skillsStr}
          onChange={(e) => setSkillsStr(e.target.value)}
          placeholder="Python, FastAPI, PyTorch, LoRA, Docker"
          className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
          style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
        />
      </div>

      <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="font-mono-label text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-colors cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
        >
          {isSubmitting ? "Saving..." : id ? "Update Role" : "Save Role"}
        </button>
        <button
          type="button"
          onClick={cancelEdit}
          className="font-mono-label text-xs uppercase tracking-widest px-6 py-3 border rounded-sm transition-colors cursor-pointer"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div className="font-body space-y-6">
      {statusMsg && (
        <div className="p-3 rounded-sm border bg-panel">
          <span
            className={`font-mono-label text-xs uppercase tracking-wider ${
              statusMsg.type === "success" ? "text-emerald-500 font-semibold" : "text-red-500"
            }`}
          >
            {statusMsg.type === "success" ? "✓ " : "✕ "}
            {statusMsg.text}
          </span>
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={experienceList} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {experienceList.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                {editingId === item.id ? (
                  renderForm(item.id)
                ) : (
                  <div
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 rounded-sm border w-full min-w-0 gap-4"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
                  >
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-display text-lg break-words" style={{ color: "var(--ink)" }}>
                          {item.role} <span className="text-xs font-mono font-normal opacity-70" style={{ color: "var(--muted)" }}>@ {item.company}</span>
                        </h3>
                        {item.current && (
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-mono-label uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          >
                            Active
                          </span>
                        )}
                      </div>
                      <p className="font-mono-label text-xs uppercase tracking-wider mt-1 opacity-80" style={{ color: "var(--muted)" }}>
                        {item.period} · {item.location || "Remote"}
                      </p>
                      <p className="text-xs mt-2 break-words leading-relaxed" style={{ color: "var(--ink)" }}>
                        {item.description}
                      </p>
                      {item.skills && item.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {item.skills.map((s, idx) => (
                            <span
                              key={idx}
                              className="font-mono-label text-[10px] border px-2 py-0.5 rounded-sm"
                              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex gap-2 self-start sm:self-center">
                      <button
                        onClick={() => startEditing(item)}
                        className="font-mono-label text-xs uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 border rounded-sm transition-colors cursor-pointer hover:bg-white/[0.02]"
                        style={{ borderColor: "var(--border)", color: "var(--ink)" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="font-mono-label text-xs uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 border rounded-sm text-red-500 border-red-500/30 hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {isAdding ? (
        renderForm()
      ) : (
        <button
          onClick={startAdding}
          className="w-full font-mono-label text-xs uppercase tracking-widest px-4 py-4 border border-dashed rounded-sm transition-colors cursor-pointer"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--muted)";
          }}
        >
          + Add New Experience Entry
        </button>
      )}
    </div>
  );
}
