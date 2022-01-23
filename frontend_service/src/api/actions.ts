import { AuthResponse } from './types/AuthResponse';
import { ApiResponse } from './types/ApiResponse';
import { axiosClient } from './config';
import { utf8_to_b64 } from '../utils/common';
import { AxiosResponse } from 'axios';

export async function login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return axiosClient.get('/api/auth/tokens', {
        headers: { Authorization: `Basic ${utf8_to_b64(`${login}:${password}`)}` },
    });
}

export async function signUp(login: string, password: string): Promise<AxiosResponse<ApiResponse>> {
    return axiosClient.post('/api/users', { login, password });
}
