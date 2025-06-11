import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { StudentBlogPost } from '../types';
import { supabase } from '../lib/supabaseClient';

const BLOG_IMAGES_BUCKET_NAME = 'blog_images';

interface StudentBlogsContextType {
  posts: StudentBlogPost[];
  getPostBySlug: (slug: string) => Promise<StudentBlogPost | null>;
  addPost: (postData: Omit<StudentBlogPost, 'id' | 'created_at'>) => Promise<void>;
  updatePost: (id: string, updates: Partial<Omit<StudentBlogPost, 'id' | 'created_at'>>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
  fetchPosts: () => Promise<void>;
}

const StudentBlogsContext = createContext<StudentBlogsContextType | undefined>(undefined);

export const StudentBlogsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<StudentBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('student_blogs')
        .select('*')
        .order('published_at', { ascending: false });
      if (supabaseError) throw supabaseError;
      setPosts(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const getPostBySlug = async (slug: string): Promise<StudentBlogPost | null> => {
    setLoading(true); setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('student_blogs')
        .select('*')
        .eq('slug', slug)
        .single();
      if (supabaseError) throw supabaseError;
      return data;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (postData: Omit<StudentBlogPost, 'id' | 'created_at'>) => {
    try {
      setLoading(true);
      const { error } = await supabase.from('student_blogs').insert([postData]);
      if (error) throw error;
      await fetchPosts();
    } catch (err) {
      setError(err as Error); throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: string, updates: Partial<Omit<StudentBlogPost, 'id' | 'created_at'>>) => {
    try {
      setLoading(true);
      const { error } = await supabase.from('student_blogs').update(updates).eq('id', id);
      if (error) throw error;
      await fetchPosts();
    } catch (err) {
      setError(err as Error); throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      setLoading(true);
      const postToDelete = posts.find(p => p.id === id);
      if (postToDelete?.cover_image_url) {
        try {
          const url = new URL(postToDelete.cover_image_url);
          const pathParts = url.pathname.split(`/${BLOG_IMAGES_BUCKET_NAME}/`);
          if (pathParts.length > 1) {
            await supabase.storage.from(BLOG_IMAGES_BUCKET_NAME).remove([pathParts[1]]);
          }
        } catch (storageError) {
          console.error("Error deleting blog image from storage:", storageError);
        }
      }
      const { error } = await supabase.from('student_blogs').delete().eq('id', id);
      if (error) throw error;
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err as Error); throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = { posts, getPostBySlug, addPost, updatePost, deletePost, loading, error, fetchPosts };
  return <StudentBlogsContext.Provider value={value}>{children}</StudentBlogsContext.Provider>;
};

export const useStudentBlogs = (): StudentBlogsContextType => {
  const context = useContext(StudentBlogsContext);
  if (!context) throw new Error('useStudentBlogs must be used within a StudentBlogsProvider');
  return context;
};