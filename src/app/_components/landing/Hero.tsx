"use client";

import Image from 'next/image';
import Link from 'next/link';
import PillUI from './PillUI';

export default function Hero() {
  // Smooth scroll function
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop - 100 // Offset for header height
      });
      
      // Update URL without page reload
      window.history.pushState({}, '', href);
    }
  };
  
  return (
    <section className="relative bg-gradient-to-b from-dark-900 to-dark-800 py-32 md:py-40">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-accent-700 opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-accent-800 opacity-10 blur-3xl"></div>
      </div>
      
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:space-x-12">
          {/* Left-Side Text Block */}
          <div className="mb-16 md:mb-0 md:w-1/2">
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-dark-50 md:text-5xl lg:text-6xl">
              Dictate with <span className="text-accent-600">Speed</span>. 
              <br />
              Type without Typing.
            </h1>
            <p className="mb-8 text-lg text-dark-200 md:text-xl">
              Sonic Flow is an AI-powered dictation tool that seamlessly transcribes your speech into any text field. 
              Save time, boost productivity, and say goodbye to manual typing.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <a 
                href="#pricing" 
                onClick={(e) => handleScrollToSection(e, '#pricing')}
                className="group relative overflow-hidden rounded-xl bg-accent-700 px-6 py-3 text-center text-base font-medium text-dark-50 shadow-md transition-colors hover:bg-accent-800 cursor-pointer"
              >
                <span className="relative z-10">Start 7-Day Free Trial</span>
                <span className="absolute bottom-0 left-0 h-1 w-full bg-accent-900 transition-all duration-300 group-hover:h-full"></span>
              </a>
              <a 
                href="#features" 
                onClick={(e) => handleScrollToSection(e, '#features')}
                className="rounded-xl border border-dark-500 bg-dark-700 px-6 py-3 text-center text-base font-medium text-dark-100 shadow-sm transition-colors hover:bg-dark-600 cursor-pointer"
              >
                Explore Features
              </a>
            </div>
          </div>

          {/* Right-Side Visual with Pill UI */}
          <div className="md:w-1/2">
            <div className="relative h-72 w-full md:h-[400px]">
              {/* App window mockup with the PillUI component */}
              <div className="w-full max-w-md rounded-2xl bg-dark-700 overflow-hidden shadow-lg mx-auto">
                {/* Window header */}
                <div className="flex items-center bg-dark-800 px-4 py-3">
                  <div className="flex space-x-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-sm text-dark-300">Document - Sonic Flow Demo</div>
                </div>
                
                {/* Window content */}
                <div className="flex min-h-[240px] flex-col items-center justify-center p-6 text-dark-200">
                  <div className="w-full rounded border border-dark-500 bg-dark-800 p-4 text-sm">
                    <div className="mb-2 text-dark-300">// Your dictated text appears here</div>
                    <div className="text-accent-400">This is being dictated by Sonic Flow...</div>
                    <div className="mt-1 h-4 w-2 animate-pulse bg-dark-400"></div>
                  </div>
                  
                  {/* Pill UI positioned near the bottom */}
                  <div className="mt-6 flex w-full justify-center">
                    <PillUI isAnimated={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 