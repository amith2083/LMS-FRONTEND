"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { setTokens } from "@/app/services/authService";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isAdmin = pathname?.startsWith("/admin/login");

  // Handle custom error messages from NextAuth (blocked, unverified_instructor, etc.)
  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      let message = "Sign in failed. Please try again.";

      if (error === "blocked") {
        message = "Your account is blocked. Please contact admin.";
      } else if (error === "unverified_instructor") {
        message = "Instructors must verify their account before signing in with Google.";
      } else if (error === "google_sync_failed") {
        message = "Failed to sync with Google. Please try again or use email login.";
      } else if (error === "AccessDenied") {
        message = "Access denied. Please check your account status.";
      } else if (error === "CredentialsSignin") {
        message = "Invalid email or password.";
      }

      // Show toast with 1 minute duration
      toast.error(message, {
        duration: 60000, // 60 seconds
      });

      // Clean URL after delay to prevent race condition
      const timer = setTimeout(() => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete("error");
        const cleanSearch = newParams.toString();
        const cleanUrl = cleanSearch ? `/login?${cleanSearch}` : "/login";

        router.replace(cleanUrl, { scroll: false });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  // Call setTokens() after successful login (works for BOTH Credentials and Google)
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      // This runs when user is logged in via any provider
      setTokens(session.user.email as string);

      toast.success("Login successful!");

      // Redirect based on role/page
      if (isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [status, session, router, isAdmin]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error || "Invalid credentials");
        setIsLoading(false);
        return;
      }

      // Note: setTokens and redirect will be handled by the useEffect above
      // No need to duplicate here
    } catch (error: any) {
      toast.error("An unexpected error occurred.");
    }
    // Do NOT setIsLoading(false) here — redirect will unmount component
  };

  const handleGoogleSignin = () => {
    signIn("google", {
      callbackUrl: "/", // After success, go to home → triggers setTokens via useEffect
    });
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          <p className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-3xl lg:leading-tight font-pj">
            <span className="relative inline-flex sm:inline">
              <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
              <span className="relative">Login</span>
            </span>
          </p>
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        {/* Google Sign-In (only for non-admin) */}
        {!isAdmin && (
          <>
            <div className="text-center mt-4 text-sm text-gray-500">Or</div>

            <Button
              onClick={handleGoogleSignin}
              className="w-full mt-4"
              disabled={isLoading}
              variant="outline"
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Note: Instructors must verify their account before using Google sign-in.
            </p>
          </>
        )}

        {/* Register Links */}
        {!isAdmin && (
          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register/instructor" className="underline">
              Instructor
            </Link>
            <span> or </span>
            <Link href="/register/student" className="underline">
              Student
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}