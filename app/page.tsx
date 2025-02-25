'use client';

import Chat from './components/Chat';

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center py-6">
        <h1 className="text-2xl font-bold">Bent's Woodworks Assistant</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ask questions about woodworking and furniture making
        </p>
      </header>
      
      <main className="flex items-center justify-center">
        <Chat />
      </main>

      <footer className="text-center py-4 text-sm text-gray-600 dark:text-gray-400">
        Powered by Jason Bent's woodworking expertise
      </footer>
    </div>
  );
}
