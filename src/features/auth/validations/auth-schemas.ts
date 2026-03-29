import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema } from "@/lib/validations/auth";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "image/jpg",
];

/**
 * Base Login Schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"), // Login typically just requires presence
});

/**
 * Base Signup Schema
 */
export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Please confirm your password"),
  role: z.enum(["student", "instructor"]),
  verificationDocs: z.any().optional(), 
});

/**
 * Refined Signup Schema (matches logic from original signupValidation.ts)
 */
export const refinedSignupSchema = signupSchema.superRefine((data, ctx) => {
  // Password confirmation check
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });
  }

  // Instructor: file must be present
  if (data.role === "instructor") {
    if (!data.verificationDocs || !(data.verificationDocs instanceof File)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["verificationDocs"],
        message: "Verification document is required for instructors",
      });
    } else {
      const file: File = data.verificationDocs;

      if (file.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["verificationDocs"],
          message: "File size must be under 2MB",
        });
      }

      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["verificationDocs"],
          message: "Invalid file type (only PDF, JPG, PNG allowed)",
        });
      }
    }
  }
});

/**
 * Forgot Password Schema
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

/**
 * Reset Password Schema
 */
export const resetPasswordSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, "OTP must be 6 digits"),
  password: passwordSchema,
});
