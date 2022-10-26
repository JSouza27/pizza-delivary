import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePizzaDTO } from '../dto/create-pizza.dto';
import { UpdatePizzaDTO } from '../dto/update-pizza.dto';
import { IPizzaService } from '../interfaces/pizza-service.interface';
import { Pizza } from '../Entity/pizza.entity';

@Injectable()
export class PizzasService implements IPizzaService {
  constructor(
    @InjectRepository(Pizza)
    private readonly pizzasRepository: Repository<Pizza>,
  ) {}

  async create(createPizzaDto: CreatePizzaDTO): Promise<Pizza> {
    return await this.pizzasRepository.save(createPizzaDto);
  }

  async findAll(): Promise<Pizza[]> {
    return await this.pizzasRepository.find();
  }

  async findById(id: string): Promise<Pizza> {
    return await this.pizzasRepository.findOneBy({ id: id });
  }

  async update(id: string, data: UpdatePizzaDTO): Promise<Pizza> {
    await this.pizzasRepository.update(id, { ...data });

    const updated = await this.pizzasRepository.findOneBy({ id: id });

    return updated;
  }

  async delete(id: string): Promise<boolean> {
    await this.pizzasRepository.delete(id);

    const pizza = await this.pizzasRepository.findOneBy({ id: id });

    if (!pizza) {
      return true;
    }

    return false;
  }
}
