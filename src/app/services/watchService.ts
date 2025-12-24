import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";




export const getWatchByLessonAndModule = async (
  lessonId: string,
  moduleId: string,
  cookie?:string
) => {
  try {
    const config: any = { withCredentials: true };
  
    if (cookie) {
      // Server-side: Forward cookies as header (overrides withCredentials)
      config.headers = {
        ...config.headers,
        Cookie: cookie,
      };
   
      // Note: Delete withCredentials for server-side to avoid conflicts
      delete config.withCredentials;
       
    }
    const response = await axiosInstance.get(`/api/watch/${lessonId}/${moduleId}`, 
    config);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch watch data";
      console.log('error is',message)
    throw new Error(message);
  }
};


export const createWatch= async (
  courseId: string,
  lessonId: string,
  moduleId: string,
  state: "started" | "completed",
  lastTime: number
) => {
  
  try {
   
       

      
    const response = await axiosInstance.post(
      `/api/watch/`,
      {
        courseId,
        lessonId,
        moduleId,
        state,
        lastTime,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to update watch state";
    console.error("error:", message);
    throw new Error(message);
  }
};
