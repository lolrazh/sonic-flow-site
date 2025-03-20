"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { LoadingSpinner } from "~/components/atoms/ui";
import { clientSupabase } from "~/lib/supabase/client";
import { useSession } from "~/lib/auth";
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
                      brandAccent: 'rgba(255,255,255,0.9)',
                      brandButtonText: 'rgba(255,255,255,0.9)',
                      defaultButtonBackground: '#ffffff',
                      defaultButtonBackgroundHover: 'rgba(255,255,255,0.9)',
                      defaultButtonText: 'rgba(0,0,0,0.9)',
                      defaultButtonBorder: 'rgba(255,255,255,0.1)',
                      inputBackground: 'rgb(18,18,18)',
                      inputText: 'rgba(255,255,255,0.9)',
                      inputBorder: 'rgba(255,255,255,0.1)',
                      inputBorderFocus: 'rgba(255,255,255,0.2)',
                      inputBorderHover: 'rgba(255,255,255,0.1)',
                      dividerBackground: 'rgba(255,255,255,0.1)',
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
                    space: {
                      buttonPadding: '12px 32px',
                      inputPadding: '8px 24px',
                    },
                  },
                },
                className: {
                  button: 'text-sm font-medium lowercase transition-colors sm:text-base [&:not(:empty)]:opacity-100 relative overflow-hidden text-center',
                  anchor: 'text-sm text-white/40 hover:text-white/90 lowercase',
                  message: 'text-sm text-white/40',
                  label: 'text-sm text-white/60 lowercase pl-4',
                  input: 'text-sm',
                },
                style: {
                  button: {
                    fontWeight: '500',
                    textTransform: 'lowercase',
                  },
                  label: {
                    textAlign: 'left',
                  },
                  anchor: {
                    opacity: '1 !important',
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