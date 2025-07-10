import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

// Create a Lesson
export const createLesson = async (data: any, moduleId: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/lessons?moduleId=${moduleId}`,
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
    const response = await axios.get(`${BASE_URL}/api/lessons/${id}`, {
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
  try {
    const response = await axios.put(`${BASE_URL}/api/lessons/${id}`, data, {
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
    const response = await axios.delete(
      `${BASE_URL}/api/lessons/${id}?moduleId=${moduleId}`,
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
  const response = await axios.post(
    `${BASE_URL}/api/lessons/upload-url`,
    { fileName, fileType },
    { withCredentials: true }
  );
  return response.data;
};

// Get signed playback URL
export const getVideoPlaybackUrl = async (key: string) => {
  const response = await axios.post(
    `${BASE_URL}/api/lessons/playback-url`,
    { key },
    { withCredentials: true }
  );
  return response.data;
};
