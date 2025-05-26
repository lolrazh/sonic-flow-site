"use client";

import React from 'react';

export default function Pricing() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[rgb(14,14,14)] to-[rgb(10,10,10)]" id="pricing">
      {/* Ambient background elements */}
      <div className="absolute inset-0 ambient-gradient-1" />
      
      {/* Top gradient transition */}
      <div className="absolute inset-x-0 top-0 h-32 section-transition-top" />
      
      <div className="container mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-5xl lowercase tracking-tight heading-gradient sm:text-6xl">
            simple, transparent pricing
          </h2>
          <p className="mx-auto mt-3 max-w-4xl font-lexend text-lg text-dimmed">
            start with a 7-day free trial. cancel anytime.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-sm">
          <div className="overflow-hidden rounded-2xl card-floating">
            <div className="p-8">
              <div className="text-center mb-2">
                <h3 className="font-lexend text-lg lowercase tracking-tight text-subtle">
                  flow
                </h3>
              </div>
              
              <div className="text-center mb-8">
                <div className="font-lexend text-6xl tracking-tight heading-gradient">
                  $9
                  <span className="ml-1 text-xl text-dimmed">/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3 text-sm leading-6 font-medium">—</span>
                  <span className="font-lexend text-subtle">unlimited dictation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3 text-sm leading-6 font-medium">—</span>
                  <span className="font-lexend text-subtle">works in all your apps</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3 text-sm leading-6 font-medium">—</span>
                  <span className="font-lexend text-subtle">fully local & private</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3 text-sm leading-6 font-medium">—</span>
                  <span className="font-lexend text-subtle">priority support for beta users</span>
                </li>
              </ul>

              <div className="space-y-2">
                <button className="w-full rounded-lg btn-primary px-4 py-3 font-lexend text-sm font-medium">
                  Get Started
                </button>
                <p className="text-center text-xs text-dimmed">
                  7-day free trial • No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 