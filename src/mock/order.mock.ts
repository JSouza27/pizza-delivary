import { OrderItem } from '../modules/order-item/Entity/order-item.entity';
import { OrderResponseDTO } from '../modules/order/dto/order-response.dto';
import { Order } from '../modules/order/Entity/order.entity';
import { pizzaResponse } from './pizza.mock';

export const orderResponse = new Order();

const orderItem = new OrderItem();

orderResponse.id = '1';
orderResponse.itens = [orderItem];
orderResponse.createdAt = new Date();
orderResponse.updatedAt = new Date();

orderItem.id = '1';
orderItem.order = orderResponse;
orderItem.pizza = pizzaResponse;
orderItem.quantity = 1;

export const orderUpdatedResponse = orderResponse;

orderUpdatedResponse.itens[0].quantity = 2;

export const item = [
  {
    pizza: {
      id: '93f01734-77e5-435d-97c3-e8400ee74213',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Portuguesa',
      price: 5,
      ingredients: ['tomato', 'mozzarella'],
    },
    quantity: 2,
  },
];

export const orderResponseDTO = {
  id: 'f364e356-b100-45b9-a7f8-dd4d682427f8',
  totalOrder: 10,
  itens: [
    {
      id: '3b2a63ca-75b3-4ed4-8f52-7bee8933d814',
      quantity: 2,
      subtotal: 10,
      pizza: {
        id: '93f01734-77e5-435d-97c3-e8400ee74213',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Portuguesa',
        price: 5,
        ingredients: ['tomato', 'mozzarella'],
      },
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const updateOrderDTO = {
  itens: [
    {
      id: '3b2a63ca-75b3-4ed4-8f52-7bee8933d814',
      quantity: 5,
      subtotal: 10,
    },
  ],
};

export const updatedOrderResponse = {
  id: 'f364e356-b100-45b9-a7f8-dd4d682427f8',
  totalOrder: 25,
  itens: [
    {
      id: '3b2a63ca-75b3-4ed4-8f52-7bee8933d814',
      quantity: 5,
      subtotal: 25,
      pizza: {
        id: '93f01734-77e5-435d-97c3-e8400ee74213',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Portuguesa',
        price: 5,
        ingredients: ['tomato', 'mozzarella'],
      },
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const orderWithoutItem = {
  id: 'f364e356-b100-45b9-a7f8-dd4d682427f8',
  totalOrder: 25,
  itens: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
