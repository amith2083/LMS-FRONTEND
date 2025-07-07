import type { NextAuthConfig } from "next-auth";

export default function authConfig(): NextAuthConfig {
  return {
    session: {
      strategy: "jwt",
      maxAge: 30 * 60,
    },
    jwt: {
      maxAge: 30 * 60,
    },
    providers: [], // Populate dynamically if needed
  };
}