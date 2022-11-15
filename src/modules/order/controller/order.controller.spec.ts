import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  item,
  orderResponseDTO,
  orderWithoutItem,
  updatedOrderResponse,
  updateOrderDTO,
} from '../../../mock/order.mock';
import { OrderService } from '../service/order.service';
import { OrderController } from './order.controller';

describe('ControllerController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            create: jest.fn().mockResolvedValue(orderResponseDTO),
            findAll: jest.fn().mockResolvedValue([orderResponseDTO]),
            findById: jest.fn().mockResolvedValue(orderResponseDTO),
            update: jest.fn().mockResolvedValue(updatedOrderResponse),
            delete: jest.fn().mockResolvedValue({
              statusCode: 200,
              message: 'Order deleted successfully',
            }),
            deleteItem: jest.fn().mockResolvedValue(orderWithoutItem),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  describe('test configuration', () => {
    it('should be controller defined', () => {
      expect(controller).toBeDefined();
    });

    it('should be service defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('test the create method', () => {
    it('should return an object with the information of the order', async () => {
      const result = await controller.create(item);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toEqual(orderResponseDTO);
    });
  });

  describe('test the findAll method', () => {
    it('should return a list of all orders', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveLength(1);
      expect(result).toEqual([orderResponseDTO]);
    });

    it('should return an empty list if there is no order', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });

  describe('test the findById method', () => {
    it('should return the order of the passed id', async () => {
      const result = await controller.findById(
        'f364e356-b100-45b9-a7f8-dd4d682427f8',
      );

      expect(service.findById).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual(orderResponseDTO);
    });

    it('should return an exception if the order does not exist', async () => {
      jest.spyOn(service, 'findById').mockResolvedValueOnce(null);

      expect(controller.findById('2')).rejects.toThrow(HttpException);
      expect(service.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('test the update method', () => {
    it('should return the updated order', async () => {
      const result = await controller.update(
        'f364e356-b100-45b9-a7f8-dd4d682427f8',
        updateOrderDTO,
      );

      expect(service.update).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual(updatedOrderResponse);
    });
  });

  describe('test the delete method', () => {
    it('should return the message "Order deleted successfully" if it was deleted', async () => {
      const result = await controller.delete(
        'f364e356-b100-45b9-a7f8-dd4d682427f8',
      );

      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result.message).toEqual('Order deleted successfully');
    });
  });

  describe('test the deteleItem method', () => {
    it('it should be possible to remove an item', async () => {
      const result = await controller.deleteItem(
        'f364e356-b100-45b9-a7f8-dd4d682427f8',
        ['3b2a63ca-75b3-4ed4-8f52-7bee8933d814'],
      );

      expect(service.deleteItem).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual(orderWithoutItem);
    });
  });
});
