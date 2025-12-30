import { NoteStatus } from "@/context/NotesContext";

interface StatusBadgeProps {
  status: NoteStatus;
  onClick?: () => void;
}

export function StatusBadge({ status, onClick }: StatusBadgeProps) {
  const styles = {
    bug: "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20",
    investigating: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20",
    solved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
  };
  const labels = { bug: "Bug", investigating: "Investigating", solved: "Solved" };

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick?.(); }}
      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border transition-colors ${styles[status]}`}
    >
      {labels[status]}
    </button>
  );
}