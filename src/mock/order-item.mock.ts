import { UpdatedItemDTO } from '../modules/order-item/dto/updated-item.dto';
import { ItemDTO } from '../modules/order-item/dto/item.dto';
import { OrderItem } from '../modules/order-item/order-item.entity';
import { orderResponse } from './order.mock';
import { pizzaResponse } from './pizza.mock';

const item = new OrderItem();

item.id = '1';
item.order = orderResponse;
item.pizza = pizzaResponse;
item.quantity = 2;

export const newOrderItem: ItemDTO = {
  pizza: pizzaResponse,
  quantity: 2,
};

export const OrderItemResponse: OrderItem = item;

export const OrderItemUpdated: UpdatedItemDTO = {
  pizza: item.pizza,
  quantity: 1,
};
