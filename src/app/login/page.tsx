"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import SiteName from "~/app/_components/shared/SiteName";

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const isSignUp = searchParams.get('auth') === 'signup';

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    };

    checkSession();

    // Add an auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          console.log('User signed in, redirecting to dashboard');
          router.push("/dashboard");
        }
      }
    );

    // Cleanup the subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dark-600 border-t-accent-600"></div>
      </div>
    );
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
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '0.5rem',
                      buttonBorderRadius: '0.5rem',
                      inputBorderRadius: '0.5rem',
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
              providerScopes={{
                google: 'profile email'
              }}
              redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`}
              onlyThirdPartyProviders={false}
              magicLink={false}
              view={isSignUp ? "sign_up" : "sign_in"}
              showLinks={true}
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