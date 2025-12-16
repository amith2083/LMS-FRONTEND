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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { refinedSignupSchema } from "../validations/signupValidation";
import { sub } from "date-fns";
import { signupUser } from "@/app/service/authService";

interface SignupFormProps {
  role: string;
}
export const SignupForm = ({ role }: SignupFormProps) => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [passwordScore, setPasswordScore] = useState(0);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;
    return score; // score is 0–5
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const formValues = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      confirmPassword: formData.get("confirmPassword")?.toString() || "",
      role: role === "student" || role === "instructor" ? role : "student",
      verificationDocs: formData.get("verificationDocs") || undefined,
    };
    console.log("form", formValues);

    // Validate using Zod
    const result = refinedSignupSchema.safeParse(formValues);

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
    setLoading(true);

    // If validation passes, continue to submit
    const validData = result.data;

    const submitFormData = new FormData();
    Object.entries(validData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "verificationDocs" && value instanceof File) {
          submitFormData.append(key, value);
        } else {
          submitFormData.append(key, value.toString());
        }
      }
    });
    submitFormData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      const response = await signupUser(submitFormData);

      // const data = await response.json();
      const data = response.data;

      if (response.status == 201) {
        localStorage.setItem("otpEmail", formData.get("email") as string);
        const email = formData.get("email") as string;

        router.push("/otp");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-2xl border-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">
          <p className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-3xl lg:leading-tight font-pj">
            <span className="relative inline-flex sm:inline">
              <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
              <span className="relative">Sign Up as {role}</span>
            </span>
          </p>
        </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col gap-6">
            <div className="grid  gap-2">
              <Label htmlFor="name"> Name</Label>
              <Input id="name" name="name" placeholder="Ami" required />
              {formErrors.name && (
                <p className="text-red-500 text-sm">{formErrors.name}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                onChange={(e) => {
                  const val = e.target.value;
                  setPassword(val);
                  setPasswordScore(checkPasswordStrength(val));
                }}
              />
              {password.length > 0 && (
                <>
                  <div className="h-2 w-full rounded-full bg-gray-200 mt-1">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        passwordScore <= 2
                          ? "bg-red-500 w-1/3"
                          : passwordScore <= 4
                            ? "bg-yellow-500 w-2/3"
                            : "bg-green-500 w-full"
                      }`}
                    ></div>
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      passwordScore <= 2
                        ? "text-red-500"
                        : passwordScore <= 4
                          ? "text-yellow-600"
                          : "text-green-600"
                    }`}
                  >
                    {passwordScore <= 2
                      ? "Weak"
                      : passwordScore <= 4
                        ? "Medium"
                        : "Strong"}
                  </p>
                </>
              )}

              {formErrors.password && (
                <p className="text-red-500 text-sm">{formErrors.password}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                required
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
            {role === "instructor" && (
              <div className="grid gap-2">
                <Label htmlFor="verificationDocs">Verification Documents</Label>
                <Input
                  id="verificationDocs"
                  name="verificationDocs"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
                {formErrors.verificationDocs && (
                  <p className="text-red-500 text-sm">
                    {formErrors.verificationDocs}
                  </p>
                )}
              </div>
            )}
            {/* {errorMessage && (
  <p className="text-red-500 text-sm text-center mt-2">
    {errorMessage}
  </p>
)} */}

            <Button
              type="submit"
              className="w-full cursor-pointer flex items-center justify-center hover:scale-115"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                "Create an account"
              )}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
