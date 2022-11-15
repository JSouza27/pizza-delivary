import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, ValidateNested } from 'class-validator';
import { Pizza } from '../../pizzas/Entity/pizza.entity';

export class ItemDTO {
  @ApiProperty({
    description: 'A propriedade Pizza contém a informação da pizza selecionada',
    example: {
      id: '93f01734-77e5-435d-97c3-e8400ee74213',
      createdAt: '2022-11-08T22:25:37.010Z',
      updatedAt: '2022-11-08T22:25:37.010Z',
      name: 'Portuguesa',
      price: 5,
      ingredients: ['tomato', 'mozzarella'],
    },
  })
  @ValidateNested({ message: 'It is necessary to add a pizza.' })
  @IsNotEmpty({ message: 'The name cannot be empty or null.' })
  pizza: Pizza;

  @ApiProperty({
    description:
      'A propriedade Qauntidade contém a quantidade daquela pizza para o pedido',
    example: 2,
  })
  @Min(1, { message: 'The amount cannot be less than one.' })
  @IsNotEmpty({ message: 'The quantity cannot be empty or null.' })
  quantity: number;
}
