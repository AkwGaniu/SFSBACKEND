import { UserRegDto } from './dto/user.reg.dto';
import { UserLoginDto } from './dto/user.reg.dto';
import { AuthService } from './auth.service';
import { RespData } from './interfaces/response.interface';
export declare class AuthController {
    private readonly authServices;
    constructor(authServices: AuthService);
    register(user: UserRegDto): Promise<RespData>;
    login(user: UserLoginDto): Promise<RespData>;
    verifyAccount(activationId: any): Promise<RespData>;
    resetPassword(user: UserLoginDto): Promise<RespData>;
}
