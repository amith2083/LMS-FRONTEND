import { AxiosError } from "axios";

export const handleApiError = (error: unknown): never => {
  const axiosError = error as AxiosError<{ message?: string }>;
  const message = axiosError.response?.data?.message || "An error occurred";
  throw new Error(message);
};