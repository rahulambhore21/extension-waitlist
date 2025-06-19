"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomCursor from '../components/CustomCursor';

export default function InstagramForm() {
  const router = useRouter();
  const [igHandle, setIgHandle] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState('');

  const validateHandle = (handle: string) => {
    if (handle && !/^[a-zA-Z0-9._]+$/.test(handle)) {
      return 'Please enter a valid Instagram handle';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const handleError = validateHandle(igHandle);
    if (handleError) {
      setError(handleError);
      return;
    }

    try {
      // TODO: Implement API call to save Instagram handle
      router.push('/confirmation');
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
              Connect with Us
            </span>
          </h1>
          
          <p className="text-lg text-gray-600">
            Share your Instagram handle for exclusive updates and shoutouts.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="instagram" className="sr-only">Instagram handle</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">@</span>
                <input
                  type="text"
                  id="instagram"
                  value={igHandle}
                  onChange={(e) => {
                    setIgHandle(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                  placeholder="your.handle"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="following"
                checked={isFollowing}
                onChange={(e) => setIsFollowing(e.target.checked)}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="following" className="ml-2 block text-sm text-gray-600">
                I'm following @tensorboy on Instagram
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="minimal-button px-8 py-4 text-lg font-medium rounded-lg w-full sm:w-auto"
              >
                {igHandle ? 'Continue' : 'Skip for now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}