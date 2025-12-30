"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Definição Tipada da Nota (Developer-First)
export type NoteStatus = "bug" | "investigating" | "solved";

export interface Note {
  id: string;
  title: string;
  description: string;
  codeSnippet?: string; // Novo: Código do erro ou solução
  tags: string[];       // Novo: Stack (React, TS, etc)
  status: NoteStatus;   // Novo: Estado do problema
  createdAt: string;
}

interface NotesContextType {
  notes: Note[];
  isLoading: boolean;
  addNote: (note: Omit<Note, "id" | "createdAt">) => void;
  deleteNote: (id: string) => void;
  updateStatus: (id: string, newStatus: NoteStatus) => void; // Novo: Quick Toggle
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar do LocalStorage
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

  // Salvar no LocalStorage
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
    // Adiciona no topo da lista
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Função para mudar status sem abrir a nota
  const updateStatus = (id: string, newStatus: NoteStatus) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: newStatus } : n))
    );
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