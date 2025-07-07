import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "image/jpg",
];

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain letters and spaces"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/\d/, "Must include a number")
    .regex(/[@$!%*?&]/, "Must include a special character"),

  confirmPassword: z.string().min(1, "Please confirm your password"),

  role: z.enum(["student", "instructor"]),

  verificationDocs: z
    .any()
    .optional(), // validated below using .refine()
});

// ✅ Refine schema to handle:
// - Password match
// - Required file for instructor
// - File type & size check
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
