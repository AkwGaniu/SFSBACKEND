import { UserRole } from "@prisma/client";
export declare class UserRegDto {
    readonly userId: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly role: UserRole;
}
export declare class UserLoginDto {
    readonly email: string;
    readonly password: string;
    readonly newPassword?: string;
}
