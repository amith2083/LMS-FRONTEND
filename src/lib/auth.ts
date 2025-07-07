import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("cred", credentials);
        return {
          id: credentials?.id,
          name: credentials?.name,
          email: credentials?.email,
          role: credentials?.role,
          isVerified: credentials?.isVerified,
          isBlocked: credentials?.isBlocked,
          ProfilePicture: credentials?.ProfilePicture,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile) {
        const res = await fetch(
          `${process.env.BACKEND_URL}/api/users/auth/google-sync`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: profile.email,
              name: profile.name,
              image: profile.picture,
            }),
          }
        );

        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log("token", token);
      console.log("token", user);
      if (user) {
        token.id = user?.id;
        token.role = user?.role;
        token.isVerified = user?.isVerified;
        token.isBlocked = user.isBlocked;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("tokeninsession", token);
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isVerified = token.isVerified;
        session.user.isBlocked = token.isBlocked;
      }
      return session;
    },
  },

  debug: true,
});
