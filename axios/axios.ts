import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";
const API_REFRESH_TOKEN_URL = "https://api.escuelajs.co/api/v1/auth/refresh-token";

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
    const stored = await AsyncStorage.getItem("tokens");
    if (stored) {
        const tokens = JSON.parse(stored);
        config.headers.Authorization = `Bearer ${tokens.access_token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh-token")
        ) {
            originalRequest._retry = true;
            try {
                const stored = await AsyncStorage.getItem("tokens");
                if (!stored) {
                    return Promise.reject(error);
                }
                const tokens = JSON.parse(stored);
                const res = await axios.post(API_REFRESH_TOKEN_URL, {
                    refreshToken: tokens.refresh_token,
                });
                const newTokens = res.data;
                await AsyncStorage.setItem("tokens", JSON.stringify(newTokens));
                originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.log("Refresh token failed", refreshError);
                await AsyncStorage.removeItem("tokens");
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;