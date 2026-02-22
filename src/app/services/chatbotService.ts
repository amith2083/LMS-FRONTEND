import { handleApiError } from "@/helper/handleApiError";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";


export const getMessage = async (message:string) => {
  try {
     const res = await axiosInstance.post(
      "/api/chat",
      { message }, 
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
      handleApiError(error);
    }
};