import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemDTO } from '../../order-item/dto/item.dto';
import { OrderItemService } from '../../order-item/service/order-item.service';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { UpdateOrderDTO } from '../dto/update-order.dto';
import { Order } from '../Entity/order.entity';
import { OrderService } from '../service/order.service';

@Controller('/api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @HttpCode(201)
  async createOrder(@Body() data: ItemDTO[]) {
    return await this.orderService.createOrder(data);
  }

  @Get()
  @HttpCode(200)
  async findAllOrder(): Promise<Order[]> {
    return await this.orderService.findAllOrder();
  }

  @Get(':id')
  @HttpCode(200)
  async findOrderById(@Param(':id') id: number): Promise<Order> {
    return await this.orderService.findOrderById(id);
  }

  @Put(':id')
  @HttpCode(200)
  async updateOrderById(
    @Param(':id') id: number,
    @Body() data: UpdateOrderDTO,
  ): Promise<Order> {
    return await this.orderService.updateOrderById(id, data);
  }

  @Delete(':id')
  @HttpCode(200)
  async removeOrderById(@Param(':id') id: number): Promise<boolean> {
    return await this.orderService.removeOrderById(id);
  }
}
