"use client";

import PillUI from './PillUI';

export default function HowItWorks() {
  const steps = [
    {
      title: "Install & Pin",
      description: "the Sonic Flow pill on your desktop.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Press the Hotkey & Dictate",
      description: "your text using natural speech.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      title: "Instantly Inserted",
      description: "into the cursor's location.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-dark-800 py-24" id="how-it-works">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-dark-50 md:text-4xl">
          How It <span className="text-accent-600">Works</span>
        </h2>
        
        <p className="mx-auto mb-16 max-w-2xl text-center text-dark-200">
          Sonic Flow's simple 3-step process makes dictation effortless
        </p>
        
        <div className="relative">
          {/* Animated pill moving down the timeline */}
          <div className="absolute left-1/2 top-8 hidden -translate-x-1/2 md:block">
            <PillUI isAnimated={false} className="animate-move-down opacity-20" />
          </div>

          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-accent-700/30 via-accent-600/20 to-accent-500/10 md:block"></div>
          
          <div className="relative space-y-20 md:space-y-32">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-0 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-600 bg-dark-800 md:block"></div>
                
                <div className={`flex flex-col items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Step number */}
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-dark-700 text-xl font-bold text-accent-600 md:hidden">
                    {index + 1}
                  </div>
                  
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'} flex justify-center`}>
                    <div className="w-full max-w-md rounded-2xl bg-dark-700 p-8 shadow-card border border-dark-600">
                      {/* Step header */}
                      <div className="mb-6 flex items-center">
                        <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-dark-600 text-xl font-bold text-accent-600 md:flex">
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-dark-50">
                            {step.title}
                          </h3>
                          <p className="text-dark-200">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Step illustration */}
                      <div className="rounded-xl bg-dark-800/50 p-6 flex justify-center">
                        {index === 0 && (
                          <div className="flex items-center justify-center">
                            <PillUI isAnimated={false} />
                          </div>
                        )}
                        {index === 1 && (
                          <div className="flex items-center">
                            <div className="mr-3 rounded-full bg-accent-700/20 p-3">
                              {step.icon}
                            </div>
                            <div className="text-dark-200">
                              Press <kbd className="rounded bg-dark-600 px-2 py-1 text-xs text-dark-100">Alt + D</kbd>
                            </div>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="flex flex-col items-center">
                            <div className="mb-3 text-dark-200">Text appears at cursor:</div>
                            <div className="rounded border border-dark-500 bg-dark-900 p-3 font-mono text-sm text-accent-500">
                              <span className="text-dark-300">const </span>
                              message <span className="text-dark-300">=</span> "Hello world!"
                              <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-accent-500"></span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden w-1/2 items-center justify-center md:flex">
                    <div className="rounded-full bg-dark-700/50 p-6">
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Animation for moving pill */}
      <style jsx>{`
        @keyframes moveDown {
          0% {
            transform: translateY(0) translateX(-50%);
            opacity: 0;
          }
          20% {
            opacity: 0.2;
          }
          80% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(600px) translateX(-50%);
            opacity: 0;
          }
        }
        .animate-move-down {
          animation: moveDown 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
} 