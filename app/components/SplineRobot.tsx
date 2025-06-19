'use client';

import React from 'react';
import { useGsapAnimation } from '../hooks/useGsapAnimation';

interface SplineRobotProps {
  className?: string;
}

const SplineRobot: React.FC<SplineRobotProps> = ({ className = '' }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { animateElements } = useGsapAnimation();

  React.useEffect(() => {
    if (containerRef.current) {
      animateElements([containerRef.current], {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out'
      });
    }
  }, [animateElements]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-[600px] relative overflow-hidden rounded-lg shadow-lg ${className}`}
    >
      <iframe
        src='https://my.spline.design/nexbotrobotcharacterconcept-VI9L97Q8wbqPZp7iTSBMGqcH/'
        frameBorder='0'
        width='100%'
        height='100%'
        className='absolute inset-0'
        title='3D Robot Model'
      />
    </div>
  );
};

export default SplineRobot;