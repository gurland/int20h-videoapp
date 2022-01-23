import { ApiResponse } from './ApiResponse';

export interface CreateRoomResponse extends ApiResponse {
    roomId: string;
}
