import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreatePizzaDTO } from '../dto/create-pizza.dto';
import { UpdatePizzaDTO } from '../dto/update-pizza.dto';
import { Pizza } from '../pizza.entity';
import { PizzasService } from '../service/pizzas.service';

@Controller('/api/pizzas')
export class PizzasController {
  constructor(private pizzasService: PizzasService) {}

  @Post()
  async createPizzas(@Body() createPizzaDto: CreatePizzaDTO): Promise<Pizza> {
    const pizza = await this.pizzasService.createPizza(createPizzaDto);
    return pizza;
  }

  @Get()
  async getAllPizzas(): Promise<Pizza[]> {
    const pizzas = await this.pizzasService.getAllPizzas();
    return pizzas;
  }

  @Get(':id')
  async findPizzaById(@Param('id') id: string): Promise<Pizza> {
    const pizza = await this.pizzasService.findPizzaById(id);
    return pizza;
  }

  @Put(':id')
  async updatePizza(
    @Param('id') id: string,
    @Body() UpdatePizzaDto: UpdatePizzaDTO,
  ): Promise<UpdateResult> {
    return await this.pizzasService.updatedPizza(id, UpdatePizzaDto);
  }

  @Delete(':id')
  async deletePizza(@Param('id') id: string) {
    return await this.pizzasService.deletePizza(id);
  }
}
