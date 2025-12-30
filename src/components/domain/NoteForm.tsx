"use client";

import { useState } from "react";
import { useNotes } from "@/context/NotesContext";

export function NoteForm() {
  const { addNote } = useNotes();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [codeSnippet, setCodeSnippet] = useState(""); // Antigo 'solution'
  const [tags, setTags] = useState(""); // Antigo 'language' agora é via tags

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Transforma "React, Nextjs" em ["React", "Nextjs"]
    const tagsArray = tags.split(",").map(t => t.trim()).filter(t => t.length > 0);

    addNote({
      title,
      description,
      codeSnippet, // Agora usamos codeSnippet
      tags: tagsArray.length > 0 ? tagsArray : ["Geral"],
      status: "bug", // Padrão inicial
    });

    // Limpar formulário
    setTitle("");
    setDescription("");
    setCodeSnippet("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0B1121] border border-slate-800 rounded-xl p-6 space-y-4 shadow-xl">
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
          Título do Erro
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Hydration Error no Layout"
          className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-cyan-500 outline-none transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Descrição
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Contexto do problema..."
            className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-2 text-slate-300 focus:border-cyan-500 outline-none h-32 resize-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Snippet de Código / Log
          </label>
          <textarea
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            placeholder="Cole o código do erro aqui..."
            className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-2 text-cyan-200 font-mono text-xs focus:border-cyan-500 outline-none h-32 resize-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
          Tags (Separadas por vírgula)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="React, TypeScript, Next.js..."
          className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-2 text-slate-300 focus:border-cyan-500 outline-none transition-colors"
        />
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-cyan-900/20"
        >
          Salvar Registro
        </button>
      </div>
    </form>
  );
}