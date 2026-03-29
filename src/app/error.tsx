"use client";

import { ErrorView } from "@/components/shared/error-view";

const GlobalError = ({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }; 
  reset: () => void 
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-xl w-full">
        <ErrorView 
           error={error} 
           reset={reset} 
           title="Critical System Error"
           description="A critical error occurred at the system level. Try refreshing the page, or return to home if the problem persists."
        />
      </div>
    </div>
  );
};

export default GlobalError;
