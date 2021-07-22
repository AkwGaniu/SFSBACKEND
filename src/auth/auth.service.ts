import { Injectable } from '@nestjs/common';
import { RespData } from './interfaces/response.interface';
import { UserFormat } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserFormat>) {}
    async userRegistration(user: UserFormat): Promise<object> {
        const newUser = new this.userModel(user)
        await newUser.save()
        const reply: RespData = {
            status: true, data: {}
        }
        return reply
    }
    userLogin(user: UserFormat): object {
        console.log(user)
        const reply: RespData = {
            status: false, message: 'Some error occured'
        }
        return reply
    }
}
