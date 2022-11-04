import { UpdatedItemDTO } from '../../order-item/dto/updated-item.dto';

export class OrderDTO {
  id: string;
  totalOrder: number;
  itens: UpdatedItemDTO[];

  constructor(id: string, totalOrder: number, itens: UpdatedItemDTO[]) {
    this.id = id;
    this.totalOrder = totalOrder;
    this.itens = itens;
  }
}
