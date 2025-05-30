"use client";

import React from 'react';
import Image from 'next/image';

interface CTAProps {
  text: string;
  href: string;
}

interface HeroProps {
  headline?: string;
  subheadline?: string;
  primaryCta?: CTAProps;
  secondaryCta?: CTAProps;
}

/**
 * Hero section component for the landing page
 * 
 * DEBUG CLIPPING: If you still see descender clipping:
 * 1. Right-click on clipped text → Inspect Element
 * 2. Look for any parent with overflow:hidden in the Computed styles
 * 3. In console, run: $0.style.overflow = 'visible' on the clipping parent
 * 
 * OR use this snippet to find all overflow:hidden elements:
 * document.querySelectorAll('*').forEach(el => {
 *   const style = getComputedStyle(el);
 *   if (style.overflow === 'hidden' || style.overflowY === 'hidden') {
 *     console.log(el.tagName, el.className, el);
 *     el.style.outline = '2px solid red';
 *   }
 * });
 */
export default function Hero({
  headline = "this could be you but you're still typing",
  subheadline = "sonic flow is a lightweight, lightning-fast, fully local dictation app built for vibe coders. hit a hotkey, speak your mind, hit it again. done.",
  primaryCta = { text: "try for free", href: "#pricing" },
  secondaryCta = { text: "explore features", href: "#for-vibe-coders" }
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
  const primaryCtaHref = primaryCta?.href ?? "#pricing";
  const secondaryCtaText = secondaryCta?.text ?? "Explore Features";
  const secondaryCtaHref = secondaryCta?.href ?? "#features";

  return (
    <section className="relative min-h-screen overflow-x-hidden overflow-y-visible">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover object-left"
          priority
        />
        {/* Simple dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex min-h-screen w-full items-center">
        <div className="w-full overflow-visible">
          <div className="mx-auto flex w-full max-w-[90rem] justify-center px-8 lg:justify-end">
            <div className="w-full max-w-3xl lg:-mr-12 xl:-mr-24 2xl:-mr-48 overflow-visible">
              <h1 
                className="mb-8 font-serif text-4xl font-normal lowercase leading-[1.3] tracking-normal heading-gradient text-breathe sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ lineHeight: 1.3 }}
              >
                {firstPart}
                {hasTwoParts && (
                  <>
                    <span className="text-accent-600">.</span> 
                    <br />
                    {secondPart}
                  </>
                )}
              </h1>
              <p className="mb-12 w-full max-w-[90%] font-lexend text-base text-subtle sm:max-w-[75%] sm:text-lg md:text-xl">
                {subheadline}
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <a 
                  href={primaryCtaHref}
                  onClick={(e) => handleScrollToSection(e, primaryCtaHref)}
                  className="btn-primary rounded-full px-6 py-3 text-center font-lexend text-sm font-medium sm:px-8 sm:py-4 sm:text-base"
                >
                  {primaryCtaText}
                </a>
                <a 
                  href={secondaryCtaHref} 
                  onClick={(e) => handleScrollToSection(e, secondaryCtaHref)}
                  className="btn-secondary rounded-full px-6 py-3 text-center font-lexend text-sm font-medium sm:px-8 sm:py-4 sm:text-base"
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