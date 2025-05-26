"use client";

import React, { useState } from 'react';

interface PillProps {
  isListening: boolean;
  isProcessing: boolean;
  onStartDictation: () => void;
  onStopDictation: () => void;
}

const DemoPill: React.FC<PillProps> = ({ 
  isListening, 
  isProcessing, 
  onStartDictation, 
  onStopDictation 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const VISUALIZATION_COUNT = 7;
  
  // Generate frequency bars for the waveform (active state)
  const renderFrequencyBars = () => {
    return Array.from({ length: VISUALIZATION_COUNT }).map((_, index) => (
      <div 
        key={`bar-${index}`} 
        className="waveform-bar"
        style={{ animationDelay: `${index * 0.15}s` }}
      />
    ));
  };

  // Unified function to render dots with different styles
  const renderDots = (type: 'static' | 'animated' | 'collapsed') => {
    return Array.from({ length: VISUALIZATION_COUNT }).map((_, index) => (
      <div 
        key={`dot-${type}-${index}`} 
        className={`dot ${type}`}
        style={type === 'animated' ? { 
          animationDelay: `${index * 0.15}s`
        } : undefined}
      />
    ));
  };
  
  // Determine if the pill should be in the expanded state
  const isExpanded = isHovered || isListening || isProcessing;
  
  return (
    <div 
      className={`
        pill-container
        ${!isExpanded ? 'collapsed' : ''}
        ${isListening ? 'listening' : ''}
        ${isProcessing ? 'processing' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={isListening ? onStopDictation : onStartDictation}
    >
      <div className="pill-content">
        <div className="visualization-container">
          {!isExpanded && renderDots('collapsed')}
          {isHovered && !isListening && !isProcessing && renderDots('static')}
          {isListening && renderFrequencyBars()}
          {isProcessing && !isListening && renderDots('animated')}
        </div>
      </div>
    </div>
  );
};

/**
 * HowItWorks component - displays the How It Works section
 */
export default function HowItWorks() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartDictation = () => {
    setIsListening(true);
  };

  const handleStopDictation = () => {
    setIsListening(false);
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <section className="relative overflow-hidden section-separator">
      <div className="container mx-auto px-8 py-20 md:py-28 max-w-7xl">
        <div className="flex flex-col items-center gap-16 lg:flex-row-reverse lg:items-center lg:justify-between">
          {/* Left Content - Now on the right */}
          <div className="max-w-xl">
            <h2 className="mb-6 font-serif text-4xl lowercase tracking-tight heading-gradient md:text-5xl lg:text-6xl">
            dead simple.<br />
              <span className="text-dimmed">blazing fast.</span>
            </h2>
            <p className="font-lexend text-lg leading-relaxed text-subtle">
              1. press hotkey to start<br />
              2. speak your code, prompt, or brilliant idea<br />
              3. press hotkey to stop<br />
              4. watch it print. instantly.<br /><br />
              fully local processing means total privacy, fast processing and no internet required. your words stay yours.
            </p>
          </div>

          {/* Right Content - Now on the left - Windows Terminal Demo */}
          <div className="relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-xl lg:w-1/2 card-floating">
            {/* Windows Terminal-like interface */}
            <div className="absolute inset-0 bg-gradient-to-b from-[rgb(12,12,24)] to-[rgb(8,8,16)] flex flex-col">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-[rgb(30,30,43)] to-[rgb(28,28,40)] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm text-white/80 font-medium">Windows PowerShell</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm bg-white/10 hover:bg-white/20 transition-colors"></div>
                  <div className="w-3 h-3 rounded-sm bg-white/10 hover:bg-white/20 transition-colors"></div>
                  <div className="w-3 h-3 rounded-sm bg-red-500/60 hover:bg-red-500/80 transition-colors"></div>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div className="flex-1 p-4 font-mono text-sm text-white/70 bg-gradient-to-b from-transparent to-black/10">
                <p className="mb-2">PS C:\Users\user&gt; sonic-flow --start</p>
                <p className="text-green-400/90 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Sonic Flow is running...
                </p>
              </div>

              {/* Pill at the bottom */}
              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <DemoPill 
                  isListening={isListening}
                  isProcessing={isProcessing}
                  onStartDictation={handleStartDictation}
                  onStopDictation={handleStopDictation}
                />
              </div>
            </div>
            
            {/* Terminal glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-blue-500/5 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
} 