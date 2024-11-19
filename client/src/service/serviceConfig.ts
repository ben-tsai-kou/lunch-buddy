import axios, { AxiosRequestConfig } from 'axios';
import useAuthStore from '@/store/useAuthStore';

const baseConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
};

const axiosInstance = axios.create(baseConfig);

axiosInstance.interceptors.request.use(
    (config) => {
        const { token } = useAuthStore.getState();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const httpApiService = {
    GET: async <T>({ url, config }: { url: string; config?: AxiosRequestConfig }): Promise<T> => {
        console.warn(import.meta.env.VITE_REACT_APP_API_BASE_URL);
        return axiosInstance.get(url, config);
    },

    POST: async <T>({ url, data, config }: { url: string; data?: any; config?: AxiosRequestConfig }): Promise<T> => {
        return axiosInstance.post(url, data, config);
    },

    PUT: async <T>({ url, data, config }: { url: string; data?: any; config?: AxiosRequestConfig }): Promise<T> => {
        return axiosInstance.put(url, data, config);
    },

    DELETE: async <T>({ url, config }: { url: string; config?: AxiosRequestConfig }): Promise<T> => {
        return axiosInstance.delete(url, config);
    },
};

export default httpApiService;
