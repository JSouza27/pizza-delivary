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
import { CreatePizzaDto } from '../dto/create-pizza.dto';
import { UpdatePizzaDto } from '../dto/update-pizza.dto';
import { Pizza } from '../entity/pizza.entity';
import { PizzasService } from '../service/pizzas.service';

@Controller('/api/pizzas')
export class PizzasController {
  constructor(private pizzasService: PizzasService) {}

  @Post()
  async createPizzas(@Body() createPizzaDto: CreatePizzaDto): Promise<Pizza> {
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
    @Body() UpdatePizzaDto: UpdatePizzaDto,
  ): Promise<UpdateResult> {
    return await this.pizzasService.updatedPizza(id, UpdatePizzaDto);
  }

  @Delete(':id')
  async deletePizza(@Param('id') id: string) {
    return await this.pizzasService.deletePizza(id);
  }
}
