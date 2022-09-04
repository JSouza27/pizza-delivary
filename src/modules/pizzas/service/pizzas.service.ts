import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePizzaDTO } from '../dto/create-pizza.dto';
import { UpdatePizzaDTO } from '../dto/update-pizza.dto';
import { Pizza } from '../pizza.entity';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(Pizza)
    private pizzasRepository: Repository<Pizza>,
  ) {}

  async createPizza(createPizzaDto: CreatePizzaDTO): Promise<Pizza> {
    const pizza = await this.pizzasRepository.save(createPizzaDto);

    return pizza;
  }

  async getAllPizzas(): Promise<Pizza[]> {
    const allPizzas = await this.pizzasRepository.find();
    return allPizzas;
  }

  async findPizzaById(id: string): Promise<Pizza> {
    const pizza = await this.pizzasRepository.findOneBy({ id: id });
    return pizza;
  }

  async updatedPizza(id: string, data: UpdatePizzaDTO): Promise<UpdateResult> {
    const updated = await this.pizzasRepository.update(id, { ...data });
    return updated;
  }

  async deletePizza(id: string): Promise<DeleteResult> {
    return await this.pizzasRepository.delete(id);
  }
}
