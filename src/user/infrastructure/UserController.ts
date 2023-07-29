import { Controller, Get } from '@nestjs/common';
import { FindUser } from '../application/FindUser';

@Controller('user')
export class UserController {
  constructor(private readonly userFinder: FindUser) {}

  @Get()
  findAllUser() {
    return this.userFinder.findAllUser();
  }
}
