'use client';

import { useEffect, useRef, useState } from 'react';
import { Scale, Coins, Users, Zap } from 'lucide-react';
import { featureColors } from '../styles/colors';

interface ValuePropCard {
  title: string;
  description: string;
  iconColor: string;
  backgroundColor: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const valuePropositionData: ValuePropCard[] = [
  {
    title: 'Fairness',
    description: 'Dutch auctions eliminate front-running and VC-preferred pricing.',
    iconColor: featureColors.fairness.icon,
    backgroundColor: featureColors.fairness.background,
    icon: Scale
  },
  {
    title: 'Incentivization',
    description: 'High-signal content gets tokenized into $INFO.',
    iconColor: featureColors.incentivization.icon,
    backgroundColor: featureColors.incentivization.background,
    icon: Coins
  },
  {
    title: 'Empowerment',
    description: 'AI-powered dashboards give users actionable data, not hopium.',
    iconColor: featureColors.empowerment.icon,
    backgroundColor: featureColors.empowerment.background,
    icon: Users
  },
  {
    title: 'Instant Liquidity',
    description: 'Post-auction capital is auto-deployed to DEX pools for immediate, trustless trading.',
    iconColor: featureColors.instantLiquidity.icon,
    backgroundColor: featureColors.instantLiquidity.background,
    icon: Zap
  }
];

export default function ValueProposition() {
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
    <section ref={sectionRef} className="w-full py-20 px-4 bg-white relative overflow-hidden">
      
      <div className="relative max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div 
            className="flex items-center justify-center gap-3 mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionDelay: isVisible ? '0ms' : '0ms'
            }}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Why Choose Us</span>
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <h2 
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionDelay: isVisible ? '100ms' : '0ms'
            }}
          >
            Value Proposition
          </h2>
        </div>

        {/* Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {valuePropositionData.map((item, index) => (
            <div
              key={index}
              className="group relative h-full"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: isVisible ? `${300 + (index * 100)}ms` : '0ms'
              }}
            >
              {/* Card Container */}
              <div
                className="relative p-8 lg:p-10 h-full flex flex-col rounded-4xl transition-all duration-500 ease-out"
                style={{ backgroundColor: item.backgroundColor }}
              >
                {/* Gradient Overlay on Hover */}
                <div 
                  className="absolute inset-0 rounded-4xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ 
                    background: `linear-gradient(135deg, ${item.iconColor} 0%, transparent 50%)` 
                  }}
                ></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container */}
                  <div className="mb-8">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ backgroundColor: item.iconColor }}
                    >
                      <item.icon className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 flex flex-col">
                    {/* Title */}
                    <h3 
                      className="text-2xl lg:text-3xl font-bold mb-4 transition-all duration-300 group-hover:scale-105"
                      style={{ color: item.iconColor }}
                    >
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p 
                      className="text-lg leading-relaxed transition-colors duration-300 group-hover:opacity-90"
                      style={{ color: item.iconColor }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div 
                      className="w-8 h-1 rounded-full transition-all duration-300"
                      style={{ backgroundColor: item.iconColor }}
                    ></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-300"></div>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}