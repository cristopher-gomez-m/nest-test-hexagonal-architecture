import { Module } from "@nestjs/common";
import { UserRepository } from "src/user/domain/UserRepository";
import { LoginController } from "./infrastructure/loginController";
import { Login } from "./application/Login";
import { ValidateUser } from "./application/ValidateUser";


@Module({
    imports:[],
    controllers:[LoginController],
    providers:[UserRepository,Login,ValidateUser],

})

export class AuthModule{}