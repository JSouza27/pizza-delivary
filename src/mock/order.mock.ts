import { Order } from '../modules/order/order.entity';
import { OrderItemResponse } from './order-item.mock';

export const orderResponse = new Order();

orderResponse.id = 1;
orderResponse.itens = [OrderItemResponse];
orderResponse.itens = [OrderItemResponse];
orderResponse.createdAt = new Date();
orderResponse.updatedAt = new Date();
