import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

// Get all quizsets
export const getQuizsets = async () => {
  try {
    const response = await axiosInstance.get("/api/quizsets");
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch quizsets";
    throw new Error(message);
  }
};

// Get a quizset by ID
export const getQuizsetById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/quizsets/${id}`);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch quizset";
    throw new Error(message);
  }
};

// Create a new quizset
export const createQuizset = async (quizsetData: any) => {
  try {
    const response = await axiosInstance.post("/api/quizsets", quizsetData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to create quizset";
    throw new Error(message);
  }
};

// Update a quizset
export const updateQuizset = async (id: string, quizsetData: any) => {
  try {
    const response = await axiosInstance.put(`/api/quizsets/${id}`, quizsetData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to update quizset";
    throw new Error(message);
  }
};

// Delete a quizset
export const deleteQuizset = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/quizsets/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to delete quizset";
    throw new Error(message);
  }
};

// Add a quiz to a quizset
export const addQuizToQuizset = async (quizsetId: string, quizData: any) => {

  try {
    const response = await axiosInstance.post(`/api/quizsets/${quizsetId}/quiz`, quizData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to add quiz to quizset";
    throw new Error(message);
  }
};

// Delete a quiz from a quizset
export const deleteQuizFromQuizset = async (quizsetId: string, quizId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/quizsets/${quizsetId}/quiz/${quizId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to delete quiz from quizset";
    throw new Error(message);
  }
};

// Toggle quizset publish state
export const togglePublishQuizset = async (quizsetId: string) => {
   
  try {
    const response = await axiosInstance.put(`/api/quizsets/${quizsetId}/toggle`,  {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to toggle quizset publish state";
    throw new Error(message);
  }
};