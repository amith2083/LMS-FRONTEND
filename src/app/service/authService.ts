import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

// Signup API
export const signupUser = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/api/users/signup", formData, {
      withCredentials: true,
    });

    return response;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to sign up";
    throw new Error(message);
  }
};

// OTP Verification API
export const verifyOtp = async (email: string, otp: number) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/verify-otp",
      { email, otp },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "OTP verification failed";
    throw new Error(message);
  }
};

// Resend OTP API
export const resendOtp = async (email: string) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/resend-otp",
      { email },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to resend OTP";
    throw new Error(message);
  }
};
// Login API (for credentials login)
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/auth/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Login failed";
    console.log("message", message);
    throw new Error(message);
  }
};

// Google Sync API (used in Google provider)
export const syncGoogleUser = async (
  email: string,
  name: string,
  image: string
) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/auth/google-sync",
      {
        email,
        name,
        image,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Google sync failed";
    throw new Error(message);
  }
};
//  Forgot Password API
export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/forgot-password",
      { email },
      { withCredentials: true }
    );
    return response;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message ||
      "Failed to send OTP for password reset";
    throw new Error(message);
  }
};

//  Reset Password API
export const resetPassword = async (
  email: string,
  otp: number,
  newPassword: string
) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/reset-password",
      { email, otp, newPassword },
      { withCredentials: true }
    );
    return response;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Password reset failed";
    throw new Error(message);
  }
};
export const refreshToken = async () => {
  try {
    await axiosInstance.post("api/users/auth/refresh-token");
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};
export const logout = async () => {
  try {
    
    const response = await axiosInstance.post("api/users/auth/logout");
    console.log("Backend logout successful:", response.data);
  } catch (error) {
    // console.error("Logout failed:", error);
    
    throw error;

  }
}