import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            { withCredentials: true }
          );

          return res.data; 
        } catch (err: any) {
          throw new Error(err.response?.data?.message ?? "Login failed");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // 1️ Sync Google user to backend
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/auth/google-sync`,
            {
              email: user.email,
              name: user.name,
              image: user.image,
            },
            {
              withCredentials: true,
            }
          );
        } catch (err) {
       
        const message =
          err.response?.data?.message ??
          "Google sign-in failed";

  
        throw new Error(message);
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isBlocked = user.isBlocked;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.isBlocked = token.isBlocked as boolean;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
