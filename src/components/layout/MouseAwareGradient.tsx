"use client";

import React, { useEffect, useState } from 'react';

const MouseAwareGradient = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--mouse-x', `${mousePosition.x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${mousePosition.y}px`);
  }, [mousePosition]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-2] opacity-50 transition duration-300 mouse-aware-gradient"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,165,0,0.06), transparent 80%)`,
      }}
    />
  );
};

export default MouseAwareGradient; 