import { User } from './User';

export interface Room {
    id: number;
    name: string;
    description: string;
    userList: User[];
}
