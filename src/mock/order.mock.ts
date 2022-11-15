export const item = [
  {
    pizza: {
      id: '93f01734-77e5-435d-97c3-e8400ee74213',
      createdAt: new Date('2022-11-08T22:25:37.010Z'),
      updatedAt: new Date('2022-11-08T22:25:37.010Z'),
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
      id: 'd16ce40c-e35c-4f57-b759-84118868e26c',
      quantity: 2,
      subtotal: 10,
      pizza: {
        id: '93f01734-77e5-435d-97c3-e8400ee74213',
        name: 'Portuguesa',
        price: 5,
        ingredients: ['tomato', 'mozzarella'],
        createdAt: '2022-11-08T22:25:37.010Z',
        updatedAt: '2022-11-08T22:25:37.010Z',
      },
    },
  ],
  createdAt: '2022-11-08T22:25:37.010Z',
  updatedAt: '2022-11-08T22:25:37.010Z',
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
        createdAt: '2022-11-08T22:25:37.010Z',
        updatedAt: '2022-11-08T22:25:37.010Z',
        name: 'Portuguesa',
        price: 5,
        ingredients: ['tomato', 'mozzarella'],
      },
    },
  ],
  createdAt: '2022-11-08T22:25:37.010Z',
  updatedAt: '2022-11-08T22:25:37.010Z',
};

export const orderWithoutItem = {
  id: 'f364e356-b100-45b9-a7f8-dd4d682427f8',
  totalOrder: 25,
  itens: [],
  createdAt: '2022-11-08T22:25:37.010Z',
  updatedAt: '2022-11-08T22:25:37.010Z',
};
