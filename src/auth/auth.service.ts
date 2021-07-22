import { Injectable } from '@nestjs/common';
import { RespData } from './interfaces/response.interface';
import { UserFormat } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
const uniqueKeygen = require('unique-keygen');
import config  from '../config.keys';
import { sendAccountValidationMail, sendPasswordResetMail } from '../helperFunctions/email.services'
import { validEmail } from '../helperFunctions/utilities'
import { hashPassword, confirmPassword } from '../helperFunctions/password.helper';
import { createToken, decodeToken } from '../helperFunctions/jwt.functions'
@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserFormat>) {}
    async userRegistration(user: UserFormat): Promise<RespData> {
        try {
            if (user.email && user.password && user.firstName && user.lastName) {
                if (!validEmail(user.email)) return { error: 2, message: 'Invalid email address' }
                const userExist = await this.userModel.findOne({ email: user.email })
                if (userExist) return { error: 2, message: 'A user with that email address already exist' }
                const hashedPassword = await hashPassword(user.password)
                user.password = hashedPassword
                user.activationString = uniqueKeygen(30)
                const newUser = new this.userModel(user)
                await newUser.save()
                // send mail here
                const url: string = `${config.BASEURL}/auth/activate_account/${user.activationString}`
                const emailData = {
                    email: user.email,
                    activationUrl: url,
                    name: user.firstName
                }
                sendAccountValidationMail(emailData)
                return { error: 0, message: 'Registration successful' }
            } else {
                return { error: 1, message: 'Invalid parameter(s)' }
            }
        } catch (error) {
        //    console.log(error)
           return { error: 5, message: 'Oops some error ocurred, please try again' }
        }
    }
    async activateAccount(activationId: string): Promise<object> {
        try {
            await this.userModel.findOneAndUpdate({ activationString: activationId }, { activationString: null, isActivated: true })
            return { error: 0, message: 'Account activated successful' }
        } catch (error) {
        //    console.log(error)
           return { error: 5, message: 'Oops some error ocurred, please try again' }
        }
    }
    async userLogin(user: UserFormat): Promise<RespData> {
        try {
            if (user.email && user.password) {
                const userExist = await this.userModel.findOne({ email: user.email })
                if (!userExist) return { error: 2, message: 'Account not found' }
                const comfirmPass = await confirmPassword(user.password, userExist.password)
                if (!comfirmPass) return { error: 2, message: 'Incorrect password' }
                const token: string = createToken({ userId: userExist._id, tokenLife: '2 days' })
                const returnData = {
                    firstName: userExist.firstName,
                    lastName: userExist.lastName,
                    email: userExist.email,
                    userId: userExist._id
                }
                return { error: 2, message: 'Login successful', data: { token: token, user: returnData } }
            } else {
                return { error: 1, message: 'Invalid parameter(s)' }
            }
        } catch (error) {
           console.log(error.toString()) 
           return { error: 5, message: 'Oops some error ocurred, please try again' }
        }
    }
    // async forgetPassword(email: string): Promise<RespData> {
    //     try {
    //         const userExist = await this.userModel.findOne({ email: email })
    //         if (!userExist) return { error: 2, message: 'Account not found' }
    //         const activationString: string = uniqueKeygen(30)
    //         await this.userModel.findOneAndUpdate({ email: email }, { activationString: activationString })
    //         const url: string = `${config.BASEURL}/auth/password_reset/${activationString}`
    //         const emailData = {
    //             email: email,
    //             resetUrl: url,
    //         }
    //         sendPasswordResetMail(emailData)
    //         return { error: 0, message: 'Password reset link sent successful' }
    //     } catch (error) {            
    //        console.log(error.toString()) 
    //        return { error: 5, message: 'Oops some error ocurred, please try again' }
    //     }
    // }
    async resetPassword(user: UserFormat): Promise<RespData> {
        try {
            if (user.email && user.password) {
                const userExist = await this.userModel.findOne({ email: user.email })
                if (!userExist) return { error: 2, message: 'No Account found for this email address' }
                const newPassword: string = await hashPassword(user.password)
                await this.userModel.findOneAndUpdate({ email: user.email }, { password: newPassword })
                return { error: 0, message: 'Password reset successful' }
            } else {
                return { error: 1, message: 'Invalid parameter(s)' }
            }
        } catch (error) {
            console.log(error)
           return { error: 5, message: 'Oops some error ocurred, please try again' }
        }
    }
}
