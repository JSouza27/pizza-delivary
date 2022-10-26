import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemService } from './order-item.service';
import { Repository } from 'typeorm';
import { OrderItem } from '../Entity/order-item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  orderItem,
  OrderItemResponse,
  orderItemUpdated,
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
            findOneBy: jest.fn().mockResolvedValue(OrderItemResponse),
            update: jest.fn().mockResolvedValue(orderItemUpdated),
            delete: jest.fn().mockResolvedValue(true),
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

  describe('test the create method', () => {
    it('should create an order item successfully ', async () => {
      const result = await service.create(orderItem);

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toEqual(OrderItemResponse);
    });
  });

  describe('tests the method that findById', () => {
    it('should search for an item by id', async () => {
      const result = await service.findById('1');

      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(OrderItemResponse);
    });

    it('should return null if not exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result = await service.findById('2');

      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(null);
    });
  });

  describe('tests the method that update', () => {
    it('should update an order item', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(orderItemUpdated);

      const data = {
        quantity: 1,
      };

      const result = await service.update('1', data);

      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(orderItemUpdated);
    });
  });

  describe('tests the method that delete', () => {
    it('should return a "true" on success', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result = await service.delete('1');

      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeTruthy();
    });
  });
});
