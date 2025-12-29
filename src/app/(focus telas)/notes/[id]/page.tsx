"use client";

import { useNotes } from '@/context/NotesContext';
import { useRouter, useParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Note } from '@/types'; // Certifique-se de importar o tipo Note

export default function NoteDetailsPage() {
  const { getNote, toggleStatus, deleteNote, isLoading } = useNotes();
  const router = useRouter();
  const params = useParams();

  // 1. Normalização do ID com segurança de tipo
  // O TypeScript agora entende que noteId pode ser string ou undefined
  const rawId = params?.id; 
  const noteId = Array.isArray(rawId) ? rawId[0] : rawId;

  // 2. Inicialização do Estado Desacoplada
  // Não chamamos getNote aqui. Iniciamos vazio para evitar erro de TS e Race Condition.
  const [note, setNote] = useState<Note | undefined>(undefined);

  // 3. Efeito de Sincronização (Onde a mágica acontece)
  useEffect(() => {
    // Só tentamos buscar a nota se:
    // a) O contexto terminou de carregar (isLoading === false)
    // b) Temos um ID válido (noteId é string e não undefined)
    if (!isLoading && noteId) {
      const foundNote = getNote(noteId);
      setNote(foundNote);
    }
  }, [isLoading, noteId, getNote]);

  // 4. Renderização Condicional (Trava de Loading)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm animate-pulse">Carregando...</p>
        </div>
      </div>
    );
  }

  // 5. Tratamento de "Não Encontrado"
  // Se parou de carregar E note continua undefined, então realmente não existe.
  if (!note) {
    return (
      <div className="min-h-screen bg-[#020617] text-slate-400 flex flex-col items-center justify-center gap-4 animate-fade-in">
        <h2 className="text-xl font-semibold text-slate-200">Anotação não encontrada</h2>
        <p className="text-sm text-slate-500">O ID solicitado não existe ou foi removido.</p>
        <Link 
          href="/dashboard" 
          className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
        >
          Voltar ao Dashboard
        </Link>
      </div>
    );
  }

  // 6. Conteúdo da Anotação (Layout)
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-slate-300 truncate max-w-[200px]">{note.title}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-3">
             <div className="flex gap-3">
               <Badge type="language" value={note.language} />
               <Badge type="status" value={note.status} />
             </div>
             <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{note.title}</h1>
             <p className="text-slate-500 text-xs font-mono">ID: {note.id} • Criado em {new Date(note.createdAt).toLocaleDateString()}</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => toggleStatus(note.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                note.status === 'open' 
                  ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/40' 
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {note.status === 'open' ? 'Resolver' : 'Reabrir'}
            </button>
            <button 
              onClick={() => { 
                if(confirm('Tem certeza?')) {
                  deleteNote(note.id); 
                  router.push('/dashboard');
                }
              }}
              className="px-4 py-2 border border-red-900/30 text-red-400 hover:bg-red-950/20 rounded-lg transition-colors"
            >
              Excluir
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="grid gap-8">
          <Card className="bg-[#0B1121] border-slate-800 relative overflow-hidden group">
             <div className="prose prose-invert prose-sm max-w-none p-2">
               <pre className="!bg-transparent !p-0 !m-0 font-mono text-sm text-slate-300 whitespace-pre-wrap">
                 {note.description}
               </pre>
             </div>
          </Card>

          {note.solution && (
            <Card className="bg-emerald-950/5 border-emerald-900/20">
               <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">Solução</h3>
               <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                 {note.solution}
               </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}