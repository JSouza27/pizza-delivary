import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ItemDTO } from '../../order-item/dto/item.dto';
import { UpdatedItemDTO } from '../../order-item/dto/updated-item.dto';
import { DeleteOrderDTO } from '../dto/delete-order.dto';
import { OrderResponseDTO } from '../dto/order-response.dto';
import { UpdateOrderDTO } from '../dto/update-order.dto';
import { Order } from '../Entity/order.entity';
import { OrderService } from '../service/order.service';

@Controller('/api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() data: ItemDTO[]) {
    return await this.orderService.create(data);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Order[]> {
    return await this.orderService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string): Promise<OrderResponseDTO> {
    const response = await this.orderService.findById(id);

    if (!response) {
      throw new HttpException('Order not found.', HttpStatus.NOT_FOUND);
    }

    return response;
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateOrderDTO,
  ): Promise<OrderResponseDTO> {
    return await this.orderService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<DeleteOrderDTO> {
    return await this.orderService.delete(id);
  }

  @Delete('/remove-item/:orderId')
  @HttpCode(200)
  async deleteItem(
    @Param('orderId') orderId: string,
    @Body() itensId: string[],
  ): Promise<OrderResponseDTO> {
    return await this.orderService.deleteItem(orderId, itensId);
  }
}
