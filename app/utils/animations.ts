import { gsap } from 'gsap';

export const fadeIn = (element: Element) => {
  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
    }
  );
};

export const slideInUp = (element: Element, delay: number = 0) => {
  return gsap.fromTo(
    element,
    {
      y: 40,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: "expo.out",
    }
  );
};

export const staggerChildren = (parent: Element, staggerTime: number = 0.1) => {
  const children = gsap.utils.toArray(parent.children);
  return gsap.fromTo(
    children,
    {
      y: 20,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: staggerTime,
      duration: 0.8,
      ease: "back.out(1.4)",
    }
  );
};

export const morphBackground = (element: Element) => {
  gsap.to(element, {
    backgroundPosition: '100% 100%',
    duration: 15,
    ease: "none",
    repeat: -1,
  });
};