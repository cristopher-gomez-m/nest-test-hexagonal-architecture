import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class FindUser {
  constructor(
    //@InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  findByname(email: string) {
    return this.userRepository.find({
      where: { email },
    });
  }

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
