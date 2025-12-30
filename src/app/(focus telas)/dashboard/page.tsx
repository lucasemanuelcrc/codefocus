"use client";

import { useState } from "react";
import Link from "next/link";
import { useNotes, NoteStatus, Note } from "@/context/NotesContext";
import { KanbanBoard } from "@/components/domain/KanbanBoard";

// --- ÍCONES (Adicionados: Bell, Settings, Help) ---
const Icons = {
  Logo: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} /></svg>,
  Home: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Hash: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>,
  Search: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Plus: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Trash: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Zap: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  CheckCircle: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  AlertCircle: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Edit: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  LayoutGrid: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  LayoutKanban: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>,
  Eye: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  ChevronRight: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>,
  Bell: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  Settings: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Help: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

// --- SUB-COMPONENTS ---

function HeaderIconButton({ icon, label, hasBadge }: { icon: React.ReactNode, label: string, hasBadge?: boolean }) {
  return (
    <button 
      className="relative p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-md transition-all duration-200 group" 
      title={label}
    >
      <div className="relative">
        {icon}
        {hasBadge && (
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-slate-900 group-hover:scale-110 transition-transform"></span>
        )}
      </div>
    </button>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden">
      <aside className="w-64 border-r border-slate-800/60 bg-[#020617] hidden md:flex flex-col p-6 space-y-8">
         <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-slate-800 rounded animate-pulse" />
            <div className="w-24 h-4 bg-slate-800 rounded animate-pulse" />
         </div>
         <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="w-full h-8 bg-slate-800/50 rounded animate-pulse" />)}
         </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-800/40 rounded-xl animate-pulse" />)}
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-slate-800/20 rounded-xl border border-slate-800/50 animate-pulse flex flex-col p-5 space-y-4">
                 <div className="flex justify-between">
                    <div className="w-16 h-5 bg-slate-800 rounded-full" />
                    <div className="w-5 h-5 bg-slate-800 rounded-full" />
                 </div>
                 <div className="w-3/4 h-6 bg-slate-800 rounded" />
                 <div className="space-y-2">
                    <div className="w-full h-3 bg-slate-800/50 rounded" />
                    <div className="w-2/3 h-3 bg-slate-800/50 rounded" />
                 </div>
              </div>
            ))}
         </div>
      </main>
    </div>
  );
}

