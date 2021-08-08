import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { AccessMe } from 'src/auth/guards/permission.auth.guard';
import { PrismaService } from 'src/prisma.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { InvestmentSchema } from 'src/investment/schemas/user.investment.schema';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'Investment', schema: InvestmentSchema }]),
    // forwardRef(()=> AuthService)
  ],
  controllers: [InvestmentController],
  providers: [InvestmentService, PrismaService, AccessMe],
})
export class InvestmentModule {}
