import { ItemDTO } from 'modules/order-item/dto/item.dto';

export class OrderDTO {
  id: number;
  itens: ItemDTO[];
}
