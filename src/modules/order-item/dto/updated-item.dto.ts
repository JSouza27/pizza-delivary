import { IsOptional } from 'class-validator';
import { Pizza } from '../../pizzas/pizza.entity';

export class UpdatedItemDTO {
  @IsOptional()
  pizza?: Pizza;

  @IsOptional()
  quantity?: number;
}
