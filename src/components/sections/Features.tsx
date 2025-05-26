import React from 'react';
import Image from 'next/image';

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[rgb(10,10,10)] to-[rgb(12,12,12)]" id="for-vibe-coders">
      {/* Ambient background elements */}
      <div className="absolute inset-0 ambient-gradient-2" />
      
      {/* Top gradient transition */}
      <div className="absolute inset-x-0 top-0 h-32 section-transition-top" />

      <div className="container mx-auto px-4 py-24 md:py-32 max-w-7xl">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Content */}
          <div className="max-w-xl">
            <h2 className="mb-6 font-serif text-4xl lowercase tracking-tight heading-gradient md:text-5xl lg:text-6xl">
              stop typing.<br />
              start flowing.
            </h2>
            <p className="font-lexend text-lg leading-relaxed text-subtle">
              you&apos;re in the zone. ideas are firing. logic is connecting.<br />
              then comes the typing. clack. clack. delete. clack.<br />
              <span className="font-medium text-white/80 italic">flow shattered.</span>
              <br /><br />
              vibe coding is about staying in that creative torrent, letting your thoughts materialize without the friction of the keyboard. it&apos;s about coding at the speed of thought.
            </p>
          </div>

          {/* Right Content - Rick Rubin Image */}
          <div className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl lg:w-1/2 card-elevated">
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/8 via-transparent to-orange-400/5 mix-blend-overlay" />
            
            <Image
              src="/rick-rubin.jpg"
              alt="Rick Rubin - The Original Vibe Coder"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Enhanced vignette effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-orange-500/5" />
          </div>
        </div>
      </div>
    </section>
  );
} 