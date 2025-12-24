
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { Enrollment } from "../types/enrollment";


// Get all enrollments (for admin or specific use cases)
export const getEnrollments = async (): Promise<Enrollment[]> => {
  try {
    const response = await axiosInstance.get("/api/enrollments", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch enrollments";
    throw new Error(message);
  }
};

// Get enrollment by ID
export const getEnrollmentById = async (id: string): Promise<Enrollment> => {
  try {
    const response = await axiosInstance.get(`/api/enrollments/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch enrollment";
    throw new Error(message);
  }
};

// Get enrollments for a course
export const getEnrollmentsForCourse = async (
  courseId: string
): Promise<Enrollment[]> => {
  try {
    const response = await axiosInstance.get(
      `/api/enrollments/course/${courseId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch course enrollments";
    throw new Error(message);
  }
};

// Get enrollments for the authenticated user
export const getEnrollmentsForUser = async (): Promise<Enrollment[]> => {
  try {
    const response = await axiosInstance.get("/api/enrollments/user/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch user enrollments";
    throw new Error(message);
  }
};
// Check if user is enrolled in a course
export const hasEnrollmentForCourse = async (courseId: string): Promise<boolean> => {
  try {
   
    
  
    const response = await axiosInstance.get(`/api/enrollments/course/${courseId}/check`, 
      {  withCredentials: true}
    );
    return response.data.enrolled; // backend returns { enrolled: true/false }
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to check enrollment status";
    throw new Error(message);
  }
};

// Create a new enrollment
export const createEnrollment = async (
  enrollmentData: Partial<Enrollment>
): Promise<Enrollment> => {
  try {
    const response = await axiosInstance.post(
      "/api/enrollments",
      enrollmentData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to create enrollment";
    throw new Error(message);
  }
};
export const confirmEnrollment = async (session_id: string): Promise<Enrollment> => {
  try {
    const response = await axiosInstance.post(
      "/api/enrollments/confirm",
      { session_id },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to confirm enrollment";
    throw new Error(message);
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