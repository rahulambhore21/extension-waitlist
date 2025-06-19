"use client";

import React from 'react';
import NameSuggestionForm from '../components/NameSuggestionForm';
import CustomCursor from '../components/CustomCursor';

export default function NameSuggestionPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <CustomCursor />
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-orbitron)] tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400">
              Name Our Workspace
            </span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg sm:text-xl text-gray-600">
            Help us find the perfect name for our browser workspace extension and win exclusive rewards.
          </p>
        </div>
        <div className="mt-12">
          <NameSuggestionForm />
        </div>
      </div>
    </main>
  );
}