"use client";

import React from 'react';

export default function Pricing() {
  return (
    <section className="relative overflow-hidden section-separator" id="pricing">
      <div className="container mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-28">
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
                  $7
                  <span className="ml-1 text-xl text-dimmed">/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-white/70 mr-3 text-sm leading-6 font-medium">—</span>
                  <span className="font-lexend text-subtle">unlimited dictation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white/70 mr-3 text-sm leading-6 font-medium">—</span>
                  <span className="font-lexend text-subtle">works in all your apps</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white/70 mr-3 text-sm leading-6 font-medium">—</span>
                  <span className="font-lexend text-subtle">fully local & private</span>
                </li>
                <li className="flex items-start">
                  <span className="text-white/70 mr-3 text-sm leading-6 font-medium">—</span>
                  <span className="font-lexend text-subtle">priority support for beta users</span>
                </li>
              </ul>

              <div className="space-y-2">
                <button className="w-full rounded-full btn-primary px-4 py-3 font-lexend text-sm font-medium">
                  start your 7-day free trial
                </button>
                <p className="text-center text-xs text-dimmed">
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