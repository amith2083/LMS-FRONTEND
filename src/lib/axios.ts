import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add CSRF token to requests
axiosInstance.interceptors.request.use(
  async (config) => {
    if (["post", "put", "delete","patch"].includes(config.method?.toLowerCase() || "")) {
      try {
        const response = await axios.get(`${BASE_URL}/csrf-token`, { withCredentials: true });
        config.headers["X-CSRF-Token"] = response.data.csrfToken;
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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