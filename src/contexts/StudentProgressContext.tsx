import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { StudentProgressResult } from '../types';
import { supabase } from '../lib/supabaseClient';

interface StudentProgressContextType {
  searchResults: StudentProgressResult[];
  searchProgress: (searchTerm: string) => Promise<void>;
  clearResults: () => void;
  loading: boolean;
  error: Error | null;
}

const StudentProgressContext = createContext<StudentProgressContextType | undefined>(undefined);

export const StudentProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<StudentProgressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchProgress = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Memanggil fungsi RPC di Supabase
      const { data, error: rpcError } = await supabase.rpc('search_student_progress', {
        search_term: searchTerm.trim()
      });

      if (rpcError) throw rpcError;
      setSearchResults(data || []);
    } catch (err) {
      setError(err as Error);
      console.error("Error searching student progress:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setSearchResults([]);
    setError(null);
  }, []);

  const value = { searchResults, searchProgress, clearResults, loading, error };
  return <StudentProgressContext.Provider value={value}>{children}</StudentProgressContext.Provider>;
};

export const useStudentProgress = (): StudentProgressContextType => {
  const context = useContext(StudentProgressContext);
  if (!context) throw new Error('useStudentProgress must be used within a StudentProgressProvider');
  return context;
};