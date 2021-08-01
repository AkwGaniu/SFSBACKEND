"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const uniqueKeygen = require('unique-keygen');
const config_keys_1 = require("../config.keys");
const email_services_1 = require("../helperFunctions/email.services");
const utilities_1 = require("../helperFunctions/utilities");
const password_helper_1 = require("../helperFunctions/password.helper");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async userRegistration(user) {
        try {
            if (user.email && user.password && user.firstName && user.lastName) {
                if (!utilities_1.validEmail(user.email))
                    return { error: 2, message: 'Invalid email address' };
                const userExist = await this.prisma.user.findUnique({
                    where: {
                        email: user.email
                    }
                });
                if (userExist)
                    return { error: 2, message: 'A user with that email address already exist' };
                const hashedPassword = await password_helper_1.hashPassword(user.password);
                user.password = hashedPassword;
                user.activationString = uniqueKeygen(30);
                user.userId = uniqueKeygen(50);
                await this.prisma.user.create({ data: user });
                const url = `${config_keys_1.default.BASEURL}/auth/activate_account/${user.userId}${user.activationString}`;
                const emailData = {
                    email: user.email,
                    activationUrl: url,
                    name: user.firstName
                };
                email_services_1.sendAccountValidationMail(emailData);
                return { error: 0, message: 'Registration successful' };
            }
            else {
                return { error: 1, message: 'Invalid parameter(s)' };
            }
        }
        catch (error) {
            return { error: 5, message: 'Oops some error ocurred, please try again' };
        }
    }
    async activateAccount(activationId) {
        try {
            const userId = activationId.substring(0, 50);
            await this.prisma.user.update({ where: { userId: userId }, data: { activationString: null, isActivated: true } });
            return { error: 0, message: 'Account activated successfully' };
        }
        catch (error) {
            return { error: 5, message: 'Oops some error ocurred, please try again' };
        }
    }
    async userLogin(user) {
        try {
            if (user.email && user.password) {
                const userExist = await this.prisma.user.findUnique({ where: { email: user.email } });
                if (!userExist)
                    return { error: 2, message: 'Account not found' };
                if (userExist && !userExist.isActivated)
                    return { error: 3, message: 'Account not activated' };
                const comfirmPass = await password_helper_1.confirmPassword(user.password, userExist.password);
                if (!comfirmPass)
                    return { error: 3, message: 'Incorrect password' };
                const token = await this.generateJwt(userExist.userId);
                const returnData = {
                    firstName: userExist.firstName,
                    lastName: userExist.lastName,
                    email: userExist.email,
                    userId: userExist.id.toString()
                };
                return { error: 0, message: 'Login successful', data: { token: token, user: returnData } };
            }
            else {
                return { error: 1, message: 'Invalid parameter(s)' };
            }
        }
        catch (error) {
            console.log(error.toString());
            return { error: 5, message: 'Oops some error ocurred, please try again' };
        }
    }
    generateJwt(userId) {
        return this.jwtService.signAsync({ userId: userId });
    }
    async resetPassword(user) {
        try {
            if (user.email && user.password) {
                const userExist = await this.prisma.user.findUnique({ where: { email: user.email } });
                if (!userExist)
                    return { error: 2, message: 'No Account found for this email address' };
                const newPassword = await password_helper_1.hashPassword(user.password);
                await this.prisma.user.update({ where: { userId: userExist.userId }, data: { password: newPassword } });
                return { error: 0, message: 'Password reset successful' };
            }
            else {
                return { error: 1, message: 'Invalid parameter(s)' };
            }
        }
        catch (error) {
            console.log(error);
            return { error: 5, message: 'Oops some error ocurred, please try again' };
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map