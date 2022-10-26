import { IsNotEmpty, MinLength } from 'class-validator';
import { OrderItem } from '../../order-item/Entity/order-item.entity';

export class UpdateOrderDTO {
  @IsNotEmpty({ message: 'The array cannot be empty.' })
  @MinLength(1)
  itens: OrderItem[];
}
