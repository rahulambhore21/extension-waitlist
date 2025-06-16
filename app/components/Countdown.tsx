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
  }, []);

  return (
    <div className="flex space-x-4 md:space-x-8">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="countdown-item text-center">
          <div className="text-3xl md:text-5xl font-bold text-orange-500">{value}</div>
          <div className="text-sm uppercase tracking-wider text-gray-600">{key}</div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;