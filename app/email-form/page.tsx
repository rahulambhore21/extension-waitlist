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
        <div className="form-container max-w-2xl mx-auto">
          <div className="p-8 sm:p-10">
            <div className="text-center space-y-8 mb-8">
              <div className="inline-block px-6 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-base text-orange-600 font-mono mb-4">
                Step 2 of 3
              </div>
              
              <h1 className="text-4xl font-bold heading-font tracking-tight">
                <span className="text-black">
                  Stay Connected
                </span>
              </h1>
              
              <p className="text-lg text-black/80">
                Enter your email to continue and receive updates about the launch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-input-group">
                <label htmlFor="email" className="form-label">Email address</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="form-input"
                    placeholder="Enter your email address"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                {error && <p className="form-error">{error}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="subscribe"
                  checked={isSubscribed}
                  onChange={(e) => setIsSubscribed(e.target.checked)}
                  className="form-checkbox"
                />
                <label htmlFor="subscribe" className="form-checkbox-label">
                  Subscribe to our newsletter for updates and exclusive content
                </label>
              </div>

              <div>
                <button type="submit" className="form-button group">
                  <span className="flex items-center justify-center">
                    Continue
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}