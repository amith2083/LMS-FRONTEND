import axiosInstance from "@/lib/axios";
import  { AxiosError } from "axios";




export const getTotalEarningsForInstructor = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/payout/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    throw new Error(
      axiosError.response?.data?.message || "Failed to fetch totalearnings"
    );
  }
};

export const getTotalEarningsForAdmin = async () => {
  try {
    const response = await axiosInstance.get(`/api/payout/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    throw new Error(
      axiosError.response?.data?.message || "Failed to fetch totalearnings"
    );
  }
};


