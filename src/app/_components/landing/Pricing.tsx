"use client";

import Link from 'next/link';

export default function Pricing() {
  return (
    <section className="bg-dark-900 py-24" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-dark-50 md:text-4xl">
          Simple <span className="text-accent-600">Pricing</span>
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-dark-200">
          One low monthly price. Unlimited transcription. Cancel anytime.
        </p>
        
        <div className="mx-auto max-w-md">
          <div className="overflow-hidden rounded-3xl border border-dark-600 bg-gradient-to-br from-dark-800 to-dark-700 shadow-card">
            {/* Card accent top */}
            <div className="h-1.5 w-full bg-gradient-to-r from-accent-700 via-accent-600 to-accent-500"></div>
            
            <div className="p-8">
              <div className="rounded-2xl bg-dark-800/60 p-6 text-center">
                <h3 className="text-2xl font-bold text-dark-50">Unlimited Plan</h3>
                <div className="my-4 flex items-center justify-center">
                  <span className="text-6xl font-bold text-accent-600">$5</span>
                  <span className="ml-2 text-dark-300">/month</span>
                </div>
                <p className="text-dark-200">7-Day Free Trial</p>
              </div>
              
              <div className="mt-8">
                <ul className="mb-8 space-y-5">
                  <li className="flex items-center">
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent-700/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-dark-100">Unlimited dictation time</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent-700/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-dark-100">Use in any desktop application</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent-700/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-dark-100">Advanced AI transcription</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent-700/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-dark-100">Regular updates</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent-700/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-dark-100">Email support</span>
                  </li>
                </ul>
                
                <Link 
                  href="/signup" 
                  className="group relative block w-full overflow-hidden rounded-xl bg-accent-600 px-6 py-4 text-center font-medium text-dark-50 shadow-md transition-colors hover:bg-accent-700"
                >
                  <span className="relative z-10">Start Your Free Trial</span>
                  <span className="absolute bottom-0 left-0 h-0 w-full bg-accent-800 transition-all duration-300 group-hover:h-full"></span>
                </Link>
                
                <p className="mt-4 text-center text-sm text-dark-300">
                  No credit card required for trial. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative pill element */}
          <div className="relative mx-auto mt-12 h-3 w-32">
            <div className="absolute h-1 w-full rounded-full bg-gradient-to-r from-accent-700/20 via-accent-600/40 to-accent-500/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 