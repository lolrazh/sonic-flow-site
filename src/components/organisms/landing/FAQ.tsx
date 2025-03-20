"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { type FAQProps } from './types';

/**
 * FAQ component - displays frequently asked questions with expandable answers
 */
export default function FAQ({
  title = "questions.",
  subtitle = "because you're probably wondering.",
  items = [
    {
      question: "why not just type my prompts?",
      answer: "because your brain moves faster than your fingers. when you're in flow, typing breaks your rhythm. speaking lets you keep your train of thought while describing what you want the AI to do."
    },
    {
      question: "will this actually make me prompt faster?",
      answer: "yes. most people think at 150+ words per minute but type at 50-80 wpm. speaking your prompts means you can describe complex ideas to your AI agent without losing context."
    },
    {
      question: "what about prompt formatting?",
      answer: "that's handled automatically. you focus on describing what you want, and we'll format it into an effective prompt for your AI agent. no more worrying about perfect prompt structure."
    },
    {
      question: "does it work with my AI tools?",
      answer: "if you can type in it, you can speak to it. works with Cursor, Claude, ChatGPT, Copilot, Bard, whatever AI agent you use."
    },
    {
      question: "what about background noise?",
      answer: "our noise cancellation is pretty good. works fine in coffee shops, co-working spaces, and open offices. just don't try to prompt next to a construction site."
    }
  ]
}: FAQProps = {}) {
  // Default open state - first FAQ is initially open
  const [openFAQs, setOpenFAQs] = useState<number[]>([0]);

  const toggleFAQ = (index: number) => {
    // If this is the only open FAQ and we're trying to close it, don't allow
    if (openFAQs.length === 1 && openFAQs.includes(index)) {
      // Find the next FAQ to open (or previous if at the end)
      const nextIndex = index === items.length - 1 ? 0 : index + 1;
      setOpenFAQs([nextIndex]);
    } 
    // If this FAQ is already open, close it only if there's at least one other open
    else if (openFAQs.includes(index)) {
      if (openFAQs.length > 1) {
        setOpenFAQs(openFAQs.filter(i => i !== index));
      }
    } 
    // Otherwise, add this FAQ to the open list
    else {
      setOpenFAQs([...openFAQs, index]);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[rgb(12,12,12)]" id="faq">
      {/* Top gradient overflow */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />

      <div className="container mx-auto px-8 py-24 md:py-32 max-w-7xl">
        <div className="flex flex-col items-center">
          {/* Header */}
          <div className="max-w-xl text-center mb-16">
            <h2 className="mb-6 font-serif text-4xl lowercase tracking-tight text-white/90 md:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="font-lexend text-lg text-white/60">
              {subtitle}
            </p>
          </div>
        
          <div className="w-full max-w-2xl">
            <div className="space-y-4">
              {items.map((faq, index) => (
                <div 
                  key={index} 
                  className="overflow-hidden rounded-2xl border border-white/5"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors bg-[rgb(18,18,18)] hover:bg-[rgb(24,24,24)]"
                  >
                    <h3 className="font-lexend text-lg text-white/90">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: openFAQs.includes(index) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 flex-shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-white/40" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openFAQs.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 py-4 bg-[rgb(24,24,24)]">
                          <p className="font-lexend text-white/70">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 