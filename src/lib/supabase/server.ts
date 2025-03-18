import { createClient } from "@supabase/supabase-js";
import { type Database } from "../../types/supabase";

// Create a server-side Supabase client (used in Server Components and API routes)
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  
  // Create a Supabase client with the service role key for full admin access
  // This should ONLY be used in server-side code
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  });
}

// For use in RSC (React Server Components)
export const serverSupabase = createServerClient(); 