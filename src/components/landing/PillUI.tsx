"use client";

import { useState, useEffect } from 'react';
import { type PillUIProps } from './types';

/**
 * PillUI component - displays an animated microphone pill that expands to show text
 */
export default function PillUI({ isAnimated = true, className = "" }: PillUIProps) {
  const [isActive, setIsActive] = useState(false);
  const [displayText, setDisplayText] = useState("");
  
  const sampleText = "This is being dictated by Sonic Flow...";
  
  useEffect(() => {
    if (!isAnimated) return;
    
    // Animation cycle for demo purposes
    const activationTimer = setTimeout(() => {
      setIsActive(true);
      
      let index = 0;
      const textTimer = setInterval(() => {
        if (index <= sampleText.length) {
          setDisplayText(sampleText.substring(0, index));
          index++;
        } else {
          clearInterval(textTimer);
          
          setTimeout(() => {
            setIsActive(false);
            setDisplayText("");
            
            // Reset for next animation cycle
            setTimeout(() => {
              setIsActive(true);
              index = 0;
              
              const newTextTimer = setInterval(() => {
                if (index <= sampleText.length) {
                  setDisplayText(sampleText.substring(0, index));
                  index++;
                } else {
                  clearInterval(newTextTimer);
                  setTimeout(() => {
                    setIsActive(false);
                    setDisplayText("");
                  }, 1000);
                }
              }, 100);
            }, 2000);
          }, 1000);
        }
      }, 100);
      
      return () => {
        clearTimeout(activationTimer);
        clearInterval(textTimer);
      };
    }, 1000);
    
    return () => clearTimeout(activationTimer);
  }, [isAnimated]);
  
  return (
    <div className={`relative ${className}`}>
      <div className={`
        relative
        flex 
        items-center 
        transition-all 
        duration-300 
        ease-in-out
        ${isActive 
          ? 'min-w-[280px] rounded-2xl bg-dark-800 px-4 py-3' 
          : 'w-[120px] rounded-full bg-dark-700 px-3 py-2'}
        border 
        border-dark-500
        shadow-pill
      `}>
        {/* Active indicator */}
        <div className={`
          h-3 
          w-3 
          rounded-full 
          mr-2
          transition-colors
          duration-300
          ${isActive ? 'bg-accent-700' : 'bg-dark-300'}
        `}></div>
        
        {/* Microphone icon */}
        <div className="flex h-6 w-6 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className={`transition-colors duration-300 ${isActive ? 'text-accent-500' : 'text-dark-200'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" x2="12" y1="19" y2="22"></line>
          </svg>
        </div>
        
        {/* Text area - only visible when active */}
        {isActive && (
          <div className="ml-3 overflow-hidden text-dark-50 whitespace-nowrap">
            {displayText}
            <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-accent-500"></span>
          </div>
        )}
      </div>
      
      {/* Floating output effect */}
      {isActive && displayText && (
        <div className="absolute left-8 -top-6 animate-fade-up text-sm text-dark-100 opacity-0">
          {displayText}
        </div>
      )}
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-10px);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        .animate-fade-up {
          animation: fadeUp 2s ease-out;
        }
      `}</style>
    </div>
  );
} 