import { handleApiError } from "@/helper/handleApiError";
import axiosInstance from "@/lib/axios";
import  { AxiosError } from "axios";




export const getTotalEarningsForInstructor = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/payout/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getTotalEarningsForAdmin = async () => {
  try {
    const response = await axiosInstance.get(`/api/payout/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
      handleApiError(error);
    }
};


