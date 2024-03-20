import { Body, Controller, HttpException, Post, Request, Res, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { User } from "./users/user.entity";
import { Model } from "mongoose";
import { UserDocument } from "./users/Schema/users.schema";
import { CreateUserDto } from "./users/dto/createuser.dto";
import { UserService } from "./users/user.service";



@Controller()
export class AppController {


    constructor(private readonly authService: AuthService, @InjectModel(User.name) private userModel: Model<UserDocument>, private readonly userService: UserService) {

    }


    @Post('/login')
    @UseGuards(AuthGuard("local"))
    async login(@Request() req) {
        let user = await this.userModel.findOne({ username: req.user.username }).exec();
        if (!user)
            throw new HttpException({ success: false, error: 'Internal Server Error' }, 400);
        // console.log(user)
        const token = this.authService.generateToken({ id: user.id })
        return { success: true, authtoken: token };
    }

    @Post('/signup')
    async signup(@Body() user: CreateUserDto) {
        let newUser = await this.userService.signUp(user);
        const token = this.authService.generateToken({ id: newUser.id });
        return { success: true, authtoken: token };

    }

}