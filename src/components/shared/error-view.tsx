"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorViewProps {
  error: Error & { digest?: string };
  reset?: () => void;
  title?: string;
  description?: string;
  className?: string;
}

export const ErrorView = ({
  error,
  reset,
  title = "Something went wrong",
  description = "We encountered an unexpected error. Our team has been notified and is working on a fix.",
  className,
}: ErrorViewProps) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("ErrorBoundary caught an error:", error);
  }, [error]);

  return (
    <div
      className={cn(
        "flex min-h-[400px] w-full flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500",
        className
      )}
    >
      <div className="relative mb-6">
        <div className="absolute -inset-4 bg-red-100/50 blur-2xl rounded-full" />
        <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-red-100">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        {reset && (
          <Button
            onClick={reset}
            className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition-all duration-300"
          >
            <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
            Try again
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => window.location.href = "/"}
          className="hover:bg-gray-50"
        >
          Go to Home
        </Button>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="mt-12 w-full max-w-2xl text-left">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors mb-2"
          >
            {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {showDetails ? "Hide technical details" : "Show technical details"}
          </button>
          
          {showDetails && (
            <div className="rounded-xl bg-gray-900 p-4 text-xs font-mono text-gray-300 overflow-x-auto shadow-inner border border-gray-800">
              <p className="text-red-400 mb-2 font-bold uppercase tracking-wider text-[10px]">
                {error.name || "Error"}: {error.message}
              </p>
              <pre className="whitespace-pre-wrap leading-relaxed opacity-80">
                {error.stack}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Modern Glassmorphic background elements */}
      <div className="fixed -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-red-50 to-orange-50 blur-[120px] opacity-60 rounded-full" />
    </div>
  );
};
