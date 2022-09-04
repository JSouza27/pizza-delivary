import { Injectable } from '@nestjs/common';
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
    return await this.orderRepository.save(itens);
  }

  async findAllOrder(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findOrderById(id: number): Promise<Order> {
    return await this.orderRepository.findOneByOrFail({ id });
  }

  async updateOrderById(id: number, data: UpdateOrderDTO): Promise<Order> {
    // await this.orderRepository.update(id, data);

    return await this.orderRepository.findOneBy({ id });
  }

  async removeOrderById(id: number): Promise<boolean> {
    await this.orderRepository.delete(id);

    const order = await this.orderRepository.findOneByOrFail({ id });

    if (!order) {
      return true;
    }

    throw new Error('There was a problem removing the order.');
  }
}
