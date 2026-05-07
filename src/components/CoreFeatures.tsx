'use client';
import Image from 'next/image';

import { useState, useEffect, useRef } from 'react';
import { Gavel, Droplets, Gift, Coins, BarChart3 } from 'lucide-react';
import { colors } from '../styles/colors';

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const coreFeatures: Feature[] = [
  {
    title: 'Dutch Auction Launchpad',
    description: 'Fair and transparent token sales with dynamic pricing. No VCs, no insiders — just open market participation.',
    icon: Gavel
  },
  {
    title: 'Auto Liquidity Injection',
    description: '50% of raised funds and project tokens are automatically added to DEX liquidity pools post-auction, enabling instant trading and minimizing volatility.',
    icon: Droplets
  },
  {
    title: 'InfoFi Reward System',
    description: 'Earn $INFO by creating valuable content. Community engagement is tracked and rewarded through AI-powered analysis.',
    icon: Gift
  },
  {
    title: 'Use or Stake $INFO',
    description: 'Use $INFO to join auctions or stake for long-term rewards and governance rights.',
    icon: Coins
  },
  {
    title: 'AI-Driven Dashboards',
    description: 'Real-time insights into project traction, social buzz, and market trends — all powered by NLP and on-chain data.',
    icon: BarChart3
  }
];

// Mobile mockup component with actual app screenshot
const MobileMockup = ({ activeFeature }: { activeFeature: number }) => (
  <div className="relative mx-auto">
    <div className="relative w-80 h-[640px]">
      {/* Phone frame */}
      <div className="absolute inset-0 bg-white rounded-[40px] border-2 border-gray-300 shadow-2xl">
        {/* Screen area */}
        <div className="absolute top-5 left-[15px] right-[15px] bottom-5 bg-gray-100 rounded-[20px] overflow-hidden">
          {/* Status bar */}
          
          
                      {/* App screenshot */}
            <div className="absolute top-0 left-0 right-0 bottom-0">
              <Image 
                src={`/p${activeFeature < 2 ? 1 : activeFeature < 4 ? 2 : 3}.png`}
                alt={`Info.Launch App Feature ${activeFeature < 2 ? 1 : activeFeature < 4 ? 2 : 3}`}
                className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                width={320}
                height={640}
              />
            </div>
        </div>
        
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default function CoreFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveFeature(index);
          }
        },
        {
          threshold: 0.6, // Feature becomes active when 60% visible
          rootMargin: '-20% 0px -20% 0px' // Only consider middle 60% of viewport
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

    return (
    <section id="features" className="w-full px-4 pt-20 md:pt-32 lg:pt-48 pb-16">
      <div className="relative max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 lg:mb-20 xl:mb-32">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-8 md:w-12 h-1 bg-gray-300 rounded-full"></div>
            <span className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Platform Overview</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Core Features
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Features List - Left Column */}
          <div className="space-y-8">
            <div className="space-y-8 w-full max-w-2xl space-y-8 md:space-y-16 lg:space-y-[128px] mb-8 md:mb-12 lg:mb-[20vh]">
              {coreFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  ref={el => { featureRefs.current[index] = el; }}
                  className={`group transition-all duration-700 ease-out ${
                    activeFeature === index 
                      ? 'opacity-100 scale-105 translate-x-2 blur-none' 
                      : 'opacity-60 scale-100 translate-x-0 blur-[3px]'
                  }`}
                >
                                     {/* Feature Card */}
                   <div className={`relative p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border transition-all duration-500 ${
                     activeFeature === index 
                       ? 'bg-white border-gray-200' 
                       : 'bg-gray-50/50 border-gray-100'
                   }`}>
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 ${
                      activeFeature === index ? 'opacity-5' : 'opacity-0'
                    }`} 
                    style={{
                      background: `linear-gradient(135deg, ${
                        index === 0 ? colors.brand.blue : 
                        index === 1 ? colors.brand.pink :
                        index === 2 ? colors.brand.green :
                        index === 3 ? colors.brand.purple : colors.brand.blue
                      }20 0%, transparent 50%)`
                    }}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon and Number */}
                      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                                 <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl transition-all duration-300 ${
                           activeFeature === index 
                             ? 'bg-gradient-to-br scale-110' 
                             : 'bg-gray-100'
                         }`}
                        style={{
                          backgroundImage: activeFeature === index ? 
                            `linear-gradient(135deg, ${
                              index === 0 ? colors.brand.blue : 
                              index === 1 ? colors.brand.pink :
                              index === 2 ? colors.brand.green :
                              index === 3 ? colors.brand.purple : colors.brand.blue
                            }, ${
                              index === 0 ? colors.brand.blue + '80' : 
                              index === 1 ? colors.brand.pink + '80' :
                              index === 2 ? colors.brand.green + '80' :
                              index === 3 ? colors.brand.purple + '80' : colors.brand.blue + '80'
                            })` : undefined
                        }}>
                          <feature.icon 
                            className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 transition-colors duration-300 ${
                              activeFeature === index 
                                ? 'text-white' 
                                : 'text-gray-600'
                            }`} 
                          />
                        </div>
                        <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-200">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      
                      {/* Title and Description */}
                      <div className="space-y-3 md:space-y-4">
                        <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                          activeFeature === index 
                            ? 'text-gray-900' 
                            : 'text-gray-700'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className={`text-base md:text-lg leading-relaxed transition-colors duration-300 ${
                          activeFeature === index 
                            ? 'text-gray-600' 
                            : 'text-gray-500'
                        }`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Mockup - Right Column */}
          <div className="relative h-full w-full hidden md:block">
            <div className="h-[50vh] md:h-[60vh] sticky top-[15vh] md:top-[20vh]">
              {/* Enhanced mockup container */}
              <div className="relative">
                {/* Animated background elements */}
                <div className="absolute inset-0 rounded-3xl opacity-20">
                  <div 
                    className="absolute inset-0 rounded-3xl transition-all duration-700 ease-out"
                    style={{ 
                      background: `radial-gradient(circle at 30% 30%, ${
                        activeFeature === 0 ? colors.brand.blue : 
                        activeFeature === 1 ? colors.brand.pink :
                        activeFeature === 2 ? colors.brand.green :
                        activeFeature === 3 ? colors.brand.purple : colors.brand.blue
                      }20 0%, transparent 60%)`
                    }}
                  ></div>
                </div>
                
                                 {/* Main mockup container */}
                 <div 
                   className="relative w-full h-full rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 flex justify-center items-center transition-all duration-700 ease-out border border-white/20 backdrop-blur-sm"
                  style={{ 
                    backgroundColor: (() => {
                      switch(activeFeature) {
                        case 0: return colors.light.blue;
                        case 1: return colors.light.pink;
                        case 2: return colors.light.green;
                        case 3: return colors.light.purple;
                        case 4: return colors.light.blue;
                        default: return colors.light.blue;
                      }
                    })()
                  }}
                >
                  {/* Floating decoration elements */}
                  <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-white/40 animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-white/30 animate-pulse delay-700"></div>
                  
                  <MobileMockup activeFeature={activeFeature} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 