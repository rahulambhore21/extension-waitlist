import { useState, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

const COLORS = [
  '#FF6B2C',
  '#FFB74D',
  '#FF8F00',
  '#FF5722',
  '#FF9100'
];

export const useParticleSystem = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameRef = useRef<number>(null);

  const createParticle = useCallback((x: number, y: number): Particle => ({
    x,
    y,
    vx: (Math.random() - 0.5) * 6,
    vy: (Math.random() - 0.5) * 6,
    life: 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 3 + 1,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10
  }), []);

  const addParticles = useCallback((x: number, y: number, count: number = 1) => {
    const newParticles = Array.from({ length: count }, () => createParticle(x, y));
    setParticles(prev => [...prev, ...newParticles]);
  }, [createParticle]);

  const startAnimation = useCallback(() => {
    const animate = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            rotation: p.rotation + p.rotationSpeed,
            life: p.life * 0.95
          }))
          .filter(p => p.life > 0.1)
      );
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setParticles([]);
  }, []);

  return {
    particles,
    addParticles,
    startAnimation,
    stopAnimation
  };
};