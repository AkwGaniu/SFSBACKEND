export class UserRegDto {
    readonly userId: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string
}

export class UserLoginDto {
    readonly email: string;
    readonly password: string;
    readonly newPassword?: string
}