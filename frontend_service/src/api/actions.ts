import { AuthResponse } from './types/AuthResponse';
import { ApiResponse } from './types/ApiResponse';
import { axiosClient } from './config';
import { utf8_to_b64 } from '../utils/common';
import { AxiosResponse } from 'axios';
import { UserUpdateRequest } from './types/UserUpdateRequest';
import { User } from '../types/User';
import { FileUploadResponse } from './types/FileUploadResponse';
import { Room } from '../types/Room';
import { CreateRoomRequest } from './types/CreateRoomRequest';
import { CreateRoomResponse } from './types/CreateRoomResponse';
import { GetRoomResponse } from './types/GetRoomResponse';

export async function getUser(id: number): Promise<AxiosResponse<User>> {
    return axiosClient.get(`/api/users/${id}`);
}

export async function login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return axiosClient.get('/api/auth/tokens', {
        headers: { Authorization: `Basic ${utf8_to_b64(`${login}:${password}`)}` },
    });
}

export async function signUp(login: string, password: string): Promise<AxiosResponse<ApiResponse>> {
    return axiosClient.post('/api/users', { login, password });
}

export async function updateUser(id: number, body: UserUpdateRequest): Promise<AxiosResponse<ApiResponse>> {
    return axiosClient.put(`/api/users/${id}`, body);
}

export async function uploadImage(image: File): Promise<AxiosResponse<FileUploadResponse>> {
    return axiosClient.post(`/api/files?name=${image.name}`, image);
}

export async function getRooms(): Promise<AxiosResponse<Room[]>> {
    return axiosClient.get('/api/rooms');
}

export async function joinToRoom(roomId: string): Promise<AxiosResponse<ApiResponse>> {
    return axiosClient.post(`/api/rooms/${roomId}/participants`);
}

export async function createRoom(body: CreateRoomRequest): Promise<AxiosResponse<CreateRoomResponse>> {
    return axiosClient.post(`/api/rooms`, body);
}

export async function deleteParticipant(roomId: string, userId: number) {
    return axiosClient.delete(`/api/rooms/${roomId}/participants/${userId}`);
}

export async function getRoom(roomId: string): Promise<AxiosResponse<GetRoomResponse>> {
    return axiosClient.get(`/api/rooms/${roomId}`);
}
