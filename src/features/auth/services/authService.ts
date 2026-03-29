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
export const loginUser = async (email: string, password: string) => {

  try {
    const response = await axiosInstance.post(
      "/api/users/auth/login",
      { email, password },
      { withCredentials: true }
    );
    console.log('response', response.data)
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to login ";
    throw new Error(message);
  }
};


export const googleLogin = async (credential: string) => {
  try {
      const res = await axiosInstance.post(
      "/api/users/auth/google",
      { token: credential },
      { withCredentials: true }
    );
    return res.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to login ";
    throw new Error(message);
  }

  }

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
    await axiosInstance.post("/api/users/auth/refresh-token");
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};
export const logout = async () => {
  try {
    await axiosInstance.post("/api/users/auth/logout");
  } catch (error) {

    throw error;
  }
};

