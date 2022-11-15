import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdatePizzaDTO {
  @ApiPropertyOptional({
    description: 'Nome da pizza a ser criada',
    example: 'Pepperoni',
  })
  @IsString({ message: 'The name must be a string.' })
  @MaxLength(250, { message: 'The name cannot be longer than 250 characters.' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Preço da pizza a ser criada',
    example: 20,
  })
  @IsNumber()
  @Min(0, { message: 'The price cannot be negative.' })
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    description: 'Ingredientes da pizza a ser criada',
    example: ['mozzarella', 'tomato', 'pepperoni'],
  })
  @IsArray({ message: 'Ingredients must be an array.' })
  @IsOptional()
  ingredients?: string[];
}
