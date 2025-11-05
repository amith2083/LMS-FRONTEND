import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});



// Handle 401 errors and attempt token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error+',error.response)
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        await axiosInstance.post("api/users/auth/refresh-token");
        return axiosInstance(error.config); // Retry original request
      } catch (refreshError) {
        console.log('erroris',refreshError)
        
        window.location.href = "/login";
        return Promise.reject(new Error("Unauthorized"));
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;