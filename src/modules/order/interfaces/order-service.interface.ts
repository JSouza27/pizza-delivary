import { ItemDTO } from '../../../modules/order-item/dto/item.dto';
import { Order } from '../Entity/order.entity';

export interface IOrderService {
  create(itens: ItemDTO[]): Promise<Order>;

  findAll(): Promise<Order[]>;

  findById(id: number): Promise<Order | []>;

  delete(id: number): Promise<boolean>;
}
