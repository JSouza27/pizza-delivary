import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDTO } from '../dto/item.dto';
import { UpdatedItemDTO } from '../dto/updated-item.dto';
import { OrderItem } from '../Entity/order-item.entity';
import { OrderItemResponseDTO } from '../dto/order-item-response.dto';
import { ItemCreateResponseDTO } from '../dto/item-create-response.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(item: ItemDTO): Promise<ItemCreateResponseDTO> {
    const result = await this.orderItemRepository.save(item);

    const responseDTO = new ItemCreateResponseDTO(
      result.id,
      result.quantity,
      result.pizza,
    );

    return responseDTO;
  }

  async findById(id: string): Promise<OrderItemResponseDTO | null> {
    const item = await this.orderItemRepository.findOne({
      select: {
        id: true,
        quantity: true,
      },
      relations: {
        order: true,
        pizza: true,
      },
      where: {
        id: id,
      },
    });

    if (!item) return null;

    const responseDTO = new OrderItemResponseDTO(
      item.id,
      item.quantity,
      item.pizza,
      item.order.id,
    );

    return responseDTO;
  }

  async update(
    id: string,
    orderId: string,
    data: UpdatedItemDTO,
  ): Promise<OrderItemResponseDTO> {
    const orderItem = await this.orderItemRepository.findOneBy({ id: id });

    const item = await this.orderItemRepository.save({
      ...orderItem,
      ...data,
    });

    const responseDTO = new OrderItemResponseDTO(
      item.id,
      item.quantity,
      item.pizza,
      orderId,
    );

    return responseDTO;
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
