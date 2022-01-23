import { User } from '../../types/User';

export interface UserUpdateRequest extends Partial<User> {
    oldPassword: string;
    newPassword: string;
}
