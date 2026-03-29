"use client";

import { ErrorView } from "@/components/shared/error-view";

const MainError = ({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }; 
  reset: () => void 
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 bg-gradient-to-br from-indigo-50/20 via-white to-sky-50/20 py-24 min-h-[70vh]">
        <ErrorView 
           error={error} 
           reset={reset} 
           title="Main Portal Issue"
           description="We're having trouble loading this section of the SkillSeed portal. You can try refreshing, or perhaps go back to exploring our courses."
        />
    </div>
  );
};

export default MainError;
