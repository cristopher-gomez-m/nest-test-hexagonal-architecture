import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/UserRepository';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { hash } from 'bcrypt';
import { User } from '../domain/entities/user.entity';
import { UserId } from '../domain/entities/userId';
import { userPassword } from '../domain/valueObjects/userPassword';

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: CreateUserDto) {
    const { email, password } = user;
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist)
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    const id =  UserId.generate();
    const user2 = new User(id);
    user2.email= email;
    const password1 = new userPassword('');
    const hash = await password1.create(password);
    user2.password = hash.getHashedPassword();
    return this.userRepository.save(user2);
  }
}
