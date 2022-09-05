import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order.entity';
import { IOrderService } from '../interfaces/order-service.interface';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { UpdateOrderDTO } from '../dto/update-order.dto';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createOrder(itens: CreateOrderDTO): Promise<Order> {
    try {
      return await this.orderRepository.save(itens);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllOrder(): Promise<Order[]> {
    try {
      return await this.orderRepository.find();
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
