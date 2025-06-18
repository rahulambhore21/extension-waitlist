"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturePreview = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const features = featuresRef.current?.children;
    if (features) {
      gsap.from(features, {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }
  }, []);

  return (
    <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      <div className="feature-card bg-white p-6 rounded-lg shadow-lg border border-orange-100 hover:border-orange-200 transition-colors duration-300">
        <div className="text-orange-500 text-xl mb-4">🚀</div>
        <h3 className="font-bold text-xl mb-2 text-gray-800">Lightning Fast</h3>
        <p className="text-gray-600">Experience blazing fast performance with our cutting-edge technology.</p>
      </div>
      <div className="feature-card bg-white p-6 rounded-lg shadow-lg border border-orange-100 hover:border-orange-200 transition-colors duration-300">
        <div className="text-orange-500 text-xl mb-4">🎯</div>
        <h3 className="font-bold text-xl mb-2 text-gray-800">Precise Control</h3>
        <p className="text-gray-600">Take full control of your workflow with intuitive tools and interfaces.</p>
      </div>
      <div className="feature-card bg-white p-6 rounded-lg shadow-lg border border-orange-100 hover:border-orange-200 transition-colors duration-300">
        <div className="text-orange-500 text-xl mb-4">🛡️</div>
        <h3 className="font-bold text-xl mb-2 text-gray-800">Enterprise Ready</h3>
        <p className="text-gray-600">Built with security and scalability in mind for enterprise deployment.</p>
      </div>
    </div>
  );
};

export default FeaturePreview;