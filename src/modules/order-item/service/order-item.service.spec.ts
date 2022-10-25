import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemService } from './order-item.service';
import { Repository } from 'typeorm';
import { OrderItem } from '../order-item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  newOrderItem,
  OrderItemResponse,
  OrderItemUpdated,
} from '../../../mock/order-item.mock';

describe('ServiceService', () => {
  let service: OrderItemService;
  let repository: Repository<OrderItem>;

  const ORDER_ITEM_REPOSITORY_TOKEN = getRepositoryToken(OrderItem);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemService,
        {
          provide: ORDER_ITEM_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn().mockResolvedValue(OrderItemResponse),
            findOneByOrFail: jest.fn().mockResolvedValue(OrderItemResponse),
            update: jest.fn().mockResolvedValue(OrderItemUpdated),
          },
        },
      ],
    }).compile();

    service = module.get<OrderItemService>(OrderItemService);
    repository = module.get<Repository<OrderItem>>(ORDER_ITEM_REPOSITORY_TOKEN);
  });

  describe('test configuration', () => {
    it('should service be defined', () => {
      expect(service).toBeDefined();
    });

    it('should repository be defined', () => {
      expect(repository).toBeDefined();
    });
  });

  describe('test the method that creates', () => {
    it('should create an order item successfully ', async () => {
      const result = await service.create(newOrderItem);

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(OrderItemResponse);
    });
  });

  describe('tests the method that findById', () => {
    it('should search for an item by id', async () => {
      const result = await service.findById('1');

      expect(repository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(OrderItemResponse);
    });
  });

  describe('tests the method that update', () => {
    it('should update an order item', async () => {
      const data = {
        pizza: newOrderItem.pizza,
        quantity: 1,
      };

      const result = await service.update('1', data);

      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(OrderItemUpdated);
    });
  });

  describe('', () => {});
});
