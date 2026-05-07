'use client';

import { useEffect, useRef, useState } from 'react';
import LoopingWords from "./LoopingWords";

/**
 * Hero Component
 * 
 * The main landing section that serves as the primary visual and messaging focal point.
 * Features a dynamic animated headline using the LoopingWords component with GSAP animations.
 * 
 * Layout Structure:
 * - Full viewport height with centered content
 * - Responsive typography scaling
 * - Clean, minimal design with strong hierarchy
 * - Call-to-action buttons for user engagement
 * - Decorative SVG background elements with scroll animations
 * 
 * Animation Features:
 * - GSAP-powered looping words effect in the headline
 * - Smooth elastic transitions between words
 * - Dynamic width indicator that adjusts to each word
 * - Scroll-triggered slide animations for decorative elements
 */
export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initial visibility observer for content animation
    const visibilityObserver = new IntersectionObserver(
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

    // Scroll handler for decorative elements
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Hero is in view when its top is visible (>= 0)
        setHeroInView(rect.top >= 0);
      }
    };

    if (sectionRef.current) {
      visibilityObserver.observe(sectionRef.current);
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    // Check initial state
    handleScroll();

    return () => {
      if (sectionRef.current) {
        visibilityObserver.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /**
   * Words array for the animated headline
   * These phrases cycle through to show different actions users can take
   * Order matters for narrative flow and impact
   */
  const loopingWords = [
    "Say It.",    // Initial state - speaking/expressing ideas
    "Earn It.",   // Earning through participation/contribution  
    "Spend It.",
    "Say It.",    // Initial state - speaking/expressing ideas
    "Earn It.",   // Earning through participation/contribution  
    "Spend It."// Using earned tokens/rewards
  ];

  return (
    <section ref={sectionRef} className="min-h-screen relative bg-white py-20 sm:py-32 flex items-center justify-center overflow-hidden">
      {/* 
        Decorative Background Elements
        Positioned to match the screenshot layout with scroll animations
        Hidden on mobile/tablet, visible on desktop only
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block">
        {/* Left decorative element - Pink/Purple */}
        <div 
          className="absolute left-0 bottom-0 transition-transform duration-700 ease-out"
          style={{
            width: '25%',
            height: '40%',
            backgroundImage: 'url(/left.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: heroInView 
              ? 'translateY(-10%) translateX(0%)' 
              : 'translateY(-10%) translateX(-100%)',
          }}
        />
        
        {/* Top decorative element - Light Blue */}
        <div 
          className="absolute top-0 left-0 transition-transform duration-700 ease-out"
          style={{
            width: '35%',
            height: '30%',
            backgroundImage: 'url(/top.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: heroInView 
              ? 'translateX(30%) translateY(-30%)' 
              : 'translateX(30%) translateY(-130%)',
          }}
        />
        
        {/* Right decorative element - Light Green */}
        <div 
          className="absolute right-0 top-1/2 transition-transform duration-700 ease-out"
          style={{
            width: '25%',
            height: '40%',
            backgroundImage: 'url(/right.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: heroInView 
              ? 'translateY(-60%) translateX(20%)' 
              : 'translateY(-60%) translateX(120%)',
          }}
        />
      </div>

      {/* 
        Container with responsive max-width and padding
        Centers content both horizontally and vertically
      */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 
            Animated Main Headline
            Uses LoopingWords component for dynamic text cycling
            Typography scales responsively across breakpoints:
            - Mobile: text-5xl
            - Small screens: text-6xl  
            - Large screens: text-8xl
          */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionDelay: isVisible ? '0ms' : '0ms'
            }}
          >
            <LoopingWords 
              words={loopingWords}
              className="flex flex-col text-5xl sm:text-6xl lg:text-8xl font-bold text-black leading-tighter tracking-tight uppercase"
             
            />
          </div>
             
       
  
            {/* Description Section */}
            <div className="max-w-4xl mx-auto mb-12">
              {/* 
                Primary value proposition
                Large, prominent text that explains the core offering
              */}
              <p 
                className="text-xl sm:text-3xl text-black mb-6 leading-tight tracking-tight font-medium"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  transitionDelay: isVisible ? '300ms' : '0ms'
                }}
              >
                Info.Launch is a decentralized launchpad designed for AI-native projects.
              </p>
              
              {/* 
                Supporting description
                Detailed explanation of the platform's unique features and benefits
                Smaller, gray text for visual hierarchy
              */}
              <p 
                className="text-base sm:text-lg text-gray-600 leading-relaxed"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  transitionDelay: isVisible ? '500ms' : '0ms'
                }}
              >
                By combining Dutch auctions with InfoFi — a mechanism that tokenizes community attention — we ensure fair token distribution and reward meaningful participation. No more VC gatekeeping. Just transparent launches powered by real users and real impact.
              </p>
            </div>

            {/* 
              Call-to-Action Buttons Section
              Two primary actions with distinct visual styling:
              1. Primary CTA (dark/filled) - main conversion goal
              2. Secondary CTA (outlined) - alternative action
              
              Responsive layout:
              - Mobile: stacked vertically with full width
              - Tablet: stacked with auto width  
              - Desktop: horizontal row
            */}
            <div 
              className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center w-full max-w-md md:max-w-none mx-auto"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: isVisible ? '700ms' : '0ms'
              }}
            >
              {/* Primary CTA - Join Community */}
              <a href="https://t.me/Info_Launch_Official" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                <button className="w-full px-6 py-3 md:px-8 md:py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm md:text-lg hover:cursor-pointer">
                  Join our Community
                </button>
              </a>
              
              {/* Secondary CTA - Documentation */}
              <a href="https://docs.infolaunch.vip" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                <button className="w-full px-6 py-3 md:px-8 md:py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-semibold text-sm md:text-lg hover:cursor-pointer">
                  Documentation
                </button>
              </a>
            </div>
        </div>
      </div>
    </section>
  );
} 