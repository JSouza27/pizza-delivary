import { ItemDTO } from '../dto/item.dto';
import { UpdatedItemDTO } from '../dto/updated-item.dto';
import { OrderItem } from '../order-item.entity';

export interface IOrdemItemService {
  addItem(item: ItemDTO): Promise<OrderItem>;

  findOrderItemById(id: number): Promise<OrderItem>;

  updatedItem(id: number, data: UpdatedItemDTO): Promise<OrderItem>;

  removeItem(id: number): Promise<boolean>;
}
