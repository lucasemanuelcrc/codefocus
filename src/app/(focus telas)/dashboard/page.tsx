"use client";

import { useState } from "react";
import { useNotes, NoteStatus, Note } from "@/context/NotesContext";
import { KanbanBoard } from "@/components/domain/KanbanBoard";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { NoteForm } from "@/components/dashboard/NoteForm";
import { NoteGrid } from "@/components/dashboard/NoteGrid";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"; // Lembre de criar o arquivo

export default function DashboardPage() {
  const { notes, addNote, updateNote, deleteNote, updateStatus, isLoading } = useNotes();
  
  // Estado Local
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null); // Armazena objeto completo
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'kanban'>('grid');

  // Lógica de Filtro
  const allTags = Array.from(new Set(notes.flatMap(n => n.tags || [])));
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag ? note.tags?.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  // Métricas
  const stats = {
    total: notes.length,
    bugs: notes.filter(n => n.status === 'bug').length,
    solved: notes.filter(n => n.status === 'solved').length
  };

  // Handlers
  const startEditing = (note: Note) => {
    setEditingNote(note);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = (data: { title: string; description: string; codeSnippet: string; tags: string[] }) => {
    if (editingNote) {
      updateNote(editingNote.id, data);
    } else {
      addNote({ ...data, status: "bug" });
    }
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setIsCreating(false);
    setEditingNote(null);
  };

  const cycleStatus = (current: NoteStatus, id: string) => {
    const cycle: Record<NoteStatus, NoteStatus> = { bug: "investigating", investigating: "solved", solved: "bug" };
    updateStatus(id, cycle[current]);
  };

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans overflow-hidden">
      
      <Sidebar 
        allTags={allTags} 
        activeTag={activeTag} 
        onTagClick={setActiveTag} 
      />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none"></div>

        <Header />

        <div className="flex-1 overflow-y-auto px-8 pb-20 relative z-10 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          
          <StatsOverview 
            total={stats.total} 
            bugs={stats.bugs} 
            solved={stats.solved} 
          />

          <FilterBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            viewMode={viewMode}
            onViewChange={setViewMode}
            isCreating={isCreating}
            onToggleCreate={() => {
              if(isCreating) handleCloseForm();
              else setIsCreating(true);
            }}
          />

          {isCreating && (
            <NoteForm 
              initialData={editingNote} 
              onSubmit={handleFormSubmit} 
              onCancel={handleCloseForm} 
            />
          )}

          {viewMode === 'grid' ? (
            <NoteGrid 
              notes={filteredNotes} 
              onStatusCycle={cycleStatus} 
              onEdit={startEditing} 
              onDelete={deleteNote} 
            />
          ) : (
            <div className="h-full pb-10 animate-fade-in-up">
              <KanbanBoard 
                 notes={filteredNotes} 
                 onStatusChange={updateStatus} 
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}