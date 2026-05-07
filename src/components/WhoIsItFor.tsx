'use client';

import { useEffect, useRef, useState } from 'react';
import { colors } from '../styles/colors';

interface TargetAudience {
  number: string;
  title: string;
  description: string;
  accentColor: string;
}

const targetAudiences: TargetAudience[] = [
  {
    number: '01',
    title: 'AI Project Builders',
    description: 'Looking for a fair, transparent, and community-driven token launch without relying on VCs or centralized gatekeepers.',
    accentColor: colors.brand.blue
  },
  {
    number: '02',
    title: 'Crypto Investors & Degens',
    description: 'Early access to high-potential AI projects through Dutch auctions, with instant post-sale liquidity on major DEXs.',
    accentColor: colors.brand.pink
  },
  {
    number: '03',
    title: 'Content Creators & Influencers',
    description: 'Monetize your analysis, threads, and memes through the InfoFi reward system — your voice earns $INFO.',
    accentColor: colors.brand.green
  },
  {
    number: '04',
    title: 'Traders & Liquidity Providers',
    description: 'Join auctions, provide DEX liquidity post-launch, and capitalize on early market activity with less friction and more upside.',
    accentColor: colors.brand.purple
  }
];

export default function WhoIsItFor() {
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

  return (
    <section ref={sectionRef} id="who-is-it-for" className="w-full py-20 px-4 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div 
          className="mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            transitionDelay: isVisible ? '0ms' : '0ms'
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Who Is<br />
            Info.Launch For?
          </h2>
        </div>
        
        {/* Target Audiences List */}
        <div className="space-y-8">
          {targetAudiences.map((audience, index) => (
            <div 
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-gray-200 last:border-b-0"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: isVisible ? `${200 + (index * 100)}ms` : '0ms'
              }}
            >
              {/* Number */}
              <div className="md:col-span-1">
                <span 
                  className="text-2xl font-bold"
                  style={{ color: audience.accentColor }}
                >
                  {audience.number}
                </span>
              </div>
              
              {/* Title */}
              <div className="md:col-span-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {audience.title}
                </h3>
              </div>
              
              {/* Description */}
              <div className="md:col-start-8 md:col-span-5">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}