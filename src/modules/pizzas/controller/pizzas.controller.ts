import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePizzaDTO } from '../dto/create-pizza.dto';
import { DeletePizzaResponseDTO } from '../dto/delete-pizza-response.dto';
import { UpdatePizzaDTO } from '../dto/update-pizza.dto';
import { Pizza } from '../Entity/pizza.entity';
import { PizzasService } from '../service/pizzas.service';

@Controller('/api/pizza')
export class PizzasController {
  constructor(private pizzasService: PizzasService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createPizzaDto: CreatePizzaDTO): Promise<Pizza> {
    const pizza = await this.pizzasService.create(createPizzaDto);
    return pizza;
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Pizza[]> {
    const pizzas = await this.pizzasService.findAll();
    return pizzas;
  }

  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: string): Promise<Pizza> {
    console.log(id);

    const pizza = await this.pizzasService.findById(id);

    if (!pizza) {
      throw new HttpException(`Pizza doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return pizza;
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() UpdatePizzaDto: UpdatePizzaDTO,
  ): Promise<Pizza> {
    return await this.pizzasService.update(id, UpdatePizzaDto);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<DeletePizzaResponseDTO> {
    return await this.pizzasService.delete(id);
  }
}
