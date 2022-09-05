import { IsNotEmpty, MinLength } from 'class-validator';
import { ItemDTO } from '../../order-item/dto/item.dto';

export class CreateOrderDTO {
  @IsNotEmpty({ message: 'The array cannot be empty.' })
  @MinLength(1)
  itens: ItemDTO[];
}
