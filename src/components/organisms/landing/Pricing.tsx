"use client";

import React from 'react';
import Link from 'next/link';

export default function Pricing() {
  return (
    <section className="relative overflow-hidden bg-[rgb(12,12,12)]" id="pricing">
      <div className="container mx-auto px-8 py-24 md:py-32 max-w-7xl">
        <div className="flex flex-col items-center">
          {/* Header */}
          <div className="max-w-xl text-center mb-16">
            <h2 className="mb-6 font-serif text-4xl lowercase tracking-tight text-white/90 md:text-5xl lg:text-6xl">
              simple pricing.<br />
              <span className="text-white/60">like everything else.</span>
            </h2>
            <p className="font-lexend text-lg leading-relaxed text-white/70">
              one plan. unlimited dictation.
              because thinking about pricing breaks flow state.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="w-full max-w-md">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[rgb(18,18,18)]">
              <div className="p-8">
                {/* Price Display */}
                <div className="rounded-2xl bg-[rgb(24,24,24)] p-8 text-center">
                  <h3 className="text-2xl font-serif lowercase text-white/90">flow state</h3>
                  <div className="my-4 flex items-center justify-center gap-2">
                    <span className="font-serif text-6xl text-white/90">$3</span>
                    <span className="text-white/60">/month</span>
                  </div>
                  <p className="text-white/60 font-lexend">7-day free trial</p>
                </div>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                    <span className="text-white/70 font-lexend">unlimited dictation time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                    <span className="text-white/70 font-lexend">use anywhere on your desktop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                    <span className="text-white/70 font-lexend">regular updates</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link 
                  href="/signup"
                  className="mt-8 block w-full rounded-full bg-white px-8 py-4 text-center font-lexend text-base font-medium lowercase tracking-wider text-black transition-colors hover:bg-white/90"
                >
                  start free trial
                </Link>

                <p className="mt-4 text-center text-sm text-white/40 font-lexend">
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