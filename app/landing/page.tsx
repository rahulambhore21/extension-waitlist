"use client";

import React from 'react';
import NameSuggestionForm from '../components/NameSuggestionForm';
import { gsap } from 'gsap';
import CustomCursor from '../components/CustomCursor';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <CustomCursor />
      
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-orbitron)] tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400">
              What would you name the coziest workspace on the internet?
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            We're building the perfect browser extension for focus. But it doesn't have a name yet. That's where you come in.
          </p>

          <div className="flex justify-center">
            <button 
              className="minimal-button px-8 py-4 text-lg font-medium rounded-lg"
              onClick={() => {
                gsap.to(".cursor-dot", { scale: 4, duration: 0.3 });
                gsap.to(".cursor-border", { scale: 1.5, duration: 0.3 });
              }}
              onMouseLeave={() => {
                gsap.to(".cursor-dot", { scale: 1, duration: 0.3 });
                gsap.to(".cursor-border", { scale: 1, duration: 0.3 });
              }}
            >
              Name it. Share it. Win it.
            </button>
          </div>
        </div>

        <div className="mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-bold text-orange-500 mb-4">Early Access</h3>
              <p className="text-gray-600">Get exclusive first access to our revolutionary browser workspace.</p>
            </div>

            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-bold text-orange-500 mb-4">Premium Perks</h3>
              <p className="text-gray-600">Enjoy 6 months of premium features completely free.</p>
            </div>

            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-xl font-bold text-orange-500 mb-4">Founder's Call</h3>
              <p className="text-gray-600">Win a private 1:1 call with our founder and shape the future.</p>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <NameSuggestionForm />
        </div>
      </div>
    </main>
  );
}