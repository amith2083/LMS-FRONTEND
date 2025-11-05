
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isVerified = user.isVerified;
        token.isBlocked = user.isBlocked;
        token.profilePicture = user.profilePicture;
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

  // pages: {
  //   signIn: "/login",
  // },

  secret: process.env.NEXTAUTH_SECRET,
};

