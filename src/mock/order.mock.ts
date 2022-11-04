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
