import { Controller, Get, Post, Body  } from '@nestjs/common';
import { UserRegDto } from './dto/user.reg.dto';
import { UserLoginDto } from './dto/user.reg.dto';
import { AuthService } from './auth.service';
import { RespData } from './interfaces/response.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authServices: AuthService) {}
    @Post('reg')
    register(@Body() user: UserRegDto): object  {
        const resp: RespData = this.authServices.userRegistration()
        if (resp.status) {
            return {
                Error: 0,
                Message: 'Registration successful'
            }
        } else {
            return {
                Error: 2,
                Message: resp.message
            }
        }
    }

    @Post('login')
    login(@Body() user: UserLoginDto): object  {
        const resp: RespData = this.authServices.userLogin(user)
        if (resp.status) {
            return {
                Error: 0,
                Message: 'Registration successful'
            }
        } else {
            return {
                Error: 2,
                Message: resp.message
            }
        }
    }

}
