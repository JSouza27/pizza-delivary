import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePizzaDto } from '../dto/create-pizza.dto';
import { UpdatePizzaDto } from '../dto/update-pizza.dto';
import { Pizza } from '../entity/pizza.entity';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(Pizza)
    private pizzasRepository: Repository<Pizza>,
  ) {}

  async createPizza(createPizzaDto: CreatePizzaDto): Promise<Pizza> {
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

  async updatedPizza(id: string, data: UpdatePizzaDto): Promise<UpdateResult> {
    const updated = await this.pizzasRepository.update(id, { ...data });
    return updated;
  }

  async deletePizza(id: string): Promise<DeleteResult> {
    return await this.pizzasRepository.delete(id);
  }
}
