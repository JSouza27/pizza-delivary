import { OrderItem } from '../../order-item/Entity/order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany((type) => OrderItem, (orderItens: OrderItem) => orderItens.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  itens: OrderItem[];

  @Column({ type: 'decimal', precision: 2 })
  totalOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
