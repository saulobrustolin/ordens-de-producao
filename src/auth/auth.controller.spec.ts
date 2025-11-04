import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;

  const prismaMock = {
    user: {
        create: jest.fn().mockImplementation(({ data }) => {
            Promise.resolve({
                id: 'any-id',
                email: data.email
            })
        }),
        findUnique: jest.fn(),
    }
  };

  const jwtMock = {
    sign: jest.fn().mockReturnValue('mocked-access-token'),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService, 
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtMock },
    ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  const email: string = 'test@example.com';
  const password: string = '123456';

  describe('root', () => {
    it('should return a object with "id" and "email"', () => {
      const result = authController.register({ email, password });
      expect(result).toEqual({
        id: expect.any(String),
        email
      });
    });
  });

  describe('root', () => {
    it('should return a object with "access_token"', () => {
      const result = authController.login({ email, password });
      expect(result).toEqual({
        access_token: expect.any(String),
      });
    });
  });
});
