"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const ROBOT_GRID = [
  "   2 2   ",
  "2 22122 2",
  " 2111112 ",
  "21222212",
  "21211212",
  " 2111112 ",
  "2 22122 2",
  "   2 2   "
];

export default function PixelRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const pixels = containerRef.current.querySelectorAll('.pixel');
    let isHovered = false;

    const createParticle = (x: number, y: number): Particle => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 1
    });

    gsap.to(pixels, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: {
        from: "center",
        amount: 0.8
      },
      ease: "back.out(1.2)"
    });

    const floatAnimation = gsap.to(containerRef.current, {
      y: "+=20",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    const handleMouseEnter = () => {
      isHovered = true;
      gsap.to(pixels, {
        scale: 1.1,
        stagger: {
          from: "center",
          amount: 0.3
        }
      });
      
      const newParticles: Particle[] = [];
      pixels.forEach((pixel: Element) => {
        if (Math.random() > 0.7) {
          const rect = pixel.getBoundingClientRect();
          const containerRect = containerRef.current!.getBoundingClientRect();
          newParticles.push(createParticle(
            rect.left - containerRect.left,
            rect.top - containerRect.top
          ));
        }
      });
      setParticles(newParticles);
    };

    const handleMouseLeave = () => {
      isHovered = false;
      gsap.to(pixels, {
        scale: 1,
        stagger: {
          from: "center",
          amount: 0.3
        }
      });
    };

    const animateParticles = () => {
      if (isHovered) {
        setParticles(prevParticles => {
          const updatedParticles = prevParticles.map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02
          })).filter(p => p.life > 0);
          
          return updatedParticles;
        });
      }
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    };

    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    animateParticles();

    return () => {
      floatAnimation.kill();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="grid gap-1 p-4 transform-gpu cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      {particles?.map((particle, index) => (
        <div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-orange-500 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.life,
            transform: `scale(${particle.life})`
          }}
        />
      ))}
      {ROBOT_GRID.map((row, i) => (
        <div key={i} className="flex gap-1 justify-center">
          {row.split('').map((cell, j) => (
            <div
              key={j}
              className={`pixel w-6 h-6 rounded-sm transform scale-0 opacity-0 transition-colors duration-300 ${
                cell === '2' ? 'bg-orange-500 hover:bg-orange-400' : 
                cell === '1' ? 'bg-gray-800 hover:bg-gray-700' : 
                'bg-transparent'
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}