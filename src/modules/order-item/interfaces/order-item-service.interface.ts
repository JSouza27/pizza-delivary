import { ItemDTO } from '../dto/item.dto';
import { UpdatedItemDTO } from '../dto/updated-item.dto';
import { OrderItem } from '../order-item.entity';

export interface IOrdemItemService {
  addItem(item: ItemDTO): Promise<OrderItem>;

  findOrderItemById(id: string): Promise<OrderItem>;

  updatedItem(id: string, data: UpdatedItemDTO): Promise<OrderItem>;

  removeItem(id: string): Promise<boolean>;
}
