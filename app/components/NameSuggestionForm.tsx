"use client";

import { useState } from 'react';

export default function NameSuggestionForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setName('');
    setEmail('');
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      {isSubmitted ? (
        <div className="text-center">
          <h3 className="text-xl font-bold text-orange-500 mb-2">Thank you!</h3>
          <p className="text-gray-600">We've received your suggestion. We'll notify you when we launch!</p>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Suggest a Name</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full minimal-button py-2 px-4 rounded-md text-sm"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}