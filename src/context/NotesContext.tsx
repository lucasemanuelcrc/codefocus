"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
// 1. IMPORTAR A FUNÇÃO TOAST
import { toast } from "sonner";

export type NoteStatus = "bug" | "investigating" | "solved";

export interface Note {
  id: string;
  title: string;
  description: string;
  codeSnippet?: string;
  tags: string[];
  status: NoteStatus;
  createdAt: string;
}

interface NotesContextType {
  notes: Note[];
  isLoading: boolean;
  addNote: (note: Omit<Note, "id" | "createdAt">) => void;
  deleteNote: (id: string) => void;
  updateStatus: (id: string, newStatus: NoteStatus) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("codefocus-notes");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar notas", e);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("codefocus-notes", JSON.stringify(notes));
    }
  }, [notes, isLoading]);

  const addNote = (noteData: Omit<Note, "id" | "createdAt">) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...noteData,
    };
    setNotes((prev) => [newNote, ...prev]);
    
    // 2. FEEDBACK DE SUCESSO
    toast.success("Registro criado!", {
      description: `"${newNote.title}" foi adicionado ao workspace.`,
    });
  };

  const deleteNote = (id: string) => {
    // Salvamos a nota antes de deletar para poder desfazer (Opcional, mas elegante)
    const noteToDelete = notes.find(n => n.id === id);
    
    setNotes((prev) => prev.filter((n) => n.id !== id));
    
    // 3. FEEDBACK DE REMOÇÃO COM UNDO (DESFAZER)
    toast.error("Registro movido para lixeira", {
      description: noteToDelete?.title,
      action: {
        label: "Desfazer",
        onClick: () => {
          if (noteToDelete) {
             setNotes((prev) => [noteToDelete, ...prev]);
             toast.success("Ação desfeita.");
          }
        },
      },
    });
  };

  const updateStatus = (id: string, newStatus: NoteStatus) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: newStatus } : n))
    );
    // Nota: Geralmente não mostramos toast para mudança de status rápida 
    // para não poluir a tela, mas você pode adicionar se quiser.
  };

  return (
    <NotesContext.Provider value={{ notes, isLoading, addNote, deleteNote, updateStatus }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}