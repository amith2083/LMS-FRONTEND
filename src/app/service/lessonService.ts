import axiosInstance from "@/lib/axios";
import  { AxiosError } from "axios";



// Create a Lesson
export const createLesson = async (data: any, moduleId: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/lessons?moduleId=${moduleId}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    throw new Error(axiosError.response?.data?.message || "Failed to create lesson");
  }
};

// Get a single lesson
export const getLessonById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/lessons/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    throw new Error(axiosError.response?.data?.message || "Failed to get lesson");
  }
};

// Update a lesson
export const updateLesson = async (id: string, data: any) => {
  console.log('idinlessonservice',id,data)
  try {
    const response = await axiosInstance.put(`/api/lessons/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    throw new Error(axiosError.response?.data?.message || "Failed to update lesson");
  }
};

// Delete a lesson
export const deleteLesson = async (id: string, moduleId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/lessons/${id}?moduleId=${moduleId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    throw new Error(axiosError.response?.data?.message || "Failed to delete lesson");
  }
};

// Get signed upload URL for video
export const getVideoUploadUrl = async (fileName: string, fileType: string) => {
  const response = await axiosInstance.post(
    `/api/lessons/upload-url`,
    { fileName, fileType },
    { withCredentials: true }
  );
  return response.data;
};

// Get signed playback URL
export const getVideoPlaybackUrl = async (key: string) => {
  const response = await axiosInstance.post(
    `/api/lessons/playback-url`,
    { key },
    { withCredentials: true }
  );
  return response.data;
};
