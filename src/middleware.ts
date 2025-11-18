import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { LOGIN, PUBLIC_ROUTES, ROOT } from "@/lib/route";

import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   console.log(' Middleware triggered:', request.nextUrl.pathname);
//   return NextResponse.next();
// }

// const { auth } = NextAuth(authConfig);

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const refreshToken = req.cookies.get("refreshToken")?.value;

  console.log("tokenis❤️❤️❤️❤️", token);

  const isAuthenticated = !!token;

  const userRole = token?.role;

  const isBlocked = String(token?.isBlocked) === "true";

  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  if (!refreshToken && !isPublicRoute) {
    const loginUrl = new URL(LOGIN, nextUrl);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
    response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });
    return response;
  }

  if (isAuthenticated && isBlocked && nextUrl.pathname !== LOGIN) {
    const loginUrl = new URL(LOGIN, nextUrl);
    loginUrl.searchParams.set("blocked", "true");

    const response = NextResponse.redirect(loginUrl);
    response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
    response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });
    return response;
  }

  if (isAuthenticated && nextUrl.pathname === LOGIN) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (
    isAuthenticated &&
    nextUrl.pathname === "/admin/login" &&
    userRole === "admin"
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", nextUrl));
  }

  if (isAdminRoute) {
    if (!isAuthenticated) {
      if (nextUrl.pathname !== "/admin/login") {
        return NextResponse.redirect(new URL("/admin/login", nextUrl));
      }
    } else if (userRole !== "admin") {
      if (nextUrl.pathname !== "/admin/login") {
        return NextResponse.redirect(new URL("/admin/login", nextUrl));
      }
    }
  }

  if (!isAuthenticated && !isPublicRoute) {
    const response = NextResponse.redirect(new URL(LOGIN, nextUrl));
    response.cookies.set("refreshToken", "", { maxAge: 0 });
    response.cookies.set("accessToken", "", { maxAge: 0 });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\..*).*)", // Exclude internal routes
    "/", // Include root
  ],
};
