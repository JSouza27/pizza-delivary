import { Pizza } from '../../pizzas/Entity/pizza.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/Entity/order.entity';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pizza, { eager: true })
  @JoinColumn({ name: 'pizza_id' })
  pizza: Pizza;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => Order, (order: Order) => order.itens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
