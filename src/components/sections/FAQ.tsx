"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
}

/**
 * FAQ component - displays frequently asked questions with expandable answers
 */
export default function FAQ({
  title = "questions.",
  subtitle = "because you're probably wondering.",
  items = [
    {
      question: "why not just type my prompts or code?",
      answer: "typing is slow, breaks your flow, and pulls you out of the zone. with vibe coding, you speak your intent, stay in the creative groove, and let ai handle the rest."
    },
    {
      question: "how accurate is it?",
      answer: "sonic flow uses state-of-the-art local transcription, tuned for coding and natural language. for those 5–45 second bursts, it's impressively accurate, even with technical terms. and since it's local, it's fast and private."
    },
    {
      question: "will it work with my editor/ide/browser?",
      answer: "yes! if you can type in it, you can use sonic flow in it. vs code, cursor, notion, your terminal. anywhere you type, sonic flow fits right in."
    },
    {
      question: "is my data secure?",
      answer: "100% local processing. nothing is ever sent to the cloud. your words remain yours, always."
    },
    {
      question: 'what is "vibe coding" anyway?',
      answer: "vibe coding is the new way to build software: you describe what you want, ai (or your tools) handle the syntax. it's about staying in flow, riffing on ideas, and letting the machine do the heavy lifting. coined by karpathy, it's how the best devs are working now."
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
    <section className="relative overflow-hidden section-separator" id="faq">
      <div className="container mx-auto px-8 py-20 md:py-28 max-w-7xl">
        <div className="flex flex-col items-center">
          {/* Header */}
          <div className="max-w-xl text-center mb-16">
            <h2 className="mb-6 font-serif text-4xl lowercase tracking-tight heading-gradient md:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="font-lexend text-lg text-subtle">
              {subtitle}
            </p>
          </div>
        
          <div className="w-full max-w-2xl">
            <div className="space-y-4">
              {items.map((faq, index) => (
                <div 
                  key={index} 
                  className="overflow-hidden rounded-2xl card-elevated"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between p-6 text-left transition-all duration-300 hover:bg-white/[0.02]"
                  >
                    <h3 className="font-lexend text-lg text-white/90 font-medium">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: openFAQs.includes(index) ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
                      className="ml-4 flex-shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-dimmed" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openFAQs.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
                      >
                        <div className="px-6 py-4 border-t border-white/5 bg-gradient-to-b from-transparent to-black/10">
                          <p className="font-lexend text-subtle leading-relaxed">{faq.answer}</p>
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