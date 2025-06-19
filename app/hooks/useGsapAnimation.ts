import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface AnimationConfig {
  scale?: number;
  opacity?: number;
  duration?: number;
  stagger?: {
    from?: string | number;
    amount?: number;
  };
  ease?: string;
  repeat?: number;
  yoyo?: boolean;
}

export const useGsapAnimation = () => {
  const animationRef = useRef<gsap.core.Timeline>();

  const animateElements = useCallback((elements: Element[], config: AnimationConfig) => {
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.timeline()
      .to(elements, {
        scale: config.scale ?? 1,
        opacity: config.opacity ?? 1,
        duration: config.duration ?? 0.5,
        stagger: config.stagger ?? {
          from: 'center',
          amount: 0.3
        },
        ease: config.ease ?? 'back.out(1.2)',
        repeat: config.repeat ?? 0,
        yoyo: config.yoyo ?? false
      });

    return animationRef.current;
  }, []);

  const floatAnimation = useCallback((element: Element, yOffset: number = 20) => {
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.timeline()
      .to(element, {
        y: `+=${yOffset}`,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

    return animationRef.current;
  }, []);

  const killAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.kill();
    }
  }, []);

  useEffect(() => {
    return () => {
      killAnimation();
    };
  }, [killAnimation]);

  return {
    animateElements,
    floatAnimation,
    killAnimation
  };
};