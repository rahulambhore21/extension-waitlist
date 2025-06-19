// filepath: c:\Rahul\Coding\Client\Tensor Boy\waitlist-web\app\components\VideoPlayer.tsx
"use client";

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface VideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
}

export default function VideoPlayer({ videoSrc, posterSrc, className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-black/20 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center" 
           style={{ opacity: isPlaying ? 0 : 1, pointerEvents: isPlaying ? 'none' : 'auto' }}
      >
        <button 
          onClick={togglePlay}
          className={`w-16 h-16 flex items-center justify-center rounded-full bg-orange-500/90 transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onMouseEnter={() => {
            gsap.to(".cursor-dot", { scale: 4, duration: 0.3 });
            gsap.to(".cursor-border", { scale: 1.5, duration: 0.3 });
          }}
          onMouseLeave={() => {
            gsap.to(".cursor-dot", { scale: 1, duration: 0.3 });
            gsap.to(".cursor-border", { scale: 1, duration: 0.3 });
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      </div>
      
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        onEnded={() => setIsPlaying(false)}
        playsInline
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100">
        <p className="text-white text-sm">Our workspace extension in action</p>
      </div>
    </div>
  );
}