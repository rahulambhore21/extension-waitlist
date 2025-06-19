"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomCursor from '../components/CustomCursor';
import { gsap } from 'gsap';

export default function PosterPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate poster generation
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShareUrl('https://tensorlabs.dev/vote/123'); // Replace with actual sharing URL
    }, 2000);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Vote for my workspace name!',
        text: 'I just named the coziest workspace on the internet. Help me win!',
        url: shareUrl
      });
    } catch (err) {
      console.log('Sharing failed', err);
    }
  };

  const handleVote = () => {
    router.push('/voting');
  };

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <CustomCursor />
      
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-orbitron)] tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400">
              Your Poster is Ready!
            </span>
          </h1>

          <div ref={posterRef} className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card p-8 border-2 border-orange-100">
            {isGenerating ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-8">
                  <div className="text-3xl font-bold text-orange-500">WorkspaceName</div>
                  <p className="text-xl text-gray-600">"Your vote makes this lo-fi tab real."</p>
                </div>

                <div className="space-y-4">
                  <div className="text-sm text-gray-500">@username</div>
                  <img
                    src="/qr-code-placeholder.svg"
                    alt="QR Code"
                    className="w-32 h-32 mx-auto"
                  />
                  <div className="text-sm text-gray-500">{shareUrl}</div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleShare}
              onMouseEnter={() => {
                gsap.to(".cursor-dot", { scale: 4, duration: 0.3 });
                gsap.to(".cursor-border", { scale: 1.5, duration: 0.3 });
              }}
              onMouseLeave={() => {
                gsap.to(".cursor-dot", { scale: 1, duration: 0.3 });
                gsap.to(".cursor-border", { scale: 1, duration: 0.3 });
              }}
              className="minimal-button px-8 py-4 text-lg font-medium rounded-lg"
              disabled={isGenerating}
            >
              Share Poster
            </button>

            <button
              onClick={handleVote}
              onMouseEnter={() => {
                gsap.to(".cursor-dot", { scale: 4, duration: 0.3 });
                gsap.to(".cursor-border", { scale: 1.5, duration: 0.3 });
              }}
              onMouseLeave={() => {
                gsap.to(".cursor-dot", { scale: 1, duration: 0.3 });
                gsap.to(".cursor-border", { scale: 1, duration: 0.3 });
              }}
              className="minimal-button px-8 py-4 text-lg font-medium rounded-lg"
              disabled={isGenerating}
            >
              Go to Voting
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}