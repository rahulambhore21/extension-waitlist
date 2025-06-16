"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Pixel {
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export default function PixelEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pixels: Pixel[] = [];
    let animationFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createPixel = (x: number, y: number): Pixel => ({
      x,
      y,
      opacity: Math.random(),
      size: Math.random() * 3 + 1
    });

    const initPixels = () => {
      const pixelCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
      for (let i = 0; i < pixelCount; i++) {
        pixels.push(createPixel(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        ));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      pixels.forEach((pixel, i) => {
        ctx.fillStyle = `rgba(249, 115, 22, ${pixel.opacity})`;
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
        
        pixel.opacity = Math.sin(Date.now() * 0.001 + i) * 0.5 + 0.5;
        pixel.y += Math.sin(Date.now() * 0.001 + i) * 0.5;
        
        if (pixel.y > canvas.height) {
          pixel.y = 0;
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    resize();
    initPixels();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
    />
  );
}