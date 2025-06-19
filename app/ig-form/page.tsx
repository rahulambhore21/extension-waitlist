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
        <div className="form-container max-w-2xl mx-auto">
          <div className="p-8 sm:p-10">
            <div className="text-center space-y-8 mb-8">
              <div className="inline-block px-6 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-base text-orange-600 font-mono mb-4">
                Step 3 of 3
              </div>
              
              <h1 className="text-4xl font-bold heading-font tracking-tight">
                <span className="text-black">
                  Connect with Us
                </span>
              </h1>
              
              <p className="text-lg text-black/80">
                Share your Instagram handle for exclusive updates and shoutouts.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-input-group">
                <label htmlFor="instagram" className="form-label">Instagram handle</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-black/50">@</span>
                  <input
                    type="text"
                    id="instagram"
                    value={igHandle}
                    onChange={(e) => {
                      setIgHandle(e.target.value);
                      setError('');
                    }}
                    className="form-input pl-8"
                    placeholder="your.handle"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                </div>
                {error && <p className="form-error">{error}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="following"
                  checked={isFollowing}
                  onChange={(e) => setIsFollowing(e.target.checked)}
                  className="form-checkbox"
                />
                <label htmlFor="following" className="form-checkbox-label">
                  I'm following @tensorboy on Instagram
                </label>
              </div>

              <div>
                <button type="submit" className="form-button group">
                  <span className="flex items-center justify-center">
                    {igHandle ? 'Continue' : 'Skip for now'}
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