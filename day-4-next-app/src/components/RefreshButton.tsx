'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function RefreshButton() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    
    // Brief timeout to let the spin animation play and give visual feedback
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <button
      onClick={handleRefresh}
      className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 ${isRefreshing ? 'animate-spin' : ''}`}
      aria-label="Refresh feedback list"
      title="Refresh feedback list"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    </button>
  );
}
