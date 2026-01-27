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
import axios from "axios";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isAdmin = pathname?.startsWith("/admin/login");

 

useEffect(() => {
  const error = searchParams.get("error");

  if (error) {
    // Decode URL-encoded message
    const decodedError = decodeURIComponent(error);

    toast.error(decodedError, {
      duration: 8000,
    });

    // Clean URL back to /login (remove error param)
    const timer = setTimeout(() => {
      router.replace("/login", { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }
}, [searchParams, router]);

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
        if (res.error.includes("Email not verified") || res.error.includes("verification code")) {
    localStorage.setItem("otpEmail", email);

    setTimeout(() => {
      router.push("/otp");
    },300)
  }
        
        setIsLoading(false);
        return;
      }
  //  CALL NEXT API ROUTE 
 await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/auth/set-tokens`,
      { email },
      {
        withCredentials: true, 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  router.push( isAdmin ? '/admin/dashboard':"/");
   
    } catch (error: any) {
      toast.error("An unexpected error occurred.");
    }
   
  };

  const handleGoogleSignin = () => {
    signIn("google", {
  callbackUrl: "/google-callback",
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
  Note: Google sign-in is available only for students. Instructors must use email and password login.
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