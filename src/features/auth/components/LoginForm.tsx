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
import { toast } from "sonner";
import { useUser } from "@/features/auth/context/UserContext";
import { googleLogin, loginUser } from "@/features/auth/services/authService";
import { GoogleLogin } from "@react-oauth/google";
import { loginSchema } from "@/features/auth/validations/auth-schemas";





export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
   const { setUser } = useUser();
   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

    // Validate using Zod
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        errors[field] = err.message;
      });
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }
    setFormErrors({});

    try {
      const data = await loginUser(email, password);
    
      //  Save user globally
      setUser(data.user);

      if (isAdmin) {
        router.push('/admin/dashboard')
      } else {
        router.push('/')
      }
    } catch (error: any) {
      if (error.response?.data?.message?.includes("Email not verified") ||
        error.response?.data?.message?.includes("verification code")) {
        localStorage.setItem("otpEmail", email);
        setTimeout(() => {
          router.push("/otp");
        }, 300);
      } else {
        toast.error(error.response?.data?.message || "Invalid credentials");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
  try {
    const { credential } = credentialResponse;

    const res = await googleLogin(credential)

    setUser(res.user);

    router.push("/");
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Google login failed");
  }
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
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href={isAdmin ? "/forgot-password?role=admin" : "/forgot-password"}
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
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}
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

      {!isLoading && (
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={() => toast.error("Google login failed")}
  />
)}

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
