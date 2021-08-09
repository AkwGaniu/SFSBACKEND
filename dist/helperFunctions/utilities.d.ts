import { UserFormat } from "src/auth/interfaces/user.interface";
export declare const validEmail: (email: string) => boolean;
export declare const getSingleUser: (userId: string) => Promise<UserFormat>;
export declare const setRole: (role: any) => "USER" | "ADMIN";
