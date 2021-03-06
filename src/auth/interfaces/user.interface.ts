import { UserRole } from "@prisma/client";

export interface UserFormat {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
    isActivated?: boolean,
    activationString?: string
    role?: UserRole
}