import { handleApiError } from "@/helper/handleApiError";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

// Get all categories
export const getCategories = async () => {
  try {
    const res = await axiosInstance.get("/api/categories", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
      handleApiError(error);
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
    handleApiError(error);
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
    handleApiError(error);
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
    handleApiError(error);
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
    handleApiError(error);
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
    handleApiError(error);
  }
};
