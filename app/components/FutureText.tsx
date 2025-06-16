"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FutureTextProps {
  text: string;
  className?: string;
}

export default function FutureText({ text, className = "" }: FutureTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    gsap.set(chars, { perspective: 1000 });

    gsap.fromTo(chars,
      {
        opacity: 0,
        rotationX: -90,
        y: 80
      },
      {
        opacity: 1,
        rotationX: 0,
        y: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=100",
          end: "bottom top",
        }
      }
    );
  }, [text]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative z-10">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="char inline-block transform-gpu"
            style={{ 
              textShadow: '0 0 10px currentColor',
              filter: 'drop-shadow(0 0 2px currentColor)'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 blur-xl opacity-50 z-0">
        {text.split('').map((char, i) => (
          <span key={i} className="inline-block">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
}