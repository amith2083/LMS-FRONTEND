import { z } from "zod";

/**
 * Common Zod primitives for Authentication
 */

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must include an uppercase letter")
  .regex(/[a-z]/, "Must include a lowercase letter")
  .regex(/\d/, "Must include a number")
  .regex(/[@$!%*?&]/, "Must include a special character");

export const nameSchema = z
  .string()
  .min(3, "Name must be at least 3 characters long")
  .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain letters and spaces");

export const otpSchema = z
  .string()
  .length(6, "OTP must be exactly 6 characters")
  .regex(/^\d+$/, "OTP must contain only numbers");
