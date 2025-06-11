import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { StudentProgressResult } from '../types';
import { supabase } from '../lib/supabaseClient';

interface StudentProgressContextType {
  searchResults: StudentProgressResult[];
  // FIX: Mengubah signature fungsi searchProgress
  searchProgress: (nisn: string, studentName: string) => Promise<void>;
  clearResults: () => void;
  loading: boolean;
  error: Error | null;
}

const StudentProgressContext = createContext<StudentProgressContextType | undefined>(undefined);

export const StudentProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<StudentProgressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchProgress = useCallback(async (nisn: string, studentName: string) => {
    // FIX: Memeriksa kedua input
    if (!nisn.trim() || !studentName.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // FIX: Memanggil fungsi RPC yang baru dengan dua parameter
      const { data, error: rpcError } = await supabase.rpc('search_student_progress_secure', {
        nisn_param: nisn.trim(),
        name_param: studentName.trim()
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