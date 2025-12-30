import Link from "next/link";
import { Icons } from "@/components/ui/Icons";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Note, NoteStatus } from "@/context/NotesContext";

interface NoteCardProps {
  note: Note;
  onStatusCycle: (status: NoteStatus, id: string) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onStatusCycle, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="group relative bg-[#0B1121]/80 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/5 hover:-translate-y-1 flex flex-col">
      <Link href={`/notes/${note.id}`} className="absolute inset-0 z-0" />
      <div className="p-5 flex flex-col h-full pointer-events-none">
        <div className="flex justify-between items-start mb-3 relative z-10 pointer-events-auto">
          <StatusBadge status={note.status} onClick={() => onStatusCycle(note.status, note.id)} />
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link href={`/notes/${note.id}`} className="text-slate-600 hover:text-cyan-400 p-1" title="Abrir Detalhes">
              {Icons.Eye}
            </Link>
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(note); }} className="text-slate-600 hover:text-cyan-400 p-1" title="Editar">{Icons.Edit}</button>
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(note.id); }} className="text-slate-600 hover:text-red-400 p-1" title="Excluir">{Icons.Trash}</button>
          </div>
        </div>
        <div className="block flex-grow">
          <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">{note.title}</h3>
          <p className="text-xs text-slate-400 line-clamp-2 mb-3">{note.description}</p>
        </div>
        {note.codeSnippet && (
            <div className="bg-[#020617] p-2.5 rounded border border-slate-800/50 font-mono text-[10px] text-cyan-200/70 overflow-hidden relative mb-3">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-500/30"></div>
              <code className="line-clamp-2">{note.codeSnippet}</code>
            </div>
        )}
        <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-slate-800/50">
          {note.tags?.map((tag, i) => <span key={i} className="text-[9px] bg-slate-800/50 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700/50">#{tag}</span>)}
        </div>
      </div>
    </div>
  );
}