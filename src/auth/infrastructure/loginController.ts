import { BadRequestException, Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { Login } from "../application/Login";
import { LoginUserDTO } from "src/user/domain/dto/login-user.dto";
import { UserNotFoundError } from "../domain/UserNotFoundError";
import { BadRequestError } from "../domain/BadRequestError";

@Controller('login')
export class LoginController{
    constructor(private loginService: Login){}
    @Post()
    async login(@Body() loginDto:LoginUserDTO){
        try{
            const result = await this.loginService.login(loginDto);
            return result;
        }catch(error){
            if(error instanceof UserNotFoundError){
                throw new HttpException(error.message,HttpStatus.NOT_FOUND);
            }else if(error instanceof BadRequestError){
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
            }
        }
    }
}