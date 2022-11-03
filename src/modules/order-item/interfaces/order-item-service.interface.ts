import { ItemDTO } from '../dto/item.dto';
import { OrderItemResponseDTO } from '../dto/order-item-response.dto';
import { UpdatedItemDTO } from '../dto/updated-item.dto';
import { OrderItem } from '../Entity/order-item.entity';

export interface IOrdemItemService {
  create(item: ItemDTO): Promise<OrderItemResponseDTO>;

  findById(id: string): Promise<OrderItemResponseDTO | null>;

  update(id: string, data: UpdatedItemDTO): Promise<OrderItem>;

  delete(id: string): Promise<boolean>;
}
