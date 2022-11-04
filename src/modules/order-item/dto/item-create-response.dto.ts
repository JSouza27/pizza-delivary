import { Pizza } from '../../pizzas/Entity/pizza.entity';

export class ItemCreateResponseDTO {
  id: string;
  quantity: number;
  subtotal: number;
  pizza: Pizza;

  constructor(id: string, quantity: number, pizza: Pizza) {
    this.id = id;
    this.quantity = quantity;
    this.subtotal = quantity * pizza.price;
    this.pizza = pizza;
  }
}
