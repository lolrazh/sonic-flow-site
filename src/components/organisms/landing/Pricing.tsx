"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth';
import { initPaddle, openCheckout } from '@/lib/paddle';
import type { Paddle } from '@paddle/paddle-js';

export default function Pricing() {
  const { user } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formattedPrice, setFormattedPrice] = useState<string | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);

  useEffect(() => {
    const loadPrice = async () => {
      try {
        const paddle = await initPaddle();
        const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;
        if (!priceId) throw new Error('Price ID not configured');

        const preview = await paddle.PricePreview({
          items: [{
            priceId,
            quantity: 1
          }],
          currencyCode: 'USD'
        });

        if (!preview?.data?.details?.lineItems?.[0]) {
          throw new Error('Invalid price preview response');
        }

        const lineItem = preview.data.details.lineItems[0];
        // Use the formatted subtotal directly from Paddle
        const subtotal = lineItem.formattedTotals?.subtotal;
        
        if (!subtotal) {
          throw new Error('No price information available');
        }

        setFormattedPrice(subtotal);
      } catch (err) {
        console.error('Failed to load price:', err);
        setError('Failed to load price information');
      } finally {
        setPriceLoading(false);
      }
    };

    void loadPrice();
  }, []);

  const handleStartTrial = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!user) {
      // If not logged in, redirect to signup
      window.location.href = '/signup';
      return;
    }

    if (!process.env.NEXT_PUBLIC_PADDLE_PRICE_ID) {
      setError('Configuration error. Please contact support.');
      return;
    }

    setIsLoading(true);

    try {
      // Initialize Paddle and open checkout
      await initPaddle();
      await openCheckout({
        priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID,
        customerId: user.id,
        customerEmail: user.email,
        successUrl: `${window.location.origin}/dashboard`,
        customerLocale: 'en',
      });
    } catch (error) {
      console.error('Failed to start trial:', error);
      setError('Something went wrong. Please try again later or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (amount: string, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(amount));
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
                  {priceLoading ? (
                    <span className="text-white/40">...</span>
                  ) : formattedPrice ? (
                    <>
                      {formattedPrice}
                      <span className="ml-1 text-xl text-white/40">/month</span>
                    </>
                  ) : (
                    <span className="text-white/40">Error loading price</span>
                  )}
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
                {error && (
                  <p className="text-sm text-center font-lexend text-red-400">
                    {error}
                  </p>
                )}
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