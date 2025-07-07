// src/lib/axios.ts
import axios from "axios";

console.log(" API Base URL:", process.env.NEXT_PUBLIC_BACKEND_URL); // Add this for debugging

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
});

export default api;
