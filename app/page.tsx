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

    if (containerRef.current) {
      mainTimeline.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      );
    }

    if (navigationRef.current) {
      mainTimeline.fromTo(navigationRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.2
      );
    }

    if (headingRef.current) {
      const heading = headingRef.current;
      const lines = heading.querySelectorAll('h1 > *');
      
      mainTimeline.fromTo(lines, {
        opacity: 0,
        y: 100,
        rotateX: -50,
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      }, 0.4);
    }

    if (contentRef.current) {
      initParallaxEffect(contentRef.current);
      const elements = contentRef.current.children;
      mainTimeline.fromTo(elements,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15,
          ease: "power2.out"
        },
        0.6
      );
    }

    if (robotRef.current) {
      const hoverEffect = createHoverEffect(robotRef.current);
      robotRef.current.addEventListener('mouseenter', () => hoverEffect.play());
      robotRef.current.addEventListener('mouseleave', () => hoverEffect.reverse());
      
      mainTimeline.fromTo(robotRef.current,
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
    }
  }, []);

  return (
    <main ref={containerRef} className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col ${isLoading ? 'cursor-wait' : ''}`}>
      <CustomCursor />
      <PixelEffect />
      <nav ref={navigationRef} className={`flex items-center justify-between px-8 py-6 fixed w-full z-50 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="font-mono text-sm text-black/50">sys.ready</span>
        </div>
        <button className="text-xs font-mono text-black/50 hover:text-black transition-colors duration-300">
          menu.toggle()
        </button>
      </nav>

      <div className="flex-1 flex items-center justify-center p-8 pt-32">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={contentRef} className="space-y-12">
            <div ref={headingRef} className="relative z-10 mb-8">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-[family-name:var(--font-orbitron)] text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-800 to-black leading-none tracking-tighter select-none mb-4">
                TEN
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300">SOR</span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300">
                  LABS_
                </span>
              </h1>
              <div className="absolute -z-10 top-0 left-0 w-full h-full blur-3xl opacity-20 bg-gradient-to-br from-orange-500 to-orange-300 transform scale-150"></div>
            </div>
            <div className="flex items-center space-x-8">
              <button 
                onMouseEnter={() => {
                  gsap.to(".cursor-dot", { scale: 4, duration: 0.3 });
                  gsap.to(".cursor-border", { scale: 1.5, duration: 0.3 });
                }}
                onMouseLeave={() => {
                  gsap.to(".cursor-dot", { scale: 1, duration: 0.3 });
                  gsap.to(".cursor-border", { scale: 1, duration: 0.3 });
                }}
                className="group bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-mono text-sm transition-all duration-500 ease-out hover:pr-12 relative overflow-hidden"
              >
                <span className="relative z-10">join()</span>
                <span className="absolute right-0 top-0 bottom-0 w-0 bg-orange-500 group-hover:w-2 transition-all duration-500"></span>
              </button>
              <Countdown targetDate={getTimerEndDate()} />
            </div>
          </div>

          {/* Right Side - 3D Model */}
          <div ref={robotRef} className="relative h-[600px] w-full">
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl shadow-2xl overflow-hidden relative group perspective-1000">
              <div className="absolute inset-0 flex items-center justify-center">
                <PixelRobot />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-4 border border-black/5 rounded-2xl"></div>
              <div className="absolute bottom-8 right-8 font-mono text-orange-500/50 text-sm tracking-widest">
                <span className="animate-pulse">pixel.render()</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-[0.08]"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-[0.08]"></div>
      </div>
    </main>
  );
}
