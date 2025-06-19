import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Components Demo',
  description: 'Demonstration of our UI components'
};

export default function ComponentsPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Component Library</h1>
      <p>This page demonstrates our UI components.</p>
    </main>
  );
}