export type Language = 'typescript' | 'javascript' | 'python' | 'java' | 'go' | 'rust' | 'other';

export type NoteStatus = 'open' | 'resolved';

export interface Note {
  id: string;
  title: string;
  language: Language;
  description: string;
  solution?: string;
  status: NoteStatus;
  createdAt: string; // ISO Date
}

export interface NoteFilters {
  status?: NoteStatus | 'all';
  language?: Language | 'all';
}