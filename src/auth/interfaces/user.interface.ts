import { UserRole } from '../enum/user.enums';
export interface UserFormat {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
    isActivated?: boolean,
    activationString?: string
    role?: string
}