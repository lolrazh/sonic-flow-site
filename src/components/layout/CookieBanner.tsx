"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';
import Link from 'next/link';

/**
 * Cookie banner component that appears for first-time visitors
 */
export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('sonic-flow-cookies-accepted');
    if (!hasAccepted) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('sonic-flow-cookies-accepted', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('sonic-flow-cookies-accepted', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            onClick={() => setIsVisible(false)}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[101]"
          >
            <div className="card-floating rounded-2xl p-6 md:p-8">
              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-dimmed hover:text-white/90 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Icon and Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/20">
                  <Cookie className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="font-serif text-xl lowercase tracking-tight heading-gradient">
                  cookie notice.
                </h3>
              </div>

              {/* Content */}
              <div className="space-y-4 mb-6">
                <p className="font-lexend text-sm text-subtle leading-relaxed">
                  We use only <strong className="text-white/90">essential cookies</strong> to keep the site functional. No tracking, no ads, no behavioral profiling—just the basics.
                </p>
                <p className="font-lexend text-xs text-dimmed">
                  Learn more in our{' '}
                  <Link href="/cookies" className="text-white/70 hover:text-white/90 transition-colors underline">
                    cookie policy
                  </Link>
                  {' '}or{' '}
                  <Link href="/privacy" className="text-white/70 hover:text-white/90 transition-colors underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptCookies}
                  className="btn-primary rounded-full px-4 py-2 text-center font-lexend text-sm font-medium flex-1"
                >
                  accept essentials
                </button>
                <button
                  onClick={declineCookies}
                  className="btn-secondary rounded-full px-4 py-2 text-center font-lexend text-sm font-medium"
                >
                  decline
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 