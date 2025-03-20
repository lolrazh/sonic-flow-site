"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type HeroProps } from './types';

/**
 * Hero section component for the landing page
 */
export default function Hero({
  headline = "this could be you but you're still typing",
  subheadline = "level up your coding flow. let your voice paint the syntax while you focus on the bigger picture. because real devs don't let their fingers slow down their genius.",
  primaryCta = { text: "get started", href: "/signup" },
  secondaryCta = { text: "explore features", href: "#features" }
}: HeroProps = {}) {
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

  // Split headline for styling (first part normal, second part with line break)
  const headlineParts = headline?.split('.') ?? [];
  const firstPart = headlineParts[0] ?? '';
  const hasTwoParts = headlineParts.length > 1 && headlineParts[1]?.trim() !== '';
  const secondPart = hasTwoParts ? headlineParts[1]?.trim() : '';
  
  // Safe default values to prevent undefined errors
  const primaryCtaText = primaryCta?.text ?? "Get Started";
  const primaryCtaHref = primaryCta?.href ?? "/signup";
  const secondaryCtaText = secondaryCta?.text ?? "Explore Features";
  const secondaryCtaHref = secondaryCta?.href ?? "#features";

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover object-left"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex min-h-screen w-full items-center">
        <div className="w-full">
          <div className="mx-auto flex w-full max-w-[90rem] justify-center px-8 lg:justify-end">
            <div className="w-full max-w-3xl lg:-mr-12 xl:-mr-24 2xl:-mr-48">
              <h1 className="mb-8 font-serif text-4xl font-normal lowercase leading-tight tracking-normal text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {firstPart}
                {hasTwoParts && (
                  <>
                    <span className="text-accent-600">.</span> 
                    <br />
                    {secondPart}
                  </>
                )}
              </h1>
              <p className="mb-12 w-full max-w-[90%] font-lexend text-base text-white/90 sm:max-w-[75%] sm:text-lg md:text-xl">
                {subheadline}
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link 
                  href={primaryCtaHref}
                  className="group relative overflow-hidden rounded-full bg-white px-6 py-3 text-center font-lexend text-sm font-medium text-black/90 transition-colors hover:bg-white/90 sm:px-8 sm:py-4 sm:text-base"
                >
                  {primaryCtaText}
                </Link>
                <a 
                  href={secondaryCtaHref} 
                  onClick={(e) => handleScrollToSection(e, secondaryCtaHref)}
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-center font-lexend text-sm font-medium text-white/90 transition-colors hover:bg-white/10 sm:px-8 sm:py-4 sm:text-base"
                >
                  {secondaryCtaText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 