import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/user.entity";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {

    }

    // generate Id Card
    generateToken(payload): string {

        return this.jwtService.sign(payload);
    }
}