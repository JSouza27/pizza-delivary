import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './configs/typeorm.config';
import { OrderModule } from './modules/order/order.module';
import { PizzasModule } from './modules/pizzas/pizzas.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    OrderModule,
    PizzasModule,
    OrderItemModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
