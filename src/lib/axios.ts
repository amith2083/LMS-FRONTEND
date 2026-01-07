import { logout } from "@/app/services/authService";
import axios, { AxiosInstance } from "axios";
import { signOut } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});



// Handle 401 errors and attempt token refresh
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
    
//     if (error.response?.status === 401 && !error.config._retry) {
//       error.config._retry = true;
//       try {
//         await axiosInstance.post("api/users/auth/refresh-token");
//         return axiosInstance(error.config); // Retry original request
//       } catch (refreshError) {
       
        
//         window.location.href = "/login";
//         return Promise.reject(new Error("Unauthorized"));
//       }
//     }
//     return Promise.reject(error);
//   }
// );
axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    console.log('errrrrrrrr',error?.response)
    const status = error.response?.status;

    // 🔁 Access token expired → refresh
    if (status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        await axiosInstance.post("/api/users/auth/refresh-token");
        return axiosInstance(error.config);
      } catch {
        await logout();
        signOut({ callbackUrl: "/login" });
        return Promise.reject(error);
      }
    }

    //  User blocked
    if (status === 403 && error?.response?.data.message==='User blocked by admin') {
      await logout();
      signOut({ callbackUrl: "/login" });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;