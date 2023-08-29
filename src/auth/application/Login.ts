import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/user/domain/UserRepository';
import { LoginUserDTO } from 'src/user/domain/dto/login-user.dto';
import { ValidateUser } from './ValidateUser';
import { UserNotFoundError } from '../domain/UserNotFoundError';
import { BadRequestError } from '../domain/BadRequestError';
@Injectable()
export class Login {
  constructor(
    private userRepository: UserRepository,
    private validateUser: ValidateUser,
  ) {}
  async login(userToValidate: LoginUserDTO) {
    const { email, password } = userToValidate;
    const { user } = await this.validateUser.validateEmail(email);
    if (user === null) {
      throw new UserNotFoundError('Ese email no existe');
      //throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
      //return { message: 'asd' };
    }
    //throw   new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    const validPassowrd = await user.validatePassword(password);
    if (!validPassowrd) {
      throw new BadRequestError('Password not found');
    }
    return user;
  }
}
