export interface Announcement {
  id: string; 
  title: string;
  date: string; 
  image: string; 
  content: string;
  excerpt?: string;
  link?: string; 
  created_at?: string; 
}

export interface User {
  id: string;
  email?: string;
}

export interface Teacher {
  id: string; 
  name: string;
  position: string; 
  subject: string;  
  image: string;    
  instagram_url?: string; 
  display_order?: number; 
  created_at?: string; 
}

// BARU: Tipe untuk data Video YouTube
export interface YouTubeVideo {
  id: string; // UUID dari Supabase
  title: string;
  youtube_embed_url: string; // URL embed dari YouTube
  description?: string;
  display_order?: number; // Sesuai dengan SERIAL di SQL, bisa di-handle sebagai opsional di form
  created_at?: string;
}