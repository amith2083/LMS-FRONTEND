export interface Enrollment {
  _id: string;
  enrollment_date: string; // ISO date string
  status: "not-started" | "in-progress" | "completed";
  completion_date?: string; // ISO date string
  method: "credit-card" | "paypal" | "stripe";
  course: string; // Course ID
  student: string; // User ID
  createdAt?: string;
  updatedAt?: string;
}