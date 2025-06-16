import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useMouseParallax = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const moveElement = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;

      gsap.to(element, {
        x: xPos,
        y: yPos,
        rotation: xPos * 0.05,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', moveElement);
    return () => window.removeEventListener('mousemove', moveElement);
  }, []);

  return elementRef;
};