import { Test, TestingModule } from '@nestjs/testing';
import { StepsController } from './order-steps.controller';
import { StepsService } from './order-steps.service';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

describe('OrderStepsController', () => {
  let orderStepsController: StepsController;

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
      controllers: [StepsController],
      providers: [StepsService, {
        provide: PrismaService,
        useValue: prismaMock
      }],
    }).compile();

    orderStepsController = app.get<StepsController>(StepsController);
  });
  
  const orderId: string = '1';
  let lastCreateOrderStep: null | string = null;

  describe('root', () => {
    it('should return a object of type OrderSteps.', async () => {
      const date: Date = new Date();
      const name: string = 'Original name';
      const sequence: number = 2;

      const result = await orderStepsController.criarStep(orderId, { completedAt: date, name: name, sequence: sequence });
      lastCreateOrderStep = result.id;
      expect(result).toEqual({
        id: expect.any(String),
        name,
        sequence,
        completedAt: date,
        orderId
      });
    });
  });

  describe('root', () => {
    it('should return only status 204 without content in response.', async () => {
      const newDate: Date = new Date();
      const newName: string = 'New name';
      const newSequence: number = 1;

      if (!lastCreateOrderStep) {
        throw new NotFoundException('Step not found');
      }

      const result = await orderStepsController.atualizarStep(orderId, lastCreateOrderStep, {
        name: newName,
        sequence: newSequence,
        completedAt: newDate
      });
      expect(result).toBeUndefined();
    })
  });
});
