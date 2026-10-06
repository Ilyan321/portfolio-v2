"use client";

import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { updateCertPositions, deleteCert, createCert, updateCert } from "@/app/admin/actions";

export function CertsAdmin({ initialCerts }: { initialCerts: any[] }) {
  const [certs, setCerts] = useState(initialCerts);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [newTitle, setNewTitle] = useState("");
  const [newIssuer, setNewIssuer] = useState("");
  const [newCredentialId, setNewCredentialId] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLink, setNewLink] = useState("");
  
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
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

  function startAdding() {
    setIsAdding(true);
    setEditingId(null);
    setNewTitle("");
    setNewIssuer("");
    setNewCredentialId("");
    setNewTag("");
    setNewDate("");
    setNewLink("");
  }

  function startEditing(c: any) {
    setIsAdding(false);
    setEditingId(c.id);
    setNewTitle(c.title);
    
    let issuer = c.issuer || "";
    let credId = "";
    let tag = "";
    if (issuer.includes("|||")) {
      const parts = issuer.split("|||").map((s: string) => s.trim());
      issuer = parts[0] || "";
      credId = parts[1] || "";
      tag = parts[2] || "";
    }
    
    setNewIssuer(issuer);
    setNewCredentialId(credId);
    setNewTag(tag);
    setNewDate(c.date);
    setNewLink(c.link || "");
  }

  function cancelEdit() {
    setEditingId(null);
    setIsAdding(false);
  }

  async function handleSave(e: React.FormEvent, id?: string) {
    e.preventDefault();
    
    const combinedIssuer = `${newIssuer} ||| ${newCredentialId} ||| ${newTag}`;
    
    const data = { 
      title: newTitle, 
      issuer: combinedIssuer, 
      date: newDate, 
      link: newLink
    };

    if (id) {
      const updatedCert = await updateCert(id, data);
      if (updatedCert) {
        setCerts(certs.map(c => c.id === id ? updatedCert : c));
      }
      setEditingId(null);
    } else {
      const newCert = await createCert({ ...data, position: certs.length });
      if (newCert) {
        setCerts([...certs, newCert]);
      }
      setIsAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this certification?")) {
      await deleteCert(id);
      setCerts(certs.filter(c => c.id !== id));
    }
  }

  const renderForm = (id?: string) => (
    <form onSubmit={(e) => handleSave(e, id)} className="p-6 rounded-sm border space-y-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}>
      <div className="space-y-1">
        <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Title</label>
        <input type="text" required value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full font-body text-sm rounded-sm border p-3 outline-none transition-all focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Issuer</label>
          <input type="text" required value={newIssuer} onChange={e => setNewIssuer(e.target.value)} className="w-full font-body text-sm rounded-sm border p-3 outline-none transition-all focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
        </div>
        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Credential ID</label>
          <input type="text" value={newCredentialId} onChange={e => setNewCredentialId(e.target.value)} placeholder="e.g. GCC-12345" className="w-full font-body text-sm rounded-sm border p-3 outline-none transition-all focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
        </div>
        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Pill Tag</label>
          <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="e.g. Artificial Intelligence" className="w-full font-body text-sm rounded-sm border p-3 outline-none transition-all focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Date / Year</label>
          <input type="text" required value={newDate} onChange={e => setNewDate(e.target.value)} placeholder="e.g. 2026" className="w-full font-body text-sm rounded-sm border p-3 outline-none transition-all focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
        </div>
        <div className="space-y-1">
          <label className="font-mono-label text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>Credential URL / PDF Link</label>
          <input type="text" value={newLink} onChange={e => setNewLink(e.target.value)} className="w-full font-body text-sm rounded-sm border p-3 outline-none transition-all focus:border-emerald-500" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--ink)" }} />
        </div>
      </div>
      
      <div className="flex gap-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button type="submit" className="font-mono-label text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-colors cursor-pointer" style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}>
          {id ? "Update Cert" : "Save Cert"}
        </button>
        <button type="button" onClick={cancelEdit} className="font-mono-label text-xs uppercase tracking-widest px-6 py-3 border rounded-sm transition-colors cursor-pointer" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>Cancel</button>
      </div>
    </form>
  );

  return (
    <div className="font-body">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={certs} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 mb-6">
            {certs.map((cert) => {
              let displayIssuer = cert.issuer || "";
              let credId = "";
              let tag = "";
              if (displayIssuer.includes("|||")) {
                const parts = displayIssuer.split("|||").map((s: string) => s.trim());
                displayIssuer = parts[0] || "";
                credId = parts[1] || "";
                tag = parts[2] || "";
              }

              return (
                <SortableItem key={cert.id} id={cert.id}>
                  {editingId === cert.id ? (
                    renderForm(cert.id)
                  ) : (
                    <div 
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 rounded-sm border w-full min-w-0 gap-4"
                      style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
                    >
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display text-lg break-words" style={{ color: "var(--ink)" }}>{cert.title}</h3>
                          {tag && (
                            <span className="font-mono-label text-[10px] border px-2 py-0.5 rounded-sm flex-shrink-0" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>{tag}</span>
                          )}
                        </div>
                        <p className="font-mono-label text-xs tracking-wider uppercase mt-1 break-words opacity-80" style={{ color: "var(--muted)" }}>
                          {displayIssuer} {credId && `// ID: ${credId}`} • {cert.date}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex gap-2 self-start sm:self-center">
                        <button onClick={() => startEditing(cert)} className="font-mono-label text-xs uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 border rounded-sm transition-colors cursor-pointer hover:bg-white/[0.02]" style={{ borderColor: "var(--border)", color: "var(--ink)" }}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(cert.id)} className="font-mono-label text-xs uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 border rounded-sm text-red-500 border-red-500/30 hover:bg-red-500/10 transition-colors cursor-pointer">
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
          + Add New Certification
        </button>
      )}
    </div>
  );
}
