import { User } from '../../types/User';

export interface GetRoomResponse {
    creator: User;
    description: string;
    name: string;
    participants: User[];
    uuid: string;
}
