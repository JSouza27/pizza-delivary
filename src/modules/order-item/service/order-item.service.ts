import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDTO } from '../dto/item.dto';
import { UpdatedItemDTO } from '../dto/updated-item.dto';
import { OrderItem } from '../order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async addItem(item: ItemDTO): Promise<OrderItem> {
    return await this.orderItemRepository.save(item);
  }

  async findOrderItemById(id: number): Promise<OrderItem | null> {
    return await this.orderItemRepository.findOneByOrFail({ id: id });
  }

  async updatedItem(id: number, data: UpdatedItemDTO): Promise<OrderItem> {
    await this.orderItemRepository.update(id, data);

    return await this.orderItemRepository.findOneBy({ id: id });
  }

  async removeItem(id: number): Promise<boolean> {
    await this.orderItemRepository.findOneByOrFail({ id: id });

    const item = await this.orderItemRepository.findOneBy({ id: id });

    if (!item) {
      return true;
    }
  }
}
