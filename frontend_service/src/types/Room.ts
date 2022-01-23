import { User } from './User';

export interface Room {
    uuid: string;
    name: string;
    description: string;
    participants: User[];
}
