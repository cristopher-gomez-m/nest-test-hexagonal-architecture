import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from '../application/CreateUser';
import { CreateUserDto } from '../domain/dto/create-user.dto';

@Controller()
export class CreateUserController {
  constructor(private createUser: CreateUser) {}
  @Post('register')
  register(@Body() userDto: CreateUserDto) {
    return this.createUser.createUser(userDto);
  }
}
