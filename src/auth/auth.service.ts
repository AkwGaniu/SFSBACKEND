import { Injectable } from '@nestjs/common';
import { RespData } from './interfaces/response.interface';
import { UserFormat } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import uniqueKeygen from 'unique-keygen'
const uniqueKeygen = require('unique-keygen');
import config  from '../config.keys';
import { sendAccountValidationMail, sendPasswordResetMail } from '../helperFunctions/email.services'
import { validEmail } from '../helperFunctions/utilities'

import { hashPassword, confirmPassword } from 'src/helperFunctions/password.helper';
@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserFormat>) {}
    async userRegistration(user: UserFormat): Promise<RespData> {
        try {
            if (user.email && user.password && user.firstName && user.lastName) {
                const userExist = await this.userModel.findOne({ email: user.email })
                if (!validEmail(user.email)) return { error: 2, message: 'Invalid email address' }
                if (userExist) return { error: 2, message: 'A user with that email address already exist' }
                const hashedPassword = await hashPassword(user.password)
                user.password = hashedPassword
                user.activationString = uniqueKeygen(50)
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
           console.log(error)
           return { error: 5, message: 'Oops some error ocurred, please try again' }
        }
    }
    async userLogin(user: UserFormat): Promise<RespData> {
        try {
            console.log(user)
            const reply: RespData = {
                error: 2, message: 'Some error occured'
            }
            return reply
        } catch (error) {
           console.log(error.toString()) 
        }
    }
}
