// src/app/service/categoryService.ts
import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

// Get all categories
export const getCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/categories`, {
      withCredentials: true,
    });
    return res.data
  } catch (error:any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to fetch categories";
    throw new Error(message);
  }
};

// Get category by ID
export const getCategoryById = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/categories/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to fetch category";
    throw new Error(message);
  }
};

// Create a new category
export const createCategory = async (data: any) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/categories`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to create category";
    throw new Error(message);
  }
};

// Update category
export const updateCategory = async (id: string, data: any) => {
  try {
    const res = await axios.put(`${BASE_URL}/api/categories/${id}`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to update category";
    throw new Error(message);
  }
};

// Delete category
export const deleteCategory = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/categories/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to delete category";
    throw new Error(message);
  }
};

// Toggle publish state
export const toggleCategoryPublishState = async (id: string) => {
  try {
    const res = await axios.patch(`${BASE_URL}/api/categories/${id}/publish`, null, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to toggle publish state";
    throw new Error(message);
  }
};
