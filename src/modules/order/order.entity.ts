import { OrderItem } from '../order-item/order-item.entity';
import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => OrderItem, (orderItens: OrderItem) => orderItens.order, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'itens_id' })
  itens: OrderItem[];
}
