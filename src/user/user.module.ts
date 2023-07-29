import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { UserController } from './infrastructure/UserController';
import { FindUser } from './application/FindUser';
//import { customUserRepository } from './domain/UserRepository';
import { DataSource } from 'typeorm';
import { UserRepository } from './domain/UserRepository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    /*
    {
      provide: getRepositoryToken(User),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // Override default repository for Task with a custom one
        return dataSource.getRepository(User).extend(customUserRepository);
      },
    },
    */
    FindUser,
    UserRepository,
  ],
})
export class UserModule {}
