"use client";

import { useNotes } from "@/context/NotesContext";
import { NoteForm } from "@/components/domain/NoteForm";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default function DashboardPage() {
  const { notes } = useNotes();

  // Ordenar por criação (mais recente primeiro)
  const recentNotes = [...notes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <main className="min-h-screen relative bg-[#020617] text-slate-200 overflow-x-hidden">
      
      {/* --- BACKGROUND AMBIENTE (NOISE + GRADIENTS) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
        
        {/* Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-16">
        
        {/* 1. HEADER DO DASHBOARD */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
              Nova <span className="text-cyan-400">Anotação</span>
            </h1>
            <p className="text-slate-400 font-light max-w-lg text-lg">
              Registre o erro agora. Entenda depois. <br/>
              Mantenha seu fluxo de trabalho ininterrupto.
            </p>
          </div>
          
          <div className="flex gap-4">
             <Link href="/notes" className="group flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-800 hover:border-cyan-500/30">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Ver todas anotações
             </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* 2. FORMULÁRIO DE CRIAÇÃO (Principal) */}
          <div className="lg:col-span-8 space-y-4">
            <NoteForm />
          </div>

          {/* 3. ANOTAÇÕES RECENTES (Sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Recentes</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
            </div>

            {recentNotes.length === 0 ? (
              <div className="text-center py-12 px-6 rounded-2xl border border-dashed border-slate-800 bg-slate-900/20">
                <p className="text-slate-500 text-sm">Seu histórico está limpo.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentNotes.map((note) => (
                  <Link href={`/notes/${note.id}`} key={note.id} className="block group">
                    <Card className="!p-4 bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-cyan-900/10 hover:-translate-y-1 transition-all duration-300">
                      
                      <div className="flex justify-between items-start mb-3">
                        <Badge type="language" value={note.language} />
                        <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] ${note.status === 'resolved' ? 'bg-emerald-500 text-emerald-500' : 'bg-cyan-500 text-cyan-500'}`} />
                      </div>
                      
                      <h3 className="text-slate-200 font-semibold text-sm line-clamp-1 mb-1 group-hover:text-cyan-300 transition-colors">
                        {note.title}
                      </h3>
                      
                      <p className="text-slate-500 text-xs font-mono line-clamp-2">
                        {/* Remove markdown simples para preview */}
                        {note.description.replace(/```[\s\S]*?```/g, '[Código]').slice(0, 50)}...
                      </p>

                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                         <span className="text-[10px] text-slate-600 font-medium">
                           {new Date(note.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                         </span>
                         <span className="text-[10px] text-cyan-500/0 group-hover:text-cyan-500 transition-all -translate-x-2 group-hover:translate-x-0">
                           Abrir →
                         </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}