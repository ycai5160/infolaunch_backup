/**
 * LoopingWords Component
 * 
 * A React component that displays an animated sequence of words with smooth transitions.
 * Based on the Osmo supply design (https://osmo.supply/), this component features:
 * - Elastic bounce animations using GSAP
 * - Dynamic selector width that adapts to each word's length
 * - Infinite looping with DOM manipulation for seamless transitions
 * - Customizable word array and styling
 * 
 * @param words - Array of words to display in the animation sequence
 * @param className - Optional CSS classes for additional styling
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { LoopingWordsProps } from '../types';

export default function LoopingWords({
  words,
  className = ''
}: LoopingWordsProps) {
  // Refs to access DOM elements for GSAP animations
  const listRef = useRef<HTMLUListElement>(null);     // The word list container

  useEffect(() => {
    // Exit early if required DOM elements are not available
    if (!listRef.current) return;

    // Get references to DOM elements for animation
    const wordList = listRef.current;                                    // UL container for words
    const wordElements = Array.from(wordList.children) as HTMLElement[]; // Individual word elements
    const totalWords = wordElements.length;
    
    // Exit if no words are present
    if (totalWords === 0) return;

    // Calculate movement offset as percentage for smooth scaling
    const wordHeight = 100 / totalWords; // Each word takes up 1/totalWords of the container height
    let currentIndex = 0;                 // Track current position in the sequence
    const wordsArray = [...wordElements];   // Maintain array reference for DOM manipulation

    /**
     * Updates the blur effect on all word elements
     * Only the current word remains sharp, others get blurred
     */
    function updateBlurEffect() {
      wordElements.forEach((element, index) => {
        const centerIndex = (currentIndex + 1) % totalWords;
        if (index === centerIndex) {
          // Current word: no blur, full opacity
          gsap.to(element, {
            filter: 'blur(0px)',
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
        } else {
          // Non-current words: blur and reduce opacity
          gsap.to(element, {
            filter: 'blur(2px)',
            opacity: 0.4,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    }

    

    /**
     * Main animation function that moves words vertically with elastic bounce
     * Implements infinite scrolling by moving DOM elements when nearing the end
     */
    function moveWords() {
      currentIndex++; // Move to next word position
      
      // Animate the word list upward using percentage-based positioning
      gsap.to(wordList, {
        yPercent: -wordHeight * currentIndex,    // Move up by one word height
        duration: 1.2,                           // Animation duration in seconds
        ease: 'elastic.out(1, 0.85)',           // Elastic bounce effect (amplitude: 1, period: 0.85)
        onStart: updateBlurEffect,               // Update blur effect at animation start
        onComplete: function() {
          // Infinite scroll logic: when approaching the end, move first element to the end
          // This creates seamless infinite scrolling without resetting to the beginning
          if (currentIndex >= totalWords - 4) {
            const firstChild = wordList.children[0];
            if (firstChild) {
              // Move first DOM element to the end of the list
              wordList.appendChild(firstChild);
              currentIndex--;                                           // Adjust index to account for moved element
              gsap.set(wordList, { yPercent: -wordHeight * currentIndex }); // Reset position without animation
              wordsArray.push(wordsArray.shift()!);                    // Update our array reference
              
              // Update word elements array after DOM manipulation
              const updatedWordElements = Array.from(wordList.children) as HTMLElement[];
              wordElements.length = 0;
              wordElements.push(...updatedWordElements);
              
              // Reapply blur effect after DOM changes
              updateBlurEffect();
            }
          }
        }
      });
    }

    // Initialize blur effect for the first word
    updateBlurEffect();

    // Create GSAP timeline for controlled, repeating animation sequence
    const timeline = gsap.timeline({ 
      repeat: -1   // Infinite repetition
    })
      .call(moveWords)                    // Execute moveWords function
      .to({}, { duration: 2 })            // Wait 2 seconds between each word transition
      .repeat(-1);                        // Infinite repetition

    // Cleanup function: kill timeline when component unmounts or dependencies change
    return () => {
      timeline.kill();
    };
  }, [words]); // Re-run effect when words array changes

  return (
    <section className={`flex justify-center items-center relative ${className}`}>
      {/* Main animation container with responsive text sizing */}
      <div className="relative h-[2.7em] px-1 text-5xl sm:text-7xl lg:text-9xl font-bold leading-[0.9]">
        {/* Overflow container to hide words outside the visible area */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Word list - animated vertically by GSAP */}
          <ul 
            ref={listRef}
            className="flex flex-col items-center m-0 p-0 list-none relative text-center uppercase whitespace-nowrap font-bold"
          >
            {words?.map((word, index) => (
              <li key={index} className="block">
                <p className="m-0 text-black">{word}</p>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Fade overlay - creates gradient mask effect to hide words at top/bottom */}
        <div 
          className="absolute inset-0 pointer-events-none w-full h-full"
          style={{
            background: 'linear-gradient(180deg, #fff 5%, transparent 40%, transparent 60%, #fff 95%)'
          }}
        />
        

      </div>
      
     
    </section>
  );
} 