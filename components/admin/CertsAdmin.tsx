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
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setCerts((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        
        // Update positions in DB
        const updates = newArray.map((item, index) => ({ id: item.id, position: index }));
        updateCertPositions(updates);
        
        return newArray;
      });
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const newCert = await createCert({ title: newTitle, issuer: newIssuer, date: newDate, link: newLink, position: certs.length });
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
    if (confirm("Are you sure?")) {
      await deleteCert(id);
      setCerts(certs.filter(c => c.id !== id));
    }
  }

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={certs} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 mb-4">
            {certs.map((cert) => (
              <SortableItem key={cert.id} id={cert.id}>
                <div className="flex justify-between items-center bg-zinc-900 p-4 rounded border border-zinc-800">
                  <div>
                    <h3 className="font-bold">{cert.title}</h3>
                    <p className="text-sm text-zinc-400">{cert.issuer} • {cert.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(cert.id)} className="bg-red-500/10 text-red-500 px-3 py-1 rounded hover:bg-red-500/20">Delete</button>
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
          <input type="text" placeholder="Issuer (e.g. DeepLearning.AI)" required value={newIssuer} onChange={e => setNewIssuer(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
          <input type="text" placeholder="Date (e.g. Jan 2024)" required value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
          <input type="text" placeholder="Link (optional)" value={newLink} onChange={e => setNewLink(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white" />
          <div className="flex gap-2">
            <button type="submit" className="bg-emerald-500 text-black px-4 py-2 rounded font-semibold">Save</button>
            <button type="button" onClick={() => setIsAdding(false)} className="bg-zinc-800 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setIsAdding(true)} className="bg-zinc-800 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-700 w-full">+ Add Certification</button>
      )}
    </div>
  );
}
