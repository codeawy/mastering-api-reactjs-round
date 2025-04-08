import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { authKeys } from "~/constants/auth";

// * create axios instance with custom config
const api = axios.create({
  baseURL: "http://localhost:1337/api",
  timeout: 10000, // 10s
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get jwt token from localstorage
    const token = localStorage.getItem(authKeys.TOKEN_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error("Request interceptor error", error);
    return Promise.reject(error);
  }
);

export default api;
