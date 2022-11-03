import { Test, TestingModule } from '@nestjs/testing';
import { PizzasService } from './pizzas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pizza } from '../Entity/pizza.entity';
import { Repository } from 'typeorm';
import {
  pizza,
  pizzaResponse,
  updateData,
  updatePizza,
} from '../../../mock/pizza.mock';
import { HttpException } from '@nestjs/common';

describe('PizzasService', () => {
  let service: PizzasService;
  let repository: Repository<Pizza>;

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
            findOneBy: jest.fn().mockResolvedValue(pizzaResponse),
            delete: jest.fn().mockResolvedValue({
              raw: [],
              affected: 1,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<PizzasService>(PizzasService);
    repository = module.get<Repository<Pizza>>(PIZZA_REPOSITORY_TOKEN);
  });

  describe('test configuration', () => {
    it('service should be defined', () => {
      expect(service).toBeDefined();
    });

    it('repostory should be defined', () => {
      expect(repository).toBeDefined();
    });
  });

  describe('Test the create method', () => {
    it('should create a new pizza successfully', async () => {
      const result = await service.create(pizza);

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toEqual(pizzaResponse);
    });
  });

  describe('Test the findAll method', () => {
    it('should return all pizzas', async () => {
      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result).toEqual([pizzaResponse]);
    });
  });

  describe('Test the findById method', () => {
    it('should return one pizza by id', async () => {
      const result = await service.findById('1');

      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('price');
      expect(result).toHaveProperty('ingredients');
      expect(result).toEqual(pizzaResponse);
    });

    it('should return null if the pizza does not exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

      const result = await service.findById('2');

      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(null);
    });
  });

  describe('Test the update method', () => {
    it('should return updated pizza', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(updateData);

      const result = await service.update('1', updatePizza);

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updateData);
    });

    it('should return an exception if the pizza does not exist', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

      expect(service.update('2', updatePizza)).rejects.toThrow(HttpException);
      expect(repository.save).toHaveBeenCalledTimes(0);
    });
  });

  describe('Test the delete method', () => {
    it('should delete a pizza with successfully', async () => {
      const result = await service.delete('1');

      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('message');
      expect(result.message).toEqual('Pizza successfully deleted');
    });

    it('should return an exception if the pizza does not exist', () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

      expect(service.delete('2')).rejects.toThrow(HttpException);
      expect(repository.delete).toHaveBeenCalledTimes(0);
    });

    it('should return an exception if the pizza is not deleted', () => {
      jest.spyOn(repository, 'delete').mockResolvedValueOnce({
        raw: [],
        affected: 0,
      });

      expect(service.delete('1')).rejects.toThrow(HttpException);
    });
  });
});
