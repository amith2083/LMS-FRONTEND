'use client';

import { FC } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size = 'md', message = 'Loading course...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-8">
      <div
        className={`
          ${sizeClasses[size]} 
          border-4 border-gray-200 border-t-blue-600 
          rounded-full animate-spin 
          shadow-lg
        `}
      />
      <p className="mt-4 text-gray-600 text-sm font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;