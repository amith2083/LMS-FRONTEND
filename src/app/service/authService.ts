
import axios, { AxiosError } from 'axios';

 
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

// Signup API
export const signupUser = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/signup`, formData, {
      withCredentials: true,
    });
    
    return response
  } catch (error: any) {
   
  
     const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || 'Failed to sign up';
    throw new Error(message);
  }
};

// OTP Verification API
export const verifyOtp = async (email: string, otp: number) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/verify-otp`,
      { email, otp },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
     const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || 'OTP verification failed';
    throw new Error(message);
   
  }
};

// Resend OTP API
export const resendOtp = async (email: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/resend-otp`,
      { email },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
     const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || 'Failed to resend OTP';
    throw new Error(message);
   
  }
};
// Login API (for credentials login)
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/auth/login`, { email, password }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Login failed";
    console.log('message',message)
    throw new Error(message);
  }
};

// Google Sync API (used in Google provider)
export const syncGoogleUser = async (email: string, name: string, image: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/auth/google-sync`, {
      email,
      name,
      image,
    }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Google sync failed";
    throw new Error(message);
  }
};
