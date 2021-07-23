import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserRegDto } from './dto/user.reg.dto';
import { UserLoginDto } from './dto/user.reg.dto';
import { AuthService } from './auth.service';
import { RespData } from './interfaces/response.interface';
@Controller('auth')
export class AuthController {
    constructor(private readonly authServices: AuthService) {}
    @Post('reg')
    register(@Body() user: UserRegDto): Promise<RespData>  {
        return this.authServices.userRegistration(user)
    }

    @Post('login')
    login(@Body() user: UserLoginDto): Promise<RespData>   {
        return this.authServices.userLogin(user)
    }
    
    @Get('activate_account/:activationId')
    verifyAccount(@Param('activationId') activationId): Promise<RespData>  {
        return this.authServices.activateAccount(activationId)
    }

    // @Post('/forget_password')
    // forgetPassword(@Body() user: UserLoginDto): object {
    //     return this.authServices.forgetPassword(user.email)
    // }

    @Post('password_reset')
    resetPassword(@Body() user: UserLoginDto): Promise<RespData>  {
        return this.authServices.resetPassword({ email: user.email, password: user.newPassword })
    }
}