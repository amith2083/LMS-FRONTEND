import { handleApiError } from "@/helper/handleApiError";
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
  } catch (error) {
      handleApiError(error);
    }
};


