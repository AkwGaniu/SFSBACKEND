import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserRegDto } from './dto/user.reg.dto';
import { UserLoginDto } from './dto/user.reg.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authServices: AuthService) {}
    @Post('reg')
    register(@Body() user: UserRegDto): object  {
        return this.authServices.userRegistration(user)
    }

    @Post('login')
    login(@Body() user: UserLoginDto): object  {
        return this.authServices.userLogin(user)
    }

    @Get('activate_account/:activationId')
    verifyAccount(@Param('activationId') activationId) {
        return this.authServices.userRegistration({})
    }
}