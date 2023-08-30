import { Module } from "@nestjs/common";
import { UserRepository } from "src/user/domain/UserRepository";
import { LoginController } from "./infrastructure/loginController";
import { Login } from "./application/Login";
import { ValidateUser } from "./application/ValidateUser";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports:[JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
    })],
    controllers:[LoginController],
    providers:[UserRepository,Login,ValidateUser],

})

export class AuthModule{}