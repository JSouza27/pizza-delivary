import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ItemDTO } from '../dto/item.dto';
import { UpdatedItemDTO } from '../dto/updated-item.dto';
import { IOrdemItemService } from '../interfaces/order-item-service.interface';
import { OrderItem } from '../order-item.entity';

@Injectable()
export class OrderItemService implements IOrdemItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async addItem(item: ItemDTO): Promise<OrderItem> {
    try {
      return await this.orderItemRepository.save(item);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOrderItemById(id: number): Promise<OrderItem> {
    try {
      return await this.orderItemRepository.findOneByOrFail({ id: id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updatedItem(id: number, data: UpdatedItemDTO): Promise<OrderItem> {
    try {
      const item = await this.orderItemRepository.findOneBy({ id: id });

      if (!item) {
        throw new HttpException('Item não existe.', HttpStatus.NOT_FOUND);
      }

      await this.orderItemRepository.update(id, data);

      return await this.orderItemRepository.findOneBy({ id: id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeItem(id: number): Promise<boolean> {
    try {
      const item = await this.orderItemRepository.findOneBy({ id: id });

      if (!item) {
        throw new HttpException('Item não existe.', HttpStatus.NOT_FOUND);
      }

      await this.orderItemRepository.delete({ id: id });

      const isItem = await this.orderItemRepository.findOneBy({ id: id });

      if (!isItem) {
        return true;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
