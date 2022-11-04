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
import { OrderItemService } from '../../order-item/service/order-item.service';
import { ItemDTO } from '../../../modules/order-item/dto/item.dto';
import { OrderResponseDTO } from '../dto/order-response.dto';
import { ItemCreateResponseDTO } from '../../order-item/dto/item-create-response.dto';
import { DeleteOrderDTO } from '../dto/delete-order.dto';
import { UpdateOrderDTO } from '../dto/update-order.dto';
import { OrderDTO } from '../dto/order.dto';
import { UpdatedItemDTO } from '../../order-item/dto/updated-item.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(forwardRef(() => OrderItemService))
    private readonly ordemItemService: OrderItemService,
  ) {}

  async create(itens: ItemDTO[]): Promise<OrderResponseDTO> {
    const orderItens: ItemCreateResponseDTO[] = [];

    for (const item of itens) {
      const ordemItem = await this.ordemItemService.create(item);
      orderItens.push(ordemItem);
    }

    const total = orderItens.reduce((acc, curr) => {
      return acc + curr.subtotal;
    }, 0);

    const order = await this.orderRepository.save({
      itens: orderItens,
      totalOrder: total,
    });

    const responseDTO = new OrderResponseDTO(
      order.id,
      order.totalOrder,
      orderItens,
      order.createdAt,
      order.updatedAt,
    );

    return responseDTO;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: {
        itens: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<OrderResponseDTO | null> {
    const order = await this.orderRepository.findOne({
      select: {
        id: true,
        totalOrder: true,
        itens: true,
        createdAt: true,
        updatedAt: true,
      },
      relations: {
        itens: true,
      },
      where: {
        id: id,
      },
    });

    if (!order) return null;

    const responseDTO = new OrderResponseDTO(
      order.id,
      order.totalOrder,
      order.itens,
      order.createdAt,
      order.updatedAt,
    );

    return responseDTO;
  }

  async update(id: string, data: UpdateOrderDTO): Promise<OrderResponseDTO> {
    const order = await this.findById(id);

    if (!order) {
      throw new HttpException('Order not found.', HttpStatus.NOT_FOUND);
    }

    const orderItens = [];

    for (const item of data.itens) {
      const ordemItem = await this.ordemItemService.update(item.id, id, item);
      orderItens.push(ordemItem);
    }

    const total = orderItens.reduce((acc, curr) => {
      return acc + curr.subtotal;
    }, 0);

    const updatedOrder = {
      itens: orderItens,
      totalOrder: total,
    };

    const response = await this.orderRepository.save({
      ...order,
      ...updatedOrder,
    });

    return response;
  }

  async delete(id: string): Promise<DeleteOrderDTO> {
    const order = this.findById(id);

    if (!order) {
      throw new HttpException('Order not found.', HttpStatus.NOT_FOUND);
    }

    const response = await this.orderRepository.delete(id);

    if (!response.affected) {
      throw new HttpException('Could not delete order', HttpStatus.FORBIDDEN);
    }

    return {
      statusCode: 200,
      message: 'Order deleted successfully',
    };
  }

  async deleteItem(
    orderId: string,
    itensId: string[],
  ): Promise<OrderResponseDTO> {
    const order = await this.findById(orderId);

    if (!order) {
      throw new HttpException('Order not found.', HttpStatus.NOT_FOUND);
    }

    const result = [];

    for (const item of itensId) {
      const res = await this.ordemItemService.delete(item);
      result.push(res);
    }

    if (result.every((el) => el)) {
      const order = await this.findById(orderId);

      const update = order.itens.map((item) => {
        const updated = new UpdatedItemDTO();

        updated.id = item.id;
        updated.quantity = item.quantity;

        return updated;
      });

      return await this.update(orderId, { itens: update });
    }

    throw new HttpException(
      'There was a problem deleting the itens',
      HttpStatus.BAD_REQUEST,
    );
  }
}
