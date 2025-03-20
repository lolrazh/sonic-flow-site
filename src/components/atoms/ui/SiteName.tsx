"use client";

import React from 'react';
import Link from 'next/link';

interface SiteNameProps {
  href?: string;
  className?: string;
}

/**
 * SiteName component - displays the site name/logo 
 */
export default function SiteName({ href = "/", className = "text-xl" }: SiteNameProps) {
  const siteName = "Sonic Flow";
  
  const nameElement = (
    <span className={`font-bold ${className}`}>
      <span className="bg-gradient-to-r from-accent-500 to-accent-400 bg-clip-text text-transparent">
        {siteName}
      </span>
    </span>
  );
  
  if (href) {
    return (
      <Link href={href} className="flex items-center space-x-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-600 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        {nameElement}
      </Link>
    );
  }
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-600 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </div>
      {nameElement}
    </div>
  );
} 