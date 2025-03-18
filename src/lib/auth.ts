import { createClient } from "@supabase/supabase-js";
import { type Session } from "@supabase/supabase-js";

// Create and export Supabase client with polyfill disabled for browser compatibility
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create client with fetch implementation options for browser compatibility
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    // Disable node-fetch polyfill
    fetch: fetch.bind(globalThis)
  }
});

// Auth helper functions
export async function getSession(): Promise<{ session: Session | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error: error || null };
  } catch (error) {
    console.error("Error getting session:", error);
    return { session: null, error: error instanceof Error ? error : new Error(String(error)) };
  }
}

export async function signOut(): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    return { error: error || null };
  } catch (error) {
    console.error("Error signing out:", error);
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }
}

export function getRedirectUrl(path: string = "/dashboard"): string {
  // Ensure we have the correct origin in all environments
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}${path}`;
}

// Auth state change subscription
export function onAuthStateChange(callback: (session: Session | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session);
  });
  
  return data.subscription;
} 