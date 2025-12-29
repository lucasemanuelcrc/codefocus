import { Language, NoteStatus } from "@/types";

interface BadgeProps {
  type: 'language' | 'status';
  value: string;
}

export function Badge({ type, value }: BadgeProps) {
  if (type === 'status') {
    const isResolved = value === 'resolved';
    return (
      <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${
        isResolved 
          ? 'bg-cyan-950/30 text-cyan-400 border-cyan-900/50' 
          : 'bg-slate-800 text-slate-400 border-slate-700'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isResolved ? 'bg-cyan-400' : 'bg-slate-500'}`} />
        {isResolved ? 'Resolvido' : 'Em aberto'}
      </span>
    );
  }

  // Language Badge
  return (
    <span className="text-xs font-mono text-slate-400 bg-slate-950 border border-slate-800 px-2 py-1 rounded">
      {value}
    </span>
  );
}