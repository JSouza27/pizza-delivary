import { ItemCreateResponseDTO } from '../../order-item/dto/item-create-response.dto';
import { OrderItem } from '../../order-item/Entity/order-item.entity';

export class OrderResponseDTO {
  id: string;
  totalOrder: number;
  itens: ItemCreateResponseDTO[] | OrderItem[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    totalOrder: number,
    itens: ItemCreateResponseDTO[] | OrderItem[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.totalOrder = totalOrder;
    this.itens = itens;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
