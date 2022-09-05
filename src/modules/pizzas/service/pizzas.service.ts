import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreatePizzaDTO } from '../dto/create-pizza.dto';
import { UpdatePizzaDTO } from '../dto/update-pizza.dto';
import { IPizzaService } from '../interfaces/pizza-service.interface';
import { Pizza } from '../pizza.entity';

@Injectable()
export class PizzasService implements IPizzaService {
  constructor(
    @InjectRepository(Pizza)
    private pizzasRepository: Repository<Pizza>,
  ) {}

  protected async pizzaExist(id: string) {
    const pizza = await this.pizzasRepository.findOneBy({ id: id });

    if (!pizza) {
      throw new HttpException("Pizza doesn't exist.", HttpStatus.NOT_FOUND);
    }

    return true;
  }

  async createPizza(createPizzaDto: CreatePizzaDTO): Promise<Pizza> {
    try {
      return await this.pizzasRepository.save(createPizzaDto);
    } catch (error) {
      if (error.detail.includes('already exists')) {
        throw new HttpException(
          'Pizza already exists.',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllPizzas(): Promise<Pizza[]> {
    try {
      return await this.pizzasRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findPizzaById(id: string): Promise<Pizza> {
    try {
      return await this.pizzasRepository.findOneByOrFail({ id: id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updatePizza(id: string, data: UpdatePizzaDTO): Promise<Pizza> {
    await this.pizzaExist(id);
    try {
      await this.pizzasRepository.update(id, { ...data });

      const updated = await this.pizzasRepository.findOneBy({ id: id });

      return updated;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removePizza(id: string): Promise<boolean> {
    await this.pizzaExist(id);
    try {
      await this.pizzasRepository.delete(id);

      const pizza = await this.pizzasRepository.findOneBy({ id: id });

      if (!pizza) {
        return true;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
