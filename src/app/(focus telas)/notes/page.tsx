"use client";

import { useNotes } from "@/context/NotesContext";
import { ExpandableNoteCard } from "@/components/domain/ExpandableNoteCard";
import Link from "next/link";
import { useState } from "react";

export default function NotesPage() {
  const { notes, toggleStatus, deleteNote } = useNotes();
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all');

  // Stats
  const totalNotes = notes.length;
  const resolvedNotes = notes.filter(n => n.status === 'resolved').length;
  const openNotes = totalNotes - resolvedNotes;

  // Filter Logic
  const filteredNotes = notes.filter(note => {
    if (filter === 'all') return true;
    return note.status === filter;
  });

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200">
      
      {/* Background Decor (Mais sutil que a dashboard) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        
        {/* 1. HEADER */}
        <div className="mb-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Link href="/dashboard" className="text-xs text-cyan-500 font-mono hover:underline mb-2 block">
                &larr; Voltar ao Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Biblioteca de <span className="text-slate-500">Erros</span>
              </h1>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Gerencie seu conhecimento técnico. Revise soluções passadas e mantenha seu código limpo.
              </p>
            </div>

            {/* Stats Cards Mini */}
            <div className="flex gap-3">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-center">
                <span className="block text-xl font-bold text-white">{totalNotes}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Total</span>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-center">
                <span className="block text-xl font-bold text-emerald-400">{resolvedNotes}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Resolvidos</span>
              </div>
            </div>
          </div>

          {/* Filtros Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/80 border border-slate-800 rounded-lg w-fit">
            {(['all', 'open', 'resolved'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`
                  px-4 py-1.5 rounded-md text-xs font-medium transition-all
                  ${filter === f 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}
                `}
              >
                {f === 'all' ? 'Todos' : f === 'open' ? 'Em Aberto' : 'Resolvidos'}
              </button>
            ))}
          </div>
        </div>

        {/* 2. LISTAGEM */}
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 text-slate-600">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
            </div>
            <h3 className="text-slate-300 font-medium">Nenhum registro encontrado</h3>
            <p className="text-slate-500 text-sm mt-1">Ajuste os filtros ou crie uma nova anotação.</p>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in-up">
            {filteredNotes.map((note) => (
              <ExpandableNoteCard 
                key={note.id} 
                note={note} 
                onToggleStatus={toggleStatus}
                onDelete={deleteNote}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}