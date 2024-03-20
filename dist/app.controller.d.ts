/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { AuthService } from "src/auth/auth.service";
import { Model } from "mongoose";
import { UserDocument } from "./users/Schema/users.schema";
import { CreateUserDto } from "./users/dto/createuser.dto";
import { UserService } from "./users/user.service";
export declare class AppController {
    private readonly authService;
    private userModel;
    private readonly userService;
    constructor(authService: AuthService, userModel: Model<UserDocument>, userService: UserService);
    login(req: any): Promise<{
        success: boolean;
        authtoken: string;
    }>;
    signup(user: CreateUserDto): Promise<{
        success: boolean;
        authtoken: string;
    }>;
}
