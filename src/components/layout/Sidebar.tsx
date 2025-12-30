import Link from "next/link";
import { Icons } from "@/components/ui/Icons";

interface SidebarProps {
  allTags: string[];
  activeTag: string | null;
  onTagClick: (tag: string | null) => void;
}

export function Sidebar({ allTags, activeTag, onTagClick }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-slate-800/60 bg-[#020617] flex flex-col hidden md:flex z-20 relative">
      <div className="p-6 border-b border-slate-800/60">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-white">
          <div className="w-6 h-6 bg-cyan-500/20 rounded-md flex items-center justify-center text-cyan-400">{Icons.Logo}</div>
          CodeFocus
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        <div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Workspace</h3>
          <nav className="space-y-1">
            <button 
              onClick={() => onTagClick(null)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTag === null ? 'bg-cyan-900/20 text-cyan-400' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
            >
              {Icons.Home} Todas as Notas
            </button>
          </nav>
        </div>
        <div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Tags & Stacks</h3>
          <nav className="space-y-1">
            {allTags.map(tag => (
              <button 
                key={tag} 
                onClick={() => onTagClick(tag)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTag === tag ? 'bg-cyan-900/20 text-cyan-400' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
              >
                {Icons.Hash} {tag}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}