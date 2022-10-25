import { CreatePizzaDTO } from 'modules/pizzas/dto/create-pizza.dto';
import { Pizza } from 'modules/pizzas/pizza.entity';

export const pizza: CreatePizzaDTO = {
  name: 'Diavola',
  price: 7.5,
  ingredients: ['tomato', 'mozzarella', 'spicy salami'],
};

export const pizzaResponse: Pizza = {
  id: '1',
  name: 'Diavola',
  price: 7.5,
  ingredients: ['tomato', 'mozzarella', 'spicy salami'],
  createdAt: new Date(),
  updatedAt: new Date(),
};
