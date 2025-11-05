"use client";

import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/components/QueryProvider"; // Adjust path if needed
import { SkeletonProvider } from "react-skeletonify";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google"; // Reuse fonts if needed elsewhere

// Reuse your font configs (or import them here if not global)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface ProvidersProps {
  children: React.ReactNode;
  session:any
}

export function Providers({ children,session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Move body class here if needed; otherwise, keep in layout
      >
        <QueryProvider>
          <SkeletonProvider
            config={{
              background: "hsl(210 20% 60%)", // Light gray base like bg-gray-100
              animationSpeed: 1.5, // Slower slide for mesmerizing effect (default: 3)
              // Enable shimmer animation (linear gradient slide)
              animation: "animation-1", // "animation-1": Linear shimmer; try "animation-2" for wave
              // Rounded like your manual
              borderRadius: "0.5rem",
              // Subtle border
              border: "1px solid hsl(210 40% 96%)",
              // Exclude interactive/static elements
              exceptTags: ["button", "img"],
              // Class for custom shimmer CSS (below)
              className: "skeleton-shimmer",
              // Subtle shadow for depth
              style: {
                boxShadow: "0 1px 2px hsl(210 20% 98%/0.5)",
              },
            }}
          >
            {children}
          </SkeletonProvider>
        </QueryProvider>
        <Toaster richColors position="top-center" />
      </body>
    </SessionProvider>
  );
}