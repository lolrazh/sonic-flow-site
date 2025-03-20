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
        priceId: 'pri_01hq7n2j8q8q8q8q8q8q8q8q8',
        customerId: user.id,
        customerEmail: user.email,
        successUrl: '/dashboard',
        customerLocale: 'en',
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
          <h2 className="font-serif text-5xl lowercase tracking-tight text-white/90 sm:text-6xl">
            simple, transparent pricing
          </h2>
          <p className="mx-auto mt-3 max-w-4xl font-lexend text-lg text-white/40">
            start with a 7-day free trial. cancel anytime.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-sm">
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-[rgb(18,18,18)] shadow-xl">
            <div className="p-8">
              <div className="text-center mb-2">
                <h3 className="font-lexend text-lg lowercase tracking-tight text-white/90">
                  flow
                </h3>
              </div>
              
              <div className="text-center mb-8">
                <div className="font-lexend text-6xl tracking-tight text-white/90">
                  $5
                  <span className="ml-1 text-xl text-white/40">/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-white/60 mr-2 text-sm leading-6">—</span>
                  <span className="font-lexend text-white/60">unlimited dictation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white/60 mr-2 text-sm leading-6">—</span>
                  <span className="font-lexend text-white/60">all compatible apps</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white/60 mr-2 text-sm leading-6">—</span>
                  <span className="font-lexend text-white/60">priority support</span>
                </li>
              </ul>

              <div className="space-y-2">
                <button
                  onClick={handleStartTrial}
                  disabled={isLoading}
                  className="block w-full rounded-full bg-white px-8 py-4 text-center font-lexend text-base font-medium text-black/90 transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? "loading..." : "start free trial"}
                </button>
                <p className="text-sm text-center font-lexend text-white/40">
                  no credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 