'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What is Info.Launch?',
    answer: 'Info.Launch is a decentralized launchpad tailored for AI projects, combining Dutch auctions with the InfoFi system to enable fair token distribution and community-powered engagement.'
  },
  {
    question: 'How does the Dutch auction work?',
    answer: 'Projects define their starting price, floor price, and decay rate. The price decreases over time until all tokens are sold or the auction ends, allowing true market-driven price discovery.'
  },
  {
    question: 'What happens after the auction ends?',
    answer: '50% of the funds raised — along with an equivalent portion of the project\'s tokens — are automatically injected into a decentralized exchange (DEX) liquidity pool like Uniswap or Raydium, ensuring instant post-launch trading with initial liquidity locked.'
  },
  {
    question: 'How can I earn $INFO?',
    answer: 'You can earn $INFO at any time by contributing valuable content — whether it\'s analysis, threads, or memes. During active auction periods, rewards are boosted, giving contributors greater incentives to engage.'
  },
  {
    question: 'What can I do with $INFO?',
    answer: 'Use $INFO to participate in upcoming auctions, stake for yield and governance access, or unlock advanced analytics and platform features.'
  },
  {
    question: 'Is Info.Launch audited and secure?',
    answer: 'Yes. Our smart contracts are audited by top firms like CertiK and PeckShield. We also utilize AI-based sybil detection and Chainlink oracles to validate off-chain data and reduce manipulation.'
  },
  {
    question: 'Which chains does Info.Launch support?',
    answer: 'Info.Launch launches on Solana for its high throughput and low fees, with Ethereum, Polygon, and others supported via Wormhole or LayerZero cross-chain bridges.'
  },
  {
    question: 'Who decides which projects get listed?',
    answer: 'Info.Launch has no gatekeeping. Any project can initiate a launch and move directly into promotion and auction. The market decides — through attention, bidding, and liquidity — which projects succeed.'
  }
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faq" className="w-full py-20 px-4">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div 
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            transitionDelay: isVisible ? '0ms' : '0ms'
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Frequently Asked</span>
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:border-gray-200"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: isVisible ? `${200 + (index * 80)}ms` : '0ms'
              }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between gap-4 transition-all duration-200 hover:bg-gray-50"
              >
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 leading-tight">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out ${
                      openItem === index ? 'rotate-180' : 'rotate-0'
                    }`} 
                  />
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItem === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed lg:text-lg">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 