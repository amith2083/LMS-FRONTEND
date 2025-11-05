import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

// Get reports
export const getReport = async (courseId:string,cookie?: string) => {
  try {
    const config: any = { withCredentials: true };

    if (cookie) {
      // Server-side request (Next.js SSR): pass cookies manually
      config.headers = {
        ...config.headers,
        Cookie: cookie,
      };
      delete config.withCredentials;
    }

    const response = await axiosInstance.get(`/api/report/${courseId}`, config);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch reports";
    console.error("Error:", message);
    throw new Error(message);
  }
};

// Create a new watch report
export const createWatchReport = async (
  courseId: string,
  lessonId: string,
  moduleId: string,
  status: "in-progress" | "completed"
) => {
  try {
    const response = await axiosInstance.post(
      `/api/report`,
      {
        courseId,
        lessonId,
        moduleId,
        status,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to create report";
    console.error("Error:", message);
    throw new Error(message);
  }
};
