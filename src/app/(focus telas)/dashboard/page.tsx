"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation"; // 1. Hooks de URL
import { useNotes, NoteStatus, Note } from "@/context/NotesContext";

// --- ÍCONES (Mantidos) ---
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
};

// --- SKELETON LOADING ---
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

// --- SUB-COMPONENTS ---
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

// --- DASHBOARD PAGE ---
export default function DashboardPage() {
  const { notes, addNote, updateNote, deleteNote, updateStatus, isLoading } = useNotes();
  
  // 2. Integração com URL Search Params
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Ler estado inicial da URL
  const currentTag = searchParams.get('tag');
  const initialSearch = searchParams.get('q') || '';

  // Estado local apenas para o input (evita lag ao digitar)
  const [localSearch, setLocalSearch] = useState(initialSearch);

  // Estados de UI (Formulário)
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form Fields
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newTags, setNewTags] = useState("");

  // Stats Derivados
  const totalNotes = notes.length;
  const activeBugs = notes.filter(n => n.status === 'bug').length;
  const solvedCount = notes.filter(n => n.status === 'solved').length;
  const allTags = Array.from(new Set(notes.flatMap(n => n.tags || [])));

  // 3. Função para Atualizar URL (Filtros)
  const handleFilterUpdate = (key: 'tag' | 'q', value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // Debounce na busca (Atualiza URL após usuário parar de digitar)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Só atualiza se for diferente da URL atual para evitar loop
      if (localSearch !== initialSearch) {
        handleFilterUpdate('q', localSearch);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch]);

  // 4. Lógica de Filtragem usando SearchParams
  const filteredNotes = notes.filter(note => {
    const searchLower = (currentTag ? "" : localSearch).toLowerCase(); // Prioriza Tag se selecionada? Não, combina.
    const urlSearchLower = (searchParams.get('q') || '').toLowerCase(); // Usa o da URL para consistência na filtragem final

    const matchesSearch = note.title.toLowerCase().includes(urlSearchLower) || 
                          note.description.toLowerCase().includes(urlSearchLower);
    
    const matchesTag = currentTag ? note.tags?.includes(currentTag) : true;
    
    return matchesSearch && matchesTag;
  });

  // Funções de CRUD (Mantidas)
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
      
      {/* SIDEBAR (Com Active State via URL) */}
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
                onClick={() => handleFilterUpdate('tag', null)} // Limpa tag
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentTag === null ? 'bg-cyan-900/20 text-cyan-400' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
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
                  onClick={() => handleFilterUpdate('tag', tag)} // Define tag na URL
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${currentTag === tag ? 'bg-cyan-900/20 text-cyan-400' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
                >
                  {Icons.Hash} {tag}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none"></div>

        <header className="relative z-10 px-8 py-6 flex justify-between items-center">
           <div>
             <h1 className="text-2xl font-bold text-white">Dashboard</h1>
             <p className="text-slate-500 text-sm">Bem-vindo de volta, Dev.</p>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 pb-20 relative z-10 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard label="Total de Registros" value={totalNotes} icon={Icons.Zap} colorClass="bg-blue-500/20 text-blue-400" />
            <StatCard label="Bugs Ativos" value={activeBugs} icon={Icons.AlertCircle} colorClass="bg-red-500/20 text-red-400" />
            <StatCard label="Solucionados" value={solvedCount} icon={Icons.CheckCircle} colorClass="bg-emerald-500/20 text-emerald-400" />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors">{Icons.Search}</div>
              <input 
                type="text" 
                placeholder="Buscar..." 
                value={localSearch} // Controlado localmente
                onChange={e => setLocalSearch(e.target.value)} 
                className="w-full bg-[#0B1121] border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-200 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all placeholder:text-slate-600" 
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
               <button 
                 onClick={() => { setIsCreating(!isCreating); setEditingId(null); setNewTitle(""); setNewDesc(""); setNewCode(""); setNewTags(""); }}
                 className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-cyan-900/20"
               >
                 {Icons.Plus} {isCreating ? "Cancelar" : "Novo Registro"}
               </button>
            </div>
          </div>

          {/* FORMULÁRIO (Mantido) */}
          {isCreating && (
            <div className="mb-8 bg-[#0B1121] border border-slate-800 rounded-xl p-6 animate-fade-in-up shadow-2xl relative z-20">
              <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                   <h3 className="text-sm font-bold text-white">{editingId ? "Editar Registro" : "Registrar Novo Erro"}</h3>
                </div>
                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Título..." className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none" autoFocus />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Descrição (Markdown Suportado)..." className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:border-cyan-500 outline-none h-32 resize-none text-sm font-mono" />
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

          {/* GRID (Mantido) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
            {filteredNotes.map((note) => (
              <div key={note.id} className="group relative bg-[#0B1121]/80 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/5 hover:-translate-y-1 flex flex-col">
                <Link href={`/notes/${note.id}`} className="absolute inset-0 z-0" />
                <div className="p-5 flex flex-col h-full pointer-events-none">
                  <div className="flex justify-between items-start mb-3 relative z-10 pointer-events-auto">
                    <StatusBadge status={note.status} onClick={() => cycleStatus(note.status, note.id)} />
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>
      </main>
    </div>
  );
}