"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { updateProjectPositions, deleteProject, createProject, updateProject, toggleProjectVisibility } from "@/app/admin/actions";

export function ProjectsAdmin({ initialProjects }: { initialProjects: any[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [newTitle, setNewTitle] = useState("");
  const [newTagline, setNewTagline] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newGithub, setNewGithub] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newHidden, setNewHidden] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        
        const updates = newArray.map((item, index) => ({ id: item.id, position: index }));
        updateProjectPositions(updates);
        return newArray;
      });
    }
  }

  function startAdding() {
    setIsAdding(true);
    setEditingId(null);
    setStatusMsg(null);
    setNewTitle("");
    setNewTagline("");
    setNewDesc("");
    setNewLink("");
    setNewGithub("");
    setNewTags("");
    setNewHidden(false);
  }

  function startEditing(p: any) {
    setIsAdding(false);
    setStatusMsg(null);
    setEditingId(p.id);
    
    let titleStr = p.title || "";
    let taglineStr = "";
    if (titleStr.includes("|||")) {
      const parts = titleStr.split("|||").map((s: string) => s.trim());
      titleStr = parts[0] || "";
      taglineStr = parts[1] || "";
    }
    
    setNewTitle(titleStr);
    setNewTagline(taglineStr);
    setNewDesc(p.description);
    setNewLink(p.link || "");
    setNewGithub(p.github || "");
    setNewTags(p.tags ? p.tags.join(", ") : "");
    setNewHidden(!!p.hidden);
  }

  function cancelEdit() {
    setEditingId(null);
    setIsAdding(false);
  }

  async function handleToggleHide(id: string, currentHidden: boolean) {
    const nextHidden = !currentHidden;
    setProjects(projects.map(p => p.id === id ? { ...p, hidden: nextHidden } : p));
    const res = await toggleProjectVisibility(id, nextHidden);
    if (res && res.success) {
      setStatusMsg({ type: "success", text: nextHidden ? "Project hidden from public view." : "Project is now visible on public portfolio." });
      router.refresh();
    } else {
      setStatusMsg({ type: "error", text: `Visibility toggle failed: ${res?.error}` });
    }
    setTimeout(() => setStatusMsg(null), 3000);
  }

  async function handleSave(e: React.FormEvent, id?: string) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg(null);

    const tagArray = newTags.split(",").map(t => t.trim()).filter(Boolean);
    const combinedTitle = newTagline ? `${newTitle} ||| ${newTagline}` : newTitle;
    
    const data = { 
      title: combinedTitle, 
      description: newDesc, 
      link: newLink, 
      github: newGithub,
      tags: tagArray,
      hidden: newHidden
    };

    try {
      if (id) {
        const res = await updateProject(id, data);
        if (res && res.success && res.project) {
          setProjects(projects.map(p => p.id === id ? { ...res.project, hidden: newHidden } : p));
          setStatusMsg({ type: "success", text: "Project updated successfully!" });
          setEditingId(null);
          router.refresh();
        } else if (res && !res.success) {
          setStatusMsg({ type: "error", text: `Update failed: ${res.error}` });
        } else {
          setProjects(projects.map(p => p.id === id ? { ...p, ...data } : p));
          setStatusMsg({ type: "success", text: "Project updated successfully!" });
          setEditingId(null);
          router.refresh();
        }
      } else {
        const res = await createProject({ ...data, position: projects.length });
        if (res && res.success && res.project) {
          setProjects([...projects, { ...res.project, hidden: newHidden }]);
          setStatusMsg({ type: "success", text: "New project added successfully!" });
          setIsAdding(false);
          router.refresh();
        } else if (res && !res.success) {
          setStatusMsg({ type: "error", text: `Creation failed: ${res.error}` });
        } else {
          setProjects([...projects, { id: `proj-${Date.now()}`, ...data, position: projects.length }]);
          setStatusMsg({ type: "success", text: "New project added successfully!" });
          setIsAdding(false);
          router.refresh();
        }
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save project." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMsg(null), 4000);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this project?")) {
      const res = await deleteProject(id);
      if (res && !res.success) {
        setStatusMsg({ type: "error", text: `Delete failed: ${res.error}` });
      } else {
        setProjects(projects.filter(p => p.id !== id));
        setStatusMsg({ type: "success", text: "Project removed." });
        router.refresh();
      }
      setTimeout(() => setStatusMsg(null), 4000);
    }
  }

  const renderForm = (id?: string) => (
    <form onSubmit={(e) => handleSave(e, id)} className="p-6 rounded-sm border space-y-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Title</label>
          <input type="text" required value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full font-body text-sm rounded-sm border p-3 outline-none transition-all focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
        </div>
        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Tagline</label>
          <input type="text" value={newTagline} onChange={e => setNewTagline(e.target.value)} placeholder="e.g. AUTONOMOUS NLP-TO-SQL..." className="w-full font-body text-sm rounded-sm border p-3 outline-none transition-all focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
        </div>
      </div>
      <div className="space-y-1">
        <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Description</label>
        <textarea required value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full font-body text-sm rounded-sm border p-3 outline-none transition-all focus:border-emerald-500 min-h-[100px]" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
      </div>
      <div className="space-y-1">
        <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Tags (comma separated)</label>
        <input type="text" value={newTags} onChange={e => setNewTags(e.target.value)} placeholder="React, Node, Typescript" className="w-full font-body text-sm rounded-sm border p-3 outline-none transition-all focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Live URL</label>
          <input type="text" value={newLink} onChange={e => setNewLink(e.target.value)} className="w-full font-body text-sm rounded-sm border p-3 outline-none transition-all focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
        </div>
        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>GitHub URL</label>
          <input type="text" value={newGithub} onChange={e => setNewGithub(e.target.value)} className="w-full font-body text-sm rounded-sm border p-3 outline-none transition-all focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <input 
          type="checkbox" 
          id="project-hidden" 
          checked={newHidden} 
          onChange={e => setNewHidden(e.target.checked)} 
          className="rounded border-border accent-accent h-4 w-4 cursor-pointer"
        />
        <label htmlFor="project-hidden" className="font-mono-label text-xs uppercase tracking-wider cursor-pointer" style={{ color: "var(--muted)" }}>
          Hide from public portfolio (keep in admin)
        </label>
      </div>
      
      <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="font-mono-label text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-colors cursor-pointer disabled:opacity-50" 
          style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
        >
          {isSubmitting ? "Saving..." : id ? "Update Project" : "Save Project"}
        </button>
        <button type="button" onClick={cancelEdit} className="font-mono-label text-xs uppercase tracking-widest px-6 py-3 border rounded-sm transition-colors cursor-pointer" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>Cancel</button>
      </div>
    </form>
  );

  return (
    <div className="font-body">
      {statusMsg && (
        <div className="p-3 mb-4 rounded-sm border bg-panel">
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
        <SortableContext items={projects} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 mb-6">
            {projects.map((project) => {
              let titleStr = project.title || "";
              let taglineStr = "";
              if (titleStr.includes("|||")) {
                const parts = titleStr.split("|||").map((s: string) => s.trim());
                titleStr = parts[0] || "";
                taglineStr = parts[1] || "";
              }

              const isHidden = !!project.hidden;

              return (
                <SortableItem key={project.id} id={project.id}>
                  {editingId === project.id ? (
                    renderForm(project.id)
                  ) : (
                    <div 
                      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 rounded-sm border w-full min-w-0 gap-4 transition-opacity ${isHidden ? "opacity-60 bg-amber-500/[0.03]" : ""}`}
                      style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
                    >
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-display text-lg break-words" style={{ color: "var(--ink)" }}>{titleStr}</h3>
                          {taglineStr && (
                            <span className="font-mono-label text-xs uppercase tracking-wider break-words" style={{ color: "var(--muted)" }}>{taglineStr}</span>
                          )}
                          {isHidden && (
                            <span className="font-mono-label text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                              Hidden
                            </span>
                          )}
                        </div>
                        <p className="text-sm mt-1 whitespace-pre-wrap break-words opacity-80" style={{ color: "var(--muted)" }}>{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {(project.tags || []).map((t: string) => (
                             <span key={t} className="font-mono-label text-[10px] border px-2 py-0.5 rounded-sm flex-shrink-0" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-2 self-start sm:self-center flex-wrap">
                        <button 
                          onClick={() => handleToggleHide(project.id, isHidden)} 
                          className={`font-mono-label text-xs uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 border rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
                            isHidden
                              ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                              : "border-border text-muted hover:text-ink hover:bg-white/[0.02]"
                          }`}
                          title={isHidden ? "Unhide project on public portfolio" : "Hide project from public portfolio"}
                        >
                          {isHidden ? "👁‍🗨 Hidden" : "👁 Visible"}
                        </button>
                        <button onClick={() => startEditing(project)} className="font-mono-label text-xs uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 border rounded-sm transition-colors cursor-pointer hover:bg-white/[0.02]" style={{ borderColor: "var(--border)", color: "var(--ink)" }}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="font-mono-label text-xs uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 border rounded-sm text-red-500 border-red-500/30 hover:bg-red-500/10 transition-colors cursor-pointer">
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </SortableItem>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {isAdding ? (
        renderForm()
      ) : (
        <button onClick={startAdding} className="w-full font-mono-label text-xs uppercase tracking-widest px-4 py-4 border border-dashed rounded-sm transition-colors cursor-pointer" style={{ borderColor: "var(--border)", color: "var(--muted)" }} onMouseOver={(e) => { e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.color="var(--accent)" }} onMouseOut={(e) => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--muted)" }}>
          + Add New Project
        </button>
      )}
    </div>
  );
}
