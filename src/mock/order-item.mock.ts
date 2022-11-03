import { ItemDTO } from '../modules/order-item/dto/item.dto';
import { OrderItemResponseDTO } from '../modules/order-item/dto/order-item-response.dto';
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

export const responseDTO = new OrderItemResponseDTO(
  item.id,
  item.quantity,
  item.pizza,
  item.order.id,
);
