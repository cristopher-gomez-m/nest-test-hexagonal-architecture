import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { Login } from "../application/Login";
import { LoginUserDTO } from '../../user/domain/dto/login-user.dto';
import { UserNotFoundError } from "../domain/Errors/UserNotFoundError";
import { BadRequestError } from "../domain/Errors/BadRequestError";

@Controller('login')
export class LoginController{
    constructor(private loginService: Login){}
    @Post()
    async login(@Body() loginDto:LoginUserDTO){
        try{
            const result = await this.loginService.login(loginDto);
            return this.loginService.generateAccesToken(result);
        }catch(error){
            if(error instanceof UserNotFoundError){
                throw new HttpException(error.message,HttpStatus.NOT_FOUND);
            }else if(error instanceof BadRequestError){
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
            }
        }
    }
}