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

// BARU: Tipe untuk data Guru
export interface Teacher {
  id: string; // UUID dari Supabase
  name: string;
  position: string; // Jabatan (Kepala Sekolah, Guru, Tenaga Kependidikan, dll.)
  subject: string;  // Mata pelajaran atau Bidang Tugas
  image: string;    // URL ke foto guru di Supabase Storage
  instagram_url?: string; // URL profil Instagram (opsional)
  display_order?: number; // Opsional untuk pengurutan, bisa null atau tidak ada
  created_at?: string; // Dari Supabase
}