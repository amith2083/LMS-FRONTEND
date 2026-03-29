import axios, { AxiosInstance } from "axios";
import { PUBLIC_ROUTES } from "./route";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post("/api/users/auth/refresh-token", {}, {
          withCredentials: true,
        });
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        //  Only redirect if on a protected page
        const protectedRequest = originalRequest.url === "/api/users/me";
        const onPublicPage = PUBLIC_ROUTES.includes(window.location.pathname);

        if (protectedRequest && !onPublicPage) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError); // ← just reject silently on public pages
      }
    }

    if (status === 403 &&
        error.response?.data?.message?.toLowerCase().includes("blocked")) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
