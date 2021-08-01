import { RespData } from './interfaces/response.interface';
import { UserFormat } from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    userRegistration(user: Prisma.UserCreateInput): Promise<RespData>;
    activateAccount(activationId: string): Promise<object>;
    userLogin(user: UserFormat): Promise<RespData>;
    generateJwt(userId: string): Promise<string>;
    resetPassword(user: UserFormat): Promise<RespData>;
}
