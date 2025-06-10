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

export interface YouTubeVideo {
  id: string; 
  title: string;
  youtube_embed_url: string; 
  description?: string;
  display_order?: number;
  created_at?: string;
}

export interface Subject {
  id: string;
  created_at?: string;
  name: string;
  short_name?: string;
}

export interface AcademicReport {
  id: string;
  created_at?: string;
  class_name: string;
  semester: 'Ganjil' | 'Genap';
  academic_year: string;
  uploaded_by?: string;
  description?: string;
}

export interface StudentGrade {
  id: string;
  created_at?: string;
  report_id: string;
  student_nisn: string;
  student_name: string;
  grades: Record<string, number>;
  notes?: string;
  attendance?: { Sakit: number; Izin: number; Alpa: number; };
  attitude?: 'Amat Baik' | 'Baik' | 'Cukup' | string;
}

export interface StudentProgressResult {
  student_nisn: string;
  student_name: string;
  class_name: string;
  semester: string;
  academic_year: string;
  grades: Record<string, number>;
  notes?: string;
  attendance?: { Sakit: number; Izin: number; Alpa: number; };
  attitude?: string;
}