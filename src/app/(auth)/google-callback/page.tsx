"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

useEffect(() => {
  if (status === "authenticated" && session?.user?.email) {
    axios.post(
      `${API_BASE_URL}/api/auth/set-tokens`,
      { email: session.user.email },
      { withCredentials: true } 
    )
    .then(() => {
      router.replace("/");
    })
    .catch((err) => {
      console.error("Failed to set tokens", err);
    });
  }
}, [status, session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center">
        {/* Google Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <svg className="w-16 h-16 animate-pulse" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-gray-800">
            Signing you in{dots}
          </h1>
          <p className="text-gray-500 text-lg">
            Please wait while we complete your Google sign-in
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full animate-[shimmer_2s_ease-in-out_infinite]"
                 style={{
                   width: '100%',
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 2s ease-in-out infinite'
                 }}>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Secured by Google</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}