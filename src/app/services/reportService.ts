import { handleApiError } from "@/helper/handleApiError";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

// Get reports
export const getReport = async (courseId: string) => {
  try {
    const response = await axiosInstance.get(`/api/report/${courseId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
