import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const initHeadingAnimation = (element: HTMLElement) => {
  const split = new SplitText(element, { type: "chars, words" });
  
  return gsap.from(split.chars, {
    opacity: 0,
    y: 20,
    rotateX: -90,
    stagger: 0.02,
    duration: 1,
    ease: "power4.out",
    transformOrigin: "0% 50% -50"
  });
};

export const initParallaxEffect = (element: HTMLElement) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    },
    y: (_, target) => -target.offsetHeight * 0.2,
    ease: "none"
  });
};

export const createHoverEffect = (element: HTMLElement) => {
  const timeline = gsap.timeline({ paused: true });
  
  timeline
    .to(element, {
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(element.querySelector('.glow'), {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, 0);

  return timeline;
};