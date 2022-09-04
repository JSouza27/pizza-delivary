import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { OrderModule } from './modules/order/order.module';
import { PizzasModule } from './modules/pizzas/pizzas.module';
import { OrderItemModule } from './modules/order-item/order-item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    OrderModule,
    PizzasModule,
    OrderItemModule,
  ],
})
export class AppModule {}
