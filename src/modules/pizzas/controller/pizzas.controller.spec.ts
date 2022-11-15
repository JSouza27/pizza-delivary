import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  pizza,
  pizzaResponse,
  updateData,
  updatePizza,
} from '../../../mock/pizza.mock';
import { PizzasService } from '../service/pizzas.service';
import { PizzasController } from './pizzas.controller';

describe('PizzasController', () => {
  let controller: PizzasController;
  let service: PizzasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PizzasController],
      providers: [
        {
          provide: PizzasService,
          useValue: {
            create: jest.fn().mockResolvedValue(pizzaResponse),
            findAll: jest.fn().mockResolvedValue([pizzaResponse]),
            findById: jest.fn().mockResolvedValue(pizzaResponse),
            update: jest.fn().mockResolvedValue(updateData),
            delete: jest.fn().mockResolvedValue({
              statusCode: 200,
              message: 'Pizza successfully deleted',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<PizzasController>(PizzasController);
    service = module.get<PizzasService>(PizzasService);
  });

  describe('test configuration', () => {
    it('should be controller defined', () => {
      expect(controller).toBeDefined();
    });

    it('should be service defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('test the create method', () => {
    it('should return an object with the information of the created pizza', async () => {
      const result = await controller.create(pizza);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toEqual(pizzaResponse);
    });
  });

  describe('test the findAll method', () => {
    it('should return all pizzas', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result).toEqual([pizzaResponse]);
    });

    it('should return all an empty list if there is no pizza registered', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });

  describe('test the findById method', () => {
    it('should return an object with the information of the pizza', async () => {
      const result = await controller.findById('1');

      expect(service.findById).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toEqual(pizzaResponse);
    });

    it('should return an exception if the pizza does not exist', async () => {
      jest.spyOn(service, 'findById').mockResolvedValueOnce(null);

      expect(controller.findById('2')).rejects.toThrow(HttpException);
      expect(service.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('test the update method', () => {
    it('should return an object with the information of the pizza', async () => {
      const data = updatePizza;

      const result = await controller.update('1', data);

      expect(service.update).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id');
      expect(result).toEqual(updateData);
    });

    it('should return an exception if the pizza does not exist', async () => {
      jest.spyOn(service, 'findById').mockResolvedValueOnce(null);

      const data = updatePizza;

      expect(controller.update('2', data)).rejects.toThrow(HttpException);
      expect(service.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('test the delete method', () => {
    it('should return an object with the information of the pizza', async () => {
      const result = await controller.delete('1');

      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('message');
      expect(result.message).toEqual('Pizza successfully deleted');
    });

    it('should return an exception if the pizza does not exist', async () => {
      jest.spyOn(service, 'findById').mockResolvedValueOnce(null);

      expect(controller.findById('2')).rejects.toThrow(HttpException);
      expect(service.findById).toHaveBeenCalledTimes(1);
    });

    it('should return an exception if the pizza does not exist', async () => {
      jest.spyOn(service, 'findById').mockResolvedValueOnce(null);

      expect(controller.findById('2')).rejects.toThrow(HttpException);
      expect(service.findById).toHaveBeenCalledTimes(1);
    });
  });
});
