import { Module } from "@nestjs/common";
import { RegisterController } from "./infrastructure/RegisterController";


@Module({
    imports:[],
    controllers:[RegisterController],
    providers:[],

})

export class AuthModule{}