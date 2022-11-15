import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { responseDTO } from '../../../mock/order-item.mock';
import {
  item,
  orderResponseDTO,
  updatedOrderResponse,
} from '../../../mock/order.mock';
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
            save: jest.fn().mockResolvedValue(orderResponseDTO),
            find: jest.fn().mockResolvedValue([orderResponseDTO]),
            findOne: jest.fn().mockResolvedValue(orderResponseDTO),
            update: jest.fn().mockResolvedValue(updatedOrderResponse),
            delete: jest.fn().mockResolvedValue({
              raw: [],
              affected: 1,
            }),
          },
        },
        {
          provide: ORDER_ITEM_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn().mockResolvedValue(responseDTO),
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
      const result = await orderService.create(item);

      expect(orderItemRepository.save).toHaveBeenCalledTimes(1);
      expect(orderRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toEqual(orderResponseDTO);
    });
  });

  describe('tests the method that findAll', () => {
    it('should return all orders', async () => {
      const result = await orderService.findAll();

      expect(orderRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Array);
      expect(result).toEqual([orderResponseDTO]);
    });
  });

  describe('tests the method that findById', () => {
    it('should search for an order by id', async () => {
      const result = await orderService.findById(
        'f364e356-b100-45b9-a7f8-dd4d682427f8',
      );

      expect(orderRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(orderResponseDTO);
    });

    it('should return null if not exist', async () => {
      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

      const result = await orderService.findById('2');

      expect(orderRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(null);
    });
  });

  describe('tests the method that delete', () => {
    it('should be successfully removed', async () => {
      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

      const result = await orderService.delete(
        'f364e356-b100-45b9-a7f8-dd4d682427f8',
      );

      expect(orderRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toBeTruthy();
    });
  });
});
