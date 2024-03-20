import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { User } from './users/user.entity';
import { UserSchema } from './users/Schema/users.schema';
import { UserService } from './users/user.service';



@Module({
  imports: [AuthModule, UserModule, NotesModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [".local.env"]
  }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService) => ({ uri: ConfigService.get("MONGO_URI") }),
      inject: [ConfigService]
    }), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule { } 
