import axios, { AxiosRequestConfig } from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://int20h-videoapp.fun/',
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}` },
});

// export function post<T extends Record<string, unknown>>(url: string, body: T, config?: AxiosRequestConfig) {
//     return axiosClient.post(url, body, config);
// }
//
// export function get<T extends Record<string, unknown>>(url: string, params: T) {
//     return axiosClient.get(url, params);
// }
