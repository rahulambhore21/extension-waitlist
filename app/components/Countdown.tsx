"use client";

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    gsap.from(".countdown-item", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, []);  return (
    <div className="flex space-x-4 justify-center">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="countdown-item">
          <div className="bg-white/10 p-4 rounded-lg border border-white/40 hover:border-orange-500/50 transition-colors shadow-lg shadow-black/10 group">
            <div className="text-2xl md:text-3xl font-bold text-orange-500 font-mono text-center group-hover:scale-110 transition-transform">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/80 mt-1 text-center">
              {key}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;