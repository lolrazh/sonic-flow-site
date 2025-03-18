"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { SiteName, LoadingSpinner } from "~/components/ui";
import { supabase, getSession, getRedirectUrl, onAuthStateChange } from "~/lib/auth";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isSignUp = searchParams.get('auth') === 'signup';

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          router.push("/dashboard");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again.");
        setLoading(false);
      }
    };

    checkSession();

    // Add an auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        console.log('User signed in, redirecting to dashboard');
        router.push("/dashboard");
      }
    });

    // Cleanup the subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
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
          {error && (
            <div className="mb-4 rounded-lg bg-red-900/20 p-4 text-red-400">
              <p>{error}</p>
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

          <div className="overflow-hidden rounded-2xl border border-dark-700 bg-dark-800 p-8">
            <Auth
              supabaseClient={supabase}
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
          </div>

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