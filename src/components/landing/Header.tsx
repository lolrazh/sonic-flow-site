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
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Lab', href: '#lab' },
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
      
      window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop - 100 // Offset for header height
      });
      
      // Update URL without page reload
      window.history.pushState({}, '', href);
    }
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-transparent">
      <nav className="container mx-auto flex items-center justify-between px-4 py-6">
        {/* Logo */}
        <Link href="/" className="font-lexend text-2xl font-medium text-white">
          sonic flow
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 md:flex">
          {/* Main Navigation */}
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-lexend text-sm text-white/80 transition-colors hover:text-white"
              >
                {item.name.toLowerCase()}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="rounded-[35px] border border-white bg-transparent px-6 py-2 font-lexend text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-white/10"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-[35px] bg-white px-6 py-2 font-lexend text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-white/90"
            >
              Download
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-black/20 focus:outline-none md:hidden"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`h-6 w-6 ${mobileMenuOpen ? 'hidden' : 'block'}`}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            className={`h-6 w-6 ${mobileMenuOpen ? 'block' : 'hidden'}`}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
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
            className="overflow-hidden bg-black/80 px-4 pb-4 pt-2 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      onClick={(e) => handleScrollToSection(e, item.href)}
                      className="block rounded-md px-3 py-2 font-lexend text-base text-white/80 transition-colors hover:text-white"
                    >
                      {item.name.toLowerCase()}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href="/login"
                    className="block w-full rounded-[35px] border border-white bg-transparent px-6 py-2 text-center font-lexend text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-white/10"
                  >
                    Sign in
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    href="/signup"
                    className="block w-full rounded-[35px] bg-white px-6 py-2 text-center font-lexend text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-white/90"
                  >
                    Download
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