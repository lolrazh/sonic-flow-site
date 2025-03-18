"use client";

import React from 'react';
import { type UserPersonaProps } from './types';

/**
 * UserPersonas component - displays who the product is for
 */
export default function UserPersonas({ 
  personas = [
    {
      title: "Writers",
      description: "Capture your thoughts instantly and write faster than ever before.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      title: "Developers",
      description: "Quickly dictate code comments, documentation, and commit messages.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Managers on the Go",
      description: "Send emails, reply to messages, and create tasks without typing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ]
}: UserPersonaProps = {}) {
  return (
    <section className="bg-dark-900 py-24" id="who-its-for">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-dark-50 md:text-4xl">
          Who It's <span className="text-accent-600">For</span>
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-dark-200">
          Sonic Flow is designed for professionals who need to capture thoughts quickly without disrupting their workflow.
        </p>
        
        <div className="grid gap-8 md:grid-cols-3">
          {personas.map((persona, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-dark-800/50 p-8 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg border border-accent-600/10 hover:border-accent-600/20"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-700/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              {/* Card content */}
              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-dark-700 p-3">
                  {persona.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-dark-50">
                  {persona.title}
                </h3>
                <p className="text-dark-200">{persona.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 