import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { AccessMe } from 'src/auth/guards/permission.auth.guard';
import { RespData } from 'src/auth/interfaces/response.interface';
import { UserDecorator } from 'src/auth/decorator/custom.decorator';
import { InvestmentService } from './investment.service';
import { hasRoles } from 'src/auth/decorator/role.decoraror';
import { UserRole } from 'src/auth/enum/user.enums';
@Controller('investment')
export class InvestmentController {

    constructor(private readonly investmentServices: InvestmentService) {}

    @hasRoles(UserRole.ADMIN, UserRole.USER)
    @UseGuards(JwtAuthGuard, AccessMe)
    @Get('user_investment')
    fetchUserInvestment(@Req() request): Promise<RespData>  {
        // console.log(`Name: ${names}`)
        return this.investmentServices.fetchUserInvestment(request.user.userId)
    }
}
