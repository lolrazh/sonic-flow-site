import React from 'react';
import Image from 'next/image';

export default function ForVibeCoders() {
  return (
    <section className="relative overflow-hidden bg-[rgb(12,12,12)]" id="for-vibe-coders">
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* Top gradient overflow from hero */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />

      <div className="container mx-auto px-4 py-24 md:py-32 max-w-7xl">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Content */}
          <div className="max-w-xl">
            <h2 className="mb-6 font-serif text-4xl lowercase tracking-tight text-white/90 md:text-5xl lg:text-6xl">
              stop typing.<br />
              start flowing.
            </h2>
            <p className="font-lexend text-lg leading-relaxed text-white/70">
              your mind moves faster than your fingers.
              when you're in the zone, typing just gets in the way.
              speak your thoughts. stay in flow.
              this is how code was meant to be written.
            </p>
          </div>

          {/* Right Content - Rick Rubin Image */}
          <div className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl lg:w-1/2">
            {/* Warm gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent mix-blend-overlay" />
            
            <Image
              src="/rick-rubin.jpg"
              alt="Rick Rubin - The Original Vibe Coder"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Subtle vignette effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
} 