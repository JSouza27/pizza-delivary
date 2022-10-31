import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Entity/order.entity';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { OrderItemModule } from '../order-item/order-item.module';
import { PizzasModule } from '../pizzas/pizzas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => OrderItemModule),
    forwardRef(() => PizzasModule),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
