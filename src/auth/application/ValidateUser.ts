import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/domain/UserRepository';
import { User } from 'src/user/domain/entities/user.entity';
@Injectable()
export class ValidateUser {
  constructor(
    private userRepository: UserRepository,
  ) //private jwtService: JwtService,
  {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const usersExist = await this.userRepository.findByEmail(email);

    if (!usersExist) {
      return false;
    }
    return true;
  }
  async validateEmail(email: string) {
    const usersExist = await this.userRepository.findByEmail(email);
    if (!usersExist) {
      return {
        user: null
      };
    }
    return {
      user: usersExist
    };
  }
  
}
