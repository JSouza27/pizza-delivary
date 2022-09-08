import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { OrderItemModule } from '../order-item/order-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderItemModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
