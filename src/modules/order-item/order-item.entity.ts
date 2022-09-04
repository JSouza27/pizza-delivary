import { Pizza } from '../pizzas/pizza.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Pizza)
  @JoinColumn()
  pizza: Pizza;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => Order, (order: Order) => order.itens)
  order: Order;
}
