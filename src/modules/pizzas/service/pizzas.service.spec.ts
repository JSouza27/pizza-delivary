import { Test, TestingModule } from '@nestjs/testing';
import { PizzasService } from './pizzas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pizza } from '../pizza.entity';
import { Repository } from 'typeorm';
import { UpdatePizzaDTO } from '../dto/update-pizza.dto';
import { pizza } from 'mock/pizza.mock';

describe('PizzasService', () => {
  let service: PizzasService;
  let repostory: Repository<Pizza>;

  const PIZZA_REPOSITORY_TOKEN = getRepositoryToken(Pizza);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PizzasService,
        {
          provide: PIZZA_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn().mockResolvedValue(pizza),
            find: jest.fn().mockResolvedValue([pizza]),
            findOneByOrFail: jest
              .fn()
              .mockResolvedValue([{ ...pizza, id: '1' }]),
            update: jest.fn().mockResolvedValue({
              id: '1',
              name: 'Diavola Atualizado',
              price: 7.5,
              ingredients: ['tomato', 'mozzarella', 'spicy salami'],
            }),
            findOneBy: jest.fn().mockResolvedValue({
              id: '1',
              name: 'Diavola',
              price: 7.5,
              ingredients: ['tomato', 'mozzarella', 'spicy salami'],
            }),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<PizzasService>(PizzasService);
    repostory = module.get<Repository<Pizza>>(PIZZA_REPOSITORY_TOKEN);
  });

  describe('test configuration', () => {
    it('service should be defined', () => {
      expect(service).toBeDefined();
    });

    it('repostory should be defined', () => {
      expect(repostory).toBeDefined();
    });
  });

  describe('Test the createPizza method', () => {
    it('should create a new pizza successfully', async () => {
      const result = await service.createPizza(pizza);

      expect(repostory.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(pizza);
    });

    it('should return an exception if the pizza already exists', () => {
      jest
        .spyOn(repostory, 'save')
        .mockRejectedValueOnce(new Error('already exists'));

      expect(service.createPizza(pizza)).rejects.toThrowError();
    });

    it('should return an exception if it passes the wrong data', () => {
      jest.spyOn(repostory, 'save').mockRejectedValueOnce(new Error());

      expect(
        service.createPizza({
          name: '',
          ingredients: pizza.ingredients,
          price: pizza.price,
        }),
      ).rejects.toThrowError();
    });
  });

  describe('Test the getAllPizzas method', () => {
    it('should return all pizzas', async () => {
      const result = await service.getAllPizzas();

      expect(repostory.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual([pizza]);
    });
  });

  describe('Test the findPizzaById method', () => {
    it('should return one pizza by id', async () => {
      const result = await service.findPizzaById('1');

      expect(repostory.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{ ...pizza, id: '1' }]);
    });

    it("should return an exception if it doesn't find a pizza", () => {
      jest
        .spyOn(repostory, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      expect(service.findPizzaById('100')).rejects.toThrowError();
    });
  });

  describe('Test the updatePizza method', () => {
    it('should return updated pizza', async () => {
      const update: UpdatePizzaDTO = {
        name: 'Diavola Atualizado',
      };

      const updateData = {
        id: '1',
        name: 'Diavola Atualizado',
        price: 7.5,
        ingredients: ['tomato', 'mozzarella', 'spicy salami'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(repostory, 'findOneBy').mockResolvedValue(updateData);

      const result = await service.updatePizza('1', update);

      expect(repostory.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updateData);
    });
  });

  describe('Test the removePizza method', () => {
    it('should delete a pizza with successfully', async () => {
      const result = await service.deletePizza('1');

      expect(repostory.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });
});
