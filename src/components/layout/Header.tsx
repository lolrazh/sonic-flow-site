"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * Header component - main navigation for the landing page
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      
      const offset = 64; // Adjusted offset for thinner header
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
    <header 
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ease-in-out ${isScrolled ? 'bg-[rgba(12,12,12,0.8)] backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
    >
      <nav className="container mx-auto flex items-center justify-between px-32 py-4 max-w-full">
        {/* Logo */}
        <Link href="/" className="font-lexend text-2xl lowercase tracking-tight text-white/90">
          sonic<span className="text-white/40">flow</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-12 md:flex">
          {/* Main Navigation */}
          <div className="flex space-x-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className="font-lexend text-lg text-white/60 transition-colors hover:text-white/90"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          {/* Removed sign in and download buttons */}
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

      {/* Separator */}
      <div 
        className="h-px bg-white/5"
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-[rgb(12,12,12)] px-8 pb-6 pt-2 md:hidden"
          >
            <div className="container mx-auto">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      onClick={(e) => handleScrollToSection(e, item.href)}
                      className="block py-2 font-lexend text-lg text-white/60 transition-colors hover:text-white/90"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 