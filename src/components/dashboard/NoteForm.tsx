import { useState, useEffect } from "react";
import { Note } from "@/context/NotesContext";

interface NoteFormProps {
  initialData?: Note | null; // Se for edição
  onSubmit: (data: { title: string; description: string; codeSnippet: string; tags: string[] }) => void;
  onCancel: () => void;
}

export function NoteForm({ initialData, onSubmit, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState("");

  // Carrega dados se for edição
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDesc(initialData.description);
      setCode(initialData.codeSnippet || "");
      setTags(initialData.tags.join(", "));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const tagsArray = tags.split(",").map(t => t.trim()).filter(t => t.length > 0);
    
    onSubmit({
      title,
      description: desc,
      codeSnippet: code,
      tags: tagsArray.length > 0 ? tagsArray : ["Geral"]
    });
  };

  return (
    <div className="mb-8 bg-[#0B1121] border border-slate-800 rounded-xl p-6 animate-fade-in-up shadow-2xl relative z-20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center mb-2">
           <h3 className="text-sm font-bold text-white">{initialData ? "Editar Registro" : "Registrar Novo Erro"}</h3>
        </div>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título..." className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none" autoFocus />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Descrição..." className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:border-cyan-500 outline-none h-32 resize-none text-sm" />
          <textarea value={code} onChange={e => setCode(e.target.value)} placeholder="Código..." className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-cyan-200 font-mono text-xs leading-relaxed focus:border-cyan-500 outline-none h-32 resize-none" />
        </div>
        <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags..." className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-2 text-slate-300 focus:border-cyan-500 outline-none text-sm" />
        <div className="flex justify-end pt-2 gap-3">
          <button type="button" onClick={onCancel} className="text-slate-400 hover:text-white px-4 py-2 text-sm">Cancelar</button>
          <button type="submit" className="bg-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-500">{initialData ? "Salvar Alterações" : "Criar Registro"}</button>
        </div>
      </form>
    </div>
  );
}