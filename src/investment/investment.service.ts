import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RespData } from 'src/auth/interfaces/response.interface';
import { PrismaService } from 'src/prisma.service';
import { Investment, Prisma } from '@prisma/client';
import { InvestmentFormat } from './interfaces/investment.interface';
@Injectable()
export class InvestmentService {
    constructor(private readonly prisma: PrismaService) {}

    async fetchUserInvestment(userId: Prisma.InvestmentWhereUniqueInput): Promise<RespData> {
        try {
            // const investment = await this.prisma.investment.findUnique({where:{ user:  userId }})
            // let returnData: Investment
            // if (!investment) {
            //     // returnData = {
            //     //     totalInvestment: '0.0',
            //     //     totalEarned: '0.0',
            //     //     totalPayoff: '0.0',
            //     //     numberOfInvestment: ''
            //     // }
            // } else {
            //     returnData = investment
            // }
            return { error: 0, message: 'Success' }
        } catch (error) {
            console.log(error)
           return { error: 5, message: 'Oops some error ocurred, please try again' }
        }
    }
}
