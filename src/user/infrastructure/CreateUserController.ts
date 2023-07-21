import { Controller } from '@nestjs/common';
import { CreateUser } from '../application/CreateUser';

@Controller('user')
export class CreateUserController {
  constructor(private createUser: CreateUser) {}
}
