import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { orderItem, responseDTO } from '../../../mock/order-item.mock';
import { OrderItemService } from '../service/order-item.service';
import { OrderItemController } from './order-item.controller';

describe('ControllerController', () => {
  let controller: OrderItemController;
  let service: OrderItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemController],
      providers: [
        {
          provide: OrderItemService,
          useValue: {
            findById: jest.fn().mockResolvedValue(responseDTO),
            create: jest.fn().mockResolvedValue(responseDTO),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderItemController>(OrderItemController);
    service = module.get<OrderItemService>(OrderItemService);
  });

  describe('test configuration', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should be service defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('test the findById method', () => {
    it('should return an object with the information of the item', async () => {
      const result = await controller.findById(
        '3b2a63ca-75b3-4ed4-8f52-7bee8933d814',
      );

      expect(service.findById).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual(responseDTO);
    });

    it('should return an exception if the item does not exist', async () => {
      jest.spyOn(service, 'findById').mockResolvedValueOnce(null);

      expect(controller.findById('3')).rejects.toThrow(HttpException);
      expect(service.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('test the create method', () => {
    it('should return an object with the information of the created item', async () => {
      const result = await controller.create(orderItem);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual(responseDTO);
    });
  });
});
