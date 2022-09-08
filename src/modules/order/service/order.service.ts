import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order.entity';
import { IOrderService } from '../interfaces/order-service.interface';
import { UpdateOrderDTO } from '../dto/update-order.dto';
import { OrderItemService } from '../../order-item/service/order-item.service';
import { ItemDTO } from 'modules/order-item/dto/item.dto';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly ordemItemService: OrderItemService,
  ) {}

  async createOrder(itens: ItemDTO[]): Promise<Order> {
    try {
      const orderItens = [];

      for (const item of itens) {
        const ordemItem = await this.ordemItemService.addItem(item);
        orderItens.push(ordemItem);
      }

      const newOrder = await this.orderRepository.save({ itens: orderItens });

      return newOrder;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllOrder(): Promise<Order[]> {
    try {
      return await this.orderRepository.find({
        relations: {
          itens: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOrderById(id: number): Promise<Order> {
    try {
      const order = await this.orderRepository.findOneBy({ id });

      if (!order) {
        throw new HttpException('Order does not exist.', HttpStatus.NOT_FOUND);
      }

      return order;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOrderById(id: number, data: UpdateOrderDTO): Promise<Order> {
    try {
      const order = await this.orderRepository.findOneBy({ id });

      if (!order) {
        throw new HttpException('Order does not exist.', HttpStatus.NOT_FOUND);
      }

      await this.orderRepository.update(id, data);

      return await this.orderRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeOrderById(id: number): Promise<boolean> {
    try {
      const order = await this.orderRepository.findOneBy({ id });

      if (!order) {
        throw new HttpException('Order does not exist.', HttpStatus.NOT_FOUND);
      }

      await this.orderRepository.delete(id);

      const isOrder = await this.orderRepository.findOneBy({ id });

      if (!isOrder) {
        return true;
      }
    } catch (error) {
      throw new Error('There was a problem removing the order.');
    }
  }
}
