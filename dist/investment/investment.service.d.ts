import { RespData } from 'src/auth/interfaces/response.interface';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
export declare class InvestmentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    fetchUserInvestment(userId: Prisma.InvestmentWhereUniqueInput): Promise<RespData>;
}
