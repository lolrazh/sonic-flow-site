"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { SiteName, LoadingSpinner } from "~/components/ui";
import { clientSupabase } from "~/lib/supabase/client";
import { useSession } from "~/lib/auth";
import type { AuthChangeEvent } from "@supabase/supabase-js";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading: sessionLoading, user } = useSession();
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const isSignUp = searchParams?.get('auth') === 'signup';

  // Redirect if already logged in
  useEffect(() => {
    if (user && !sessionLoading) {
      router.push("/dashboard");
    }
  }, [user, sessionLoading, router]);

  // Setup auth state listener
  useEffect(() => {
    const { data: { subscription } } = clientSupabase.auth.onAuthStateChange(
      (event: AuthChangeEvent) => {
        if (event === 'SIGNED_IN') {
          setAuthLoading(true);
          router.push("/dashboard");
        } else if (event === 'SIGNED_OUT') {
          setAuthLoading(false);
        } else if (event.includes('ERROR')) {
          setAuthError("Authentication failed. Please try again.");
          setAuthLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (sessionLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-dark-900">
      {/* Header */}
      <header className="border-b border-dark-800 py-4">
        <div className="container mx-auto px-4">
          <SiteName />
        </div>
      </header>

      {/* Auth UI */}
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {authError && (
            <div className="mb-4 rounded-lg bg-red-900/20 p-4 text-red-400">
              <p>{authError}</p>
              <button 
                onClick={() => setAuthError(null)}
                className="mt-2 text-sm text-red-400 hover:text-red-300"
              >
                Dismiss
              </button>
            </div>
          )}
          
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-dark-50">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-dark-300">
              {isSignUp ? "Sign up to start using Sonic Flow" : "Sign in to your Sonic Flow account"}
            </p>
          </div>

          {authLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
              <span className="ml-3 text-dark-300">Authenticating...</span>
            </div>
          ) : (
            <Auth
              supabaseClient={clientSupabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#f97316', // accent-600 (orange)
                      brandAccent: '#ea580c', // accent-700
                      inputBackground: '#1f2937', // dark-700
                      inputText: '#f9fafb', // dark-50
                      inputBorder: '#374151', // dark-600
                    },
                  },
                },
                className: {
                  button: 'text-dark-50 font-medium',
                  anchor: 'text-accent-500 hover:text-accent-400',
                  message: 'text-dark-300',
                  label: 'text-dark-200',
                },
              }}
              theme="dark"
              providers={["google"]}
              redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`}
              view={isSignUp ? "sign_up" : "sign_in"}
            />
          )}

          <div className="mt-6 text-center text-sm text-dark-400">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-accent-500 hover:text-accent-400">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Link href="/login?auth=signup" className="font-medium text-accent-500 hover:text-accent-400">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 