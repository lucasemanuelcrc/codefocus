"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useNotes, NoteStatus } from "@/context/NotesContext";
import { CodeBlock } from "@/components/ui/CodeBlock"; // <--- Importamos o novo componente

// --- ÍCONES ---
const Icons = {
  ArrowLeft: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Trash: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Calendar: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Tag: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
};

// --- SKELETON ---
function DetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#020617] font-sans pb-20">
       <div className="border-b border-slate-800/60 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-20 h-[73px]" />
       <div className="max-w-4xl mx-auto px-6 py-10 space-y-8 animate-pulse">
         <div className="space-y-4">
            <div className="flex gap-3"><div className="h-6 w-20 bg-slate-800 rounded-full" /><div className="h-6 w-32 bg-slate-800 rounded-full" /></div>
            <div className="h-10 w-3/4 bg-slate-800 rounded-lg" />
            <div className="flex gap-2"><div className="h-6 w-16 bg-slate-800 rounded" /><div className="h-6 w-24 bg-slate-800 rounded" /></div>
         </div>
         <div className="h-40 w-full bg-slate-800/40 border border-slate-800 rounded-xl" />
         <div className="h-64 w-full bg-slate-800/40 border border-slate-800 rounded-xl" />
       </div>
    </div>
  )
}

function StatusBadge({ status, onClick }: { status: NoteStatus; onClick?: () => void }) {
  const styles = {
    bug: "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20",
    investigating: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20",
    solved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
  };
  const labels = { bug: "Bug", investigating: "Investigating", solved: "Solved" };
  return (
    <button onClick={onClick} className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-all ${styles[status]}`}>
      {labels[status]}
    </button>
  );
}

export default function NoteDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { notes, isLoading, deleteNote, updateStatus } = useNotes();
  const note = notes.find((n) => n.id === params.id);

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este registro?")) {
      if (note) deleteNote(note.id);
      router.push("/dashboard");
    }
  };

  const cycleStatus = () => {
    if (!note) return;
    const cycle: Record<NoteStatus, NoteStatus> = { bug: "investigating", investigating: "solved", solved: "bug" };
    updateStatus(note.id, cycle[note.status]);
  };

  if (isLoading) return <DetailsSkeleton />;
  if (!note) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-slate-400 space-y-4">
        <h1 className="text-4xl font-bold text-white">404</h1>
        <p>Registro não encontrado.</p>
        <Link href="/dashboard" className="text-cyan-400 hover:underline">Voltar para Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-20">
      <header className="border-b border-slate-800/60 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">{Icons.ArrowLeft} Voltar</Link>
          <div className="flex gap-2">
            <button onClick={handleDelete} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Excluir Nota">{Icons.Trash}</button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 animate-fade-in-up">
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
             <StatusBadge status={note.status} onClick={cycleStatus} />
             <div className="flex items-center gap-1 text-xs text-slate-500 font-mono uppercase tracking-wide">{Icons.Calendar} {new Date(note.createdAt).toLocaleDateString()}</div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{note.title}</h1>
          <div className="flex flex-wrap gap-2">
            {note.tags?.map((tag, i) => <span key={i} className="flex items-center gap-1 text-xs bg-slate-800 text-cyan-200/80 px-2.5 py-1 rounded border border-slate-700">{Icons.Tag} {tag}</span>)}
          </div>
        </div>

        <div className="grid gap-8">
          <div className="bg-[#0B1121]/50 border border-slate-800 rounded-xl p-6 md:p-8">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Contexto & Descrição</h3>
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {note.description}
            </p>
          </div>

          {/* SESSÃO DE CÓDIGO COM SYNTAX HIGHLIGHTING */}
          {note.codeSnippet && (
            <div className="space-y-2">
               <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Snippet / Log de Erro</h3>
               
               {/* Usando o novo componente */}
               <CodeBlock code={note.codeSnippet} language="tsx" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}