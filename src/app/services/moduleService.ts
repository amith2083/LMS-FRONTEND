import { handleApiError } from "@/helper/handleApiError";
import axiosInstance from "@/lib/axios";
import  { AxiosError } from "axios";



// Get module by ID
export const getModuleById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/modules/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Create module
export const createModule = async (data: any) => {
  try {
    const response = await axiosInstance.post('/api/modules', data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Update module (title, description, status etc.)
export const updateModule = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/api/modules/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Delete module (requires courseId for cleanup)
export const deleteModule = async (
  id:string,
  courseId:string) => {

  try {
    const response = await axiosInstance.delete(
      `/api/modules/${id}?courseId=${courseId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
      handleApiError(error);
    }
};
