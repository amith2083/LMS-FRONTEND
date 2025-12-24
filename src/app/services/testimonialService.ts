import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
interface Data {
    review:string,
    rating:string
}
export const createTestimonial = async (
  courseId: string,
  values:Data,
  
) => {
  try {
 
  
    const response = await axiosInstance.post(
      `/api/testimonial/${courseId}`,
       values ,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to create review";
    console.error("Error:", message);
    throw new Error(message);
  }
};


