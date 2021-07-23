import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RespData } from 'src/auth/interfaces/response.interface';
import { InvestmentFormat } from './interfaces/investment.interface';
@Injectable()
export class InvestmentService {
    constructor(
        @InjectModel('Investment') private readonly investmentModel: Model<InvestmentFormat>) {}

    async fetchUserInvestment(userId: string): Promise<RespData> {
        try {
            const investment = await this.investmentModel.findOne({ user:  userId }).populate('user')
            let returnData: InvestmentFormat
            if (!investment) {
                returnData = {
                    totalInvestment: '0.0',
                    totalEarned: '0.0',
                    totalPayOff: '0.0',
                    numberOfInvestments: 0
                }
            } else {
                returnData = investment
            }
            return { error: 0, message: 'Success', data: returnData }
        } catch (error) {
            console.log(error)
           return { error: 5, message: 'Oops some error ocurred, please try again' }
        }
    }
}
