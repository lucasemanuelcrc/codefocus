"use client";

import { useMemo } from "react";
import { 
  DndContext, 
  DragOverlay, 
  useDraggable, 
  useDroppable, 
  DragEndEvent,
  DragStartEvent, 
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { Note, NoteStatus } from "@/context/NotesContext";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";

// --- ÍCONES ---
const Icons = {
  Grip: <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>,
};

// --- CONFIGURAÇÃO DAS COLUNAS ---
const COLUMNS: { id: NoteStatus; title: string; color: string }[] = [
  { id: "bug", title: "Bugs Abertos", color: "bg-red-500" },
  { id: "investigating", title: "Investigando", color: "bg-amber-500" },
  { id: "solved", title: "Resolvidos", color: "bg-emerald-500" },
];

interface KanbanBoardProps {
  notes: Note[];
  onStatusChange: (id: string, newStatus: NoteStatus) => void;
}

export function KanbanBoard({ notes, onStatusChange }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Configurar sensores (Mouse e Touch com delay para evitar scroll acidental)
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  // Separar notas por coluna
  const columns = useMemo(() => {
    const cols: Record<NoteStatus, Note[]> = { bug: [], investigating: [], solved: [] };
    notes.forEach((note) => {
        if (cols[note.status]) cols[note.status].push(note);
    });
    return cols;
  }, [notes]);

  // Handler: Quando o arraste começa
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handler: Quando o item é solto
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const noteId = active.id as string;
    const newStatus = over.id as NoteStatus;

    // Se soltou em uma coluna diferente da atual
    const currentNote = notes.find(n => n.id === noteId);
    if (currentNote && currentNote.status !== newStatus) {
      onStatusChange(noteId, newStatus);
    }
  };

  // Nota sendo arrastada (para o Overlay)
  const activeNote = notes.find((n) => n.id === activeId);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[500px]">
        {COLUMNS.map((col) => (
          <KanbanColumn 
            key={col.id} 
            id={col.id} 
            title={col.title} 
            color={col.color} 
            notes={columns[col.id]} 
          />
        ))}
      </div>

      {/* Overlay: O card que "flutua" enquanto você arrasta */}
      {typeof document !== 'undefined' && createPortal(
        <DragOverlay>
          {activeNote ? <KanbanCard note={activeNote} isOverlay /> : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

// --- SUB-COMPONENTE: COLUNA ---
function KanbanColumn({ id, title, color, notes }: { id: NoteStatus; title: string; color: string; notes: Note[] }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef}
      className={`flex flex-col bg-[#0B1121]/50 border rounded-xl transition-colors h-full ${isOver ? "border-cyan-500/50 bg-cyan-900/10" : "border-slate-800"}`}
    >
      {/* Header da Coluna */}
      <div className="p-4 border-b border-slate-800/50 flex items-center justify-between sticky top-0 bg-[#0B1121] z-10 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{title}</h3>
        </div>
        <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
          {notes.length}
        </span>
      </div>

      {/* Área de Cards */}
      <div className="p-3 flex-1 flex flex-col gap-3 min-h-[150px]">
        {notes.map((note) => (
          <KanbanCard key={note.id} note={note} />
        ))}
        {notes.length === 0 && (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-800/50 rounded-lg p-4 opacity-30">
                <span className="text-xs text-slate-500 font-medium">Vazio</span>
            </div>
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTE: CARD ARRÁSTAVEL ---
function KanbanCard({ note, isOverlay }: { note: Note; isOverlay?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: note.id });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  // Se estiver sendo arrastado (no local original), fica invisível para dar efeito de movimento
  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="h-24 bg-slate-800/20 rounded-lg border border-slate-800/50 border-dashed" />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        group relative bg-[#1e293b] p-3 rounded-lg border border-slate-700 shadow-sm
        hover:border-cyan-500/50 hover:shadow-cyan-900/20 transition-all cursor-grab active:cursor-grabbing
        ${isOverlay ? "rotate-2 scale-105 shadow-2xl border-cyan-500 z-50 cursor-grabbing" : ""}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[9px] font-mono text-slate-500 bg-slate-900 px-1 rounded border border-slate-800">
            {note.tags[0] || "Geral"}
        </span>
        <div className="text-slate-600">{Icons.Grip}</div>
      </div>
      
      <h4 className="text-sm font-medium text-slate-200 line-clamp-2 mb-2 leading-snug">
        {note.title}
      </h4>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/50">
         <span className="text-[10px] text-slate-500 font-mono">
            {new Date(note.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' })}
         </span>
         {!isOverlay && (
             <Link 
                href={`/notes/${note.id}`} 
                className="text-[10px] text-cyan-500 hover:underline"
                onPointerDown={(e) => e.stopPropagation()} // Impede que o clique no link inicie o drag
             >
                Abrir
             </Link>
         )}
      </div>
    </div>
  );
}