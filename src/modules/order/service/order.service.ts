import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../Entity/order.entity';
import { IOrderService } from '../interfaces/order-service.interface';
import { OrderItemService } from '../../order-item/service/order-item.service';
import { ItemDTO } from '../../../modules/order-item/dto/item.dto';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(forwardRef(() => OrderItemService))
    private readonly ordemItemService: OrderItemService,
  ) {}

  async create(itens: ItemDTO[]): Promise<Order> {
    const orderItens = [];

    for (const item of itens) {
      const ordemItem = await this.ordemItemService.create(item);
      orderItens.push(ordemItem);
    }

    const newOrder = await this.orderRepository.save({ itens: orderItens });

    return newOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: {
        itens: true,
      },
    });
  }

  async findById(id: number): Promise<Order | null> {
    return this.orderRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    await this.orderRepository.delete(id);

    const isOrder = await this.orderRepository.findOneBy({ id });

    if (!isOrder) {
      return true;
    }

    return false;
  }
}
