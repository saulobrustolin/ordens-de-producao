import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('hashed-password'),
}));

describe('UsersController', () => {
  let usersController: UsersController;

  const email: string = 'test@example.com';
  const password: string = '123456';
  const role: string = 'ADMIN';

  const jwtMock = {
    signAsync: jest.fn().mockResolvedValue('mocked-access-token'),
  };

  const prismaMock = {
    orderStep: {
      create: jest.fn().mockImplementation(({ data }) => Promise.resolve({
        id: 'any-id',
        ...data,
        orderId: '1'
      })),
      update: jest.fn().mockResolvedValue(undefined),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService, 
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtMock },
    ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    beforeEach(() => {
      usersController = new UsersController({} as any);
    });

    it('should return a object with my datas user', async () => {
      const mockUser = {
        userId: '123',
        email,
        role
      }
      
      const req = { user: mockUser };

      const result = usersController.me(req);

      expect(result).toEqual({
        userId: expect.any(String),
        email: mockUser.email,
        role: mockUser.role
      })
    });
  });

  // describe('root', () => {
  //   it('should return a object with "access_token"', async () => {
  //     const result = await authController.login({ email, password });
  //     expect(result).toEqual({
  //       access_token: expect.any(String),
  //     });
  //   });
  // });
});
