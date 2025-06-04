import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { YouTubeVideo } from '../types';
import { supabase } from '../lib/supabaseClient';

interface YouTubeVideosContextType {
  videos: YouTubeVideo[];
  getVideoById: (id: string) => YouTubeVideo | undefined;
  addVideo: (videoData: Omit<YouTubeVideo, 'id' | 'created_at'>) => Promise<void>;
  updateVideo: (id: string, updates: Partial<Omit<YouTubeVideo, 'id' | 'created_at'>>) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
  fetchVideos: () => Promise<void>;
}

const YouTubeVideosContext = createContext<YouTubeVideosContextType | undefined>(undefined);

export const YouTubeVideosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('youtube_videos')
        .select('*')
        .order('display_order', { ascending: true, nullsFirst: false }) // SERIAL akan diurutkan
        .order('created_at', { ascending: false }); 

      if (supabaseError) throw supabaseError;
      
      setVideos(data?.map(item => ({
        ...item, 
        id: String(item.id),
        // display_order akan datang dari DB sebagai number karena SERIAL
      } as YouTubeVideo)) || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred while fetching videos'));
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const getVideoById = (id: string): YouTubeVideo | undefined => {
    return videos.find(v => v.id === id);
  };

  const addVideo = async (videoData: Omit<YouTubeVideo, 'id' | 'created_at'>) => {
    try {
      setLoading(true);
      // Untuk kolom SERIAL (display_order), jika tidak ingin override, jangan kirim fieldnya
      // atau kirim 'DEFAULT' jika API mengizinkan (Supabase JS client biasanya tidak)
      // Jika display_order dikirim sebagai undefined, Supabase akan menggunakan nilai default SERIAL.
      const dataToInsert: any = { ...videoData };
      if (videoData.display_order === undefined || String(videoData.display_order).trim() === '') {
        delete dataToInsert.display_order; // Biarkan SERIAL bekerja
      } else {
        dataToInsert.display_order = Number(videoData.display_order);
      }

      const { data, error: supabaseError } = await supabase
        .from('youtube_videos')
        .insert([dataToInsert])
        .select();
      if (supabaseError) throw supabaseError;
      if (data) await fetchVideos();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add video'));
      console.error("Error adding video:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateVideo = async (id: string, updates: Partial<Omit<YouTubeVideo, 'id' | 'created_at'>>) => {
    try {
      setLoading(true);
      const dataToUpdate: any = { ...updates };
      if (updates.display_order === undefined || String(updates.display_order).trim() === '') {
        // Jika ingin mengosongkan display_order (jika kolomnya nullable INTEGER, bukan SERIAL murni)
        // dataToUpdate.display_order = null; 
        // Untuk SERIAL, biasanya tidak diupdate ke null, tapi bisa diupdate ke nilai lain.
        // Jika dikosongkan di form, kita bisa memilih untuk tidak mengirim field ini.
        delete dataToUpdate.display_order;
      } else {
        dataToUpdate.display_order = Number(updates.display_order);
      }

      const { data, error: supabaseError } = await supabase
        .from('youtube_videos')
        .update(dataToUpdate)
        .eq('id', id)
        .select();
      if (supabaseError) throw supabaseError;
      if (data) await fetchVideos();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update video'));
      console.error("Error updating video:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      setLoading(true);
      const { error: supabaseError } = await supabase.from('youtube_videos').delete().eq('id', id);
      if (supabaseError) throw supabaseError;
      setVideos(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete video'));
      console.error("Error deleting video:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = { videos, getVideoById, addVideo, updateVideo, deleteVideo, loading, error, fetchVideos };
  return <YouTubeVideosContext.Provider value={value}>{children}</YouTubeVideosContext.Provider>;
};

export const useYouTubeVideos = (): YouTubeVideosContextType => {
  const context = useContext(YouTubeVideosContext);
  if (context === undefined) throw new Error('useYouTubeVideos must be used within a YouTubeVideosProvider');
  return context;
};