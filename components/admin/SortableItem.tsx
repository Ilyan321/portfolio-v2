import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-4 items-center w-full min-w-0">
      <div 
        {...attributes} 
        {...listeners} 
        className="cursor-grab active:cursor-grabbing p-4 border rounded-sm transition-colors hover:bg-white/[0.02] flex-shrink-0"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--panel)", color: "var(--muted)" }}
      >
        ≡
      </div>
      <div className="flex-grow min-w-0 w-full">
        {props.children}
      </div>
    </div>
  );
}
