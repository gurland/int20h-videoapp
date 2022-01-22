import { AuthResponse } from '../types/AuthResponse';

export async function login(login: string, password: string): Promise<AuthResponse> {
    return { accessToken: '123123123123123123' };
}

export async function signUp(login: string, password: string): Promise<AuthResponse> {
    return { accessToken: '123123123123123123' };
}
