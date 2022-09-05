import { CreateOrderDTO } from '../dto/create-order.dto';
import { UpdateOrderDTO } from '../dto/update-order.dto';
import { Order } from '../order.entity';

export interface IOrderService {
  createOrder(itens: CreateOrderDTO): Promise<Order>;

  findAllOrder(): Promise<Order[]>;

  findOrderById(id: number): Promise<Order | []>;

  updateOrderById(id: number, data: UpdateOrderDTO): Promise<Order>;

  removeOrderById(id: number): Promise<boolean>;
}
