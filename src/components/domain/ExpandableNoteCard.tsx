"use client";

import { useState } from "react";
// 1. Importamos a definição oficial de Note do Contexto
import { Note } from "@/context/NotesContext"; 
import Link from "next/link";

// --- ÍCONES ---
const Icons = {
  ChevronDown: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
  Trash: <svg className="w-4 h-4" fill="none" viewBox="0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  ExternalLink: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
};

interface ExpandableNoteCardProps {
  // 2. Usamos o tipo 'Note' do contexto. Isso remove a exigência de 'language'
  note: Note; 
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ExpandableNoteCard({ note, onToggleStatus, onDelete }: ExpandableNoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Status Styling
  const statusColors = {
    bug: "bg-red-500/10 text-red-400 border-red-500/20",
    investigating: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    solved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };
  
  const statusLabels = {
    bug: "BUG",
    investigating: "INVESTIGATING",
    solved: "SOLVED"
  };

  return (
    <div className="bg-[#0B1121] border border-slate-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-700">
      
      {/* HEADER DO CARD (Sempre visível) */}
      <div className="p-4 flex items-center justify-between gap-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Status Badge */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleStatus(note.id);
            }}
            className={`px-2 py-1 rounded text-[10px] font-mono font-bold border transition-colors hover:brightness-125 ${statusColors[note.status]}`}
          >
            {statusLabels[note.status]}
          </button>

          {/* Título */}
          <h3 className="text-slate-200 font-medium truncate pr-4">
            {note.title}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
            {/* Tags (Mobile hide) */}
            <div className="hidden md:flex gap-2">
                {note.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Expand Icon */}
            <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                {Icons.ChevronDown}
            </div>
        </div>
      </div>

      {/* BODY DO CARD (Expansível) */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 animate-fade-in-down">
            <div className="h-px w-full bg-slate-800/50 mb-4"></div>
            
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {note.description || "Sem descrição."}
            </p>

            {note.codeSnippet && (
                <div className="bg-[#020617] p-3 rounded-lg border border-slate-800 mb-4 overflow-x-auto">
                    <pre className="text-xs font-mono text-cyan-100">
                        {note.codeSnippet}
                    </pre>
                </div>
            )}

            <div className="flex justify-end gap-3 mt-2">
                <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-red-400 transition-colors px-3 py-1.5 hover:bg-red-500/10 rounded"
                >
                    {Icons.Trash} Excluir
                </button>
                
                <Link 
                    href={`/notes/${note.id}`}
                    className="flex items-center gap-2 text-xs text-cyan-500 hover:text-cyan-400 transition-colors px-3 py-1.5 hover:bg-cyan-500/10 rounded"
                >
                    {Icons.ExternalLink} Abrir Detalhes
                </Link>
            </div>
        </div>
      )}
    </div>
  );
}