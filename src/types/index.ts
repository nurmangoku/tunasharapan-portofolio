export interface Announcement {
  id: string; // Akan menjadi string (UUID dari Supabase) atau number jika Anda set auto-increment
  title: string;
  date: string; // Pertimbangkan menggunakan tipe Date jika memungkinkan di form dan Supabase
  image: string; 
  content: string;
  excerpt?: string;
  link?: string; // Mungkin tidak perlu disimpan di DB, bisa digenerate
  created_at?: string; // Dari Supabase
}

// Tipe untuk user dari Supabase Auth (bisa diperluas)
export interface User {
  id: string;
  email?: string;
  // properti lain dari Supabase user
}