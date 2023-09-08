import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Login } from '../../../src/auth/application/Login';
import { UserNotFoundError } from '../../../src/auth/domain/Errors/UserNotFoundError';
import { LoginController } from '../../../src/auth/infrastructure/loginController';
import { LoginUserDTO } from '../../../src/user/domain/dto/login-user.dto';
import { ValidateUser } from '../../../src/auth/application/ValidateUser';
import { UserRepository } from '../../../src/user/domain/UserRepository';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { BadRequestError } from '../../../src/auth/domain/Errors/BadRequestError';
dotenv.config();
describe('loginController', () => {
  let controller: LoginController;
  let loginService: Login;
  let userRepository: UserRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [LoginController],
      providers: [
        Login,
        ValidateUser,
        UserRepository,
        // Provide DataSource with mock implementation
        {
          provide: DataSource,
          useValue: {
            createEntityManager: jest.fn(), // You might need to mock more methods here
          },
        },
      ],
    }).compile();
    controller = module.get<LoginController>(LoginController);
    loginService = module.get<Login>(Login);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should throw HttpException with status 404 when UserNotFoundError is thrown', async () => {
    const loginDto: LoginUserDTO = {
      email: 'ads@b.com',
      password: '12',
    };

    jest
      .spyOn(loginService, 'login')
      .mockRejectedValue(new UserNotFoundError('User not found'));

    try {
      await controller.login(loginDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response).toEqual('User not found');
      expect(error.status).toEqual(HttpStatus.NOT_FOUND);
    }
  });

  it('should throw HttpException with status 400 when BadRequestError is thrown', async () => {
    const loginDto: LoginUserDTO = {
      email: 'adss@b.com',
      password: '1',
    };

    jest
      .spyOn(loginService, 'login')
      .mockRejectedValue(new BadRequestError('Password not found'));

    try {
      await controller.login(loginDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.response).toEqual('Password not found');
      expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
    }
  });
});
