import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy } from "passport-local";
import { User } from "src/users/user.entity";
import { UserService } from "src/users/user.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userService: UserService) {
        super()
    }

    async validate(username: string, password: string): Promise<User> {
        const user = await this.userService.getUserByUserName(username);

        if (user === null) throw new HttpException({ error: 'Internal Server Error' }, 400);

        if (user !== undefined && user.password == password)
            return { username: user.username, password: user.password };
        else
            throw new UnauthorizedException
    }
}