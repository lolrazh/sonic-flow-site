"use client";

import React, { useState } from 'react';
import { useSession } from '@/lib/auth';
import { initPaddle, openCheckout } from '@/lib/paddle';

export default function Pricing() {
  const { user } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTrial = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user) {
      // If not logged in, redirect to signup
      window.location.href = '/signup';
      return;
    }

    setIsLoading(true);

    try {
      // Initialize Paddle and open checkout
      await initPaddle();
      await openCheckout({
        email: user.email,
        customerId: user.id,
        successCallback: () => {
          window.location.href = '/dashboard';
        },
        closeCallback: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error('Failed to start trial:', error);
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[rgb(12,12,12)]" id="pricing">
      <div className="container mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-lexend text-3xl lowercase tracking-tight text-white/90 sm:text-4xl">
            simple, transparent pricing
          </h2>
          <p className="mx-auto mt-3 max-w-4xl font-lexend text-lg text-white/40">
            start with a 7-day free trial. cancel anytime.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-lg">
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-[rgb(18,18,18)] shadow-xl">
            <div className="px-6 pt-8">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-lexend text-2xl lowercase tracking-tight text-white/90">pro</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="font-lexend text-5xl tracking-tight text-white/90">$5</span>
                    <span className="ml-1 font-lexend text-2xl text-white/40">/month</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-8 pt-6">
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <span className="font-lexend text-white/60">unlimited dictation</span>
                </li>
                <li className="flex space-x-3">
                  <span className="font-lexend text-white/60">all compatible apps</span>
                </li>
                <li className="flex space-x-3">
                  <span className="font-lexend text-white/60">priority support</span>
                </li>
              </ul>

              <button
                onClick={handleStartTrial}
                disabled={isLoading}
                className="mt-8 block w-full rounded-full bg-white px-6 py-3 text-center font-lexend text-sm text-black/90 transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "loading..." : "start free trial"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 