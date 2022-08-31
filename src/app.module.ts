import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { OrderModule } from './modules/order/order.module';
import { ItensOrderModule } from './modules/itens-order/itens-order.module';
import { PizzasModule } from './modules/pizzas/pizzas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    OrderModule,
    ItensOrderModule,
    PizzasModule,
  ],
})
export class AppModule {}
