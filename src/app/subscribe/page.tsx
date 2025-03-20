"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "~/lib/auth";
import { initPaddle, openCheckout } from "~/lib/paddle";
import { LoadingSpinner } from "~/components/atoms/ui";

export default function SubscribePage() {
  const router = useRouter();
  const { loading: sessionLoading, user } = useSession();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  
  useEffect(() => {
    if (!sessionLoading && !user) {
      router.push("/login");
    }
    
    initPaddle();
  }, [sessionLoading, user, router]);
  
  const handleStartTrial = () => {
    if (!user) return;
    
    setCheckoutLoading(true);
    
    openCheckout({
      email: user.email,
      customerId: user.id,
      successCallback: () => {
        setCheckoutLoading(false);
        router.push("/dashboard");
      },
      closeCallback: () => {
        setCheckoutLoading(false);
      }
    });
  };
  
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

      {/* Subscribe Content */}
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-8 py-12 max-w-7xl">
        <div className="w-full max-w-md text-center">
          <h1 className="mb-4 font-lexend text-3xl lowercase tracking-tight text-white/90">
            start your free trial
          </h1>
          <p className="mb-8 font-lexend text-base text-white/40">
            try sonic flow for 7 days free, then $5/month. cancel anytime.
          </p>

          <div className="mb-8 rounded-2xl border border-white/10 bg-[rgb(18,18,18)] p-8">
            <div className="mb-6">
              <div className="mb-2 font-lexend text-2xl font-medium text-white/90">$5</div>
              <div className="font-lexend text-sm text-white/40">per month</div>
            </div>

            <ul className="mb-8 space-y-3 text-left">
              <li className="flex items-center font-lexend text-sm text-white/90">
                <svg className="mr-3 h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                unlimited voice commands
              </li>
              <li className="flex items-center font-lexend text-sm text-white/90">
                <svg className="mr-3 h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                all supported IDEs
              </li>
              <li className="flex items-center font-lexend text-sm text-white/90">
                <svg className="mr-3 h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                priority support
              </li>
            </ul>

            <button
              onClick={handleStartTrial}
              disabled={checkoutLoading}
              className="w-full rounded-full bg-white px-6 py-3 text-center font-lexend text-sm font-medium text-black/90 transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {checkoutLoading ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner className="mr-2 h-4 w-4" />
                  processing...
                </span>
              ) : (
                "start 7-day free trial"
              )}
            </button>
          </div>

          <p className="font-lexend text-sm text-white/40">
            By starting a trial, you agree to our{" "}
            <Link href="/terms" className="text-white/60 hover:text-white/90">
              terms of service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-white/60 hover:text-white/90">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
} 