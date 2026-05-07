'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Coins, Users, BarChart3, Vote } from 'lucide-react';
import { colors } from '../styles/colors';

interface AllocationItem {
  label: string;
  percentage: number;
  color: string;
}

interface UtilityFeature {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  color: string;
}

const allocationData: AllocationItem[] = [
  { label: 'Fair Launch', percentage: 60, color: colors.brand.blue },
  { label: 'Content Rewards (Yap-to-Earn)', percentage: 10, color: colors.brand.green },
  { label: 'Liquidity & Auction Reserve', percentage: 10, color: colors.brand.pink },
  { label: 'Staking & Governance', percentage: 10, color: colors.brand.purple },
  { label: 'Marketing & Partnerships', percentage: 5, color: '#FF8A65' },
  { label: 'Team & Advisors', percentage: 5, color: '#64B5F6' }
];

const utilityFeatures: UtilityFeature[] = [
  {
    icon: PieChart,
    title: 'Join Auctions',
    description: 'Use $INFO to participate in AI project Dutch auctions with potential whitelist or discount perks.',
    color: colors.brand.blue
  },
  {
    icon: Coins,
    title: 'Stake for Rewards',
    description: 'Lock your $INFO to earn yield, boost future auction access, and unlock governance voting power.',
    color: colors.brand.purple
  },
  {
    icon: Users,
    title: 'Yap-to-Earn Rewards',
    description: 'Claim $INFO by contributing valuable content — analysis, memes, threads — during active launch campaigns.',
    color: colors.brand.green
  },
  {
    icon: BarChart3,
    title: 'Access Premium Tools',
    description: 'Unlock advanced AI-driven dashboards and mindshare analytics with $INFO.',
    color: colors.brand.pink
  },
  {
    icon: Vote,
    title: 'Vote in Governance',
    description: 'Have a say in project listings, reward allocations, platform upgrades, and ecosystem direction.',
    color: '#FF8A65'
  }
];

// Simple pie chart component
const AllocationChart = () => {
  let cumulativePercentage = 0;
  
  return (
    <div className="relative w-80 h-80 mx-auto">
      <svg width="320" height="320" viewBox="0 0 320 320" className="transform -rotate-90">
        <circle
          cx="160"
          cy="160"
          r="120"
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="40"
        />
        {allocationData.map((item, index) => {
          const circumference = 2 * Math.PI * 120;
          const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
          const strokeDashoffset = -cumulativePercentage * circumference / 100;
          
          cumulativePercentage += item.percentage;
          
          return (
            <circle
              key={index}
              cx="160"
              cy="160"
              r="120"
              fill="none"
              stroke={item.color}
              strokeWidth="40"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
          );
        })}
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">$INFO</div>
          <div className="text-sm text-gray-500">Token</div>
        </div>
      </div>
    </div>
  );
};

export default function Tokenomics() {
  const [activeTab, setActiveTab] = useState(0);
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
    <section ref={sectionRef} id="tokenomics" className="w-full py-20 px-4">
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
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Token Economics</span>
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Tokenomics
          </h2>
          
        </div>

        {/* Token Overview */}
        <div 
          className="bg-white rounded-3xl p-8 lg:p-12 mb-16 border border-gray-100 bg-gradient-to-br from-gray-50 to-white"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            transitionDelay: isVisible ? '200ms' : '0ms'
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Token Stats */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Token Name</h3>
                  <div className="text-4xl font-bold text-gray-900">$INFO</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Supply</h3>
                  <div className="text-3xl font-bold text-gray-900">1,000,000,000</div>
                  <div className="text-lg text-gray-600">$INFO</div>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="lg:col-span-1 flex justify-center">
              <AllocationChart />
            </div>

            {/* Allocation Legend */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Allocation</h3>
              <div className="space-y-4">
                {allocationData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-medium">{item.label}</span>
                        <span className="text-gray-600 font-semibold">{item.percentage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Utility Section */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            transitionDelay: isVisible ? '400ms' : '0ms'
          }}
        >
          

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-1 mb-8">
            {utilityFeatures.map((feature, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border-2
                  ${activeTab === index 
                    ? 'bg-gray-100' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
                  }
                `}
                style={activeTab === index ? { borderColor: feature.color, color: feature.color } : {}}
              >
                <feature.icon className="w-3 h-3" />
                <span className="hidden sm:inline">{feature.title}</span>
              </button>
            ))}
          </div>

                    {/* Tab Content */}
          
            <div className="max-w-7xl mx-auto">
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed text-center font-medium">
                {utilityFeatures[activeTab].description}
              </p>
            </div>
          
        </div>

        
      </div>
    </section>
  );
} 