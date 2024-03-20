import { HttpException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.entity";
import { UserDocument } from "./Schema/users.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/createuser.dto";

import { Response } from "express";

@Injectable()
export class UserService {


    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    getUserByUserName(username: string): Promise<User> {
        // console.log(username)
        return this.userModel.findOne({ username: username }).exec();
    }

    async signUp(createUserDto: CreateUserDto) {
        const user = await this.userModel.find({ username: createUserDto.username })
        // console.log(user)
        if (user.length != 0) {
            throw new HttpException({ error: 'User Already Exist', success: false }, 400);
        }

        const model = new this.userModel();
        model.username = createUserDto.username;
        model.password = createUserDto.password;
        return model.save()

    }

    // try(@Res() res: Response) {
    //     throw new HttpException({
    //         error: 'This is a custom message',
    //         success: false,
    //     }, 400
    //     );
    // }
}