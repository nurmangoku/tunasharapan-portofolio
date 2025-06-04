import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Teacher } from '../types';
import { supabase } from '../lib/supabaseClient';

// MODIFIKASI: Nama bucket disesuaikan
const TEACHER_PHOTOS_BUCKET_NAME = 'teacherphotos'; 

interface TeachersContextType {
  teachers: Teacher[];
  getTeacherById: (id: string) => Teacher | undefined;
  addTeacher: (teacherData: Omit<Teacher, 'id' | 'created_at'>) => Promise<void>;
  updateTeacher: (id: string, updates: Partial<Omit<Teacher, 'id' | 'created_at'>>) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
  fetchTeachers: () => Promise<void>;
}

const TeachersContext = createContext<TeachersContextType | undefined>(undefined);

export const TeachersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('teachers')
        .select('*')
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('name', { ascending: true });

      if (supabaseError) throw supabaseError;
      
      setTeachers(data?.map(item => ({
        ...item, 
        id: String(item.id),
        display_order: item.display_order === null ? undefined : item.display_order, 
      } as Teacher)) || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred while fetching teachers'));
      console.error("Error fetching teachers:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const getTeacherById = (id: string): Teacher | undefined => {
    return teachers.find(t => t.id === id);
  };

  const addTeacher = async (teacherData: Omit<Teacher, 'id' | 'created_at'>) => {
    try {
      setLoading(true);
      const dataToInsert = {
        ...teacherData,
        display_order: teacherData.display_order === undefined || teacherData.display_order === null || String(teacherData.display_order).trim() === '' 
                       ? null 
                       : Number(teacherData.display_order)
      };

      const { data, error: supabaseError } = await supabase
        .from('teachers')
        .insert([dataToInsert])
        .select();
      if (supabaseError) throw supabaseError;
      if (data) await fetchTeachers(); 
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add teacher'));
      console.error("Error adding teacher:", err);
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  const updateTeacher = async (id: string, updates: Partial<Omit<Teacher, 'id' | 'created_at'>>) => {
    try {
      setLoading(true);
      const dataToUpdate = {
        ...updates,
        display_order: updates.display_order === undefined || updates.display_order === null || String(updates.display_order).trim() === ''
                       ? null 
                       : Number(updates.display_order)
      };

      const { data, error: supabaseError } = await supabase
        .from('teachers')
        .update(dataToUpdate)
        .eq('id', id)
        .select();
      if (supabaseError) throw supabaseError;
      if (data) await fetchTeachers(); 
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update teacher'));
      console.error("Error updating teacher:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTeacher = async (id: string) => {
    try {
      setLoading(true);
      const teacherToDelete = teachers.find(t => t.id === id);
      if (teacherToDelete && teacherToDelete.image) {
        try {
          const url = new URL(teacherToDelete.image);
          const pathParts = url.pathname.split(`/${TEACHER_PHOTOS_BUCKET_NAME}/`); // Menggunakan nama bucket yang benar
          if (pathParts.length > 1) {
            const imagePath = pathParts[1];
            await supabase.storage.from(TEACHER_PHOTOS_BUCKET_NAME).remove([imagePath]); // Menggunakan nama bucket yang benar
          }
        } catch (storageError) {
          console.error("Error deleting teacher image from storage:", storageError);
        }
      }
      const { error: supabaseError } = await supabase.from('teachers').delete().eq('id', id);
      if (supabaseError) throw supabaseError;
      setTeachers(prev => prev.filter(t => t.id !== id)); 
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete teacher'));
      console.error("Error deleting teacher:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = { teachers, getTeacherById, addTeacher, updateTeacher, deleteTeacher, loading, error, fetchTeachers };
  return <TeachersContext.Provider value={value}>{children}</TeachersContext.Provider>;
};

export const useTeachers = (): TeachersContextType => {
  const context = useContext(TeachersContext);
  if (context === undefined) throw new Error('useTeachers must be used within a TeachersProvider');
  return context;
};