function StatusBadge({ status, onClick }: { status: NoteStatus; onClick?: () => void }) {
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

function StatCard({ label, value, icon, colorClass }: { label: string; value: number; icon: React.ReactNode; colorClass: string }) {
  return (
    <div className="bg-[#0B1121]/80 backdrop-blur-sm border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors">
      <div>
        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-mono font-semibold text-white">{value}</p>
      </div>
      <div className={`p-2 rounded-lg ${colorClass}`}>{icon}</div>
    </div>
  );
}

// --- PÁGINA PRINCIPAL ---
export default function DashboardPage() {
  const { notes, addNote, updateNote, deleteNote, updateStatus, isLoading } = useNotes();
   
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'kanban'>('grid');

  // Form Fields
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newTags, setNewTags] = useState("");

  const totalNotes = notes.length;
  const activeBugs = notes.filter(n => n.status === 'bug').length;
  const solvedCount = notes.filter(n => n.status === 'solved').length;
  const allTags = Array.from(new Set(notes.flatMap(n => n.tags || [])));

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag ? note.tags?.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  const startEditing = (note: Note) => {
    setNewTitle(note.title);
    setNewDesc(note.description);
    setNewCode(note.codeSnippet || "");
    setNewTags(note.tags.join(", "));
    setEditingId(note.id);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const tagsArray = newTags.split(",").map(t => t.trim()).filter(t => t.length > 0);
    const noteData = { title: newTitle, description: newDesc, codeSnippet: newCode, tags: tagsArray.length > 0 ? tagsArray : ["Geral"] };

    if (editingId) updateNote(editingId, noteData);
    else addNote({ ...noteData, status: "bug" });

    setNewTitle(""); setNewDesc(""); setNewCode(""); setNewTags(""); setIsCreating(false); setEditingId(null);
  };

  const cancelForm = () => {
    setNewTitle(""); setNewDesc(""); setNewCode(""); setNewTags(""); setIsCreating(false); setEditingId(null);
  }

  const cycleStatus = (current: NoteStatus, id: string) => {
    const cycle: Record<NoteStatus, NoteStatus> = { bug: "investigating", investigating: "solved", solved: "bug" };
    updateStatus(id, cycle[current]);
  };

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-800/60 bg-[#020617] flex flex-col hidden md:flex z-50 relative">
        {/* TOPO DA SIDEBAR (Sincronizado com Header) */}
        <div className="h-16 px-6 flex items-center border-b border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-white hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 bg-cyan-500/20 rounded-md flex items-center justify-center text-cyan-400 shadow-[0_0_10px_-3px_rgba(6,182,212,0.5)]">{Icons.Logo}</div>
            CodeFocus
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Workspace</h3>
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTag(null)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTag === null ? 'bg-cyan-900/20 text-cyan-400 border border-cyan-500/10' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'}`}
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
                  onClick={() => setActiveTag(tag)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTag === tag ? 'bg-cyan-900/20 text-cyan-400 border border-cyan-500/10' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'}`}
                >
                  {Icons.Hash} {tag}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none"></div>

        {/* HEADER (Sticky & Unified) */}
        <header className="sticky top-0 z-40 w-full h-16 px-8 flex justify-between items-center border-b border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]">
           <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">CodeFocus</span>
              <span className="text-slate-700 text-[8px]">{Icons.ChevronRight}</span>
              <span className="text-cyan-500 font-bold drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">Dashboard</span>
           </div>

           <div className="flex items-center gap-6">
             {/* SYSTEM TRAY (Novos Ícones) */}
             <div className="flex items-center gap-1 pr-6 border-r border-white/10">
                <HeaderIconButton icon={Icons.Bell} label="Notificações" hasBadge />
                <HeaderIconButton icon={Icons.Help} label="Ajuda / Docs" />
                <HeaderIconButton icon={Icons.Settings} label="Configurações" />
             </div>

             {/* PERFIL */}
             <div className="flex items-center gap-4 cursor-pointer group">
               <div className="text-right hidden xl:block">
                  <p className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">Dev Senior</p>
               </div>
               <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-cyan-400 shadow-inner group-hover:border-cyan-500 transition-colors">DV</div>
             </div>
           </div>
        </header>

        {/* SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto px-8 pt-8 pb-20 relative z-10 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard label="Total de Registros" value={totalNotes} icon={Icons.Zap} colorClass="bg-blue-500/20 text-blue-400" />
            <StatCard label="Bugs Ativos" value={activeBugs} icon={Icons.AlertCircle} colorClass="bg-red-500/20 text-red-400" />
            <StatCard label="Solucionados" value={solvedCount} icon={Icons.CheckCircle} colorClass="bg-emerald-500/20 text-emerald-400" />
          </div>

          {/* FILTER & ACTIONS */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors">{Icons.Search}</div>
              <input 
                type="text" 
                placeholder="Buscar por erro..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                className="w-full bg-[#0B1121] border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-200 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all placeholder:text-slate-600" 
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto items-center">
               <div className="bg-[#0B1121] border border-slate-800 rounded-lg p-1 flex items-center">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                    title="Visualização em Grade"
                  >
                    {Icons.LayoutGrid}
                  </button>
                  <button 
                    onClick={() => setViewMode('kanban')}
                    className={`p-2 rounded transition-all ${viewMode === 'kanban' ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                    title="Visualização Kanban"
                  >
                    {Icons.LayoutKanban}
                  </button>
               </div>

               <button 
                 onClick={() => { setIsCreating(!isCreating); setEditingId(null); setNewTitle(""); setNewDesc(""); setNewCode(""); setNewTags(""); }}
                 className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-cyan-900/20"
               >
                 {Icons.Plus} {isCreating ? "Cancelar" : "Novo Registro"}
               </button>
            </div>
          </div>

          {/* FORMULÁRIO */}
          {isCreating && (
            <div className="mb-8 bg-[#0B1121] border border-slate-800 rounded-xl p-6 animate-fade-in-up shadow-2xl relative z-20">
              <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                   <h3 className="text-sm font-bold text-white">{editingId ? "Editar Registro" : "Registrar Novo Erro"}</h3>
                </div>
                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Título..." className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none" autoFocus />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Descrição..." className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:border-cyan-500 outline-none h-32 resize-none text-sm" />
                  <textarea value={newCode} onChange={e => setNewCode(e.target.value)} placeholder="Código..." className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-cyan-200 font-mono text-xs leading-relaxed focus:border-cyan-500 outline-none h-32 resize-none" />
                </div>
                <input type="text" value={newTags} onChange={e => setNewTags(e.target.value)} placeholder="Tags..." className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-2 text-slate-300 focus:border-cyan-500 outline-none text-sm" />
                <div className="flex justify-end pt-2 gap-3">
                  <button type="button" onClick={cancelForm} className="text-slate-400 hover:text-white px-4 py-2 text-sm">Cancelar</button>
                  <button type="submit" className="bg-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-500">{editingId ? "Salvar Alterações" : "Criar Registro"}</button>
                </div>
              </form>
            </div>
          )}

          {/* LISTA DE NOTAS */}
          {filteredNotes.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 opacity-40 border-2 border-dashed border-slate-800 rounded-xl">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                   {Icons.Search}
                </div>
                <p className="text-slate-400">Nenhum registro encontrado.</p>
             </div>
          ) : (
             <>
               {viewMode === 'grid' ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10 animate-fade-in-up">
                    {filteredNotes.map((note) => (
                      <div key={note.id} className="group relative bg-[#0B1121]/80 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/5 hover:-translate-y-1 flex flex-col">
                        <Link href={`/notes/${note.id}`} className="absolute inset-0 z-0" />
                        <div className="p-5 flex flex-col h-full pointer-events-none">
                          <div className="flex justify-between items-start mb-3 relative z-10 pointer-events-auto">
                            <StatusBadge status={note.status} onClick={() => cycleStatus(note.status, note.id)} />
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Link href={`/notes/${note.id}`} className="text-slate-600 hover:text-cyan-400 p-1" title="Abrir Detalhes">{Icons.Eye}</Link>
                              <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); startEditing(note); }} className="text-slate-600 hover:text-cyan-400 p-1" title="Editar">{Icons.Edit}</button>
                              <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteNote(note.id); }} className="text-slate-600 hover:text-red-400 p-1" title="Excluir">{Icons.Trash}</button>
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
                    ))}
                 </div>
               ) : (
                 <div className="h-full pb-10 animate-fade-in-up">
                    <KanbanBoard notes={filteredNotes} onStatusChange={updateStatus} />
                 </div>
               )}
             </>
          )}
        </div>
      </main>
    </div>
  );
}