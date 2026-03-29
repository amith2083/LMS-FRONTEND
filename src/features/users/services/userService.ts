import { handleApiError } from "@/lib/helpers/handleApiError";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
      handleApiError(error);
    }
};

export const updateUser = async (id: string, userData: any) => {
  try {

    const response = await axiosInstance.put(`/api/users/${id}`, userData, 
     { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUserImage = async (id: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axiosInstance.put(`/api/users/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
