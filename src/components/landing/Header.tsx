"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SiteName } from '~/components/shared';

/**
 * Header component - main navigation for the landing page
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'flow', href: '#for-vibe-coders' },
    { name: 'pricing', href: '#pricing' },
    { name: 'faq', href: '#faq' },
  ];

  // Smooth scroll function
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Close mobile menu if open
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      
      const offset = 100; // Offset for header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        behavior: 'smooth',
        top: offsetPosition
      });
      
      // Update URL without page reload
      window.history.pushState({}, '', href);
    }
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-transparent">
      <nav className="container mx-auto flex items-center justify-between px-8 py-6 max-w-7xl">
        {/* Logo */}
        <Link href="/" className="font-lexend text-2xl lowercase tracking-tight text-white/90">
          sonic<span className="text-white/40">flow</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 md:flex">
          {/* Main Navigation */}
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className="font-lexend text-sm text-white/40 transition-colors hover:text-white/90"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-2 font-lexend text-sm text-white/90 transition-colors hover:bg-white/10"
            >
              sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-white px-6 py-2 font-lexend text-sm text-black/90 transition-colors hover:bg-white/90"
            >
              download
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-white/40 hover:text-white/90 focus:outline-none md:hidden"
        >
          <span className="sr-only">Open main menu</span>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-[rgb(12,12,12)] px-8 pb-6 pt-2"
          >
            <div className="container mx-auto">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      onClick={(e) => handleScrollToSection(e, item.href)}
                      className="block py-2 font-lexend text-base text-white/40 transition-colors hover:text-white/90"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                <li className="pt-4">
                  <Link
                    href="/login"
                    className="block w-full rounded-full border border-white/10 bg-white/5 px-6 py-2 text-center font-lexend text-sm text-white/90 transition-colors hover:bg-white/10"
                  >
                    sign in
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    href="/signup"
                    className="block w-full rounded-full bg-white px-6 py-2 text-center font-lexend text-sm text-black/90 transition-colors hover:bg-white/90"
                  >
                    download
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 