"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - cursor.offsetWidth / 2,
        y: e.clientY - cursor.offsetHeight / 2,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(cursorDot, {
        x: e.clientX - cursorDot.offsetWidth / 2,
        y: e.clientY - cursorDot.offsetHeight / 2,
        duration: 0.1
      });
    };

    const onMouseEnter = () => {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    };

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);
  return (
    <>
      <div ref={cursorRef} className="hidden md:block fixed pointer-events-none w-16 h-16 rounded-full border border-orange-500/50 transition-transform duration-200 z-50" style={{ opacity: 0 }} />
      <div ref={cursorDotRef} className="hidden md:block fixed pointer-events-none w-1 h-1 bg-orange-500 rounded-full z-50" style={{ opacity: 0 }} />
    </>
  );
}