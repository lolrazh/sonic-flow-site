"use client";

import Link from 'next/link';
import PillUI from './PillUI';

export default function Benefits() {
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

  const benefits = [
    {
      title: "Unobtrusive UI",
      description: "A tiny pill that hides until you need it.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: "Accurate Transcriptions",
      description: "Powered by advanced speech-to-text AI.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Simple Billing",
      description: "Single plan, no hidden fees.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-dark-800 to-dark-900 py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -right-10 bottom-1/4 h-64 w-64 rounded-full bg-accent-700 blur-3xl"></div>
        <div className="absolute left-1/3 top-1/4 h-32 w-32 rounded-full bg-accent-600 blur-3xl"></div>
      </div>
      
      <div className="container relative mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-dark-50 md:text-4xl">
          Why <span className="text-accent-600">Sonic Flow</span>?
        </h2>
        
        <p className="mx-auto mb-16 max-w-2xl text-center text-dark-200">
          Experience the future of dictation with our sleek, intelligent interface
        </p>
        
        {/* Floating Pill UI */}
        <div className="absolute -right-20 -top-10 hidden md:block">
          <PillUI isAnimated={false} className="opacity-10" />
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-dark-800/50 p-8 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-700/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              {/* Card content */}
              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-dark-700 p-3">
                  {benefit.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-dark-50">
                  {benefit.title}
                </h3>
                <p className="text-dark-200">{benefit.description}</p>
              </div>
              
              {/* Card accent */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-accent-700/50 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section - Made bigger and separated */}
      <div className="mt-32 mb-32 py-16 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-bold text-dark-50 mb-4">Ready to get started?</h3>
            <p className="mb-8 text-lg text-dark-200">Try Sonic Flow free for 7 days.</p>
            <a 
              href="#pricing" 
              onClick={(e) => handleScrollToSection(e, '#pricing')}
              className="whitespace-nowrap rounded-xl bg-accent-600 px-10 py-5 text-center text-lg font-medium text-dark-50 shadow-md transition-colors hover:bg-accent-700 inline-block cursor-pointer"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 