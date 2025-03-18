import { createClient } from "@supabase/supabase-js";
import { type Session, type User, type AuthChangeEvent } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import 'cross-fetch/polyfill';

// Create and export Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Create a simpler client config for better browser compatibility
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export async function getSession(): Promise<{ session: Session | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error: error ?? null };
  } catch (error) {
    console.error("Error getting session:", error);
    return { session: null, error: error instanceof Error ? error : new Error(String(error)) };
  }
}

export async function signOut(): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    return { error: error ?? null };
  } catch (error) {
    console.error("Error signing out:", error);
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }
}

export function getRedirectUrl(path = "/dashboard"): string {
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

// Enhanced session hook for React components
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (err) {
        console.error("Session check error:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    void checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user,
    loading,
    error,
    signOut: async () => {
      try {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    },
  };
} 