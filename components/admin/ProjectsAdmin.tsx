"use client";

import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { updateProjectPositions, deleteProject, createProject, updateProject } from "@/app/admin/actions";

export function ProjectsAdmin({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [newTitle, setNewTitle] = useState("");
  const [newTagline, setNewTagline] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newGithub, setNewGithub] = useState("");
  const [newTags, setNewTags] = useState("");
  
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
    setNewTitle("");
    setNewTagline("");
    setNewDesc("");
    setNewLink("");
    setNewGithub("");
    setNewTags("");
  }

  function startEditing(p: any) {
    setIsAdding(false);
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
  }

  function cancelEdit() {
    setEditingId(null);
    setIsAdding(false);
  }

  async function handleSave(e: React.FormEvent, id?: string) {
    e.preventDefault();
    const tagArray = newTags.split(",").map(t => t.trim()).filter(Boolean);
    const combinedTitle = newTagline ? `${newTitle} ||| ${newTagline}` : newTitle;
    
    const data = { 
      title: combinedTitle, 
      description: newDesc, 
      link: newLink, 
      github: newGithub,
      tags: tagArray
    };

    if (id) {
      const updatedProj = await updateProject(id, data);
      if (updatedProj) {
        setProjects(projects.map(p => p.id === id ? updatedProj : p));
      }
      setEditingId(null);
    } else {
      const newProj = await createProject({ ...data, position: projects.length });
      if (newProj) {
        setProjects([...projects, newProj]);
      }
      setIsAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
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
      
      <div className="flex gap-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button type="submit" className="font-mono-label text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-colors cursor-pointer" style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}>
          {id ? "Update Project" : "Save Project"}
        </button>
        <button type="button" onClick={cancelEdit} className="font-mono-label text-xs uppercase tracking-widest px-6 py-3 border rounded-sm transition-colors cursor-pointer" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>Cancel</button>
      </div>
    </form>
  );

  return (
    <div className="font-body">
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

              return (
                <SortableItem key={project.id} id={project.id}>
                  {editingId === project.id ? (
                    renderForm(project.id)
                  ) : (
                    <div 
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 rounded-sm border"
                      style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-display text-lg" style={{ color: "var(--ink)" }}>{titleStr}</h3>
                          {taglineStr && (
                            <span className="font-mono-label text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>{taglineStr}</span>
                          )}
                        </div>
                        <p className="text-sm mt-1 whitespace-pre-wrap break-words" style={{ color: "var(--muted)" }}>{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {(project.tags || []).map((t: string) => (
                             <span key={t} className="font-mono-label text-[10px] border px-2 py-0.5 rounded-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex-shrink-0 flex gap-2 self-start">
                        <button onClick={() => startEditing(project)} className="font-mono-label text-xs uppercase tracking-wider px-4 py-2 border rounded-sm transition-colors cursor-pointer hover:bg-white/[0.02]" style={{ borderColor: "var(--border)", color: "var(--ink)" }}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="font-mono-label text-xs uppercase tracking-wider px-4 py-2 border rounded-sm text-red-500 border-red-500/30 hover:bg-red-500/10 transition-colors cursor-pointer">
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
