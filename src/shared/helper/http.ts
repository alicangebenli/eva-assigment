import axios, {type AxiosInstance} from 'axios';
import {LocalStorageService} from "@/services/LocalStorage.ts";
import {OAuthTokenResponseDto} from "@/services/ports.ts";

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

http.interceptors.request.use(function (config) {
    const token: OAuthTokenResponseDto = LocalStorageService.getItem('Token') || "";
    if (token) {
        config.headers['Authorization'] = `Bearer ${token?.AccessToken}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use((response) => {
        console.log("Response Interceptor çalıştı ");
        return response;
    },
    (error) => {
        console.log(" hata :", error.response.status);
        if (error.response.status === 401) {
            window.location.href = '/'
        }
        return Promise.reject(error);
    })
export default http;