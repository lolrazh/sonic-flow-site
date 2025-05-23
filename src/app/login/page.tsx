"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { LoadingSpinner } from "@/components/atoms/ui";
import { clientSupabase } from "@/lib/supabase/client";
import { useSession } from "@/lib/auth";
import type { AuthChangeEvent } from "@supabase/supabase-js";

export default function Login() {
  const router = useRouter();
  const { loading: sessionLoading, user } = useSession();
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !sessionLoading) {
      router.push("/dashboard");
    }
  }, [user, sessionLoading, router]);

  // Setup auth state listener
  useEffect(() => {
    const { data: { subscription } } = clientSupabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent) => {
        if (event === 'SIGNED_IN') {
          setAuthLoading(true);
          console.log('Auth event: SIGNED_IN detected. Fetching session...');
          // Get the session object containing tokens
          const { data: sessionData, error: sessionError } = await clientSupabase.auth.getSession();
          
          if (sessionError) {
            console.error('Error fetching session after SIGNED_IN:', sessionError);
            setAuthError('Failed to retrieve session details. Please try logging in again.');
            setAuthLoading(false);
            return; // Stop processing
          }

          const session = sessionData.session;
          if (session?.access_token && session?.refresh_token) {
            const { access_token, refresh_token } = session;
            const redirectUrl = `sonicflow://auth#access_token=${encodeURIComponent(access_token)}&refresh_token=${encodeURIComponent(refresh_token)}`;
            console.log(`Redirecting to Electron app: ${redirectUrl.split('#')[0]}#...tokens...`); // Don't log tokens
            window.location.href = redirectUrl; // Perform the redirect
            // Keep authLoading true as we are navigating away
          } else {
            console.error('SIGNED_IN event, but tokens missing in session:', session);
            setAuthError('Authentication succeeded but failed to get tokens for app redirect.');
            setAuthLoading(false); // Allow user interaction
            // Maybe redirect to dashboard as fallback? Or just show error.
            // router.push("/dashboard"); 
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('Auth event: SIGNED_OUT');
          setAuthLoading(false);
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Auth event: TOKEN_REFRESHED');
          // Usually no UI action needed here for login page
        } else if (event.includes('ERROR')) {
           console.error('Auth event contains error:', event);
           // Extract specific error if available in future library versions
           setAuthError("Authentication failed. Please check your credentials or try again.");
           setAuthLoading(false);
        } else {
          console.log('Other auth event:', event);
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
    <div className="flex min-h-screen flex-col bg-[rgb(12,12,12)]">
      {/* Header */}
      <header className="border-b border-white/5 bg-[rgb(18,18,18)]">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between px-8 py-4 md:flex-row">
          <div className="mb-4 flex items-center md:mb-0">
            <Link href="/" className="font-lexend text-2xl lowercase tracking-tight text-white/90">
              sonic<span className="text-white/40">flow</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Auth UI */}
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-8 py-12 max-w-7xl">
        <div className="w-full max-w-md">
          {authError && (
            <div className="mb-8 rounded-2xl border border-red-500/10 bg-red-500/5 p-6">
              <p className="font-lexend text-sm text-red-400">{authError}</p>
              <button 
                onClick={() => setAuthError(null)}
                className="mt-2 font-lexend text-xs text-red-400/60 transition-colors hover:text-red-400/90"
              >
                dismiss
              </button>
            </div>
          )}
          
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-lexend text-3xl lowercase tracking-tight text-white/90">
              welcome back
            </h1>
            <p className="font-lexend text-base text-white/40">
              sign in to your sonic flow account
            </p>
          </div>

          {authLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
              <span className="ml-3 font-lexend text-sm text-white/40">authenticating...</span>
            </div>
          ) : (
            <Auth
              supabaseClient={clientSupabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#ffffff',
                      brandAccent: '#ffffff',
                      brandButtonText: 'rgba(0,0,0,0.9)',
                      defaultButtonBackground: 'rgba(255,255,255,0.05)',
                      defaultButtonBackgroundHover: 'rgba(255,255,255,0.1)',
                      defaultButtonText: 'rgba(255,255,255,0.9)',
                      defaultButtonBorder: 'rgba(255,255,255,0.1)',
                      inputBackground: 'rgb(18,18,18)',
                      inputText: 'rgba(255,255,255,0.9)',
                      inputBorder: 'rgba(255,255,255,0.1)',
                      inputBorderFocus: 'rgba(255,255,255,0.2)',
                      inputBorderHover: 'rgba(255,255,255,0.1)',
                    },
                    fonts: {
                      bodyFontFamily: `'Lexend', sans-serif`,
                      buttonFontFamily: `'Lexend', sans-serif`,
                      inputFontFamily: `'Lexend', sans-serif`,
                      labelFontFamily: `'Lexend', sans-serif`,
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '9999px',
                      buttonBorderRadius: '9999px',
                      inputBorderRadius: '9999px',
                    },
                  },
                },
                className: {
                  button: 'text-sm lowercase font-medium !important',
                  anchor: 'text-sm text-white/40 hover:text-white/90 lowercase',
                  message: 'text-sm text-white/40',
                  label: 'text-sm text-white/60 lowercase pl-4',
                  input: 'text-sm',
                },
                style: {
                  button: {
                    fontWeight: '500',
                    textTransform: 'lowercase',
                    padding: '0.75rem 1.5rem',
                  },
                  label: {
                    textAlign: 'left',
                  },
                },
              }}
              theme="dark"
              providers={["google"]}
              redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`}
              view="sign_in"
            />
          )}
        </div>
      </div>
    </div>
  );
} 