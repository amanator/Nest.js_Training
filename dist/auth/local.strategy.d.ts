import { Strategy } from "passport-local";
import { User } from "src/users/user.entity";
import { UserService } from "src/users/user.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(username: string, password: string): Promise<User>;
}
export {};
