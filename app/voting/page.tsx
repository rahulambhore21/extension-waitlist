"use client";

import React, { useState } from 'react';
import CustomCursor from '../components/CustomCursor';

interface Submission {
  id: string;
  name: string;
  votes: number;
  username: string;
}

export default function VotingPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([
    { id: '1', name: 'WorkspaceOne', votes: 150, username: 'creator1' },
    { id: '2', name: 'TabMaster', votes: 120, username: 'creator2' },
    { id: '3', name: 'FocusFlow', votes: 90, username: 'creator3' },
  ]);
  const [remainingVotes, setRemainingVotes] = useState(2);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleVote = async (submissionId: string) => {
    if (remainingVotes === 0) {
      setError('You have used all your votes!');
      return;
    }

    if (votedIds.includes(submissionId)) {
      setError('You have already voted for this submission!');
      return;
    }

    try {
      // TODO: Implement API call to record vote
      setSubmissions(submissions.map(sub =>
        sub.id === submissionId ? { ...sub, votes: sub.votes + 1 } : sub
      ));
      setRemainingVotes(prev => prev - 1);
      setVotedIds([...votedIds, submissionId]);
      setError('');
    } catch (err) {
      setError('Failed to record vote. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <CustomCursor />
      
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold font-[family-name:var(--font-orbitron)] tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400">
                Vote for Your Favorites
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              You have {remainingVotes} votes remaining. Choose wisely!
            </p>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>

          <div className="space-y-6">
            {submissions
              .sort((a, b) => b.votes - a.votes)
              .map((submission, index) => (
                <div
                  key={submission.id}
                  className={`glass-card p-6 rounded-xl transition-all duration-300 ${index < 3 ? 'border-orange-200' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`text-2xl font-bold ${index === 0 ? 'text-orange-500' : 'text-gray-400'}`}>
                        #{index + 1}
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-800">{submission.name}</div>
                        <div className="text-sm text-gray-500">by @{submission.username}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-lg font-medium text-gray-600">
                        {submission.votes} votes
                      </div>
                      <button
                        onClick={() => handleVote(submission.id)}
                        disabled={remainingVotes === 0 || votedIds.includes(submission.id)}
                        className={`minimal-button px-6 py-2 text-sm font-medium rounded-lg
                          ${votedIds.includes(submission.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {votedIds.includes(submission.id) ? 'Voted' : 'Vote'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}