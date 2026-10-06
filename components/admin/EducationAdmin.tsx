"use client";

import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { updateEducationPositions, deleteEducation, createEducation, updateEducation } from "@/app/admin/actions";

export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  details?: string;
  position?: number;
};

export function EducationAdmin({ initialEducation }: { initialEducation: EducationItem[] }) {
  const [eduList, setEduList] = useState<EducationItem[]>(initialEducation);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setEduList((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        const newArray = arrayMove(items, oldIndex, newIndex);

        const updates = newArray.map((item, index) => ({ id: item.id, position: index }));
        updateEducationPositions(updates);
        return newArray;
      });
    }
  }

  function startAdding() {
    setIsAdding(true);
    setEditingId(null);
    setInstitution("");
    setDegree("");
    setPeriod("");
    setLocation("Nawabshah, Sindh, Pakistan");
    setDetails("");
  }

  function startEditing(item: EducationItem) {
    setIsAdding(false);
    setEditingId(item.id);
    setInstitution(item.institution);
    setDegree(item.degree);
    setPeriod(item.period);
    setLocation(item.location);
    setDetails(item.details || "");
  }

  function cancelEdit() {
    setEditingId(null);
    setIsAdding(false);
  }

  async function handleSave(e: React.FormEvent, id?: string) {
    e.preventDefault();

    const payload = {
      institution,
      degree,
      period,
      location,
      details,
    };

    if (id) {
      const updated = await updateEducation(id, payload);
      if (updated) {
        setEduList(eduList.map((item) => (item.id === id ? updated : item)));
      }
      setEditingId(null);
    } else {
      const created = await createEducation({ ...payload, position: eduList.length });
      if (created) {
        setEduList([...eduList, created]);
      }
      setIsAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this education entry?")) {
      await deleteEducation(id);
      setEduList(eduList.filter((item) => item.id !== id));
    }
  }

  const renderForm = (id?: string) => (
    <form
      onSubmit={(e) => handleSave(e, id)}
      className="p-6 rounded-sm border space-y-4"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
    >
      <div className="space-y-1">
        <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          Institution / University
        </label>
        <input
          type="text"
          required
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          placeholder="e.g. Quaid-e-Awam University (QUEST)"
          className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
          style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
        />
      </div>

      <div className="space-y-1">
        <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          Degree / Major
        </label>
        <input
          type="text"
          required
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          placeholder="e.g. Bachelor of Engineering in Computer Systems Engineering"
          className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
          style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Period / Graduation Year
          </label>
          <input
            type="text"
            required
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            placeholder="e.g. Oct 2024 – Oct 2028 (Expected)"
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
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Nawabshah, Sindh, Pakistan"
            className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
          Details / Highlights / GPA
        </label>
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="e.g. 2nd Year Student · 4th Semester GPA: 3.50"
          className="w-full font-body text-xs rounded-sm border p-3 outline-none transition-all focus:border-emerald-500"
          style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }}
        />
      </div>

      <div className="flex gap-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          type="submit"
          className="font-mono-label text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-colors cursor-pointer"
          style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
        >
          {id ? "Update Education" : "Save Education"}
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
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={eduList} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {eduList.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                {editingId === item.id ? (
                  renderForm(item.id)
                ) : (
                  <div
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 rounded-sm border w-full min-w-0 gap-4"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
                  >
                    <div className="flex-1 min-w-0 w-full">
                      <h3 className="font-display text-lg break-words" style={{ color: "var(--ink)" }}>
                        {item.institution}
                      </h3>
                      <p className="font-mono-label text-xs uppercase tracking-wider mt-1 text-emerald-500 font-medium">
                        {item.degree}
                      </p>
                      <p className="font-mono-label text-xs tracking-wider uppercase mt-1 opacity-80" style={{ color: "var(--muted)" }}>
                        {item.period} · {item.location}
                      </p>
                      {item.details && (
                        <p className="text-xs mt-2 break-words" style={{ color: "var(--muted)" }}>
                          {item.details}
                        </p>
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
          + Add New Education Credential
        </button>
      )}
    </div>
  );
}
