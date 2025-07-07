// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role?: string;
      isVerified?: boolean;
      isBlocked?:boolean;
      profilePicture?:String
    };
  }

  interface User {
    id: string;
    role?: string;
    isVerified?: boolean;
    isBlocked?:boolean;
     profilePicture?:String
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    isVerified?: boolean;
    isBlocked?:boolean;
     profilePicture?:String
  }
}
