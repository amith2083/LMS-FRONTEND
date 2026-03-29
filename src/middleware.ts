
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PUBLIC_ROUTES } from "./lib/route";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const pathname = req.nextUrl.pathname;

  // 1. Redirect logged-in users away from login pages
  if ((accessToken || refreshToken) && (pathname === "/login" || pathname === "/admin/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. Allow all public routes
  if (PUBLIC_ROUTES.includes(pathname) || 
      pathname.startsWith("/_next") || 
      pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // 3. CRITICAL: Allow access when only refreshToken exists 
  //    (so axios interceptor can refresh the access token)
  if (!accessToken && refreshToken) {
    return NextResponse.next();
  }

  // 4. No tokens at all → Redirect to login
  if (!accessToken && !refreshToken) {
    const isAdminRoute = pathname.startsWith("/admin");
    return NextResponse.redirect(
      new URL(isAdminRoute ? "/admin/login" : "/login", req.url)
    );
  }

  // 5. Normal case: Both tokens present or accessToken present
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    "/",
  ],
};