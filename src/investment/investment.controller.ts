import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RespData } from 'src/auth/interfaces/response.interface';
import { InvestmentService } from './investment.service';
@Controller('investment')
export class InvestmentController {

    constructor(private readonly investmentServices: InvestmentService) {}

    @UseGuards(JwtAuthGuard)
    @Get('user_investment')
    fetchUserInvestment(@Req() request): Promise<RespData>  {
        return this.investmentServices.fetchUserInvestment(request.user.userId)
    }
}
