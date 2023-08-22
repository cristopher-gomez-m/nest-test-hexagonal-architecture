import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserRepository } from 'src/user/domain/UserRepository';
import { CreateUserDto } from 'src/user/domain/dto/create-user.dto';


@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}
  async createUser(user: CreateUserDto) {
    const {email,password} = user;
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    const plainToHash = await hash(password, 10);
    user = { ...user, password: plainToHash };
    return this.userRepository.create(user);
  }
}
