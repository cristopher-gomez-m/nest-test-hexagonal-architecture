import { Body, Controller } from '@nestjs/common';
import { CreateUserDto } from 'src/user/domain/dto/create-user.dto';
import { CreateUser } from '../application/CreateUser';

@Controller('register')
export class RegisterController {
  constructor(private createUser: CreateUser) {}
  register(@Body() userDto: CreateUserDto) {
    return this.createUser.createUser(userDto);
  }
}
