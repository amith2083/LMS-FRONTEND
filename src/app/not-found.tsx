"use client";

import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white p-6 text-center">
      <div className="relative mb-8 group cursor-default">
         {/* Background Glow */}
        <div className="absolute -inset-8 bg-blue-100/50 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700 rounded-full" />
        
        {/* Error Illustration */}
        <div className="relative text-9xl font-black text-gray-100 tracking-tighter select-none">
          404
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <h1 className="text-2xl font-bold text-gray-900 drop-shadow-sm">Page not found</h1>
        </div>
      </div>

      <p className="text-gray-500 max-w-md mb-10 leading-relaxed font-medium">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link href="/">
          <Button
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-200"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
      </div>

      {/* Modern background blur blobs */}
      <div className="fixed -z-10 top-0 left-0 w-64 h-64 bg-blue-50/50 blur-[100px] rounded-full" />
      <div className="fixed -z-10 bottom-0 right-0 w-96 h-96 bg-purple-50/50 blur-[120px] rounded-full" />
    </div>
  );
}
