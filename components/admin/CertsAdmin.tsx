"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { updateCertPositions, deleteCert, createCert, updateCert, toggleCertVisibility } from "@/app/admin/actions";

export function CertsAdmin({ initialCerts }: { initialCerts: any[] }) {
  const router = useRouter();
  const [certs, setCerts] = useState(initialCerts);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [newTitle, setNewTitle] = useState("");
  const [newIssuer, setNewIssuer] = useState("");
  const [newCredentialId, setNewCredentialId] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newHidden, setNewHidden] = useState(false);
  
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
    setStatusMsg(null);
    setNewTitle("");
    setNewIssuer("");
    setNewCredentialId("");
    setNewTag("");
    setNewDate("");
    setNewLink("");
    setNewHidden(false);
  }

  function startEditing(c: any) {
    setIsAdding(false);
    setStatusMsg(null);
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
    setNewHidden(!!c.hidden);
  }

  function cancelEdit() {
    setEditingId(null);
    setIsAdding(false);
  }

  async function handleToggleHide(id: string, currentHidden: boolean) {
    const nextHidden = !currentHidden;
    setCerts(certs.map(c => c.id === id ? { ...c, hidden: nextHidden } : c));
    const res = await toggleCertVisibility(id, nextHidden);
    if (res && res.success) {
      setStatusMsg({ type: "success", text: nextHidden ? "Certification hidden from public view." : "Certification is now visible on public portfolio." });
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
    
    const combinedIssuer = `${newIssuer} ||| ${newCredentialId} ||| ${newTag}`;
    
    const data = { 
      title: newTitle, 
      issuer: combinedIssuer, 
      date: newDate, 
      link: newLink,
      hidden: newHidden
    };

    try {
      if (id) {
        const res = await updateCert(id, data);
        if (res && res.success && res.cert) {
          setCerts(certs.map(c => c.id === id ? { ...res.cert, hidden: newHidden } : c));
          setStatusMsg({ type: "success", text: "Certification updated successfully!" });
          setEditingId(null);
          router.refresh();
        } else if (res && !res.success) {
          setStatusMsg({ type: "error", text: `Update failed: ${res.error}` });
        } else {
          setCerts(certs.map(c => c.id === id ? { ...c, ...data } : c));
          setStatusMsg({ type: "success", text: "Certification updated successfully!" });
          setEditingId(null);
          router.refresh();
        }
      } else {
        const res = await createCert({ ...data, position: certs.length });
        if (res && res.success && res.cert) {
          setCerts([...certs, { ...res.cert, hidden: newHidden }]);
          setStatusMsg({ type: "success", text: "New certification added successfully!" });
          setIsAdding(false);
          router.refresh();
        } else if (res && !res.success) {
          setStatusMsg({ type: "error", text: `Creation failed: ${res.error}` });
        } else {
          setCerts([...certs, { id: `cert-${Date.now()}`, ...data, position: certs.length }]);
          setStatusMsg({ type: "success", text: "New certification added successfully!" });
          setIsAdding(false);
          router.refresh();
        }
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to save certification." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMsg(null), 4000);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this certification?")) {
      const res = await deleteCert(id);
      if (res && !res.success) {
        setStatusMsg({ type: "error", text: `Delete failed: ${res.error}` });
      } else {
        setCerts(certs.filter(c => c.id !== id));
        setStatusMsg({ type: "success", text: "Certification removed." });
        router.refresh();
      }
      setTimeout(() => setStatusMsg(null), 4000);
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

      <div className="flex items-center gap-3 pt-2">
        <input 
          type="checkbox" 
          id="cert-hidden" 
          checked={newHidden} 
          onChange={e => setNewHidden(e.target.checked)} 
          className="rounded border-border accent-accent h-4 w-4 cursor-pointer"
        />
        <label htmlFor="cert-hidden" className="font-mono-label text-xs uppercase tracking-wider cursor-pointer" style={{ color: "var(--muted)" }}>
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
          {isSubmitting ? "Saving..." : id ? "Update Cert" : "Save Cert"}
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

              const isHidden = !!cert.hidden;

              return (
                <SortableItem key={cert.id} id={cert.id}>
                  {editingId === cert.id ? (
                    renderForm(cert.id)
                  ) : (
                    <div 
                      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 rounded-sm border w-full min-w-0 gap-4 transition-opacity ${isHidden ? "opacity-60 bg-amber-500/[0.03]" : ""}`}
                      style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)" }}
                    >
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display text-lg break-words" style={{ color: "var(--ink)" }}>{cert.title}</h3>
                          {tag && (
                            <span className="font-mono-label text-[10px] border px-2 py-0.5 rounded-sm flex-shrink-0" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>{tag}</span>
                          )}
                          {isHidden && (
                            <span className="font-mono-label text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                              Hidden
                            </span>
                          )}
                        </div>
                        <p className="font-mono-label text-xs tracking-wider uppercase mt-1 break-words opacity-80" style={{ color: "var(--muted)" }}>
                          {displayIssuer} {credId && `// ID: ${credId}`} • {cert.date}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-2 self-start sm:self-center flex-wrap">
                        <button 
                          onClick={() => handleToggleHide(cert.id, isHidden)} 
                          className={`font-mono-label text-xs uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 border rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
                            isHidden
                              ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                              : "border-border text-muted hover:text-ink hover:bg-white/[0.02]"
                          }`}
                          title={isHidden ? "Unhide certificate on public portfolio" : "Hide certificate from public portfolio"}
                        >
                          {isHidden ? "👁‍🗨 Hidden" : "👁 Visible"}
                        </button>
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
