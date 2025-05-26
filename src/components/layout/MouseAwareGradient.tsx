"use client";

import React, { useEffect, useState } from 'react';

const MouseAwareGradient: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--mouse-x', `${mousePosition.x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${mousePosition.y}px`);
  }, [mousePosition]);

  return null; // This component only handles side effects
};

export default MouseAwareGradient; 