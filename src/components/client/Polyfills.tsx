'use client';

import { useEffect } from 'react';

export function Polyfills() {
  useEffect(() => {
    // Fix for older browsers if needed
    if (!window.fetch) {
      console.log('Polyfilling fetch');
    }
  }, []);

  return null;
} 