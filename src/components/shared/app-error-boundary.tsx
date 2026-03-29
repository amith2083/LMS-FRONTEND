"use client";

import { ErrorBoundary } from "react-error-boundary";
import { ErrorView } from "./error-view";

interface AppErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
  onError?: (error: Error, info: { componentStack: string }) => void;
  title?: string;
  description?: string;
}

/**
 * A reusable component-level error boundary.
 * Wrap volatile UI elements (charts, complex data tables) in this to prevent 
 * a single component from crashing the entire page.
 */
export const AppErrorBoundary = ({
  children,
  fallback,
  onReset,
  onError,
  title = "Something went wrong in this component",
  description = "An localized error occurred. Please try refreshing or clearing the context.",
}: AppErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) =>
        fallback ? (
          <>{fallback}</>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-red-50 p-8 h-full min-h-[300px] flex items-center justify-center bg-gray-50/20 backdrop-blur-sm">
            <ErrorView
              error={error}
              reset={resetErrorBoundary}
              title={title}
              description={description}
            />
          </div>
        )
      }
      onReset={onReset}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  );
};
