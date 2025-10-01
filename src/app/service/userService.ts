import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users");
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch users";
    throw new Error(message);
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/users/${id}`);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch user";
    throw new Error(message);
  }
};

export const updateUser = async (id: string, userData: any) => {
  try {
    const response = await axiosInstance.put(`/api/users/${id}`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to update user";
    throw new Error(message);
  }
};