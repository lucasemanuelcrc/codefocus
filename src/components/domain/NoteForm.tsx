"use client";

import { useState } from 'react';
import { useNotes } from '@/context/NotesContext';
import { Card } from '../ui/Card';
import { Language } from '@/types';
import { Button } from '../ui/Button';

export function NoteForm() {
  const { addNote } = useNotes();
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState<Language>('typescript');
  const [desc, setDesc] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [solution, setSolution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) return;
    
    setIsSubmitting(true);
    // Simulating a "processing" feel
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Agora passamos o codeSnippet também. 
    // Nota: É necessário atualizar a interface Note no types/index.ts para aceitar codeSnippet se ainda não existir.
    // Assumindo que description pode concatenar ou salvamos em description por enquanto se não alterarmos o type.
    // Para ser correto arquiteturalmente, vamos assumir que o type foi atualizado ou concatenar.
    // Vou concatenar no description visualmente para manter compatibilidade com o type existente, 
    // ou idealmente, o type Note teria 'codeSnippet'. Vamos concatenar formatado para garantir o MVP sem quebrar types.
    
    const fullDescription = codeSnippet 
      ? `${desc}\n\n\`\`\`${language}\n${codeSnippet}\n\`\`\`` 
      : desc;

    addNote({ title, language, description: fullDescription, solution });
    
    setTitle('');
    setDesc('');
    setCodeSnippet('');
    setSolution('');
    setIsSubmitting(false);
  };

  const inputClasses = "w-full bg-[#0B1121] border border-slate-800/60 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600 font-medium text-sm hover:border-slate-700";
  const labelClasses = "block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1";

  return (
    <Card className="border-0 bg-gradient-to-b from-slate-900/80 to-[#020617]/90 backdrop-blur-xl shadow-2xl shadow-black/40 ring-1 ring-white/5">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Row 1: Title & Language */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <label className={labelClasses}>Título do Problema</label>
            <input 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className={inputClasses} 
              placeholder="Ex: Hydration Mismatch ao usar Date.now()" 
              required
            />
          </div>
          <div className="md:col-span-4">
            <label className={labelClasses}>Linguagem</label>
            <div className="relative">
              <select 
                value={language} 
                onChange={e => setLanguage(e.target.value as Language)} 
                className={`${inputClasses} appearance-none cursor-pointer`}
              >
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="rust">Rust</option>
                <option value="go">Go</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Description */}
        <div>
          <label className={labelClasses}>Descrição do Erro</label>
          <textarea 
            value={desc} 
            onChange={e => setDesc(e.target.value)} 
            className={`${inputClasses} min-h-[100px] resize-y`} 
            placeholder="Descreva o contexto onde o erro ocorre..." 
            required
          />
        </div>

        {/* Row 3: Code Snippet (New) */}
        <div>
          <label className={`${labelClasses} flex items-center gap-2`}>
            <span>Código do Erro</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 normal-case tracking-normal">Snippet</span>
          </label>
          <textarea 
            value={codeSnippet} 
            onChange={e => setCodeSnippet(e.target.value)} 
            className={`${inputClasses} font-mono text-xs leading-relaxed bg-[#050912] border-slate-800/80 min-h-[140px] text-cyan-100/90`} 
            placeholder="// Cole o trecho de código ou stack trace aqui..."
            spellCheck={false} 
          />
        </div>

        {/* Row 4: Solution */}
        <div>
          <label className={`${labelClasses} text-emerald-500/80`}>Possível Solução (Opcional)</label>
          <textarea 
            value={solution} 
            onChange={e => setSolution(e.target.value)} 
            className={`${inputClasses} min-h-[80px] border-emerald-900/20 focus:border-emerald-500/30 focus:ring-emerald-500/10`} 
            placeholder="Passos para resolução ou hipóteses..." 
          />
        </div>

        {/* Footer Actions */}
        <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-800/50">
           <span className="text-xs text-slate-500">
             * Campos obrigatórios
           </span>
           <Button 
             type="submit" 
             isLoading={isSubmitting}
             className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.2)]"
           >
             Salvar Anotação
           </Button>
        </div>
      </form>
    </Card>
  );
}