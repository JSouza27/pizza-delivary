import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemService } from './order-item.service';
import { Repository } from 'typeorm';
import { OrderItem } from '../Entity/order-item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  findOneResponse,
  itemResponseDTO,
  orderItem,
  responseDTO,
  updateResponse,
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
            save: jest.fn().mockResolvedValue(itemResponseDTO),
            findOneBy: jest.fn().mockResolvedValue(responseDTO),
            update: jest.fn().mockResolvedValue(updateResponse),
            findOne: jest.fn().mockResolvedValue(findOneResponse),
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
    it('should create an item successfully ', async () => {
      const result = await service.create(orderItem);

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toEqual(itemResponseDTO);
    });
  });

  describe('tests the method that findById', () => {
    it('should search for an item by id', async () => {
      const result = await service.findById(
        '3b2a63ca-75b3-4ed4-8f52-7bee8933d814',
      );

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(responseDTO);
    });

    it('should return null if not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      const result = await service.findById('2');

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(null);
    });
  });

  describe('tests the method that update', () => {
    it('should update an order item', async () => {
      const data = {
        id: '3b2a63ca-75b3-4ed4-8f52-7bee8933d814',
        quantity: 5,
        subtotal: 10,
      };

      const result = await service.update(
        '3b2a63ca-75b3-4ed4-8f52-7bee8933d814',
        'f364e356-b100-45b9-a7f8-dd4d682427f8',
        data,
      );

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updateResponse);
    });
  });

  describe('tests the method that delete', () => {
    it('should return a "true" on success', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

      const result = await service.delete('1');

      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeTruthy();
    });
  });
});
