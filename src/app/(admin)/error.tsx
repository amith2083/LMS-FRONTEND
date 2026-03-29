"use client";

import { ErrorView } from "@/components/shared/error-view";

const AdminError = ({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }; 
  reset: () => void 
}) => {
  return (
    <div className="flex flex-1 items-center justify-center p-8 bg-zinc-50/20 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-white p-12 rounded-2xl shadow-xl border border-zinc-100">
        <ErrorView 
           error={error} 
           reset={reset} 
           title="Admin Panel Error"
           description="We encountered an issue in the administration dashboard. Please contact system administrators if this problem persists."
        />
      </div>
    </div>
  );
};

export default AdminError;
