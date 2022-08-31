import { Module } from '@nestjs/common';
import { PizzasService } from './service/pizzas.service';
import { PizzasController } from './controller/pizzas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pizza } from './entity/pizza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza])],
  providers: [PizzasService],
  controllers: [PizzasController],
})
export class PizzasModule {}
