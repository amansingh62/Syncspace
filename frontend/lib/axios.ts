import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig | undefined;

    // Never intercept refresh itself
    if (originalRequest?.url?.includes("/auth/refresh")) {
      throw error;
    }

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      throw error;
    }

    originalRequest._retry = true;

    const refresh = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!refresh.ok) {
      // Let middleware handle redirect
      throw error;
    }

    // Retry request with fresh cookies
    return api.request({
      ...originalRequest,
      headers: {
        ...originalRequest.headers,
      },
    });
  }
);
