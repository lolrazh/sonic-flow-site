"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking auth session:", error);
          router.push('/login');
          return;
        }
        
        if (!session) {
          console.log("No active session found, redirecting to login");
          router.push('/login');
        } else {
          console.log("Active session found, user is authenticated");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Unexpected error checking session:", error);
        router.push('/login');
      }
    };

    checkUser();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          router.push('/login');
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dark-600 border-t-accent-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-dark-50">
      {children}
    </div>
  );
} 