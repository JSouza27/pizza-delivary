import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItemDTO } from '../dto/item.dto';
import { OrderItem } from '../Entity/order-item.entity';
import { OrderItemService } from '../service/order-item.service';

@Controller('/api/item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Get(':id')
  async findOrderItemById(@Param('id') id: string) {
    return this.orderItemService.findById(id);
  }

  @Post()
  async addItem(@Body() item: ItemDTO): Promise<OrderItem> {
    return this.orderItemService.create(item);
  }
}
