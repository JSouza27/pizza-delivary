import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemCreateResponseDTO } from '../dto/item-create-response.dto';
import { ItemDTO } from '../dto/item.dto';
import { OrderItemResponseDTO } from '../dto/order-item-response.dto';
import { OrderItemService } from '../service/order-item.service';

@ApiTags('order-item')
@Controller('/api/item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<OrderItemResponseDTO> {
    const item = await this.orderItemService.findById(id);

    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    return item;
  }

  @Post()
  async create(@Body() item: ItemDTO): Promise<ItemCreateResponseDTO> {
    return this.orderItemService.create(item);
  }
}
