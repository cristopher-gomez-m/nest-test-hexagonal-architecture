import { IsEmail, IsNotEmpty } from 'class-validator';
import { userPassword } from '../valueObjects/userPassword';
export class LoginUserDTO{
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    password: string;
}