"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/features/auth/services/authService";
import { resetPasswordSchema } from "@/features/auth/validations/auth-schemas";


import { Suspense } from "react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [form, setForm] = useState({ email: "", otp: "", password: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = resetPasswordSchema.safeParse(form);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        errors[field] = err.message;
      });
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    try {
      const res = await resetPassword(
        form.email,
        Number(form.otp),
        form.password
      );

      if (res.status === 200) {
        toast.success("Password reset successful");
        router.push(role === "admin" ? "/admin/login" : "/login");
        return;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Card className="mx-auto max-w-sm w-full mt-10">
      <CardHeader>
        <CardTitle className="text-2xl">
          <p className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-3xl lg:leading-tight font-pj">
            <span className="relative inline-flex sm:inline">
              <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
              <span className="relative">Reset Password</span>
            </span>
          </p>
        </CardTitle>
        <CardDescription>
          Enter your email, OTP, and new password below to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="otp">OTP</Label>
            <Input
              name="otp"
              placeholder="OTP"
              onChange={handleChange}
              required
            />
            {formErrors.otp && (
              <p className="text-red-500 text-sm mt-1">{formErrors.otp}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="New Password"
              onChange={handleChange}
              required
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>
          <Button type="submit" className="w-1/2 mx-auto">
            Reset Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

