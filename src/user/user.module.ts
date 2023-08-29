import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { UserController } from './infrastructure/UserController';
import { FindUser } from './application/FindUser';
//import { customUserRepository } from './domain/UserRepository';
import { DataSource } from 'typeorm';
import { UserRepository } from './domain/UserRepository';
import { CreateUser } from './application/CreateUser';
import { CreateUserController } from './infrastructure/CreateUserController';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController,CreateUserController],
  providers: [FindUser, UserRepository, CreateUser],
})
export class UserModule {}
