"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Countdown from './components/Countdown';
import { getTimerEndDate } from './utils/timerUtils';
import CustomCursor from './components/CustomCursor';
import PixelEffect from './components/PixelEffect';
import VideoPlayer from './components/VideoPlayer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [nameError, setNameError] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const tensorRef = useRef<HTMLHeadingElement>(null);
  const spaceRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Force scroll to top on client-side only
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
    }
  }, []);

  useEffect(() => {
    // Create stars for the space effect
    if (starsRef.current) {
      const starsContainer = starsRef.current;
      starsContainer.innerHTML = '';
      const numStars = 100;
      
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 4}s`;
        starsContainer.appendChild(star);
      }
    }

    // Add scroll effect to navbar
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (navigationRef.current) {
        if (scrollTop > 10) {
          navigationRef.current.classList.add('scrolled');
        } else {
          navigationRef.current.classList.remove('scrolled');
        }
      }
    };

    if (!containerRef.current || !navigationRef.current || !headingRef.current || !contentRef.current) return;

    // Initialize GSAP animations
    const mainTimeline = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Robot showcase animation sequence
    mainTimeline
      // Initial fade in of container
      .fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 }
      )
      // Navbar animation
      .fromTo(navigationRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.5
      )
      // Robot iframe - ensure it's visible early
      .fromTo(".robot-iframe",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5 },
        0.3
      )
      // TENSOR text animation - slide from left with color
      .fromTo(tensorRef.current,
        { x: -200, opacity: 0, color: 'rgba(0, 0, 0, 0.1)' },
        { x: 0, opacity: 1, color: '#f97316', duration: 1.2, ease: "power2.out" },
        1
      )
      // SPACE text animation - slide from right with color
      .fromTo(spaceRef.current,
        { x: 200, opacity: 0, color: 'rgba(0, 0, 0, 0.1)' },
        { x: 0, opacity: 1, color: '#000000', duration: 1.2, ease: "power2.out" },
        1
      )
      // Robot showcase text elements
      .fromTo(".showcase-badge",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 0.8, duration: 0.8 },
        1.2
      )
      .fromTo(".showcase-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 0.3, duration: 1 },
        1.4
      )
      .fromTo(".showcase-tagline",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.6, duration: 0.8 },
        1.6
      )
      .fromTo(".scroll-arrow",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        1.9
      )
      // Content section animations
      .fromTo(".content-intro",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        2.0
      )
      .fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        2.2
      );

    // Create scroll-triggered animations for content sections
    const scrollTrigger = ScrollTrigger.create({
      trigger: "#video-section",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo("#video-section",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );
      },
      once: true
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      mainTimeline.kill();
      if (scrollTrigger) scrollTrigger.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      setNameError('Please enter your name');
      return;
    }
    
    // Store the name
    localStorage.setItem('userName', userName);
    
    // Redirect to email form
    router.push(`/email-form?name=${encodeURIComponent(userName)}`);
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-white relative overflow-hidden">
      <CustomCursor />
      <PixelEffect />
      
      {/* Stars background */}
      <div ref={starsRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden"></div>
      
      {/* Robot as fullscreen background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <iframe className="robot-iframe w-full h-full" src='https://my.spline.design/nexbotrobotcharacterconcept-Morp165eASGdxvCQwLh5rBAR/' frameBorder='0'></iframe>
      </div>
      
      
      <nav ref={navigationRef} className="flex items-center justify-between px-8 py-6 fixed w-full z-50 navbar-glass">
        <div className="flex items-center space-x-4 group">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
          <span className="font-mono text-sm text-orange-500 font-medium group-hover:tracking-wider transition-all duration-300">tensor labs</span>
        </div>
        <button 
          className="px-4 py-2 text-xs rounded-full text-black/80 border border-black/10 hover:border-orange-500/50 hover:text-orange-500 transition-all duration-300 hover:px-5 backdrop-blur-sm bg-white/10"
          onMouseEnter={() => {
            gsap.to(".cursor-dot", { scale: 3, duration: 0.3 });
            gsap.to(".cursor-border", { scale: 1.5, duration: 0.3 });
          }}
          onMouseLeave={() => {
            gsap.to(".cursor-dot", { scale: 1, duration: 0.3 });
            gsap.to(".cursor-border", { scale: 1, duration: 0.3 });
          }}
        >
          menu
        </button>
      </nav>

      {/* Robot Showcase Area - Full height section to display robot */}
      <div className="h-screen flex items-center justify-center relative robot-showcase" style={{ marginTop: 0 }}>
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10">
          <h1 ref={tensorRef} className="text-8xl font-bold heading-font opacity-0">
            TENSOR
          </h1>
        </div>
        
        <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10">
          <h1 ref={spaceRef} className="text-8xl font-bold heading-font opacity-0">
            SPACE
          </h1>
        </div>

        <div className="text-center relative z-10">
          <div 
            className="scroll-arrow mt-20 cursor-pointer" 
            onClick={() => {
              const formSection = document.getElementById('form-section');
              formSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/50 mx-auto hover:text-orange-500/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute left-10 top-1/3 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl"></div>
        <div className="absolute right-10 bottom-1/3 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col justify-center relative z-10 px-4 pt-8 pb-20">
        <div className="w-full max-w-6xl mx-auto">
          {/* Video Preview Section - Moved to top */}
          <div id="video-section" className="w-full mb-20">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/40 shadow-2xl overflow-hidden p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-3">See it in action</h2>
                  <p className="text-black/90 text-base mb-6">
                    Check out how our workspace extension transforms your browser experience into a distraction-free, 
                    focused environment tailored for productivity.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-black font-medium">Distraction-free workspace</span>
                        <p className="text-black/70 text-sm mt-1">Block notifications and focus-draining websites</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-black font-medium">Smart tab management</span>
                        <p className="text-black/70 text-sm mt-1">Organize your tabs by project or workflow</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-black font-medium">Focus-enhancing features</span>
                        <p className="text-black/70 text-sm mt-1">Integrated pomodoro timer and focus metrics</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-black/80 text-sm italic">
                      "The perfect solution for deep work in the browser. Once you try it, you can't go back."
                    </p>
                  </div>
                </div>
                
                <div>
                  <VideoPlayer 
                    videoSrc="/finaldns.mp4" 
                    posterSrc="/video-poster.jpg"
                    className="h-[400px] w-full rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Name Suggestion Form */}
          <div id="form-section" className="w-full scroll-mt-20">
            <div className="text-center mb-10 content-intro">
              <div className="inline-block px-6 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-base text-orange-600 font-mono mb-4">
                Join the journey
              </div>
              <h2 className="text-2xl font-semibold text-black">Help us name our revolutionary browser workspace</h2>
            </div>
            <div ref={contentRef} className="w-full bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-2xl overflow-hidden">
              <div className="px-8 py-10">
                <div className="space-y-8">
                  <div ref={headingRef} className="relative z-10 mb-6 text-center">
                    <div className="inline-block px-4 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-xs text-orange-400 font-mono mb-4 tracking-widest uppercase font-bold">Naming Competition</div>
                    <h1 className="text-3xl sm:text-5xl font-bold font-[family-name:var(--font-orbitron)] leading-none tracking-tighter select-none mb-6">
                      <span className="text-black text-shadow-glow">NAME</span>
                      <span className="block mt-2">
                        <span className="text-orange-500">THE WORKSPACE</span>
                      </span>
                    </h1>
                    <p className="text-black text-sm mt-4 max-w-lg mx-auto">
                      What would you name the <span className="text-orange-300 font-semibold">coziest workspace</span> on the internet? 
                      The top 3 names win exclusive prizes!
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <form onSubmit={handleNameSubmit} className="space-y-8">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                          First, what's your name?
                        </label>
              <div className="relative group">
                            <input
                              ref={nameInputRef}
                              type="text"
                              id="name"
                              value={userName}
                              onChange={(e) => {
                                setUserName(e.target.value);
                                setNameError('');
                              }}
                              className="w-full p-4 pl-5 bg-white/5 border border-white/40 focus:border-orange-500 rounded-lg focus:outline-none text-black transition-all duration-300 group-hover:border-white/60"
                              placeholder="Enter your name to continue"
                              maxLength={20}
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                          </div>
                        {nameError && (
                          <p className="mt-2 text-sm text-orange-400">{nameError}</p>
                        )}
                      </div>

                      <div className="flex justify-center">
                        <button 
                          type="submit"
                          className="bg-orange-500 text-black w-full px-6 py-4 rounded-lg text-sm font-medium group hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-1"
                          onMouseEnter={() => {
                            gsap.to(".cursor-dot", { scale: 4, duration: 0.3 });
                            gsap.to(".cursor-border", { scale: 1.5, duration: 0.3 });
                          }}
                          onMouseLeave={() => {
                            gsap.to(".cursor-dot", { scale: 1, duration: 0.3 });
                            gsap.to(".cursor-border", { scale: 1, duration: 0.3 });
                          }}
                        >
                          <span className="flex items-center justify-center">
                            Join Naming Competition 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </button>
                      </div>
                      
                      <div className="pt-4">
                        <div className="text-xs uppercase tracking-widest text-black/70 mb-3 text-center font-medium">Competition ends in</div>
                        <Countdown targetDate={getTimerEndDate()} />
                      </div>
                    </form>
                    
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-lg border border-white/40">
                      <h3 className="text-orange-400 mb-5 text-base font-medium flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Top 3 winners receive
                      </h3>
                      <div className="font-mono text-sm space-y-3 text-black/90">
                        <div className="flex items-start space-x-3 bg-white/10 p-3 rounded-lg border-l-2 border-orange-500/50 hover:border-orange-500 transition-colors group">
                          <span className="text-orange-500 mt-0.5 opacity-80 group-hover:opacity-100">•</span>
                          <span>6 months <span className="text-black font-bold">free premium access</span></span>
                        </div>
                        <div className="flex items-start space-x-3 bg-white/10 p-3 rounded-lg border-l-2 border-orange-500/50 hover:border-orange-500 transition-colors group">
                          <span className="text-orange-500 mt-0.5 opacity-80 group-hover:opacity-100">•</span>
                          <span>1:1 call with the <span className="text-black font-bold">founder</span></span>
                        </div>
                        <div className="flex items-start space-x-3 bg-white/10 p-3 rounded-lg border-l-2 border-orange-500/50 hover:border-orange-500 transition-colors group">
                          <span className="text-orange-500 mt-0.5 opacity-80 group-hover:opacity-100">•</span>
                          <span>"Named by <span className="text-black font-bold">YOU</span>" credit in final product</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
