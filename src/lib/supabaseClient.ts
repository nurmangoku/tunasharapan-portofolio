// posisi: src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Supabase Anon Key is missing. Make sure to set them in your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);