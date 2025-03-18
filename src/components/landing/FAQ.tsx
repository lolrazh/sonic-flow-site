"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { type FAQProps } from './types';

/**
 * FAQ component - displays frequently asked questions with expandable answers
 */
export default function FAQ({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about Sonic Flow",
  items = [
    {
      question: "What makes Sonic Flow different from other dictation tools?",
      answer: "Sonic Flow combines state-of-the-art AI transcription with a uniquely unobtrusive interface. Unlike other dictation tools, our minimalist pill UI stays out of your way until you need it, and works seamlessly with any desktop application without requiring special plugins or integrations."
    },
    {
      question: "How accurate is Sonic Flow's transcription?",
      answer: "Sonic Flow uses advanced AI models specifically tuned for speech recognition, achieving over 95% accuracy for most speakers in typical environments. Our technology continues to improve with regular updates, and adapts to your voice patterns the more you use it."
    },
    {
      question: "Can I use Sonic Flow with any application?",
      answer: "Yes! Sonic Flow works with any desktop application that accepts text input, including word processors, email clients, messaging apps, browsers, and more. No special integrations or plugins are required - if you can type in it, you can dictate to it."
    },
    {
      question: "What languages does Sonic Flow support?",
      answer: "Sonic Flow currently supports English (US, UK, AU, CA), with Spanish, French, and German in beta. We're actively working on adding more languages and improving regional accent recognition across all supported languages."
    },
    {
      question: "Is there a limit to how much I can dictate?",
      answer: "No limits! Our unlimited plan gives you unlimited dictation time for a simple, predictable monthly or annual fee. Dictate as much as you need without worrying about hitting usage caps or unexpected charges."
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
    <section className="bg-dark-900 py-24" id="faq">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-dark-50 md:text-4xl">
          {title.split(' ')[0]}{' '}
          <span className="text-accent-600">{title.split(' ').slice(1).join(' ')}</span>
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-dark-200">
          {subtitle}
        </p>
        
        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {items.map((faq, index) => (
              <div 
                key={index} 
                className="overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between rounded-xl p-6 text-left transition-colors bg-dark-800/30 hover:bg-dark-800/50"
                >
                  <h3 className="text-lg font-medium text-dark-100">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFAQs.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-accent-500" />
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
                      <div className="px-6 py-4 bg-dark-800/20 rounded-b-xl">
                        <p className="text-dark-200">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 