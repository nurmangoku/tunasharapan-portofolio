import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Subject } from '../types';
import { supabase } from '../lib/supabaseClient';

interface SubjectsContextType {
  subjects: Subject[];
  addSubject: (subjectData: Omit<Subject, 'id' | 'created_at'>) => Promise<void>;
  updateSubject: (id: string, updates: Partial<Omit<Subject, 'id' | 'created_at'>>) => Promise<void>;
  deleteSubject: (id: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
  fetchSubjects: () => Promise<void>;
}

const SubjectsContext = createContext<SubjectsContextType | undefined>(undefined);

export const SubjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSubjects = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data, error: supabaseError } = await supabase.from('subjects').select('*').order('name');
      if (supabaseError) throw supabaseError;
      setSubjects(data || []);
    } catch (err) { setError(err as Error); console.error("Error fetching subjects:", err); } 
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchSubjects(); }, [fetchSubjects]);

  const addSubject = async (subjectData: Omit<Subject, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('subjects').insert([subjectData]);
    if (error) throw error;
    await fetchSubjects();
  };
  const updateSubject = async (id: string, updates: Partial<Omit<Subject, 'id' | 'created_at'>>) => {
    const { error } = await supabase.from('subjects').update(updates).eq('id', id);
    if (error) throw error;
    await fetchSubjects();
  };
  const deleteSubject = async (id: string) => {
    const { error } = await supabase.from('subjects').delete().eq('id', id);
    if (error) throw error;
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const value = { subjects, addSubject, updateSubject, deleteSubject, loading, error, fetchSubjects };
  return <SubjectsContext.Provider value={value}>{children}</SubjectsContext.Provider>;
};

export const useSubjects = (): SubjectsContextType => {
  const context = useContext(SubjectsContext);
  if (!context) throw new Error('useSubjects must be used within a SubjectsProvider');
  return context;
};