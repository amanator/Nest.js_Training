import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './Schema/users.schema';



@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { } 
