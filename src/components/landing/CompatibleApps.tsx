"use client";

import React from 'react';
import Image from 'next/image';

/**
 * CompatibleApps component - displays compatible applications in an icon cloud
 */
export default function CompatibleApps() {
  return (
    <section className="relative bg-[rgb(8,8,22)] py-24 md:py-32 overflow-hidden">
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      <div className="container mx-auto px-8 max-w-7xl">
        <div className="flex flex-col-reverse items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Side - App Integration Mockup */}
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[rgb(12,12,28)] shadow-2xl">
              {/* VSCode-like mockup */}
              <div className="absolute inset-0">
                <div className="h-8 bg-[rgb(30,30,30)] flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                  </div>
                </div>
                
                {/* Code editor content */}
                <div className="p-4 text-sm font-mono">
                  <div className="flex items-center space-x-2 opacity-70">
                    {/* Sonic Flow Pill */}
                    <div className="absolute top-16 right-8 bg-accent-600/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-accent-500/20 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-white font-sans">Listening...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -left-8 top-1/4 bg-accent-600/20 backdrop-blur-sm p-4 rounded-xl border border-accent-500/10">
              <Image 
                src="/vscode-icon.png" 
                width={40} 
                height={40} 
                alt="VS Code"
                className="rounded-lg"
              />
            </div>
            <div className="absolute -right-4 bottom-1/4 bg-accent-600/20 backdrop-blur-sm p-4 rounded-xl border border-accent-500/10">
              <Image 
                src="/slack-icon.png" 
                width={40} 
                height={40} 
                alt="Slack"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="max-w-xl">
            <h2 className="mb-6 font-serif text-4xl lowercase tracking-tight text-white/90 md:text-5xl">
              works everywhere<br />
              <span className="text-accent-600">stays out of your way.</span>
            </h2>
            <p className="font-lexend text-lg leading-relaxed text-white/70">
              sonic flow integrates seamlessly with your favorite apps. 
              the unobtrusive interface appears only when you need it, 
              then fades away letting you stay in your creative flow.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/60">VS Code</div>
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/60">Slack</div>
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/60">Chrome</div>
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/60">Notion</div>
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/60">+ more</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 