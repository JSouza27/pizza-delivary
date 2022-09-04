import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePizzaDTO } from '../dto/create-pizza.dto';
import { UpdatePizzaDTO } from '../dto/update-pizza.dto';
import { Pizza } from '../pizza.entity';
import { PizzasService } from '../service/pizzas.service';

@Controller('/api/pizzas')
export class PizzasController {
  constructor(private pizzasService: PizzasService) {}

  @Post()
  @HttpCode(201)
  async createPizzas(
    @Body(ValidationPipe) createPizzaDto: CreatePizzaDTO,
  ): Promise<Pizza> {
    const pizza = await this.pizzasService.createPizza(createPizzaDto);
    return pizza;
  }

  @Get()
  @HttpCode(200)
  async getAllPizzas(): Promise<Pizza[]> {
    const pizzas = await this.pizzasService.getAllPizzas();
    return pizzas;
  }

  @Get(':id')
  @HttpCode(200)
  async findPizzaById(@Param('id') id: string): Promise<Pizza> {
    const pizza = await this.pizzasService.findPizzaById(id);
    return pizza;
  }

  @Put(':id')
  @HttpCode(200)
  async updatePizza(
    @Param('id') id: string,
    @Body(ValidationPipe) UpdatePizzaDto: UpdatePizzaDTO,
  ): Promise<Pizza> {
    return await this.pizzasService.updatePizza(id, UpdatePizzaDto);
  }

  @Delete(':id')
  @HttpCode(200)
  async removePizza(@Param('id') id: string): Promise<boolean> {
    return await this.pizzasService.removePizza(id);
  }
}
