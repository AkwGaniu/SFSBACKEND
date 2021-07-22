import { Module } from '@nestjs/common';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';

@Module({
  imports: [],
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentModule {}
