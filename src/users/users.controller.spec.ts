import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('hashed-password'),
}));

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const id: string = '123';
  const email: string = 'test@example.com';
  const password: string = '123456';
  const role: Role = 'ADMIN';

  const jwtMock = {
    signAsync: jest.fn().mockResolvedValue('mocked-access-token'),
  };

  const prismaMock = {
    orderStep: {
      update: jest.fn().mockResolvedValue(undefined),
      findUnique: jest.fn(),
    },
  };

  const usersServiceMock = {
    pegarUsuario: jest.fn(),
    pegarUsuarios: jest.fn(),
    atualizar: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService, 
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtMock },
        { provide: UsersService, useValue: usersServiceMock },
    ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should return user data', async () => {      
    const req = {
      user: { userId: id, email, role }
    };

    const result = usersController.me(req);

    expect(result).toEqual({
      userId: expect.any(String),
      email,
      role
    });
  });
    
  it('should return only status code 204 without body content.', async () => {
    jest.spyOn(usersService, 'atualizar').mockResolvedValue(undefined);
      
    const req = { user: { userId: id, email, role } };

    const result = await usersController.atualizar(req, { email, password });

    expect(result).toBeUndefined();
  });

  it('should return data if user have ADMIN role', async () => {
    usersServiceMock.pegarUsuario.mockResolvedValue({
      id: '123',
      email: 'test@example.com',
      role: 'ADMIN'
    });

    const result = await usersController.detalhesUsuario('123');

    expect(usersServiceMock.pegarUsuario).toHaveBeenCalledWith('123');
    expect(result).toEqual({
      id: '123',
      email: 'test@example.com',
      role: 'ADMIN'
    });
  });

  it('return all users data if user have ADMIN role', async () => {
    const result = await usersController.pegarUsuarios();

    expect(result).toBeUndefined();
  })
});
