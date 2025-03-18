"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { type PricingProps } from './types';

/**
 * Pricing component - displays pricing plans and options
 */
export default function Pricing({
  title = "Simple Pricing",
  subtitle = "One low price. Unlimited transcription. Cancel anytime.",
  price = 5,
  currency = "$",
  trialDays = 7,
  features = [
    "Unlimited dictation time",
    "Use in any desktop application",
    "Advanced AI transcription",
    "Regular updates",
    "Email support"
  ],
  ctaText = "Start Your Free Trial",
  ctaHref = "/signup"
}: PricingProps = {}) {
  const [isAnnual, setIsAnnual] = useState(true);
  
  // Price values
  const monthlyPrice = Math.round(price * 1.2); // 20% more for monthly
  const annualPrice = price;
  const savingsPercent = Math.round(((monthlyPrice - annualPrice) / monthlyPrice) * 100);
  
  return (
    <section className="bg-dark-900 py-24" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-dark-50 md:text-4xl">
          {title.split(' ')[0]}{' '}
          <span className="text-accent-600">{title.split(' ').slice(1).join(' ')}</span>
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-dark-200">
          {subtitle}
        </p>
        
        {/* Billing toggle */}
        <div className="mb-12 flex items-center justify-center">
          <div className="relative inline-flex items-center rounded-full bg-dark-800 p-1">
            <div className="flex">
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative z-10 rounded-full px-4 py-2 text-sm transition-colors ${
                  !isAnnual ? 'text-dark-50' : 'text-dark-300'
                }`}
              >
                Monthly
              </button>
              
              <div className="flex items-center">
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`relative z-10 rounded-full px-4 py-2 text-sm transition-colors ${
                    isAnnual ? 'text-dark-50' : 'text-dark-300'
                  }`}
                >
                  Annual
                </button>
                <span className="ml-1 z-20 inline-flex items-center rounded-full bg-accent-600/20 px-2 py-0.5 text-xs font-medium text-accent-500">
                  Save {savingsPercent}%
                </span>
              </div>
            </div>
            
            <motion.div
              className="absolute inset-0 z-0 rounded-full bg-dark-700"
              initial={false}
              animate={{
                x: isAnnual ? '50%' : '0%',
                width: '50%',
              }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
            />
          </div>
        </div>
        
        <div className="mx-auto max-w-md">
          <div className="overflow-hidden rounded-3xl border border-accent-600/20 bg-dark-800 to-dark-700">
            <div className="p-8">
              <div className="rounded-2xl bg-dark-800/60 p-6 text-center">
                <h3 className="text-2xl font-bold text-dark-50">Unlimited Plan</h3>
                <div className="my-4 flex items-center justify-center">
                  <span className="text-6xl font-bold text-accent-600">
                    {currency}{isAnnual ? annualPrice : monthlyPrice}
                  </span>
                  <span className="ml-2 text-dark-300">
                    /{isAnnual ? 'month, billed annually' : 'month'}
                  </span>
                </div>
                <p className="text-dark-200">{trialDays}-Day Free Trial</p>
              </div>
              
              <div className="mt-8">
                <ul className="mb-8 space-y-5">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent-700/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-dark-100">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={ctaHref} 
                  className="group relative block w-full overflow-hidden rounded-xl bg-accent-600 px-6 py-4 text-center font-medium text-dark-50 shadow-md transition-colors hover:bg-accent-700"
                >
                  <span className="relative z-10">{ctaText}</span>
                  <span className="absolute bottom-0 left-0 h-0 w-full bg-accent-800 transition-all duration-300 group-hover:h-full"></span>
                </Link>
                
                <p className="mt-4 text-center text-sm text-dark-300">
                  No credit card required for trial. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 