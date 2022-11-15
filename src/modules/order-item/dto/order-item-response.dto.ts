import { Pizza } from '../../pizzas/Entity/pizza.entity';

export class OrderItemResponseDTO {
  id: string;
  quantity: number;
  subtotal: number;
  pizza: Pizza;
  orderId: string;

  constructor(id, quantity, pizza, orderId) {
    this.id = id;
    this.quantity = quantity;
    this.subtotal = quantity * pizza.price;
    this.pizza = pizza;
    this.orderId = orderId;
  }
}
