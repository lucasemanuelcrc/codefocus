import { Icons } from "@/components/ui/Icons";
import { NoteCard } from "./NoteCard";
import { Note, NoteStatus } from "@/context/NotesContext";

interface NoteGridProps {
  notes: Note[];
  onStatusCycle: (status: NoteStatus, id: string) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteGrid({ notes, onStatusCycle, onEdit, onDelete }: NoteGridProps) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-40 border-2 border-dashed border-slate-800 rounded-xl">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
          {Icons.Search}
        </div>
        <p className="text-slate-400">Nenhum registro encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10 animate-fade-in-up">
      {notes.map((note) => (
        <NoteCard 
          key={note.id} 
          note={note} 
          onStatusCycle={onStatusCycle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}