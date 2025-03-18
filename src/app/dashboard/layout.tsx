"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "~/components/ui";
import { getSession, onAuthStateChange } from "~/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { session, error: sessionError } = await getSession();
        
        if (sessionError) {
          console.error("Error checking auth session:", sessionError);
          setError("Authentication error. Please try logging in again.");
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
      } catch (err) {
        console.error("Unexpected error checking session:", err);
        router.push('/login');
      }
    };

    checkUser();
    
    // Listen for auth state changes
    const subscription = onAuthStateChange((session) => {
      if (!session) {
        router.push('/login');
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-dark-900 p-4 text-center">
        <div className="rounded-lg bg-red-900/20 p-6 text-red-400">
          <h2 className="mb-2 text-xl font-semibold">Authentication Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-dark-50">
      {children}
    </div>
  );
} 