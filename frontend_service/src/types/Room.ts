import { User } from './User';

export interface Room {
    id: number;
    maxUsers: number;
    title: string;
    description: string;
    userList: User[];
}
