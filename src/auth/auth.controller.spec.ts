import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('hashed-password'),
}));

describe('AuthController', () => {
  let authController: AuthController;

  const email: string = 'test@example.com';
  const password: string = '123456';

  const prismaMock = {
    user: {
        create: jest.fn().mockImplementation(({ data }) => 
            Promise.resolve({
                id: 'any-id',
                email: data.email,
                createdAt: new Date()
            })
        ),
        findUnique: jest.fn().mockReturnValue({
          id: 'any-id',
          email,
          password: 'hashed-password'
        }),
    },
  };

  const jwtMock = {
    signAsync: jest.fn().mockResolvedValue('mocked-access-token'),
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

  describe('root', () => {
    it('should return a object with "id" and "email"', async () => {
      const result = await authController.register({ email, password });
      expect(result).toEqual({
        id: expect.any(String),
        email,
        createdAt: expect.any(Date)
      });
    });
  });

  describe('root', () => {
    it('should return a object with "access_token"', async () => {
      const result = await authController.login({ email, password });
      expect(result).toEqual({
        access_token: expect.any(String),
      });
    });
  });
});
