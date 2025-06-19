"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomCursor from '../components/CustomCursor';

export default function EmailForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    try {
      // TODO: Implement API call to save email
      router.push('/ig-form');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <CustomCursor />
      
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-orbitron)] tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400">
              Stay Connected
            </span>
          </h1>
          
          <p className="text-lg text-gray-600">
            Enter your email to continue and receive updates about the launch.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                placeholder="Enter your email address"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="subscribe"
                checked={isSubscribed}
                onChange={(e) => setIsSubscribed(e.target.checked)}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="subscribe" className="ml-2 block text-sm text-gray-600">
                Subscribe to our newsletter for updates and exclusive content
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="minimal-button px-8 py-4 text-lg font-medium rounded-lg w-full sm:w-auto"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}