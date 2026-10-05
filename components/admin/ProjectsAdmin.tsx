"use client";

import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { createClient } from "@supabase/supabase-js";

// We use the public client for making client-side requests but actually 
// to bypass RLS for admin operations, we should hit Next.js API routes or use Server Actions.
// Let's create server actions in a separate file.
import { updateProjectPositions, deleteProject, createProject } from "@/app/admin/actions";

export function ProjectsAdmin({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newLink, setNewLink] = useState("");
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        
        // Update positions in DB
        const updates = newArray.map((item, index) => ({ id: item.id, position: index }));
        updateProjectPositions(updates);
        
        return newArray;
      });
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const newProj = await createProject({ title: newTitle, description: newDesc, link: newLink, position: projects.length });
    if (newProj) {
      setProjects([...projects, newProj]);
      setIsAdding(false);
      setNewTitle("");
      setNewDesc("");
      setNewLink("");
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure?")) {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    }
  }

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={projects} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 mb-4">
            {projects.map((project) => (
              <SortableItem key={project.id} id={project.id}>
                <div className="flex justify-between items-center bg-zinc-900 p-4 rounded border border-zinc-800">
                  <div>
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-sm text-zinc-400">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(project.id)} className="bg-red-500/10 text-red-500 px-3 py-1 rounded hover:bg-red-500/20">Delete</button>
                  </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {isAdding ? (
        <form onSubmit={handleAdd} className="bg-zinc-900 p-4 rounded border border-zinc-800 space-y-4">
          <input type="text" placeholder="Title" required value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
          <textarea placeholder="Description" required value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
          <input type="text" placeholder="Link (optional)" value={newLink} onChange={e => setNewLink(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
          <div className="flex gap-2">
            <button type="submit" className="bg-emerald-500 text-black px-4 py-2 rounded font-semibold">Save</button>
            <button type="button" onClick={() => setIsAdding(false)} className="bg-zinc-800 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setIsAdding(true)} className="bg-zinc-800 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-700 w-full">+ Add Project</button>
      )}
    </div>
  );
}
