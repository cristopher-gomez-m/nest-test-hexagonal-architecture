import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/UserRepository';
@Injectable()
export class FindUser {
  constructor(private userRepository: UserRepository) {}

  findByname(name: string) {
    return this.userRepository.find({
      where: { name },
    });
  }
}
