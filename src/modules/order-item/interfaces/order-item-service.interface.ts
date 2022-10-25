import { ItemDTO } from '../dto/item.dto';
import { UpdatedItemDTO } from '../dto/updated-item.dto';
import { OrderItem } from '../order-item.entity';

export interface IOrdemItemService {
  create(item: ItemDTO): Promise<OrderItem>;

  findById(id: string): Promise<OrderItem>;

  update(id: string, data: UpdatedItemDTO): Promise<OrderItem>;

  remove(id: string): Promise<boolean>;
}
