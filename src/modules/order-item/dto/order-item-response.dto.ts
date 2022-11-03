import { Pizza } from '../../pizzas/Entity/pizza.entity';

export class OrderItemResponseDTO {
  id: string;
  quantity: number;
  subtotal: number;
  pizza: Pizza;
  order_id: number;

  constructor(id, quantity, pizza, orderId) {
    this.id = id;
    this.quantity = quantity;
    this.subtotal = quantity * pizza.price;
    this.pizza = pizza;
    this.order_id = orderId;
  }
}
