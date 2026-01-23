import { handleApiError } from "@/helper/handleApiError";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { QuizSetAction } from "../instructor/quiz-sets/[quizSetId]/_components/quiz-set-action";

// Get all quizsets
export const getQuizsets = async () => {
  try {
    const response = await axiosInstance.get("/api/quizsets");
    return response.data;
  } catch (error) {
      handleApiError(error);
    }
};

// Get a quizset by ID
export const getQuizsetById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/quizsets/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
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
  } catch (error) {
      handleApiError(error);
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
  } catch (error) {
      handleApiError(error);
    }
};

// Delete a quizset
export const deleteQuizset = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/quizsets/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Add a quiz to a quizset
export const addQuizToQuizset = async (quizsetId: string, quizData: any) => {
  console.log('front',quizData)

  try {
    const response = await axiosInstance.post(`/api/quizsets/${quizsetId}/quiz`, quizData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Delete a quiz from a quizset
export const deleteQuizFromQuizset = async (quizsetId: string, quizId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/quizsets/${quizsetId}/quiz/${quizId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
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
  } catch (error) {
    handleApiError(error);
  }
};