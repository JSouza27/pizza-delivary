import { ApiPropertyOptional } from '@nestjs/swagger';
import { UpdatedItemDTO } from '../../order-item/dto/updated-item.dto';

export class UpdateOrderDTO {
  @ApiPropertyOptional({
    description: 'Atualiza os itens do pedido',
    example: [
      {
        pizza: {
          id: '93f01734-77e5-435d-97c3-e8400ee74213',
          name: 'Portuguesa',
          price: 5,
          ingredients: ['tomato', 'mozzarella'],
        },
        quantity: 4,
      },
    ],
  })
  itens: UpdatedItemDTO[];
}
