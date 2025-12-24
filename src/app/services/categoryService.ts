import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

// Get all categories
export const getCategories = async () => {
  try {
    const res = await axiosInstance.get("/api/categories", {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch categories";
    throw new Error(message);
  }
};

// Get category by ID
export const getCategoryById = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/api/categories/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch category";
    throw new Error(message);
  }
};

// Create a new category
export const createCategory = async (data: any) => {
  try {
    const res = await axiosInstance.post("/api/categories", data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to create category";
    throw new Error(message);
  }
};

// Update category
export const updateCategory = async (id: string, data: any) => {
  try {
    const res = await axiosInstance.put(`api/categories/${id}`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to update category";
    throw new Error(message);
  }
};
export const updateCategoryImage = async (categoryId: string, file: File) => {
  const formData = new FormData();
  formData.append("image", file); // must match Multer config

 const response = await axiosInstance.put(`/api/categories/${categoryId}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

  return response.data;
};

// Delete category
export const deleteCategory = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/api/categories/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to delete category";
    throw new Error(message);
  }
};

// Toggle publish state
export const toggleCategoryPublishState = async (id: string) => {
  try {
    const res = await axiosInstance.patch(
      `/api/categories/${id}/publish`,
      null,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to toggle publish state";
    throw new Error(message);
  }
};
