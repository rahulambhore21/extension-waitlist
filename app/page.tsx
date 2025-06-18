"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Countdown from './components/Countdown';
import { getTimerEndDate } from './utils/timerUtils';
import { useMouseParallax } from './hooks/useMouseParallax';
import CustomCursor from './components/CustomCursor';
import FutureText from './components/FutureText';
import PixelRobot from './components/PixelRobot';
import PixelEffect from './components/PixelEffect';
import { initHeadingAnimation, initParallaxEffect, createHoverEffect } from './utils/gsapAnimations';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const robotRef = useMouseParallax();
  const navigationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainTimeline = gsap.timeline({
      onComplete: () => setIsLoading(false)
    });

    if (containerRef.current && navigationRef.current && headingRef.current && contentRef.current && robotRef.current) {
      // Timeline animations
      mainTimeline
        .fromTo(containerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 }
        )
        .fromTo(navigationRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.2
        )
        .fromTo(robotRef.current,
          { scale: 0.8, opacity: 0, rotationY: -15 },
          { 
            scale: 1, 
            opacity: 1, 
            rotationY: 0,
            duration: 1.2, 
            ease: "elastic.out(1, 0.5)" 
          },
          0.8
        );

      // Robot hover effect
      const hoverEffect = createHoverEffect(robotRef.current);
      robotRef.current.addEventListener('mouseenter', () => hoverEffect.play());
      robotRef.current.addEventListener('mouseleave', () => hoverEffect.reverse());

      return () => {
        if (robotRef.current) {
          robotRef.current.removeEventListener('mouseenter', () => hoverEffect.play());
          robotRef.current.removeEventListener('mouseleave', () => hoverEffect.reverse());
        }
      };
    }
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-white">
      <CustomCursor />
      
      <nav ref={navigationRef} className="flex items-center justify-between px-8 py-6 fixed w-full z-50 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="flex items-center space-x-4">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span className="font-mono text-sm text-orange-500">labs</span>
        </div>
        <button className="minimal-button px-4 py-2 text-xs rounded">
          menu
        </button>
      </nav>

      <div className="flex-1 flex items-center justify-center p-8 pt-32">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={contentRef} className="space-y-12">
            <div ref={headingRef} className="relative z-10 mb-8">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-[family-name:var(--font-orbitron)] leading-none tracking-tighter select-none mb-4">
                <span className="text-orange-500">TEN</span>
                <span className="text-orange-500">SOR</span>
                <span className="block mt-2 text-orange-500">
                  LABS<span className="animate-pulse">.</span>
                </span>
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <button 
                onMouseEnter={() => {
                  gsap.to(".cursor-dot", { scale: 4, duration: 0.3 });
                  gsap.to(".cursor-border", { scale: 1.5, duration: 0.3 });
                }}
                onMouseLeave={() => {
                  gsap.to(".cursor-dot", { scale: 1, duration: 0.3 });
                  gsap.to(".cursor-border", { scale: 1, duration: 0.3 });
                }}
                className="minimal-button px-8 py-4 rounded-lg text-sm"
              >
                Join Waitlist
              </button>
              <Countdown targetDate={getTimerEndDate()} />
            </div>

            <div className="glass-card p-6 rounded-lg">
              <p className="text-orange-500 mb-4 text-sm">Join the revolution in AI development</p>
              <div className="font-mono text-sm space-y-2 text-gray-600">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-500">{'-'}</span>
                  <span>GPU Acceleration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-500">{'-'}</span>
                  <span>Neural Networks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-500">{'-'}</span>
                  <span>Real-time Processing</span>
                </div>
              </div>
            </div>
          </div>

          <div ref={robotRef} className="relative h-[600px] w-full">
            <div className="glass-card w-full h-full rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <PixelRobot />
              </div>
              <div className="absolute bottom-6 right-6 font-mono text-orange-500 text-xs">
                <span className="opacity-50">system ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
