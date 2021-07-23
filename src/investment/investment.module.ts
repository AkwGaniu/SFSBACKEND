import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvestmentSchema } from 'src/investment/schemas/user.investment.schema';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Investment', schema: InvestmentSchema }]),

  ],
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentModule {}
