import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';

describe('OrderStepsController', () => {
  let orderController: OrdersController;

  const prismaMock = {
    order: {
      findMany: jest.fn().mockResolvedValue([{
        id: 'any-id',
        code: 'OP-190',
        description: 'test description',
        status: 'PENDENTE'
      }]),
      create: jest.fn().mockImplementation(({ data }) => Promise.resolve({
        id: 'any-id',
        ...data,
        orderId: '1'
      })),
      update: jest.fn().mockResolvedValue(undefined),
      findUnique: jest.fn().mockResolvedValue({
        id: 'any-id',
        code: 'OP-190',
        description: 'test description',
        status: 'PENDENTE'
      }),
      delete: jest.fn().mockReturnValue(undefined)
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, {
        provide: PrismaService,
        useValue: prismaMock
      }],
    }).compile();

    orderController = app.get<OrdersController>(OrdersController);
  });

  describe('root', () => {
    it('should return a object response with only id.', async () => {
      const code = 'OP-190';
      const description = 'description';
      const status = 'PENDENTE';
      const steps = []

      const result = await orderController.create({
        code,
        description,
        status,
        steps
      });
      expect(result).toEqual({
        id: expect.any(String)
      });
    })
  });

  describe('root', () => {
    it('should return only one object of type Orders.', async () => {
      const result = await orderController.pegarOrdem('1');
      expect(result).toEqual({ data: {
        id: expect.any(String),
        code: expect.any(String),
        description: expect.any(String),
        status: expect.any(String)
      }});
    });
  });

  describe('root', () => {
    it('should return a object of type Orders.', async () => {
      const result = await orderController.pegar();
      expect(result).toEqual({ data: [
        {
          id: expect.any(String),
          code: expect.any(String),
          description: expect.any(String),
          status: expect.any(String)
        }
      ] });
    });
  });

  describe('root', () => {
    it('should return without content and status 204.', async () => {
      const result = await orderController.atualizarOrdem('1', {
        code: 'OP-200',
        description: 'new description',
        status: 'EXECUTANDO'
      });
      expect(result).toBeUndefined();
    });
  });

  describe('root', () => {
    it('should return without conetnt and status 204.', async () => {
      const result = await orderController.deletarOrdem('1');
      expect(result).toBeUndefined();
    });
  });
});
