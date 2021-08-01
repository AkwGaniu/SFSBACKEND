import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'
import { InvestmentModule } from './investment/investment.module';
// import config  from './config.keys';

@Module({
  imports: [
    AuthModule,
    InvestmentModule,
    // MongooseModule.forRoot(config.DBURI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
