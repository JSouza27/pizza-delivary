import { IsOptional, Min, ValidateNested } from 'class-validator';
import { Pizza } from '../../pizzas/Entity/pizza.entity';

export class UpdatedItemDTO {
  @ValidateNested({ message: 'It is necessary to add a pizza.' })
  @IsOptional()
  pizza?: Pizza;

  @Min(1, { message: 'The amount cannot be less than one.' })
  @IsOptional()
  quantity?: number;
}
