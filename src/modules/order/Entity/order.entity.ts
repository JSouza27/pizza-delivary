import { OrderItem } from '../../order-item/Entity/order-item.entity';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany((type) => OrderItem, (orderItens: OrderItem) => orderItens.order)
  itens: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
