import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { Enrollment } from "../types/enrollment";
import { handleApiError } from "@/helper/handleApiError";

// Get all enrollments (for admin or specific use cases)
export const getEnrollments = async () => {
  try {
    const response = await axiosInstance.get("/api/enrollments", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Get enrollment by ID
export const getEnrollmentById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/enrollments/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Get enrollments for a course
export const getEnrollmentsForCourse = async (
  courseId: string,
) => {
  try {
    const response = await axiosInstance.get(
      `/api/enrollments/course/${courseId}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Get enrollments for the authenticated user
export const getEnrollmentsForUser = async () => {
  try {
    const response = await axiosInstance.get("/api/enrollments/user", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
// Check if user is enrolled in a course
export const hasEnrollmentForCourse = async (
  courseId: string,
) => {
  try {
    const response = await axiosInstance.get(
      `/api/enrollments/course/${courseId}/check`,
      { withCredentials: true },
    );
    return response.data.enrolled; // backend returns { enrolled: true/false }
  } catch (error) {
    handleApiError(error);
  }
};

// Create a new enrollment
export const createEnrollment = async (enrollmentData: {
  course: string;
  method: "stripe" | "credit-card" | "paypal";
}) => {
  try {
    const response = await axiosInstance.post(
      "/api/enrollments",
      enrollmentData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const confirmEnrollment = async (
  session_id: string,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/enrollments/confirm",
      { session_id },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Update an enrollment
// export const updateEnrollment = async (
//   id: string,
//   enrollmentData: Partial<Enrollment>
// ): Promise<Enrollment> => {
//   try {
//     const response = await axiosInstance.put(
//       `/api/enrollments/${id}`,
//       enrollmentData,
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   } catch (error: any) {
//     const axiosError = error as AxiosError<any>;
//     const message =
//       axiosError.response?.data?.message || "Failed to update enrollment";
//     throw new Error(message);
//   }
// };

// Delete an enrollment
// export const deleteEnrollment = async (id: string): Promise<void> => {
//   try {
//     const response = await axiosInstance.delete(`/api/enrollments/${id}`, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error: any) {
//     const axiosError = error as AxiosError<any>;
//     const message =
//       axiosError.response?.data?.message || "Failed to delete enrollment";
//     throw new Error(message);
//   }
// };
