import { IsNotEmpty, Min, ValidateNested } from 'class-validator';
import { Pizza } from '../../pizzas/Entity/pizza.entity';

export class ItemDTO {
  @ValidateNested({ message: 'It is necessary to add a pizza.' })
  @IsNotEmpty({ message: 'The name cannot be empty or null.' })
  pizza: Pizza;

  @Min(1, { message: 'The amount cannot be less than one.' })
  @IsNotEmpty({ message: 'The quantity cannot be empty or null.' })
  quantity: number;
}
