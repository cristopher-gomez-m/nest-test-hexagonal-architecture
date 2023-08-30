import { Injectable } from '@nestjs/common';
import { LoginUserDTO } from 'src/user/domain/dto/login-user.dto';
import { ValidateUser } from './ValidateUser';
import { UserNotFoundError } from '../domain/Errors/UserNotFoundError';
import { BadRequestError } from '../domain/Errors/BadRequestError';
import { User } from 'src/user/domain/entities/user.entity';
import { JWTPayload } from '../domain/JWTPayload';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class Login {
  constructor(
    private validateUser: ValidateUser,
    private jwtService: JwtService,
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

  generateAccesToken(user: User) {
    const payload: JWTPayload = { userId: user.id };
    return {
      acces_token: this.jwtService.sign(payload),
    };
  }
}
