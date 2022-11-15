export const orderItem = {
  pizza: {
    id: '93f01734-77e5-435d-97c3-e8400ee74213',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Portuguesa',
    price: 5,
    ingredients: ['tomato', 'mozzarella'],
  },
  quantity: 2,
};

export const responseDTO = {
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
  orderId: '55ad1162-4c13-4a37-92d1-59bc01dd2b02',
};

export const findOneResponse = {
  id: 'd16ce40c-e35c-4f57-b759-84118868e26c',
  quantity: 2,
  order: {
    id: '55ad1162-4c13-4a37-92d1-59bc01dd2b02',
    totalOrder: 10,
    createdAt: '2022-11-08T22:25:37.010Z',
    updatedAt: '2022-11-08T22:25:37.010Z',
  },
  pizza: {
    id: '93f01734-77e5-435d-97c3-e8400ee74213',
    name: 'Portuguesa',
    price: 5,
    ingredients: ['tomato', 'mozzarella'],
    createdAt: '2022-11-08T22:25:37.010Z',
    updatedAt: '2022-11-08T22:25:37.010Z',
  },
};

export const itemResponseDTO = {
  id: '3b2a63ca-75b3-4ed4-8f52-7bee8933d814',
  quantity: 2,
  subtotal: 10,
  pizza: {
    id: '93f01734-77e5-435d-97c3-e8400ee74213',
    name: 'Portuguesa',
    price: 5,
    ingredients: ['tomato', 'mozzarella'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const updateResponse = {
  id: '3b2a63ca-75b3-4ed4-8f52-7bee8933d814',
  quantity: 2,
  subtotal: 10,
  pizza: {
    id: '93f01734-77e5-435d-97c3-e8400ee74213',
    name: 'Portuguesa',
    price: 5,
    ingredients: ['tomato', 'mozzarella'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  orderId: 'f364e356-b100-45b9-a7f8-dd4d682427f8',
};
