import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: "/api",        
  withCredentials: true,  
});

api.interceptors.response.use((response: AxiosResponse) => { return response }, async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig | undefined;

    if(error.response?.status !== 401 || !originalRequest || originalRequest._retry){
        return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
        const refresh = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include"
        });

        if(!refresh.ok){
            throw new Error("Refresh Failed");
        }

        return api(originalRequest);
    } catch (err) {
        window.location.href = "/login";
        return Promise.reject(err);
    }
} );