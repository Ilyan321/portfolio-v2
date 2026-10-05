"use client";

import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { updateCertPositions, deleteCert, createCert } from "@/app/admin/actions";

export function CertsAdmin({ initialCerts }: { initialCerts: any[] }) {
  const [certs, setCerts] = useState(initialCerts);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newIssuer, setNewIssuer] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLink, setNewLink] = useState("");
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setCerts((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        
        const updates = newArray.map((item, index) => ({ id: item.id, position: index }));
        updateCertPositions(updates);
        
        return newArray;
      });
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const newCert = await createCert({ 
      title: newTitle, 
      issuer: newIssuer, 
      date: newDate, 
      link: newLink, 
      position: certs.length 
    });
    if (newCert) {
      setCerts([...certs, newCert]);
      setIsAdding(false);
      setNewTitle("");
      setNewIssuer("");
      setNewDate("");
      setNewLink("");
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this certification?")) {
      await deleteCert(id);
      setCerts(certs.filter(c => c.id !== id));
    }
  }

  return (
    <div className="font-body">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={certs} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 mb-6">
            {certs.map((cert) => (
              <SortableItem key={cert.id} id={cert.id}>
                <div 
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 rounded-sm border"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-display text-lg truncate" style={{ color: "var(--ink)" }}>{cert.title}</h3>
                    <p className="font-mono-label text-xs tracking-wider uppercase mt-1" style={{ color: "var(--muted)" }}>
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex-shrink-0">
                    <button onClick={() => handleDelete(cert.id)} className="font-mono-label text-xs uppercase tracking-wider px-4 py-2 border rounded-sm text-red-500 border-red-500/30 hover:bg-red-500/10 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {isAdding ? (
        <form onSubmit={handleAdd} className="p-6 rounded-sm border space-y-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}>
          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Title</label>
            <input type="text" required value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full font-body text-sm rounded-sm border p-3 outline-none focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Issuer</label>
              <input type="text" required value={newIssuer} onChange={e => setNewIssuer(e.target.value)} className="w-full font-body text-sm rounded-sm border p-3 outline-none focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
            </div>
            <div className="space-y-1">
              <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Date / Year</label>
              <input type="text" required value={newDate} onChange={e => setNewDate(e.target.value)} placeholder="e.g. 2026" className="w-full font-body text-sm rounded-sm border p-3 outline-none focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>URL / File Path</label>
            <input type="text" value={newLink} onChange={e => setNewLink(e.target.value)} className="w-full font-body text-sm rounded-sm border p-3 outline-none focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
          </div>
          
          <div className="flex gap-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            <button type="submit" className="font-mono-label text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-colors cursor-pointer" style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}>Save Cert</button>
            <button type="button" onClick={() => setIsAdding(false)} className="font-mono-label text-xs uppercase tracking-widest px-6 py-3 border rounded-sm transition-colors cursor-pointer" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setIsAdding(true)} className="w-full font-mono-label text-xs uppercase tracking-widest px-4 py-4 border border-dashed rounded-sm transition-colors hover:border-emerald-500 hover:text-emerald-500 cursor-pointer" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          + Add New Certification
        </button>
      )}
    </div>
  );
}
