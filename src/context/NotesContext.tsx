"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Note } from '@/types';

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'status'>) => void;
  toggleStatus: (id: string) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
  isLoading: boolean; // 👈 OBRIGATÓRIO
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  // 1. Inicia como TRUE para impedir renderizações prematuras
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2. Busca do LocalStorage
    const saved = localStorage.getItem('codefocus_db');
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao parsear notas:", e);
      }
    }
    // 3. Só libera a UI depois de processar os dados locais
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Só salva se já tiver carregado (para não sobrescrever com array vazio no boot)
    if (!isLoading) {
      localStorage.setItem('codefocus_db', JSON.stringify(notes));
    }
  }, [notes, isLoading]);

  // Helpers de CRUD
  const addNote = (data: Omit<Note, 'id' | 'createdAt' | 'status'>) => {
    const newNote: Note = {
      ...data,
      id: crypto.randomUUID(),
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const toggleStatus = (id: string) => {
    setNotes((prev) => prev.map(n => 
      n.id === id ? { ...n, status: n.status === 'open' ? 'resolved' : 'open' } : n
    ));
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter(n => n.id !== id));
  };

  const getNote = (id: string) => notes.find(n => n.id === id);

  return (
    <NotesContext.Provider value={{ notes, addNote, toggleStatus, deleteNote, getNote, isLoading }}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within NotesProvider");
  return context;
};