"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import CustomCursor from '../components/CustomCursor';
import { gsap } from 'gsap';

export default function ConfirmationPage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/poster');
  };

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <CustomCursor />
      
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-orbitron)] tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400">
              Are You Ready for the Battle?
            </span>
          </h1>
          
          <div className="space-y-6">
            <p className="text-xl text-gray-600">
              Your creative journey is about to begin. Get ready to showcase your idea to the world!
            </p>
            <p className="text-lg text-gray-500">
              We'll generate a unique poster for your submission that you can share with your network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-2xl font-bold text-orange-500 mb-2">Share</div>
              <p className="text-gray-600">Share your unique poster on social media</p>
            </div>

            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-2xl font-bold text-orange-500 mb-2">Vote</div>
              <p className="text-gray-600">Get votes from your network</p>
            </div>

            <div className="glass-card p-6 rounded-xl text-center">
              <div className="text-2xl font-bold text-orange-500 mb-2">Win</div>
              <p className="text-gray-600">Win exclusive rewards and recognition</p>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={handleContinue}
              onMouseEnter={() => {
                gsap.to(".cursor-dot", { scale: 4, duration: 0.3 });
                gsap.to(".cursor-border", { scale: 1.5, duration: 0.3 });
              }}
              onMouseLeave={() => {
                gsap.to(".cursor-dot", { scale: 1, duration: 0.3 });
                gsap.to(".cursor-border", { scale: 1, duration: 0.3 });
              }}
              className="minimal-button px-12 py-6 text-xl font-medium rounded-xl"
            >
              Generate My Poster
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}