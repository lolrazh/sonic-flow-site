"use client";

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-900 py-12 text-dark-300">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-dark-800 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h3 className="mb-1 text-lg font-medium text-dark-100">Sonic Flow</h3>
          <p className="text-sm text-dark-300">Dictation, reimagined.</p>
        </div>
        
        <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
          <div>
            <span className="text-sm">
              © {currentYear} Sonic Flow. All rights reserved.
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <Link href="/terms" className="transition-colors hover:text-accent-500">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-accent-500">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-accent-500">
              Cookie Policy
            </Link>
          </div>
        </div>
        
        {/* Accent line */}
        <div className="mx-auto mt-12 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-dark-600 to-transparent"></div>
      </div>
    </footer>
  );
} 