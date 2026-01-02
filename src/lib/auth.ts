
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import axios from "axios";
import { setTokens } from "@/app/services/authService";

export const authOptions: NextAuthOptions = {
  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 50 * 60, // 50 minutes (in seconds)
  },

  // JWT configuration
  jwt: {
    maxAge: 50 * 60, // 50 minutes (in seconds) – must match session.maxAge
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            },
            { withCredentials: true }
          );

          if (res.status !== 200) {
            throw new Error(res.data.message ?? "Invalid credentials");
          }

          const user = res.data;
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            isVerified: user.isVerified,
            isBlocked: user.isBlocked,
            profilePicture: user.profilePicture,
          };
        } catch (err: any) {
          throw new Error(err.response?.data?.message ?? "Login failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
  
}),
  
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/auth/google-sync`,
            {
              email: profile.email,
              name: profile.name,
              image: profile.picture, // Google uses "picture", not "image"
            },
            { withCredentials: true }
          );

          const backendUser = res.data;

          if (!backendUser) {
            return false; // Block sign-in
          }

          if (backendUser.isBlocked) {
            return "/login?error=blocked"; // Custom redirect
          }

          if (backendUser.role === "instructor" && !backendUser.isVerified) {
            return "/login?error=unverified_instructor"; // Custom redirect
          }

          // Attach backend user data to the NextAuth user object
          // This will be available in jwt/session callbacks
   account.backendUser = backendUser;
          return true

          
        } catch (error) {
          console.error("Google sync failed:", error);
          return "/login?error=google_sync_failed";
        }
      }

      return true; // Allow other providers
    },
  
   
   
    async jwt({ token, user, account, profile }) {
     
      
      if (user && account?.provider==='credentials') {
        token.id = user.id;
        token.role = user.role;
        token.isVerified = user.isVerified;
        token.isBlocked = user.isBlocked;
        token.profilePicture = user.profilePicture;
      }else if (account?.provider==='google'&& account?.backendUser){
        const backendUser = account.backendUser
    token.id = backendUser._id
    token.role = backendUser.role
    token.isVerified = backendUser.isVerified
    token.isBlocked = backendUser.isBlocked
    token.profilePicture = backendUser.profilePicture 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.isBlocked = token.isBlocked as boolean;
        session.user.profilePicture = token.profilePicture as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

