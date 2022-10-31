import { OrderItem } from '../modules/order-item/Entity/order-item.entity';
import { Order } from '../modules/order/Entity/order.entity';
import { pizzaResponse } from './pizza.mock';

export const orderResponse = new Order();

const orderItem = new OrderItem();

orderResponse.id = 1;
orderResponse.itens = [orderItem];
orderResponse.createdAt = new Date();
orderResponse.updatedAt = new Date();

orderItem.id = '1';
orderItem.order = orderResponse;
orderItem.pizza = pizzaResponse;
orderItem.quantity = 1;

export const orderUpdatedResponse = orderResponse;

orderUpdatedResponse.itens[0].quantity = 2;
