import { ItemDTO } from '../modules/order-item/dto/item.dto';
import { OrderItem } from '../modules/order-item/Entity/order-item.entity';
import { orderResponse } from './order.mock';
import { pizzaResponse } from './pizza.mock';

const item = new OrderItem();

item.id = '1';
item.order = orderResponse;
item.pizza = pizzaResponse;
item.quantity = 2;

export const orderItem: ItemDTO = {
  pizza: pizzaResponse,
  quantity: 2,
};

export const OrderItemResponse: OrderItem = item;

export const orderItemUpdated: OrderItem = {
  id: '1',
  pizza: item.pizza,
  quantity: 1,
  order: orderResponse,
};
