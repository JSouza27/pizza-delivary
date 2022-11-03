import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDTO } from '../dto/item.dto';
import { UpdatedItemDTO } from '../dto/updated-item.dto';
import { IOrdemItemService } from '../interfaces/order-item-service.interface';
import { OrderItem } from '../Entity/order-item.entity';
import { OrderItemResponseDTO } from '../dto/order-item-response.dto';

@Injectable()
export class OrderItemService implements IOrdemItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(item: ItemDTO): Promise<OrderItemResponseDTO> {
    const result = await this.orderItemRepository.save(item);

    const responseDTO = new OrderItemResponseDTO(
      result.id,
      result.quantity,
      result.pizza,
      result.order.id,
    );

    return responseDTO;
  }

  async findById(id: string): Promise<OrderItemResponseDTO | null> {
    const item = await this.orderItemRepository.findOneBy({ id: id });

    if (!item) return null;

    const responseDTO = new OrderItemResponseDTO(
      item.id,
      item.quantity,
      item.pizza,
      item.order.id,
    );

    return responseDTO;
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
