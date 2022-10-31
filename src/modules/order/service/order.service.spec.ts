import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemResponse } from '../../../mock/order-item.mock';
import { orderResponse, orderUpdatedResponse } from '../../../mock/order.mock';
import { OrderItem } from '../../order-item/Entity/order-item.entity';
import { OrderItemService } from '../../order-item/service/order-item.service';
import { Order } from '../Entity/order.entity';
import { OrderService } from '../service/order.service';

describe('ServiceService', () => {
  let orderService: OrderService;
  let orderItemService: OrderItemService;
  let orderRepository: Repository<Order>;
  let orderItemRepository: Repository<OrderItem>;

  const ORDER_REPOSITORY_TOKEN = getRepositoryToken(Order);
  const ORDER_ITEM_REPOSITORY_TOKEN = getRepositoryToken(OrderItem);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        OrderItemService,
        {
          provide: ORDER_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn().mockResolvedValue(orderResponse),
            find: jest.fn().mockResolvedValue([orderResponse]),
            findOneBy: jest.fn().mockResolvedValue(orderResponse),
            update: jest.fn().mockResolvedValue(orderUpdatedResponse),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: ORDER_ITEM_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn().mockResolvedValue(OrderItemResponse),
          },
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderItemService = module.get<OrderItemService>(OrderItemService);
    orderRepository = module.get<Repository<Order>>(ORDER_REPOSITORY_TOKEN);
    orderItemRepository = module.get<Repository<OrderItem>>(
      ORDER_ITEM_REPOSITORY_TOKEN,
    );
  });

  describe('test configuration', () => {
    it('should be defined', () => {
      expect(orderService).toBeDefined();
    });

    it('should be orderItemService defined', () => {
      expect(orderItemService).toBeDefined();
    });

    it('repostory should be defined', () => {
      expect(orderRepository).toBeDefined();
    });

    it('orderItemRepostory should be defined', () => {
      expect(orderItemRepository).toBeDefined();
    });
  });

  describe('test the create method', () => {
    it('should create an order successfully ', async () => {
      const result = await orderService.create([OrderItemResponse]);

      expect(orderItemRepository.save).toHaveBeenCalledTimes(1);
      expect(orderRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toEqual(orderResponse);
    });
  });

  describe('tests the method that findAll', () => {
    it('should return all orders', async () => {
      const result = await orderService.findAll();

      expect(orderRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Array);
      expect(result).toEqual([orderResponse]);
    });
  });

  describe('tests the method that findById', () => {
    it('should search for an order by id', async () => {
      const result = await orderService.findById(1);

      expect(orderRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(orderResponse);
    });

    it('should return null if not exist', async () => {
      jest.spyOn(orderRepository, 'findOneBy').mockResolvedValue(null);

      const result = await orderService.findById(2);

      expect(orderRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(null);
    });
  });

  describe('tests the method that delete', () => {
    it('should be successfully removed', async () => {
      jest.spyOn(orderRepository, 'findOneBy').mockResolvedValue(null);

      const result = await orderService.delete(1);

      expect(orderRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(result).toBeTruthy();
    });
  });
});
