"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  tagline: string;
}

export default function NameSuggestionForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    tagline: ''
  });
  const [error, setError] = useState('');

  const validateName = (name: string) => {
    if (name.length > 20) return 'Name must be 20 characters or less';
    if (name.length < 1) return 'Name is required';
    if (!/^[a-zA-Z0-9\s-]*$/.test(name)) return 'Name can only contain letters, numbers, spaces, and hyphens';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const nameError = validateName(formData.name);
    if (nameError) {
      setError(nameError);
      return;
    }

    try {
      // TODO: Implement API call to save name suggestion
      router.push('/email-form');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name Suggestion
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setError('');
            }}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
            placeholder="Enter a name (max 20 characters)"
            maxLength={20}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-2">
            Tagline (Optional)
          </label>
          <textarea
            id="tagline"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
            placeholder="Add a brief explanation for your name suggestion"
            rows={3}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="minimal-button px-8 py-4 text-lg font-medium rounded-lg w-full sm:w-auto"
          >
            Submit Name
          </button>
        </div>
      </form>
    </div>
  );
}