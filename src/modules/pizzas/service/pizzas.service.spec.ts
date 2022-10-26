import { Test, TestingModule } from '@nestjs/testing';
import { PizzasService } from './pizzas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pizza } from '../Entity/pizza.entity';
import { Repository } from 'typeorm';
import { UpdatePizzaDTO } from '../dto/update-pizza.dto';
import {
  pizza,
  pizzaResponse,
  updateData,
  updatePizza,
} from '../../../mock/pizza.mock';

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
            save: jest.fn().mockResolvedValue(pizzaResponse),
            find: jest.fn().mockResolvedValue([pizzaResponse]),
            update: jest.fn().mockResolvedValue(updateData),
            findOneBy: jest.fn().mockResolvedValue(pizzaResponse),
            delete: jest.fn().mockResolvedValue(true),
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

  describe('Test the create method', () => {
    it('should create a new pizza successfully', async () => {
      const result = await service.create(pizza);

      expect(repostory.save).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toEqual(pizzaResponse);
    });
  });

  describe('Test the findAll method', () => {
    it('should return all pizzas', async () => {
      const result = await service.findAll();

      expect(repostory.find).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result).toEqual([pizzaResponse]);
    });
  });

  describe('Test the findById method', () => {
    it('should return one pizza by id', async () => {
      const result = await service.findById('1');

      expect(repostory.findOneBy).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('price');
      expect(result).toHaveProperty('ingredients');
      expect(result).toEqual(pizzaResponse);
    });

    it('should return null if the pizza does not exist', async () => {
      jest.spyOn(repostory, 'findOneBy').mockResolvedValue(null);

      const result = await service.findById('2');

      expect(repostory.findOneBy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(null);
    });
  });

  describe('Test the update method', () => {
    it('should return updated pizza', async () => {
      jest.spyOn(repostory, 'findOneBy').mockResolvedValue(updateData);

      const result = await service.update('1', updatePizza);

      expect(repostory.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updateData);
    });
  });

  describe('Test the removePizza method', () => {
    it('should delete a pizza with successfully', async () => {
      jest.spyOn(repostory, 'findOneBy').mockResolvedValueOnce(null);

      const result = await service.delete('1');

      expect(repostory.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeTruthy();
    });
  });
});
