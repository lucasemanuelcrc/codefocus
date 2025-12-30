"use client";

import { useState } from "react";
import Link from "next/link";
import { useNotes, NoteStatus } from "@/context/NotesContext";

// --- ÍCONES (Lucide Style) ---
const Icons = {
  Logo: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} /></svg>,
  Home: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Hash: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>,
  Search: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Plus: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Trash: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Filter: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  Zap: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  CheckCircle: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  AlertCircle: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

// --- SUB-COMPONENTE: BADGE STATUS ---
function StatusBadge({ status, onClick }: { status: NoteStatus; onClick?: () => void }) {
  const styles = {
    bug: "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20",
    investigating: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20",
    solved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
  };
  const labels = { bug: "Bug", investigating: "Investigating", solved: "Solved" };

  return (
    <button
      onClick={(e) => { 
        e.preventDefault(); 
        e.stopPropagation(); // Garante que o clique não abra a nota
        onClick?.(); 
      }}
      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border transition-colors ${styles[status]}`}
    >
      {labels[status]}
    </button>
  );
}

// --- SUB-COMPONENTE: STAT CARD ---
function StatCard({ label, value, icon, colorClass }: { label: string; value: number; icon: React.ReactNode; colorClass: string }) {
  return (
    <div className="bg-[#0B1121]/80 backdrop-blur-sm border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors">
      <div>
        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-mono font-semibold text-white">{value}</p>
      </div>
      <div className={`p-2 rounded-lg ${colorClass}`}>
        {icon}
      </div>
    </div>
  );
}

// --- PÁGINA DASHBOARD PRINCIPAL ---
export default function DashboardPage() {
  const { notes, addNote, deleteNote, updateStatus, isLoading } = useNotes();
  
  // Estados de Controle
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Estados do Formulário
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newTags, setNewTags] = useState("");

  // Cálculos Derivados (Stats)
  const totalNotes = notes.length;
  const activeBugs = notes.filter(n => n.status === 'bug').length;
  const solvedCount = notes.filter(n => n.status === 'solved').length;
  
  // Extrair tags únicas para a Sidebar
  const allTags = Array.from(new Set(notes.flatMap(n => n.tags || [])));

  // Filtros
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag ? note.tags?.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const tagsArray = newTags.split(",").map(t => t.trim()).filter(t => t.length > 0);
    addNote({
      title: newTitle,
      description: newDesc,
      codeSnippet: newCode,
      tags: tagsArray.length > 0 ? tagsArray : ["Geral"],
      status: "bug",
    });
    setNewTitle(""); setNewDesc(""); setNewCode(""); setNewTags(""); setIsCreating(false);
  };

  const cycleStatus = (current: NoteStatus, id: string) => {
    const cycle: Record<NoteStatus, NoteStatus> = { bug: "investigating", investigating: "solved", solved: "bug" };
    updateStatus(id, cycle[current]);
  };

  if (isLoading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-cyan-500 animate-pulse">Carregando Workspace...</div>;

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans overflow-hidden">
      
      {/* 1. SIDEBAR (Navegação Fixa) */}
      <aside className="w-64 border-r border-slate-800/60 bg-[#020617] flex flex-col hidden md:flex z-20 relative">
        <div className="p-6 border-b border-slate-800/60">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-white">
            <div className="w-6 h-6 bg-cyan-500/20 rounded-md flex items-center justify-center text-cyan-400">
               {Icons.Logo}
            </div>
            CodeFocus
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          {/* Menu Principal */}
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Workspace</h3>
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTag(null)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTag === null ? 'bg-cyan-900/20 text-cyan-400' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
              >
                {Icons.Home} Todas as Notas
              </button>
            </nav>
          </div>

          {/* Tags / Projetos */}
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Tags & Stacks</h3>
            <nav className="space-y-1">
              {allTags.length === 0 && <span className="text-xs text-slate-600 px-3 italic">Nenhuma tag ainda.</span>}
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTag === tag ? 'bg-cyan-900/20 text-cyan-400' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
                >
                  {Icons.Hash} {tag}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800/60">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600"></div>
             <div className="text-xs">
                <p className="font-medium text-white">Dev User</p>
                <p className="text-slate-500">Pro Plan</p>
             </div>
           </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* 4. BACKGROUND PATTERN (Grid Sutil) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
             style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none"></div>

        {/* Header da Área Principal */}
        <header className="relative z-10 px-8 py-6 flex justify-between items-center">
           <div>
             <h1 className="text-2xl font-bold text-white">Dashboard</h1>
             <p className="text-slate-500 text-sm">Bem-vindo de volta, Dev.</p>
           </div>
           
           {/* Botão Mobile Menu (oculto em desktop) */}
           <div className="md:hidden">
              <Link href="/" className="text-slate-400">Voltar</Link>
           </div>
        </header>

        {/* Conteúdo com Scroll */}
        <div className="flex-1 overflow-y-auto px-8 pb-20 relative z-10 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          
          {/* 2. STATS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard 
              label="Total de Registros" value={totalNotes} 
              icon={Icons.Zap} colorClass="bg-blue-500/20 text-blue-400" 
            />
            <StatCard 
              label="Bugs Ativos" value={activeBugs} 
              icon={Icons.AlertCircle} colorClass="bg-red-500/20 text-red-400" 
            />
            <StatCard 
              label="Solucionados" value={solvedCount} 
              icon={Icons.CheckCircle} colorClass="bg-emerald-500/20 text-emerald-400" 
            />
          </div>

          {/* 3. CONTROL BAR (Busca + Ações) */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors">
                {Icons.Search}
              </div>
              <input 
                type="text" 
                placeholder="Buscar por erro, descrição ou código..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#0B1121] border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-200 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all placeholder:text-slate-600"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
                 <kbd className="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">⌘K</kbd>
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-3 w-full md:w-auto">
               <button className="p-2.5 text-slate-400 hover:text-white border border-slate-800 bg-[#0B1121] rounded-lg transition-colors" title="Filtrar">
                 {Icons.Filter}
               </button>
               <button 
                 onClick={() => setIsCreating(!isCreating)}
                 className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-cyan-900/20"
               >
                 {Icons.Plus} {isCreating ? "Cancelar" : "Novo Registro"}
               </button>
            </div>
          </div>

          {/* ÁREA DE CRIAÇÃO (Collapse) */}
          {isCreating && (
            <div className="mb-8 bg-[#0B1121] border border-slate-800 rounded-xl p-6 animate-fade-in-up shadow-2xl relative z-20">
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                   <h3 className="text-sm font-bold text-white">Registrar Novo Erro</h3>
                </div>
                <div>
                  <input 
                    type="text" 
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="Título do erro (Ex: Hydration Mismatch)"
                    className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none"
                    autoFocus
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea 
                     value={newDesc}
                     onChange={e => setNewDesc(e.target.value)}
                     placeholder="Contexto e descrição do problema..."
                     className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:border-cyan-500 outline-none h-32 resize-none text-sm"
                  />
                  <textarea 
                     value={newCode}
                     onChange={e => setNewCode(e.target.value)}
                     placeholder="Snippet de código ou erro..."
                     className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-cyan-200 font-mono text-xs leading-relaxed focus:border-cyan-500 outline-none h-32 resize-none"
                  />
                </div>
                <input 
                  type="text" 
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  placeholder="Tags: React, TypeScript, NextJS..."
                  className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-2 text-slate-300 focus:border-cyan-500 outline-none text-sm"
                />
                <div className="flex justify-end pt-2">
                  <button type="submit" className="bg-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-500">Salvar</button>
                </div>
              </form>
            </div>
          )}

          {/* GRID DE NOTAS (Masonry Style) */}
          {filteredNotes.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 opacity-40 border-2 border-dashed border-slate-800 rounded-xl">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                   {Icons.Search}
                </div>
                <p className="text-slate-400">Nenhum registro encontrado.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
              {filteredNotes.map((note) => (
                <div 
                  key={note.id} 
                  className="group relative bg-[#0B1121]/80 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/5 hover:-translate-y-1 flex flex-col"
                >
                  {/* UX FIX: Link cobrindo todo o card */}
                  <Link href={`/notes/${note.id}`} className="absolute inset-0 z-0" />

                  <div className="p-5 flex flex-col h-full pointer-events-none">
                    <div className="flex justify-between items-start mb-3 relative z-10 pointer-events-auto">
                      <StatusBadge status={note.status} onClick={() => cycleStatus(note.status, note.id)} />
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteNote(note.id); }} 
                        className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
                      >
                        {Icons.Trash}
                      </button>
                    </div>
                    
                    <div className="block flex-grow">
                      <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                        {note.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                        {note.description}
                      </p>
                    </div>

                    {note.codeSnippet && (
                       <div className="bg-[#020617] p-2.5 rounded border border-slate-800/50 font-mono text-[10px] text-cyan-200/70 overflow-hidden relative mb-3">
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-500/30"></div>
                          <code className="line-clamp-2">{note.codeSnippet}</code>
                       </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-slate-800/50">
                      {note.tags?.map((tag, i) => (
                        <span key={i} className="text-[9px] bg-slate-800/50 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700/50">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}