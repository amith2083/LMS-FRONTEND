"use client";

import { ErrorView } from "@/components/shared/error-view";

const InstructorError = ({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }; 
  reset: () => void 
}) => {
  return (
    <div className="flex flex-1 items-center justify-center p-12 overflow-hidden bg-slate-50/50">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl border border-slate-100 shadow-2xl p-10 ring-1 ring-slate-200">
        <ErrorView 
           error={error} 
           reset={reset} 
           title="Instructor Portal Error"
           description="An error occurred while loading the instructor dashboard. You can try resetting the state, but rest assured we're looking into it."
        />
      </div>
    </div>
  );
};

export default InstructorError;
