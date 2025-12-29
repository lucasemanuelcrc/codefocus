"use client";

import { useState } from "react";
import { Note } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";

interface ExpandableNoteCardProps {
  note: Note;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ExpandableNoteCard({ note, onToggleStatus, onDelete }: ExpandableNoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extração inteligente do conteúdo (caso tenha sido salvo concatenado ou em campo separado)
  // Assumindo a estrutura do passo anterior onde concatenamos ou temos description limpa
  const displayDescription = note.description.replace(/```[\s\S]*?```/g, '').trim();
  
  // Tenta extrair código se estiver misturado na descrição (fallback) ou usa um campo dedicado se você tiver adicionado ao Type
  const codeMatch = note.description.match(/```(\w+)?\n([\s\S]*?)\n```/);
  const codeContent = codeMatch ? codeMatch[2] : ""; 

  return (
    <div 
      className={`
        group relative rounded-xl border transition-all duration-300 overflow-hidden
        ${isExpanded 
          ? 'bg-slate-900/80 border-cyan-500/30 shadow-2xl shadow-cyan-900/10 ring-1 ring-cyan-500/20' 
          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'}
      `}
    >
      {/* --- HEADER (Sempre visível) --- */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 cursor-pointer flex items-start gap-4"
      >
        {/* Ícone de Status Lateral */}
        <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 transition-colors ${note.status === 'resolved' ? 'bg-emerald-500 shadow-[0_0_8px_currentColor]' : 'bg-amber-500'}`} />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-y-2 mb-2">
            <h3 className={`text-base font-semibold transition-colors ${isExpanded ? 'text-white' : 'text-slate-200 group-hover:text-cyan-400'}`}>
              {note.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
              <Badge type="language" value={note.language} />
            </div>
          </div>
          
          {/* Preview Text (Só aparece quando fechado) */}
          {!isExpanded && (
            <p className="text-sm text-slate-500 line-clamp-1 font-mono opacity-80">
              {displayDescription.slice(0, 120) || "Sem descrição adicional..."}
            </p>
          )}
        </div>

        {/* Chevron Icon */}
        <div className={`text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyan-500' : ''}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* --- EXPANDED CONTENT (Accordion) --- */}
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${isExpanded ? 'grid-rows-[1fr] border-t border-slate-800/50' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="p-6 pt-2 space-y-6 bg-slate-950/30">
            
            {/* Descrição Completa */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Contexto do Problema</h4>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                {displayDescription}
              </p>
            </div>

            {/* Bloco de Código (Se houver) */}
            {codeContent && (
              <div>
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Snippet do Erro</h4>
                 <CodeBlock code={codeContent} language={note.language} />
              </div>
            )}

            {/* Solução (Se houver) */}
            {note.solution && (
              <div className="bg-emerald-950/10 border border-emerald-900/20 rounded-lg p-4">
                <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> Solução Aplicada
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {note.solution}
                </p>
              </div>
            )}

            {/* Actions Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/50">
               <Button 
                 variant="outline" 
                 size="sm" 
                 onClick={() => onToggleStatus(note.id)}
                 className={note.status === 'open' ? 'hover:text-emerald-400 hover:border-emerald-500/30' : 'hover:text-amber-400'}
               >
                 {note.status === 'open' ? 'Marcar como Resolvido' : 'Reabrir Problema'}
               </Button>
               
               <Button 
                 variant="danger" 
                 size="sm" 
                 onClick={(e) => {
                   e.stopPropagation();
                   if(confirm('Tem certeza? Essa ação é irreversível.')) onDelete(note.id);
                 }}
               >
                 Excluir Registro
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}