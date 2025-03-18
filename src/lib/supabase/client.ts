import { createClient } from "@supabase/supabase-js";
import { type Database } from "../../types/supabase";

// Create a client-side Supabase client (for browser usage)
export function createClientClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

// For direct use in client components
export const clientSupabase = createClientClient(); 