import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePizzaDTO } from '../dto/create-pizza.dto';
import { UpdatePizzaDTO } from '../dto/update-pizza.dto';
import { Pizza } from '../Entity/pizza.entity';
import { DeletePizzaResponseDTO } from '../dto/delete-pizza-response.dto';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(Pizza)
    private readonly pizzasRepository: Repository<Pizza>,
  ) {}

  async create(createPizzaDto: CreatePizzaDTO): Promise<Pizza> {
    return this.pizzasRepository.save(createPizzaDto);
  }

  async findAll(): Promise<Pizza[]> {
    return this.pizzasRepository.find();
  }

  async findById(id: string): Promise<Pizza> {
    return this.pizzasRepository.findOneBy({ id: id });
  }

  async update(id: string, data: UpdatePizzaDTO): Promise<Pizza> {
    const pizza = await this.findById(id);

    if (!pizza) {
      throw new HttpException(`Pizza doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return this.pizzasRepository.save({ ...pizza, ...data });
  }

  async delete(id: string): Promise<DeletePizzaResponseDTO> {
    const pizza = await this.findById(id);

    if (!pizza) {
      throw new HttpException(`Pizza doesn't exist`, HttpStatus.NOT_FOUND);
    }

    const response = await this.pizzasRepository.delete(id);

    if (!!response.affected) {
      return {
        statusCode: 200,
        message: 'Pizza successfully deleted',
      };
    }

    throw new HttpException(
      'There was a problem deleting the item',
      HttpStatus.BAD_REQUEST,
    );
  }
}
