"use client";

import QueryProvider from "@/components/shared/QueryProvider";
import { SkeletonProvider } from "react-skeletonify";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import { UserProvider } from "@/features/auth/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export function Providers({ children }: { children: React.ReactNode }) {
  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
    >
    <body className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased selection:bg-indigo-100 selection:text-indigo-900`}>
      <UserProvider>
        <QueryProvider>
          <SkeletonProvider
            config={{
              background: "hsl(210 20% 60%)",
              animationSpeed: 1.5,
              animation: "animation-1",
              borderRadius: "0.5rem",
              border: "1px solid hsl(210 40% 96%)",
              exceptTags: ["button", "img"],
              className: "skeleton-shimmer",
              style: {
                boxShadow: "0 1px 2px hsl(210 20% 98%/0.5)",
              },
            }}
          >
            {children}
          </SkeletonProvider>
        </QueryProvider>
        <Toaster richColors position="top-center" />
      </UserProvider>
    </body>
    </GoogleOAuthProvider>
  );
}

