// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import authConfig from "./auth.config";
// import { loginUser } from "@/app/service/authService";


// export const { handlers, signIn, signOut, auth } = NextAuth({
// ...authConfig(),
//    secret: process.env.AUTH_SECRET, 
   
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//        try {
//       const email = credentials?.email as string;
//       const password = credentials?.password as string;

//       const res = await loginUser(email, password);

//       if (res.status !== 200) {
//         const errorData = res.data;

//         throw new Error(errorData.message || "Invalid credentials");
//       }

//       const user = res.data;

//       return {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         role: user.role,
//         isVerified: user.isVerified,
//         isBlocked: user.isBlocked,
//         profilePicture: user.profilePicture,
//       };
//     } catch (error: any) {
//       // This is critical: re-throw with a clean message
//       console.log('/////////',error)
//       throw new Error(error.message || "Authentication failed");
//     }
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//       async profile(profile) {
//         const res = await fetch(
//           `${process.env.BACKEND_URL}/api/users/auth/google-sync`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               email: profile.email,
//               name: profile.name,
//               image: profile.picture,
//             }),
//           }
//         );

//         const user = await res.json();
//         return user;
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       console.log("token", token);
//       console.log("userintoken", user);
//       if (user) {
//         token.id = user?.id;
//         token.role = user?.role;
//         token.isVerified = user?.isVerified;
//         token.isBlocked = user.isBlocked;
//         token.profilePicture =user?.profilePicture
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       console.log("tokeninsession", token);
//       if (session.user && token) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//         session.user.isVerified = token.isVerified;
//         session.user.isBlocked = token.isBlocked;
//         session.user.profilePicture= token.profilePicture
//       }
//       console.log('session',session)
//       return session;
//     },
    
//   },


//   debug: true,
// });
