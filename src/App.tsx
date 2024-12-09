import React from 'react';
import { NewsGrid } from './components/NewsGrid';
import { NewspaperIcon } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <NewspaperIcon className="h-8 w-8 text-gray-800" />
              <h1 className="text-2xl font-serif font-bold text-gray-900">The Daily Chronicle</h1>
            </div>
            <p className="text-sm text-gray-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </header>
      
      <main>
        <NewsGrid />
      </main>
    </div>
  );
}

export default App;