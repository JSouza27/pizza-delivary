import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDTO } from '../dto/item.dto';
import { UpdatedItemDTO } from '../dto/updated-item.dto';
import { IOrdemItemService } from '../interfaces/order-item-service.interface';
import { OrderItem } from '../Entity/order-item.entity';

@Injectable()
export class OrderItemService implements IOrdemItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(item: ItemDTO): Promise<OrderItem> {
    return await this.orderItemRepository.save(item);
  }

  async findById(id: string): Promise<OrderItem> {
    return await this.orderItemRepository.findOneBy({ id: id });
  }

  async update(id: string, data: UpdatedItemDTO): Promise<OrderItem> {
    await this.orderItemRepository.update(id, data);

    const orderItem = await this.orderItemRepository.findOneBy({ id: id });

    return orderItem;
  }

  async delete(id: string): Promise<boolean> {
    await this.orderItemRepository.delete({ id: id });

    const isItem = await this.orderItemRepository.findOneBy({ id: id });

    if (!isItem) {
      return true;
    }

    return false;
  }
}
