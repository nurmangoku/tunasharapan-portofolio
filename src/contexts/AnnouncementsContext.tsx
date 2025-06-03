import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Announcement } from '../types';
import { supabase } from '../lib/supabaseClient';

interface AnnouncementsContextType {
  announcements: Announcement[];
  getAnnouncementById: (id: string) => Announcement | undefined;
  addAnnouncement: (announcementData: Omit<Announcement, 'id' | 'created_at' | 'link'>) => Promise<void>;
  updateAnnouncement: (id: string, updates: Partial<Omit<Announcement, 'id' | 'created_at'>>) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
  fetchAnnouncements: () => Promise<void>;
}

const AnnouncementsContext = createContext<AnnouncementsContextType | undefined>(undefined);

const ANNOUNCEMENT_IMAGES_BUCKET_NAME = 'announcementimages'; // Nama bucket yang sudah disesuaikan

export const AnnouncementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('announcements')
        .select('*')
        .order('date', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }
      
      const transformedData = data?.map(item => ({
        ...item,
        id: String(item.id),
        link: `/pengumuman/${item.id}`,
        excerpt: item.excerpt || (item.content && typeof item.content === 'string' ? item.content.substring(0, 100) + '...' : ''),
      })) || [];
      setAnnouncements(transformedData);

    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred while fetching announcements'));
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const getAnnouncementById = (id: string): Announcement | undefined => {
    return announcements.find(ann => ann.id === id);
  };

  const addAnnouncement = async (announcementData: Omit<Announcement, 'id' | 'created_at' | 'link'>) => {
    try {
      setLoading(true);
      const { data, error: supabaseError } = await supabase
        .from('announcements')
        .insert([announcementData])
        .select();

      if (supabaseError) throw supabaseError;

      if (data && data.length > 0) {
        await fetchAnnouncements(); 
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add announcement'));
      console.error("Error adding announcement:", err);
      throw err;
    } finally {
        setLoading(false);
    }
  };

  const updateAnnouncement = async (id: string, updates: Partial<Omit<Announcement, 'id' | 'created_at'>>) => {
    try {
      setLoading(true);
      const { data, error: supabaseError } = await supabase
        .from('announcements')
        .update(updates)
        .eq('id', id)
        .select();

      if (supabaseError) throw supabaseError;
      
      if (data) {
         await fetchAnnouncements();
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update announcement'));
      console.error("Error updating announcement:", err);
      throw err;
    } finally {
        setLoading(false);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      setLoading(true);
      const announcementToDelete = announcements.find(ann => ann.id === id);
      if (announcementToDelete && announcementToDelete.image) {
        try {
          const url = new URL(announcementToDelete.image);
          const pathParts = url.pathname.split(`/${ANNOUNCEMENT_IMAGES_BUCKET_NAME}/`); 
          if (pathParts.length > 1) {
            const imagePath = pathParts[1];
            console.log(`Attempting to delete image from storage: ${ANNOUNCEMENT_IMAGES_BUCKET_NAME}/${imagePath}`);
            const { error: deleteStorageError } = await supabase.storage
              .from(ANNOUNCEMENT_IMAGES_BUCKET_NAME) 
              .remove([imagePath]);
            if (deleteStorageError) {
              console.error("Error deleting image from storage:", deleteStorageError);
            } else {
              console.log("Image successfully deleted from storage.");
            }
          }
        } catch (storageError) {
          console.error("Error processing image URL for deletion from storage:", storageError);
        }
      }

      const { error: supabaseError } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);

      if (supabaseError) throw supabaseError;
      
      setAnnouncements(prev => prev.filter(ann => ann.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete announcement'));
      console.error("Error deleting announcement:", err);
      throw err;
    } finally {
        setLoading(false);
    }
  };

  const value = {
    announcements,
    getAnnouncementById,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    loading,
    error,
    fetchAnnouncements,
  };

  return (
    <AnnouncementsContext.Provider value={value}>
      {children}
    </AnnouncementsContext.Provider>
  );
};

export const useAnnouncements = (): AnnouncementsContextType => {
  const context = useContext(AnnouncementsContext);
  if (context === undefined) {
    throw new Error('useAnnouncements must be used within an AnnouncementsProvider');
  }
  return context;
};