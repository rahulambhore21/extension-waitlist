import { useState, useRef, useCallback } from 'react';

export const useGlitchEffect = (duration: number = 150) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchTimeoutRef = useRef<NodeJS.Timeout>();

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    if (glitchTimeoutRef.current) {
      clearTimeout(glitchTimeoutRef.current);
    }
    glitchTimeoutRef.current = setTimeout(() => setIsGlitching(false), duration);
  }, [duration]);

  const clearGlitch = useCallback(() => {
    if (glitchTimeoutRef.current) {
      clearTimeout(glitchTimeoutRef.current);
    }
    setIsGlitching(false);
  }, []);

  return {
    isGlitching,
    triggerGlitch,
    clearGlitch
  };
};